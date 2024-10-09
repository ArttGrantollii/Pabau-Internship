"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import './bookings.css';
import Navbar from '../../../components/Navbar';

export default function Bookings() {
  const [form, setForm] = useState({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: '',
  });

  const [errors, setErrors] = useState({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: ''
  });

  const router = useRouter(); 

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    
    setErrors({
      service: '',
      doctor_name: '',
      start_time: '',
      end_time: '',
      date: ''
    });

    try {
      let hasError = false;


      if (form.service.trim() === '') {
        setErrors(prev => ({ ...prev, service: 'Service is required' }));
        hasError = true;
      }

      // Validate doctor namek
      if (form.doctor_name.trim() === '') {
        setErrors(prev => ({ ...prev, doctor_name: 'Doctor name is required' }));
        hasError = true;
      }

      // Validate start time format
      try {
        validateTimeFormat(form.start_time);
      } catch (error: any) {
        setErrors(prev => ({ ...prev, start_time: error.message }));
        hasError = true;
      }

      // Validate end time format
      try {
        validateTimeFormat(form.end_time);
      } catch (error: any) {
        setErrors(prev => ({ ...prev, end_time: error.message }));
        hasError = true;
      }

      // Validate date
      if (!form.date) {
        setErrors(prev => ({ ...prev, date: 'Date is required' }));
        hasError = true;
      }

      if (hasError) return; // Exit if there are validation errors

      // Convert start and end times to 24-hour format
      const startTime24 = convertTo24HourFormat(form.start_time);
      const endTime24 = convertTo24HourFormat(form.end_time);

      // Create a new booking object
      const bookingData = {
        service: form.service,
        doctor_name: form.doctor_name,
        start_time: startTime24,
        end_time: endTime24,
        date: form.date,
      };

      // Send the booking data to the API
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      console.log('Booking created:', response.data);

      // Redirect to the home page after successful booking
      router.push('/'); 
    } catch (error: any) {
      console.error('Error creating booking:', error);
    }
  };

  // Function to validate the time format
  function validateTimeFormat(time: string) {
    const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AP]M)$/i;
    if (!timeRegex.test(time)) {
      throw new Error('Invalid time format. Please use "hh:mm AM/PM" format.');
    }
  }

  // Function to convert 12-hour time format to 24-hour format
  function convertTo24HourFormat(time: string): string {
    const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AP]M)$/i;
    const match = timeRegex.exec(time);

    if (!match) {
      throw new Error('Invalid time format. Please use "hh:mm AM/PM" format.');
    }

    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  return (
    <div>
      <Navbar/>
      <h1 className="text-3xl pt-10">Create a Booking</h1>

      <form onSubmit={handleSubmit}>
        {/* Service Input */}
        <div>
          <input
            type="text"
            placeholder="Service"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            required
          />
          {errors.service && <p className="error-message">{errors.service}</p>}
        </div>

        {/* Doctor Name Input */}
        <div>
          <input
            type="text"
            placeholder="Doctor Name"
            value={form.doctor_name}
            onChange={(e) => setForm({ ...form, doctor_name: e.target.value })}
            required
          />
          {errors.doctor_name && <p className="error-message">{errors.doctor_name}</p>}
        </div>

        {/* Start Time Input */}
        <div>
          <input
            type="text"
            placeholder="Start Time (hh:mm AM/PM)"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            required
          />
          {errors.start_time && <p className="error-message">{errors.start_time}</p>}
        </div>

        {/* End Time Input */}
        <div>
          <input
            type="text"
            placeholder="End Time (hh:mm AM/PM)"
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            required
          />
          {errors.end_time && <p className="error-message">{errors.end_time}</p>}
        </div>

        {/* Date Input */}
        <div>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          {errors.date && <p className="error-message">{errors.date}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
