import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';
import { Card, Button } from 'antd';

const Slots = () => {
  const { appointment } = useContext(AuthContext);
  useEffect(() => {
    const id = localStorage.getItem('doctor');
    const date = localStorage.getItem('dateChoosed');
    let payload = {
      docId: id,
      date: date
    };
    console.log(payload);
    appointment(payload);

  }, []);

  const navigate = useNavigate();
  const slotChoice = localStorage.getItem('slotChoosen');
  console.log("choice of slot is", slotChoice);
  const timeSlots = [];
  const totalSlots = JSON.parse(localStorage.getItem('totalSlots'));
  let startTime = 0, endTime = 0;
  if (slotChoice === 'morning') {
    startTime = 9;
    endTime = 12;
  } else if (slotChoice === 'noon') {
    startTime = 12;
    endTime = 15;
  } else if (slotChoice === 'evening') {
    startTime = 15;
    endTime = 21;
  }

  for (let i = startTime; i < endTime; i++) {
    for (let j = 0; j < 60; j += 30) {
      const time = `${i < 10 ? '0' : ''}${i}:${j === 0 ? '00' : j}`;
      timeSlots.push(time);
    }
  }

  const handleSlotSelection = (time) => {
    localStorage.setItem('timeChoosed', time);
    console.log(localStorage.getItem('timeChoosed'));
    navigate('/checkout');
  };

  return (
    <div className="slots-availability grid grid-cols-4 md:grid-cols-4 gap-5 px-5 py-5 justify-center items-center relative left-[20%]">
      {timeSlots.map((time, index) => (
        <Card
          key={index}
          className='shadow-md bg-gray-100 hover:shadow-lg '
          title={time}
          extra={<Button type="primary" disabled={!totalSlots[index]} onClick={() => handleSlotSelection(time)}>Select</Button>}
        >
          {totalSlots[index] ? <p className="text-green-500 font-semibold">Available</p> : <p className="text-red-500 font-semibold">Not Available</p>}
        </Card>
      ))}

    </div>

  );
};

export default Slots;
