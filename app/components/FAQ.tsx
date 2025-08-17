import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui";

interface FAQItem {
  question: string;
  answer: string;
  borderColor?:
    | "primary-blue"
    | "growth-green"
    | "system-info"
    | "system-warning"
    | "system-error-dark"
    | "system-success";
}

interface FAQProps {
  title: string;
  items: FAQItem[];
  tipSection?: {
    title: string;
    content: string;
  };
  footerText?: string;
}

const borderColorClasses = {
  "primary-blue": "border-primary-blue text-primary-blue-dark",
  "growth-green": "border-growth-green text-growth-green",
  "system-info": "border-system-info text-system-info",
  "system-warning": "border-system-warning text-system-warning",
  "system-error-dark": "border-system-error-dark text-system-error-dark",
  "system-success": "border-growth-green text-growth-green",
};

export function FAQ({ title, items, tipSection, footerText }: FAQProps) {
  return (
    <Card className="border border-neutral-surface-variant bg-background-dark-secondary duration-300">
      <CardHeader>
        <CardTitle as="h2" className="text-xl font-bold text-text-primary">
          ❓ {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {items.map((item, index) => {
              const isFirstColumn = index < Math.ceil(items.length / 2);
              const borderColor = item.borderColor || "primary-blue";
              const colorClasses =
                borderColorClasses[borderColor] || borderColorClasses["primary-blue"];

              if (isFirstColumn && index === Math.ceil(items.length / 2) - 1) {
                // Last item of first column
                return (
                  <div key={index} className="space-y-4">
                    <div className={`border-l-4 ${colorClasses} pl-4`}>
                      <h4
                        className={`mb-2 font-semibold ${colorClasses?.split(" ")[1] || "text-primary-blue-dark"}`}
                      >
                        {index + 1}. {item.question}
                      </h4>
                      <p
                        className="text-sm text-text-secondary"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  </div>
                );
              }

              if (!isFirstColumn) {
                // Second column items
                const secondColumnIndex = index - Math.ceil(items.length / 2);
                return (
                  <div key={index} className={secondColumnIndex === 0 ? "space-y-4" : ""}>
                    <div
                      className={`border-l-4 ${colorClasses} pl-4 ${secondColumnIndex > 0 ? "mt-4" : ""}`}
                    >
                      <h4
                        className={`mb-2 font-semibold ${colorClasses?.split(" ")[1] || "text-primary-blue-dark"}`}
                      >
                        {index + 1}. {item.question}
                      </h4>
                      <p
                        className="text-sm text-text-secondary"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  </div>
                );
              }

              // First column items (except the last one)
              return (
                <div key={index} className={index === 0 ? "space-y-4" : ""}>
                  <div className={`border-l-4 ${colorClasses} pl-4 ${index > 0 ? "mt-4" : ""}`}>
                    <h4
                      className={`mb-2 font-semibold ${colorClasses?.split(" ")[1] || "text-primary-blue-dark"}`}
                    >
                      {index + 1}. {item.question}
                    </h4>
                    <p
                      className="text-sm text-text-secondary"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {tipSection && (
            <div className="rounded-lg border border-primary-blue/20 bg-primary-blue/10 p-4">
              <h4 className="mb-2 flex items-center font-semibold text-primary-blue-dark">
                💡 <span className="ml-2">{tipSection.title}</span>
              </h4>
              <p
                className="text-sm text-text-secondary"
                dangerouslySetInnerHTML={{ __html: tipSection.content }}
              />
            </div>
          )}

          {footerText && (
            <div className="text-center">
              <p
                className="text-sm text-text-secondary"
                dangerouslySetInnerHTML={{ __html: footerText }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
