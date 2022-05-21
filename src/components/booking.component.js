import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import navigate from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [validationError, setValidationError] = useState({});
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);
    useEffect(() => {
        fetchMovies();
    }, []);
    const fetchMovies = async () => {
        await axios
            .get(`http://localhost:3000/movies`) /* replace with backend API*/
            .then(({ data }) => {
                setMovies(data);
            });
    };

    const selectMovie = (id) => {
        if (id != '-') {
            const selected = movies.find((x) => x.id == id);
            setTitle(selected.title);
            setSelectedMovie(selected.session);
        }
    };

    const selectDate = (date) => {
        if (date != '-') {
            const selected = selectedMovie.find((x) => x.date == date);
            setDate(date);
            setSelectedDate(selected.time);
        }
    };

    const createBooking = async (e) => {
        e.preventDefault();

        if (
            title.length > 1 &&
            date.length > 1 &&
            time.length > 1 &&
            name.length > 1 &&
            email.length > 1
        ) {
            await axios

                .post(
                    `http://localhost:3000/booking` /* replace with backend API*/,
                    {
                        name: name,
                        email: email,
                        title: title,
                        date: date,
                        time: time,
                    }
                )
                .then(({ data }) => {
                    Swal.fire({
                        icon: 'success',
                        text: 'Booking confirmed, you can view your booking',
                    });
                    navigate('/');
                })
                .catch(({ response }) => {
                    if (response.status === 422) {
                        setValidationError(response.data.errors);
                    } else {
                        Swal.fire({
                            text: response.data.message,
                            icon: 'error',
                        });
                    }
                });
        } else
            Swal.fire({
                text: 'Please enter all information',
                icon: 'error',
            });
    };

    return (
        <div className="bg-gray-200/80 shadow md:rounded-md p-4">
            <h4 className="card-title">Book your movie now</h4>
            <form onSubmit={createBooking} className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label>Select Your Movie</label>
                    <select
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        onChange={(event) =>
                            selectMovie(event.target.value, event.target.index)
                        }
                    >
                        <option value="-">--select--</option>
                        {movies.map((movie, id) => (
                            <option key={id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label>Date</label>
                    <select
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        onChange={(event) => selectDate(event.target.value)}
                    >
                        <option value="-">--select--</option>
                        {selectedMovie.map((date, id) => (
                            <option key={id}>{date.date}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label>Time</label>
                    <select
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        onChange={(event) => setTime(event.target.value)}
                    >
                        <option value="-">--select--</option>
                        {selectedDate.map((time, id) => (
                            <option key={id}>{time}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label>Name</label>
                    <input
                        type="text"
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        placeholder="enter your name"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        placeholder="enter your email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <button className="border-[0.1rem] border-gray-700 text-center text-sm w-full py-2 hover:bg-gray-800 hover:text-white duration-300 rounded-md no-underline ">
                    BOOK NOW
                </button>
            </form>
        </div>
    );
}
