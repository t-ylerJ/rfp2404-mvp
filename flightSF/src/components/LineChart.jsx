import react, {useEffect, useRef} from "react";
import { Line } from "react-chartjs-2";
import { FlightGraph } from "../utils/FlightGraph";
import { Chart } from 'chart.js';

function LineChart({ chartData }) {
  const chartRef = useRef(null);
  useEffect(() => {
    const canvas = chartRef.current.getContext('2d');

    // Custom Plugin for setting the canvas background color
    const customCanvasBackgroundColor = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'lightGreen'; // Background color
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };

    const myChart = new Chart(canvas, {
      type: 'line', // change 'doughnut' to 'line' since you're working with a line chart
      data: chartData,
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: 'lightGreen',
          },
        },
      },
      plugins: [customCanvasBackgroundColor], // Register the plugin here
    });
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Flight prices over last 30 days"
            },
            legend: {
              display: false
            },
          },
        }}
      />
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
export default LineChart;