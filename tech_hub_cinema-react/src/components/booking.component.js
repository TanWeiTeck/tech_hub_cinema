import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
//import navigate from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';

export default function Booking() {

    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState({});
    const session = useParams();

    const bookingTitle = useRef();
    const bookingDate = useRef();
    const bookingTime = useRef();

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async (id) => {
        await axios
            .get(`http://localhost:8000/api/confirmation/${session.session_id}`)

            .then(({ data }) => {
                setSessions(data);
            }).catch(({response:{data}})=>{
                Swal.fire({
                    text:data.message,
                    icon:"error"
                })
            });
    };

    const createBooking = async (e) => {
        e.preventDefault();

    const bookingData = new FormData()
    bookingData.append('title', bookingTitle.current.value)
    bookingData.append('date', bookingDate.current.value)
    bookingData.append('time', bookingTime.current.value)
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
                                        <label>Movie Title</label>
                                        <input
                                            className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400 text-center"
                                            value={session.title} readOnly ref={bookingTitle}
                                            />
                                        <label>Date</label>
                                        <input
                                            className="bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400 text-center" 
                                            value={session.date} readOnly ref={bookingDate}
                                            /> 
                                        <label>Time</label>
                                        <input 
                                            className='bg-inherit border-x-0 border-t-0 border-b-[1px] border-gray-400 text-center' 
                                            value={session.time} readOnly ref={bookingTime}
                                            />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
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
