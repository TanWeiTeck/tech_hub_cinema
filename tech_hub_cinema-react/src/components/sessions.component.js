import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Sessions() {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const fetchSessions = async () => {
        await axios.get(`http://localhost:8000/api/sessions`)
            .then(({ data }) => {
                setSessions(data)
            }).catch(({response:{data}})=>{
                Swal.fire({
                    text:data.message,
                    icon:"error"
                })
            });
        console.log(sessions);
    }

    return (
        <div className="md:bg-white/50 bg-black/50 md:rounded-xl py-4 md:px-4 flex justify-center h-full ">
            <div className="flex overflow-auto md:justify-around md:flex-wrap snap-x box-border">
                {sessions.length > 0 &&
                    sessions.map((session,id) => (
                        <div key={id} className="">
                            <div className="min-h-[150px] w-[224px] overflow-hidden snap-center box-border text-xs bg-gray-200 shadow md:hover:p-1 duration-300 cursor-pointer rounded-xl m-3">
                                <div className="p-2 flex flex-col items-center justify-center">
                                    <p className="font-light text-2xl">
                                        {session.title}
                                    </p>
                                    <p className="text-center w-44">
                                        {session.date}
                                    </p>
                                    <p className="text-center w-44">
                                        {session.time}
                                    </p>
                                </div>
                                
                                <a href={`/bookings/${session.session_id}`} className="z-20">
                                    <button className="border-[0.1rem] border-gray-700 w-full py-2 text-[0.6rem] hover:bg-gray-800 hover:text-white duration-300 rounded-b-xl">
                                        BOOK NOW
                                    </button>
                                </a>
                            </div>
                        </div>
                    ))}
                    
            </div>
        </div>
    );
}