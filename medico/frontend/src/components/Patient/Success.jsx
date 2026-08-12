import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import {Calendar} from 'antd'
import moment from 'moment';
const Success = () => {
    const details = localStorage.getItem('bookedAppointment')
    const year = 2024;
    const month=5
    const markedDate = 3;
    const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = moment(`${year}-${month}-01`, "YYYY-MM-DD");
    
    // Determine the starting day of the week
    const startingDayOfWeek = firstDayOfMonth.day(); // 0 for Sunday, 1 for Monday, ...

    // Create an array to hold the calendar grid
    const calendarGrid = [];

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarGrid.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarGrid.push(
            <div
                key={day}
                className={`date ${day === markedDate ? 'bg-blue-200' : ''}`}
            >
                {day}
            </div>
        );

        // Add an extra empty cell at the end of each week
        if ((day + startingDayOfWeek) % 7 === 0) {
            calendarGrid.push(<div key={`empty-week-${day}`} className="empty-cell"></div>);
        }
    }
  return (<>
    <div className="w-full relative bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
    <Navbar />
    <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
      <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
          <Header />
        </div>
        <div className="calendar">
            <h2>{firstDayOfMonth.format("MMMM YYYY")}</h2>
            <div className="calendar-grid grid grid-cols-7 gap-1">
                {calendarGrid}
            </div>
        </div>
        
      </section>
    </main>
    
  </div>
  
  </>
  )
}

export default Success