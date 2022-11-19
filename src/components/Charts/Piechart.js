import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as chartjs } from 'chart.js/auto'

const Piechart = ({ chartData }) => {
  return (
    <div style={{ height: '100%', width: '50%', display:'inline-block' }} >
      <Pie data={chartData} />
    </div>
  )
}

export default Piechart