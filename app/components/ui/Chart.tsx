import { useMemo } from "react";

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface LineChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  className?: string;
}

export function LineChart({ data, width = 800, height = 400, className = "" }: LineChartProps) {
  const { pathData, points, maxValue, minValue } = useMemo(() => {
    if (data.length === 0) return { pathData: "", points: [], maxValue: 0, minValue: 0 };

    const values = data.map(d => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;

    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1 || 1);
      const y = padding + chartHeight - ((point.value - minValue) / range) * chartHeight;
      return { x, y, ...point };
    });

    const pathData = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');

    return { pathData, points, maxValue, minValue };
  }, [data, width, height]);

  const yTicks = useMemo(() => {
    const tickCount = 5;
    const range = maxValue - minValue;
    const step = range / (tickCount - 1);
    
    return Array.from({ length: tickCount }, (_, i) => {
      const value = minValue + i * step;
      const y = 60 + (height - 120) - (i * (height - 120)) / (tickCount - 1);
      return { value, y };
    });
  }, [maxValue, minValue, height]);

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}k`;
    }
    return `R$ ${value.toFixed(0)}`;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <svg 
        width={width} 
        height={height} 
        className="bg-gray-900 rounded-lg border border-gray-700"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={60}
              y1={tick.y}
              x2={width - 60}
              y2={tick.y}
              stroke="currentColor"
              strokeOpacity="0.1"
              className="text-gray-600"
            />
            <text
              x={50}
              y={tick.y + 4}
              textAnchor="end"
              fontSize="12"
              fill="currentColor"
              className="text-gray-400"
            >
              {formatValue(tick.value)}
            </text>
          </g>
        ))}

        {/* Area under curve */}
        {pathData && (
          <path
            d={`${pathData} L ${points[points.length - 1]?.x || 0} ${height - 60} L 60 ${height - 60} Z`}
            fill="url(#chartGradient)"
          />
        )}

        {/* Line */}
        {pathData && (
          <path
            d={pathData}
            fill="none"
            stroke="rgb(34, 197, 94)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Data points */}
        {points.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="rgb(34, 197, 94)"
              stroke="rgb(17, 24, 39)"
              strokeWidth="2"
            />
            <title>{`${point.label}: ${formatValue(point.value)}`}</title>
          </g>
        ))}

        {/* X-axis labels */}
        {points.map((point, i) => (
          <text
            key={i}
            x={point.x}
            y={height - 30}
            textAnchor="middle"
            fontSize="12"
            fill="currentColor"
            className="text-gray-400"
          >
            {i % Math.max(1, Math.floor(points.length / 8)) === 0 ? point.label : ''}
          </text>
        ))}

        {/* Axes */}
        <line
          x1={60}
          y1={60}
          x2={60}
          y2={height - 60}
          stroke="currentColor"
          strokeOpacity="0.3"
          className="text-gray-600"
        />
        <line
          x1={60}
          y1={height - 60}
          x2={width - 60}
          y2={height - 60}
          stroke="currentColor"
          strokeOpacity="0.3"
          className="text-gray-600"
        />
      </svg>
    </div>
  );
}

interface BarChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  className?: string;
}

export function BarChart({ data, width = 600, height = 300, className = "" }: BarChartProps) {
  const { bars, maxValue } = useMemo(() => {
    if (data.length === 0) return { bars: [], maxValue: 0 };

    const maxValue = Math.max(...data.map(d => d.value));
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;

    const bars = data.map((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = height - padding - barHeight;
      
      return {
        x,
        y,
        width: barWidth,
        height: barHeight,
        ...item,
      };
    });

    return { bars, maxValue };
  }, [data, width, height]);

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toFixed(0);
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <svg 
        width={width} 
        height={height} 
        className="bg-gray-900 rounded-lg border border-gray-700"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="100%" stopColor="rgb(37, 99, 235)" />
          </linearGradient>
        </defs>

        {/* Bars */}
        {bars.map((bar, i) => (
          <g key={i}>
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={bar.color || "url(#barGradient)"}
              rx="4"
              ry="4"
            />
            <text
              x={bar.x + bar.width / 2}
              y={bar.y - 8}
              textAnchor="middle"
              fontSize="11"
              fill="currentColor"
              className="text-gray-400"
            >
              {formatValue(bar.value)}
            </text>
            <text
              x={bar.x + bar.width / 2}
              y={height - 30}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
              className="text-gray-400"
            >
              {bar.label}
            </text>
            <title>{`${bar.label}: ${formatValue(bar.value)}`}</title>
          </g>
        ))}

        {/* Y-axis */}
        <line
          x1={60}
          y1={60}
          x2={60}
          y2={height - 60}
          stroke="currentColor"
          strokeOpacity="0.3"
          className="text-gray-600"
        />
        
        {/* X-axis */}
        <line
          x1={60}
          y1={height - 60}
          x2={width - 60}
          y2={height - 60}
          stroke="currentColor"
          strokeOpacity="0.3"
          className="text-gray-600"
        />
      </svg>
    </div>
  );
}