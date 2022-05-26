import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function List() {

    const [bookings, setBooking] = useState([]);
    const booking = useParams();

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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - booking.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteBooking = async (booking_id) => {
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
                `http://localhost:8000/api/bookings/${booking_id}`
            )
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
                <TableContainer className="">
                <Table className="mt-3">
                    <TableHead className="border-b border-black">
                        <TableRow className="">
                            <td className="text-sm font-medium text-gray-900 px-2 text-center">
                                Booking ID
                            </td>
                            <td className="text-sm font-medium text-gray-900 px-2 text-center">
                                Booked Under Name
                            </td>
                            <td className="text-sm font-medium text-gray-900 px-2 text-center">
                                Movie
                            </td>
                            <td className="text-sm font-medium text-gray-900 px-2 text-center">
                                Date
                            </td>
                            <td className="text-sm font-medium text-gray-900 px-2 text-center">
                                Time
                            </td>
                            <td className="text-sm font-medium text-gray-900 px-2 text-center">
                                Booked On
                            </td>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? bookings.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                            )
                            : booking
                        ).map((booking, key) => (
                            <TableRow key={key}>
                                <td className="text-sm text-gray-900 text-center font-light px-6 whitespace-nowrap">
                                    {booking.booking_id}
                                </td>
                                <td className="text-sm text-gray-900 text-center font-light px-6 whitespace-nowrap">
                                    {booking.name}
                                </td>
                                <td className="text-sm text-gray-900 text-center font-light px-6 whitespace-nowrap">
                                    {booking.title}
                                </td>
                                <td className="text-sm text-gray-900 text-center font-light px-6 whitespace-nowrap">
                                    {booking.date}
                                </td>
                                <td className="text-sm text-gray-900 text-center font-light px-6 whitespace-nowrap">
                                    {booking.time}
                                </td>
                                <td className="text-sm text-gray-900 text-center font-light px-6 whitespace-nowrap">
                                    {booking.created_at}
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <a
                                            href={`/bookings/${booking.session_id}`}
                                            className=" hover:bg-white/50 py-1 px-2 rounded-lg font-bold w-14"
                                        >
                                            <img src="https://img.icons8.com/plasticine/100/000000/edit.png" />
                                        </a>
                                        <button
                                            onClick={() =>
                                                deleteBooking(booking.booking_id)
                                            }
                                            className=" hover:bg-white/50 py-1 px-2 rounded-lg font-bold w-14"
                                        >
                                            <img src="https://img.icons8.com/plasticine/100/000000/filled-trash.png" />
                                        </button>
                                    </div>
                                </td>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="p-0">
                        <tr>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: 'All', value: -1 },
                                ]}
                                colSpan={7}
                                count={bookings.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </tr>
                    </TableFooter>
                </Table>
            </TableContainer>
                <Link
                    to="/"
                    className="border-[0.1rem] border-gray-700 text-center text-sm w-full py-2 hover:bg-gray-800 hover:text-white duration-300 rounded-md no-underline "
                >
                    MAKE ANOTHER BOOKING NOW
                </Link>
        </div>
    );
}
