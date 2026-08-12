import React from 'react'
import Chart from 'chart.js/auto';
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';
import { useRef } from 'react';
const BarChart = () => {
    const {getConsultation} = useContext(AuthContext)
    const {consultation} = useContext(AuthContext)
    const [monthlyData, setMonthlyData] = useState({});
    const chartRef = useRef(null);
    useEffect(() => {
        getConsultation();
    }, []);

    useEffect(() => {
        // Calculate number of consultations per month
        const data = {};
        consultation.forEach(consultation => {
          const date = new Date(consultation.date);
          const month = date.toLocaleString('default', { month: 'long' });
          if (!data[month]) {
            data[month] = 0;
          }
          data[month]++;
        });
    
        setMonthlyData(data);
      }, [consultation]);

      useEffect(() => {
        // Destroy previous chart instance
        if (chartRef.current !== null) {
          chartRef.current.destroy();
        }
    
        // Draw new chart using Chart.js
        const ctx = document.getElementById('consultationsBarGraph');
        if (ctx) {
          chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: Object.keys(monthlyData),
              datasets: [{
                label: 'Number of Consultations',
                data: Object.values(monthlyData),
                backgroundColor: '#7900dc',
                borderColor: '#7900dc',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
      }, [monthlyData]);
    
  return (
        <>
        <div style={{ width: '400px', height: '300px' }}>
           <canvas id="consultationsBarGraph"></canvas>
           </div>
        </>
    )
}

export default BarChart