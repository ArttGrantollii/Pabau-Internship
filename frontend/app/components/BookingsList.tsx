"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import './styles.css';
import Navbar from './Navbar';



type Booking = {
  id: number;
  name: string;
  date: string;
  service: string; // Use lowercase 'string'
  doctor_name: string;
 
  // Add other properties of the booking object according to your API response
};

export default function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<Booking[]>('http://localhost:5000/api/bookings');
        setBookings(response.data);

      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);
    // Function to format date to MM/DD/YYYY
    const formatDate = (dateString: string) => {
      const date = new Date(dateString); // Convert string to Date object
      return date.toLocaleDateString('en-US'); // Format as MM/DD/YYYY
    };
  
  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full relative">
        
        {/* Create New Booking Button */}
        <Link href="/bookings">
          <button className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Create New Booking
          </button>
        </Link>
        
        <h1 className="text-2xl font-bold mb-2 text-blue-600">Online Booking</h1>
        <p className="text-lg text-gray-700 mb-6">Book an appointment with this Clinic</p>

        <h2 className="text-xl font-semibold mb-4 text-black">Choose an option</h2>
        <div className="overflow-hidden rounded-md border border-gray-300">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li key={booking.id} className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center">
                  <Link href={`/bookings/${booking.id}`}>
                    <button className="mr-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                      Open Details
                    </button>
                  </Link>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{booking.service}</h3>
                    
                  </div>
                </div>
                <div className="text-right">
                <p className="text-sm text-gray-500">{formatDate(booking.date)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
      </div>
  );
}
