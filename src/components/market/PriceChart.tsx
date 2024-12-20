import React, { useEffect, useRef, useMemo } from 'react';
import { createChart, ColorType, IChartApi, DeepPartial, ChartOptions } from 'lightweight-charts';
import { PricePoint } from '../../constants/marketData';
import { CHART_COLORS } from '../../constants/colors';

interface PriceChartProps {
  data: PricePoint[];
  symbol: string;
  expanded?: boolean;
}

export default function PriceChart({ data, symbol, expanded = false }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi>();
  const chartColor = CHART_COLORS[symbol as keyof typeof CHART_COLORS] || '#4F46E5';

  const chartOptions = useMemo((): DeepPartial<ChartOptions> => ({
    layout: {
      background: { type: ColorType.Solid, color: 'transparent' },
      textColor: expanded ? '#1f2937' : '#9ca3af',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    grid: {
      vertLines: { visible: false },
      horzLines: { visible: expanded }
    },
    timeScale: {
      visible: expanded,
      timeVisible: expanded,
      secondsVisible: false,
      borderVisible: false,
      fixLeftEdge: true,
      fixRightEdge: true,
    },
    rightPriceScale: {
      visible: expanded,
      borderVisible: false,
      scaleMargins: {
        top: 0.2,
        bottom: 0.2,
      },
    },
    crosshair: {
      vertLine: {
        visible: expanded,
        labelVisible: expanded,
      },
      horzLine: {
        visible: expanded,
        labelVisible: expanded,
      },
    },
    handleScale: expanded,
    handleScroll: expanded,
  }), [expanded]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      ...chartOptions,
      width: chartContainerRef.current.clientWidth,
      height: expanded ? 400 : 80,
    });

    // Add price series
    const areaSeries = chart.addAreaSeries({
      lineColor: chartColor,
      topColor: `${chartColor}40`,
      bottomColor: 'transparent',
      lineWidth: expanded ? 2 : 1,
      priceLineVisible: false,
      lastValueVisible: expanded,
      crosshairMarkerVisible: expanded,
      baseLineVisible: false,
    });

    // Set data and fit content
    if (data?.length) {
      areaSeries.setData(data);
      chart.timeScale().fitContent();
    }

    chartRef.current = chart;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, chartColor, expanded, chartOptions]);

  return (
    <div 
      ref={chartContainerRef} 
      className={`w-full ${expanded ? 'h-[400px]' : 'h-20'}`}
    />
  );
}