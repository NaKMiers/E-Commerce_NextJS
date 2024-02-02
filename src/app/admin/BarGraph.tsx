'use client'

import {
  ArcElement,
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type GraphData = {
  day: string
  date: string
  amount: number
}

interface BarGraphProps {
  data: GraphData[]
}

function BarGraph({ data }: BarGraphProps) {
  const labels = data.map(item => item.day)
  const amounts = data.map(item => item.amount)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return <Bar data={chartData} options={options}></Bar>
}

export default BarGraph
