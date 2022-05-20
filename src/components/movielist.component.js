import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function List() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        await axios
            // .get(`http://localhost:8000/api/movies`)
            .get(`http://localhost:3000/movies`)
            .then(({ data }) => {
                setProducts(data);
            });
        console.log(products);
    };

    const deleteProduct = async (id) => {
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
            // .delete(`http://localhost:8000/api/products/${id}`)
            .delete(`http://localhost:3000/movies/${id}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: 'success',
                    text: data.message,
                });
                fetchProducts();
            })
            .catch(({ response: { data } }) => {
                Swal.fire({ text: data.message, icon: 'error' });
            });
    };

    return (
        <div className="md:bg-white/50 bg-black/50 md:rounded-xl py-4 md:px-4 flex justify-center h-full ">
            <div className="flex overflow-auto md:justify-around md:flex-wrap snap-x box-border">
                {products.length > 0 &&
                    products.map((product, id) => (
                        <div key={id} className="">
                            <div className="min-h-[320px] w-[224px] overflow-hidden snap-center box-border text-xs bg-gray-200 shadow md:hover:p-1 duration-300 cursor-pointer rounded-xl m-3">
                                <img
                                    className="h-56 object-cover bg-black w-full"
                                    src={product.image}
                                    // src={`http://localhost:8000/storage/product/image/${row.image}`}
                                    alt=""
                                />
                                <div className="p-2 flex flex-col items-center justify-center">
                                    <p className="font-light text-2xl">
                                        {product.title}
                                    </p>
                                    <p className="text-center w-44">
                                        {product.description}
                                    </p>
                                </div>
                                <a href={`/booking`} className="z-20">
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
