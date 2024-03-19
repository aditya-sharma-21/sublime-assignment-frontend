import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Typography,
    Button
} from "@mui/material";

const columns = [
    { id: 'city', label: 'City', minWidth: 170, align: 'left' },
    {
        id: 'no_of_customer', label: 'No of Customer', minWidth: 170, align: 'left',
    }
];

const CityList = () => {
    const navigate = useNavigate();

    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/customer/get-customer-by-city`)
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('Error fetching city list:', error);
            });
    }, []);

    return (
        <React.Fragment>
            <div style={{ padding: "50px" }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Typography variant='h4' gutterBottom>City List</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={() => navigate("/")}>Dashboard</Button>
                    </Grid>
                </Grid>
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
                                {cities.map((city, index) => {
                                    return (
                                        <TableRow sx={{ cursor: 'pointer' }} hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell key={city._id} align="left">{city._id}</TableCell>
                                            <TableCell key={city.count} align="left">{city.count}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </React.Fragment>
    )

    // return (
    //     <div className="container">
    //         <h1>City List</h1>
    //         <table className="styled-table">
    //             <thead>
    //                 <tr>
    //                     <th>City Name</th>
    //                     <th>Count</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {cities.map((city, index) => (
    //                     <tr key={index}>
    //                         <td>
    //                             {city._id}
    //                         </td>
    //                         <td>{city.count}</td>
    //                     </tr>

    //                 ))}
    //             </tbody>
    //         </table>
    //         <Link to="/" className="backLink">Back to Dashboard</Link>
    //     </div>
    // );
};

export default CityList;
