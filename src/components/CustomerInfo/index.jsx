import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


import "./styles.css"
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
} from '@mui/material';
import EditCustomer from '../EditCustomer';

const CustomerInfo = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(false);

    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:4000/api/customer/get-customer-details/${id}`)
            .then(response => {
                setCustomer(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer information:', error);
            });
    }, [id, editCustomer]);

    return (
        <React.Fragment>
            {!editCustomer ? <div style={{ padding: "50px" }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Typography variant='h4' gutterBottom>Customer Details</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={() => navigate("/")}>Dashboard</Button>
                    </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={2}>
                    <Card sx={{ maxWidth: 700 }}>
                        {customer?.file && <CardMedia
                            component="img"
                            alt="File"
                            // height=""
                            sx={{ width: "50%" }}
                            image={"http://localhost:4000/public" + customer?.file}
                        />}
                        <CardContent>
                            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                <Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>First Name:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>{customer?.first_name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>Last Name:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>{customer?.last_name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>City:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>{customer?.city}</Typography>
                                </Grid><Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>Company:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>{customer?.company}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => setEditCustomer(true)}>Edit Customer Info</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div> : <EditCustomer customer={customer} setEditCustomer={setEditCustomer} />}
        </React.Fragment >
    )
};

export default CustomerInfo;
