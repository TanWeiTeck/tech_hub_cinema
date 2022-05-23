import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import navigate from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function Booking() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { movie_id } = useParams();
    const [validationError, setValidationError] = useState({});
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);

    
/*    useEffect(() => {
        fetchMovies();
    }, []); */

    useEffect(() => {
        fetchSessions();
    }, []);
    
 /*   const fetchMovies = async () => {
        await axios
            .get(`http://localhost:8000/api/confirmation`)

            .then(({ data }) => {
                setMovies(data);
            });
    }; */

    const selectMovie = (id) => {
        if (id !== '-') {
            const selected = movies.find((x) => x.id === id);
            setTitle(selected.title);
            setSelectedMovie(selected.session);
        }
    };

    const fetchSessions = async (id) => {
        await axios
            .get(`http://localhost:8000/api/confirmation`)

            .then(({ data }) => {
                setSessions(data);
            }).catch(({response:{data}})=>{
                Swal.fire({
                    text:data.message,
                    icon:"error"
                })
            });
    };

    const selectDate = (date) => {
        if (date !== '-') {
            const selected = sessions.find((x) => x.date === date);
            setDate(date);
            setSelectedDate(selected.time);
        }
    };

    const createBooking = async (e) => {
        e.preventDefault();

    const bookingData = new FormData()
    bookingData.append('title', title)
    bookingData.append('date', date)
    bookingData.append('time', time)
    bookingData.append('name', name)
    bookingData.append('email', email)

            await axios
                .post(`http://localhost:8000/api/bookings`, bookingData)
                .then(({ data }) => {
                    Swal.fire({
                        icon: 'success',
                        text: data.message,
                        //text: 'Booking confirmed, check your email',
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
        }

    return (
        <div className="bg-gray-200/80 shadow md:rounded-md p-4">
            <h4 className="card-title text-center">Enter your details</h4>
            {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value])=> (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                    <Form onSubmit={createBooking} className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            {sessions.length > 0 &&
                            sessions.map((session,id) => (
                                <div key={id} className="">
                                    <div className="">
                                        <div className="p-2 flex flex-col items-center justify-center">
                                        <label>Select Your Movie</label>
                                        <select
                                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                                        onChange={(event) =>
                                            {setTitle(event.target.value)
                                            }}>
                                    <option value="-">--select--</option>
                                    <option className="font-light text-2xl" value={session.title}>
                                        {session.title}
                                    </option></select>
                                    <label>Date</label>
                                    <select
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        onChange={(event) => {setDate(event.target.value)}}
                    >
                                    <option value="-">--select--</option>
                                    <option className="text-center w-44" value={session.date}>
                                        {session.date}
                                    </option></select>
                                    <label>Time</label>
                                    <select
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        onChange={(event) => {setTime(event.target.value)}}>
                            <option value="-">--select--</option>
                                    <option className="text-center w-44" value={session.time}>
                                        {session.time}
                                    </option></select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <label>Name</label>
                    <input
                        type="text"
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        placeholder="Enter Your Name"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400"
                        placeholder="Enter Your Email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <button className="border-[0.1rem] border-gray-700 text-center w-full py-2 hover:bg-gray-800 hover:text-white duration-300 rounded-md no-underline ">
                    BOOK NOW
                </button>
            </Form>
            <a href={`/sessions/:movie_id`} className="z-20"><button className="border-[0.1rem] border-gray-700 text-center text-sm w-full py-2 hover:bg-gray-800 hover:text-white duration-300 rounded-md no-underline ">
                    Change Date/Time
                </button>
            </a>
            <a href={`/`}>
                <button className="border-[0.1rem] border-gray-700 text-center text-sm w-full py-2 hover:bg-gray-800 hover:text-white duration-300 rounded-md no-underline ">
                    Cancel
                </button>
            </a>
        </div>
    );
}
