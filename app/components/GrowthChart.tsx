import { useEffect, useRef } from "react";
import type { GrowthChartPoint } from "~/utils/calculations";

interface GrowthChartProps {
  title: string;
  chartData: GrowthChartPoint[];
  childPosition: {
    age: number;
    value: number;
    percentile: number;
  };
  unit: string;
  color: string;
  height?: number;
}

export function GrowthChart({
  title,
  chartData,
  childPosition,
  unit,
  color,
  height = 300,
}: GrowthChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set up canvas dimensions with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Chart styling
    const padding = { top: 20, right: 50, bottom: 60, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;

    // Calculate data ranges
    const maxAge = Math.max(...chartData.map((d) => d.age));
    const minAge = Math.min(...chartData.map((d) => d.age));
    const maxValue = Math.max(...chartData.map((d) => Math.max(d.p3, d.p15, d.p50, d.p85, d.p97)));
    const minValue = Math.min(...chartData.map((d) => Math.min(d.p3, d.p15, d.p50, d.p85, d.p97)));

    // Helper functions
    const xScale = (age: number) =>
      padding.left + ((age - minAge) / (maxAge - minAge)) * chartWidth;
    const yScale = (value: number) =>
      padding.top + ((maxValue - value) / (maxValue - minValue)) * chartHeight;

    // Draw background grid
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 2]);

    // Vertical grid lines (age)
    for (let age = minAge; age <= maxAge; age += 6) {
      const x = xScale(age);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();
    }

    // Horizontal grid lines (values)
    const valueStep = (maxValue - minValue) / 5;
    for (let i = 0; i <= 5; i++) {
      const value = minValue + i * valueStep;
      const y = yScale(value);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
    }

    ctx.setLineDash([]);

    // Draw percentile curves
    const percentileColors = {
      p3: "#ef4444", // red
      p15: "#f97316", // orange
      p50: "#22c55e", // green
      p85: "#f97316", // orange
      p97: "#ef4444", // red
    };

    const percentileLabels = {
      p3: "P3",
      p15: "P15",
      p50: "P50",
      p85: "P85",
      p97: "P97",
    };

    // Draw percentile curves
    Object.entries(percentileColors).forEach(([percentile, curveColor]) => {
      ctx.strokeStyle = curveColor;
      ctx.lineWidth = percentile === "p50" ? 2 : 1;
      ctx.setLineDash(percentile === "p50" ? [] : [5, 5]);

      ctx.beginPath();
      chartData.forEach((point, index) => {
        const x = xScale(point.age);
        const y = yScale(point[percentile as keyof GrowthChartPoint] as number);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Add percentile labels at the end of curves
      const lastPoint = chartData[chartData.length - 1];
      const lastX = xScale(lastPoint.age);
      const lastY = yScale(lastPoint[percentile as keyof GrowthChartPoint] as number);

      ctx.fillStyle = curveColor;
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        percentileLabels[percentile as keyof typeof percentileLabels],
        lastX + 5,
        lastY + 3
      );
    });

    ctx.setLineDash([]);

    // Draw child's position
    const childX = xScale(childPosition.age);
    const childY = yScale(childPosition.value);

    // Child position marker
    ctx.fillStyle = color;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(childX, childY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Child position label
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(childX - 30, childY - 25, 60, 18);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(childX - 30, childY - 25, 60, 18);

    ctx.fillStyle = color;
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`P${childPosition.percentile}`, childX, childY - 12);

    // Draw axes
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.stroke();

    // Add axis labels
    ctx.fillStyle = "#d1d5db";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";

    // X-axis labels (age in months)
    for (let age = minAge; age <= maxAge; age += 6) {
      const x = xScale(age);
      const years = Math.floor(age / 12);
      const months = age % 12;
      const label = years > 0 ? `${years}a${months > 0 ? ` ${months}m` : ""}` : `${months}m`;
      ctx.fillText(label, x, padding.top + chartHeight + 20);
    }

    // Y-axis labels (values)
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = minValue + i * valueStep;
      const y = yScale(value);
      ctx.fillText(value.toFixed(1), padding.left - 10, y + 4);
    }

    // Chart title
    ctx.fillStyle = "#f9fafb";
    ctx.font = "bold 16px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, rect.width / 2, 15);

    // Unit label (Y-axis)
    ctx.save();
    ctx.translate(15, rect.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#d1d5db";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(unit, 0, 0);
    ctx.restore();

    // Age label (X-axis)
    ctx.fillStyle = "#d1d5db";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Idade", rect.width / 2, rect.height - 10);
  }, [chartData, childPosition, title, unit, color, height]);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="bg-background w-full rounded-lg border border-neutral-surface-variant"
        style={{ height: `${height}px` }}
        aria-label={`Gráfico de crescimento: ${title}. Criança está no percentil ${childPosition.percentile}`}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-0.5 w-3 bg-red-500"></div>
          <span className="text-text-secondary">P3, P97</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-0.5 w-3 bg-orange-500"></div>
          <span className="text-text-secondary">P15, P85</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-0.5 w-3 bg-green-500"></div>
          <span className="text-text-secondary">P50 (Mediana)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: color }}></div>
          <span className="text-text-secondary">Sua criança</span>
        </div>
      </div>
    </div>
  );
}
