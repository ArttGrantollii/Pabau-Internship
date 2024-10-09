"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import './bookingDetail.css';
import Navbar from '../../../../components/Navbar';




interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const BookingDetail = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return; // Exit if there's no ID

    console.log('Booking ID:', id); // Log the ID

    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`); // Fetch the booking by ID
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log('Fetched booking data:', data); // Log the fetched data
        setBooking(data);
      } catch (error:any) {
        console.error('Error fetching booking:', error); // Log error for debugging
        setError(error.message);
      }
    };

    fetchBooking();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!booking) {
    return <p>Loading...</p>;
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString); // Convert string to Date object
    return date.toLocaleDateString('en-US'); // Format as MM/DD/YYYY
  };

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
  <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
    {error ? (
      <p className="error-message">Error: {error}</p>
    ) : !booking ? (
      <p className="loading-message">Loading...</p>
    ) : (
      <div className="booking-details">
        <h1 className="text-2xl font-bold mb-2 text-blue-600">Booking Details</h1>
        <p><strong>Service:</strong> {booking.service}</p>
        <p><strong>Doctor:</strong> {booking.doctor_name}</p>
        <p><strong>Start Time:</strong> {booking.start_time}</p>
        <p><strong>End Time:</strong> {booking.end_time}</p>
        <p><strong>Date:</strong> {formatDate(booking.date)}</p>
        <button onClick={() => router.push('/')}>Back to Bookings</button>
      </div>
    )}
  </div>
      </div>
      </div>

  );
};

export default BookingDetail;
