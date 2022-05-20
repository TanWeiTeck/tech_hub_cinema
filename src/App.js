import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditProduct from './components/edit.component';
import MovieList from './components/movielist.component';
import Booking from './components/booking.component';
import BookingList from './components/bookinglist.component';
import CreateProduct from './components/create.component';

function App() {
    return (
        <Router>
            <div className=" bg-gradient-to-r from-violet-900 to-fuchsia-900  w-full min-h-screen">
                <div className="bg-black/60 flex items-center justify-center md:h-20 h-20">
                    <Link
                        to={'/'}
                        className="border-[0.1rem] border-gray-400 text-center text-sm w-36 py-2 hover:bg-gray-800 hover:border-white hover:text-white duration-300 rounded-md no-underline text-white"
                    >
                        Home
                    </Link>
                    <Link to={'/'} className="flex flex-col items-center">
                        <img
                            className="p-2 md:w-full md:h-full w-16"
                            src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-movie-news-kiranshastry-lineal-color-kiranshastry.png"
                        />
                    </Link>
                    <Link
                        to={'/booking'}
                        // className="text-red-500 text-center bg-purple-400 w-"
                        className="border-[0.1rem] border-gray-400 text-center text-sm w-36 py-2 hover:bg-gray-800 hover:border-white hover:text-white duration-300 rounded-md no-underline text-white"
                    >
                        View Your Booking
                    </Link>
                </div>
                <div className="md:p-16 overflow-hiddenmax-w-[1920px]">
                    <Routes>
                        <Route
                            path="/product/create"
                            element={<CreateProduct />}
                        />
                        <Route
                            path="/product/edit/:id"
                            element={<EditProduct />}
                        />
                        <Route path="/product" element={<BookingList />} />
                        <Route exact path="/" element={<MovieList />} />
                        <Route exact path="/booking" element={<Booking />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
