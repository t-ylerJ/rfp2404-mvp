import react, {useEffect, useRef} from "react";
import { Line } from "react-chartjs-2";
import { FlightGraph } from "../utils/FlightGraph";
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function LineChart({ chartData }) {
  Chart.register(ChartDataLabels);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current.getContext('2d');

    const customCanvasBackgroundColor = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };

    const myChart = new Chart(canvas, {
      type: 'line',
      data: chartData,
      width: 1000,
      height:40,
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: 'white',
          },
          title: {
            display: true,
            text: "30-Day Overview of Flight Price Trends"
          },
          legend: {
            display: false
          },
          datalabels: {
            display: true,
            align: top,
            backgroundColor: 'rgba(174, 25, 75, 1)',
            borderRadius: 4,
            color: 'black',
            font: {
              size: 12,
              weight: 'bold'
            },
            formatter: (value) => `$${value}`,
            anchor: 'end',
          }
        },
      },
      plugins: [customCanvasBackgroundColor, ChartDataLabels],
    });
    
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return (
    <div className="canvas-wrapper">
      <div className="chart-container">
      <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
export default LineChart;