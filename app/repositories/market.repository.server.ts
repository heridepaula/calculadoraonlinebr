import type { Collection } from "mongodb";
import { getDb } from "~/lib/mongodb.server";
import type { IndicatorId, IndicatorValue } from "~/lib/market/indicators";
import { treasuryRowId, type TreasuryRow } from "~/lib/market/treasury";

export const INDICATORS_COLLECTION = "market_indicators";
export const TREASURY_COLLECTION = "treasury_bonds";
export const TREASURY_SYNC_COLLECTION = "treasury_sync";

export interface IndicatorDoc extends IndicatorValue {
  _id: IndicatorId;
  fetchedAt: Date;
}

export interface TreasuryDoc extends Omit<TreasuryRow, "baseDate"> {
  _id: string;
  baseDate: string;
}

export interface TreasurySyncDoc {
  _id: string;
  lastModified?: string;
  etag?: string | null;
  lastBaseDate?: string;
  checkedAt?: Date;
  lastError?: string | null;
}

const SYNC_ID = "tesouro-transparente";
const globalForIdx = globalThis as unknown as { _marketIndexes?: Promise<unknown> };

async function cols() {
  const db = await getDb();
  const treasury = db.collection<TreasuryDoc>(TREASURY_COLLECTION);
  globalForIdx._marketIndexes ??= treasury
    .createIndexes([
      { key: { baseDate: -1 }, name: "baseDate_desc" },
      { key: { kind: 1, maturity: 1, baseDate: -1 }, name: "kind_maturity_baseDate" },
    ])
    .catch((err) => {
      globalForIdx._marketIndexes = undefined;
      console.error("[market] falha ao criar índices:", err);
    });
  await globalForIdx._marketIndexes;
  return {
    indicators: db.collection<IndicatorDoc>(INDICATORS_COLLECTION),
    treasury,
    sync: db.collection<TreasurySyncDoc>(TREASURY_SYNC_COLLECTION),
  };
}

export async function saveIndicators(values: Partial<Record<IndicatorId, IndicatorValue>>) {
  const { indicators } = await cols();
  const now = new Date();
  const ops = Object.entries(values).map(([id, v]) => ({
    updateOne: {
      filter: { _id: id as IndicatorId },
      update: {
        $set: { rate: v.rate, referenceDate: v.referenceDate, source: v.source, fetchedAt: now },
      },
      upsert: true,
    },
  }));
  if (ops.length) await indicators.bulkWrite(ops, { ordered: false });
  return ops.length;
}

export async function getIndicatorDocs(): Promise<IndicatorDoc[]> {
  const { indicators } = await cols();
  return indicators.find({}).toArray();
}

export async function upsertTreasuryRows(rows: readonly TreasuryRow[]) {
  if (rows.length === 0) return 0;
  const { treasury } = await cols();
  await treasury.bulkWrite(
    rows.map((r) => ({
      updateOne: {
        filter: { _id: treasuryRowId(r) },
        update: { $set: { ...r } },
        upsert: true,
      },
    })),
    { ordered: false },
  );
  return rows.length;
}

/** Linhas da data-base mais recente gravada. */
export async function getLatestTreasuryRows(): Promise<TreasuryRow[]> {
  const { treasury } = await cols();
  const [latest] = await treasury.find({}).sort({ baseDate: -1 }).limit(1).toArray();
  if (!latest) return [];
  const docs = await treasury.find({ baseDate: latest.baseDate }).toArray();
  return docs.map((doc) => {
    const row: Partial<TreasuryDoc> = { ...doc };
    delete row._id;
    return row as TreasuryRow;
  });
}

export async function deleteTreasuryBefore(baseDate: string) {
  const { treasury } = await cols();
  const res = await treasury.deleteMany({ baseDate: { $lt: baseDate } });
  return res.deletedCount;
}

export async function getTreasurySync(): Promise<TreasurySyncDoc | null> {
  const { sync } = await cols();
  return sync.findOne({ _id: SYNC_ID });
}

export async function setTreasurySync(patch: Partial<Omit<TreasurySyncDoc, "_id">>) {
  const { sync } = await cols();
  await sync.updateOne({ _id: SYNC_ID }, { $set: patch }, { upsert: true });
}

export type { Collection };
