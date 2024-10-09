// components/Navbar.tsx
import Link from 'next/link';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Clinic Booking
        </Link>
        <div>
          <Link href="/" className="text-white mx-4 hover:underline">
            Home
          </Link>
          <Link href="/bookings" className="text-white mx-4 hover:underline">
            Bookings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
