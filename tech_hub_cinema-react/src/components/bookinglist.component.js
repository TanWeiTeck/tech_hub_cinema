import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function List() {

    const [bookings, setBooking] = useState([]);
    
    useEffect(() => {
        fetchBooking();
    }, []);
    const fetchBooking = async () => {
        await axios
            .get(`http://localhost:8000/api/bookings`) /* replace with backend API*/
            .then(({ data }) => {
                setBooking(data);
            });
    };

    const deleteBooking = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            return result.isConfirmed;
        });
        if (!isConfirm) {
            return;
        }
        await axios
            .delete(
                `http://localhost:8000/api/bookings/${id}`
            ) /* replace with backend API*/
            .then(({ data }) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Booking Deleted',
                });
                fetchBooking();
            })
            .catch(({ response: { data } }) => {
                Swal.fire({ text: data.message, icon: 'error' });
            });
    };

    return (
        <div className="bg-gray-200/80 shadow md:rounded-md p-4 overflow-auto flex flex-col">
            <h4 className="card-title">Your Booking List</h4>
            <div className="flex flex-col">
                <table className="mt-3">
                    <thead className="border-b border-black">
                        <tr className="">
                            <th className="text-sm font-medium text-gray-900 px-2 text-center">
                                Booking ID
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-2 text-center">
                                Booked Under Name
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-2 text-center">
                                Movie
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-2 text-center">
                                Date
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-2 text-center">
                                Time
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-2 text-center">
                                Booked On
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 &&
                            bookings.map((booking, key) => (
                                <tr key={key}>
                                    <td className="text-sm text-gray-900 text-center font-light px-6 py-2 whitespace-nowrap">
                                        {booking.booking_id}
                                    </td>
                                    <td className="text-sm text-gray-900 text-center font-light px-6 py-2 whitespace-nowrap">
                                        {booking.name}
                                    </td>
                                    <td className="text-sm text-gray-900 text-center font-light px-6 py-2 whitespace-nowrap">
                                        {booking.title}
                                    </td>
                                    <td className="text-sm text-gray-900 text-center font-light px-6 py-2 whitespace-nowrap">
                                        {booking.date}
                                    </td>
                                    <td className="text-sm text-gray-900 text-center font-light px-6 py-2 whitespace-nowrap">
                                        {booking.time}
                                    </td>
                                    <td className="text-sm text-gray-900 text-center font-light px-6 py-2 whitespace-nowrap">
                                        {booking.created_at}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <Link
                    to="/"
                    className="border-[0.1rem] border-gray-700 text-center text-sm w-full py-2 hover:bg-gray-800 hover:text-white duration-300 rounded-md no-underline "
                >
                    MAKE ANOTHER BOOKING NOW
                </Link>
            </div>
        </div>
    );
}