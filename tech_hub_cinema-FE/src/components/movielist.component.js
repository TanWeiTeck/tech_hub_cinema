import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import TopGun from './images/topgun.png';
import DoctorStrange from './images/drstrange.jpeg';
import Sonic from './images/sonic2banner.webp';

export default function List() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchMovies = async () => {
        await axios.get(`http://localhost:8000/api/movies`)
            .then(({ data }) => {
                setMovies(data);
            });
        console.log(movies);
    }

    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={DoctorStrange}
                    alt="First slide"
                    style={{ width:"500px",height:'400px' }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={TopGun}
                    alt="Second slide"
                    style={{ width:"500px",height:'400px' }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Sonic}
                    alt="Third slide"
                    style={{ width:"500px",height:'400px' }}
                    />
                </Carousel.Item>
            </Carousel>
            <div className="md:bg-white/50 bg-black/50 md:rounded-xl py-4 md:px-4 flex justify-center h-full mt-3 ">
                <div className="flex overflow-auto md:justify-around md:flex-wrap snap-x box-border">
                    {movies.length > 0 &&
                        movies.map((movie,id) => (
                            <div key={id} className="">
                                <div className="min-h-[320px] w-[224px] overflow-hidden snap-center box-border text-xs bg-gray-200 shadow md:hover:p-1 duration-300 cursor-pointer rounded-xl m-3">
                                    <img
                                        className="h-56 object-cover bg-black w-full"
                                        src={movie.image}
                                        alt=""
                                    />
                                    <div className="p-2 flex flex-col items-center text-center">
                                        <p className="font-light text-xl">
                                            {movie.title}
                                        </p>
                                        <p className="text-center w-44">
                                            {movie.description}
                                        </p>
                                    </div>
                                    <div id="movie_id">
                                        <a href={`/sessions/${movie.movie_id}`} className="z-20" >
                                            <button className="border-[0.1rem] border-gray-700 w-full py-2 text-[0.6rem] hover:bg-gray-800 hover:text-white duration-300 rounded-b-xl">
                                                BOOK NOW
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
