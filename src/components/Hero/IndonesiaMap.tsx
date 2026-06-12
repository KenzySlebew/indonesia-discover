import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import exportingModule from 'highcharts/modules/exporting';
import { mapData } from '../../data/provinces';

if (typeof exportingModule === 'function') {
  exportingModule(Highcharts);
}

interface IndonesiaMapProps {
  selectedKey: string | null;
  onProvinceClick: (hcKey: string) => void;
}

type TopologyData = Record<string, unknown>;

/**
 * Interactive Highcharts map of Indonesia.
 * Light theme: putih surface, navy borders, merah hover.
 * Click to select province. Hover = Highcharts built-in highlight only.
 *
 * KEY FIX: uses joinBy: 'hc-key' to match data objects to topology polygons
 * by their hc-key property, NOT by array index. This prevents the province
 * mismatch bug (e.g. hovering Kalimantan Selatan showing Kalimantan Utara).
 */
export default function IndonesiaMap({ selectedKey, onProvinceClick }: IndonesiaMapProps) {
  const [topology, setTopology] = useState<TopologyData | null>(null);
  const [error, setError] = useState(false);
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('https://code.highcharts.com/mapdata/countries/id/id-all.topo.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data: TopologyData) => {
        if (!cancelled) setTopology(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => { cancelled = true; };
  }, []);

  // Sync selectedKey with Highcharts point selection state
  useEffect(() => {
    if (!topology || !chartRef.current?.chart) return;
    const chart = chartRef.current.chart;
    if (!chart.series?.[0]) return;

    // Deselect all currently selected points
    chart.getSelectedPoints().forEach((p) => p.select(false, false));

    if (selectedKey) {
      const points = chart.series[0].points;
      const target = points.find((p) => {
        const key =
          (p as unknown as Record<string, string>)['hc-key'] ||
          (p.properties as Record<string, string> | undefined)?.['hc-key'] ||
          (p.options as Record<string, string> | undefined)?.['hc-key'];
        return key === selectedKey;
      });
      if (target) {
        target.select(true, false);
      }
    }
  }, [selectedKey, topology]);

  if (!topology && !error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-full max-w-[480px] h-[200px] bg-abu-muda rounded-2xl animate-pulse" />
        <p className="font-body text-xs text-abu tracking-wide">Memuat peta Indonesia</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <p className="font-heading font-semibold text-navy text-lg">Gagal memuat peta</p>
        <p className="font-body text-abu text-sm">Periksa koneksi internet Anda.</p>
        <button
          onClick={() => { setError(false); setTopology(null); }}
          className="btn-primary text-xs"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const options: Highcharts.Options = {
    chart: {
      map: topology as unknown as Highcharts.GeoJSON,
      backgroundColor: 'transparent',
      style: { fontFamily: 'Inter, sans-serif' },
      height: 480,
      margin: [0, 0, 0, 0],
      animation: {
        duration: 300
      }
    },
    title: { text: '' },
    subtitle: { text: '' },
    credits: { enabled: false },
    exporting: { enabled: false },
    mapNavigation: {
      enabled: true,
      enableMouseWheelZoom: false, // Disable wheel zoom to prevent page scroll interference, but allow pan/zoom buttons
      enableTouchZoom: true,
      enableDoubleClickZoom: true,
      buttonOptions: {
        verticalAlign: 'bottom',
        align: 'right',
        theme: {
          fill: '#FFFFFF',
          stroke: '#E5E7EB',
          style: { color: '#071C53', fontSize: '12px' },
          states: {
            hover: { fill: '#F5F5F5', stroke: '#CE1126' },
          },
        },
      },
    },
    colorAxis: {
      min: 0,
      minColor: '#F5F5F5',
      maxColor: '#D7263D',
      visible: false,
    },
    legend: { enabled: false },
    tooltip: {
      backgroundColor: '#071C53',
      borderColor: 'transparent',
      borderRadius: 8,
      borderWidth: 0,
      shadow: false,
      style: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        color: '#FFFFFF',
        fontWeight: '500',
      },
      headerFormat: '',
      pointFormat: '<span style="color:#CE1126">●</span> {point.name}',
      useHTML: true,
    },
    plotOptions: {
      series: {
        states: {
          inactive: {
            opacity: 1 // Keep other regions visible instead of dimming them, reducing repaint lag
          }
        }
      }
    },
    series: [
      {
        type: 'map',
        data: mapData as unknown as Highcharts.SeriesMapDataOptions[],
        name: 'Provinsi',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        nullColor: '#E5E7EB',
        joinBy: 'hc-key',
        allowPointSelect: true,
        cursor: 'pointer',
        states: {
          hover: {
            color: '#FDECEA',
            borderColor: '#CE1126',
            borderWidth: 2,
            animation: {
              duration: 150
            }
          },
          select: {
            color: '#FCE4E4',
            borderColor: '#CE1126',
            borderWidth: 2.5,
            animation: {
              duration: 150
            }
          },
        },
        dataLabels: {
          enabled: false,
        },
        point: {
          events: {
            click: function (this: Highcharts.Point) {
              const key =
                (this as unknown as Record<string, string>)['hc-key'] ||
                (this.properties as Record<string, string> | undefined)?.['hc-key'] ||
                (this.options as Record<string, string> | undefined)?.['hc-key'];
              if (key) {
                onProvinceClick(key);
              }
            },
          },
        },
      } as Highcharts.SeriesMapOptions,
    ],
  };

  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
        ref={chartRef}
      />
    </div>
  );
}
