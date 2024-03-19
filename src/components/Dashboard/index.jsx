import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import {
    InputAdornment,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Grid,
    Typography,
    Button,
    FormControl,
    InputLabel
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const columns = [
    { id: 'first_name', label: 'First Name', minWidth: 170, align: 'left' },
    {
        id: 'last_name', label: 'Last Name', minWidth: 170, align: 'left',
    },
    {
        id: 'city',
        label: 'City',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'company',
        label: 'Company',
        minWidth: 170,
        align: 'left',
    },
];
const Dashboard = () => {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalCustomers, setTotalCustomer] = useState(1);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        axios("http://localhost:4000/api/customer/count-of-customer")
            .then(response => {
                setTotalCustomer(response.data.count)
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });
    }, [])

    useEffect(() => {
        fetchCustomers();
    }, [searchTerm, page, rowsPerPage]);

    // Fetch customers from API
    const fetchCustomers = () => {
        axios(`http://localhost:4000/api/customer/get-all-customers?page=${page + 1}&per_page=${rowsPerPage}&search=${searchTerm}`)
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });
    };


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>
            <div style={{ padding: "50px" }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Typography variant='h4' gutterBottom>Customer Dashboard</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={() => navigate("/customer-in-cities")}>Check City List</Button>
                        {/* <Link className='backLink' to="/customer-in-cities">Check City List</Link> */}
                    </Grid>
                </Grid>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel>Search here...</InputLabel>
                    <Input
                        value={searchTerm}
                        onChange={handleSearch}
                        type='text'
                        width={"100%"}
                        endAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ top: 57, minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers.map((customer) => {
                                    return (
                                        <TableRow sx={{ cursor: 'pointer' }} hover role="checkbox" tabIndex={-1} key={customer._id} onClick={() => navigate(`/customer/${customer._id}`)}>
                                            <TableCell key={customer.first_name} align="left">{customer.first_name}</TableCell>
                                            <TableCell key={customer.last_name} align="left">{customer.last_name}</TableCell>
                                            <TableCell key={customer.city} align="left">{customer.city}</TableCell>
                                            <TableCell key={customer.company} align="left">{customer.company}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[1, 2, 5, 10, 25, 100]}
                        component="div"
                        count={totalCustomers}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </React.Fragment>
    );

};

export default Dashboard;
