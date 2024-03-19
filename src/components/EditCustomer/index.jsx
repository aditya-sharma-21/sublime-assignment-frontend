// EditCustomer.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    CardActions,
    CardContent,
    Input,
    Button,
    Typography,
    Grid,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from "axios";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const EditCustomer = ({ customer, setEditCustomer }) => {
    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState({
        first_name: customer.first_name,
        last_name: customer.last_name,
        city: customer.city,
        company: customer.company,
        file: customer.file
    });

    useEffect(() => {
        setCustomerData({
            first_name: customer.first_name,
            last_name: customer.last_name,
            city: customer.city,
            company: customer.company,
            file: null
        })
    }, [])

    const handleChange = (e) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setCustomerData({
            ...customerData,
            file: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let data = new FormData();
            data.append('first_name', customerData.first_name);
            data.append('last_name', customerData.last_name);
            data.append('city', customerData.city);
            data.append('company', customerData.company);
            data.append('file', customerData.file);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `http://localhost:4000/api/customer/edit-customer/${customer._id}`,
                headers: {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
                data: data
            };

            await axios.request(config)
            setEditCustomer(false)
        } catch (error) {
            console.error('Error editing customer:', error);
        }
    };

    return (
        <React.Fragment>
            <div style={{ padding: "50px" }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Typography variant='h4' gutterBottom>Edit Customer Details</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={() => navigate("/")}>Dashboard</Button>
                    </Grid>
                </Grid>
                <CardContent>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item xs={6}>
                            <Typography variant='h6' gutterBottom>First Name:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input name='first_name' value={customerData.first_name} onChange={handleChange} type='text' width={"100%"} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6' gutterBottom>Last Name:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input name='last_name' value={customerData.last_name} onChange={handleChange} type='text' width={"100%"} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6' gutterBottom>City:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input name='city' value={customerData.city} onChange={handleChange} type='text' width={"100%"} />
                        </Grid><Grid item xs={6}>
                            <Typography variant='h6' gutterBottom>Company:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input name='company' value={customerData.company} onChange={handleChange} type='text' width={"100%"} />
                        </Grid>
                    </Grid>
                    <div style={{ textAlign: "center", paddingTop: "30px" }}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            onChange={handleFileChange}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <Typography gutterBottom>{customerData.file?.name}</Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSubmit}>Submit</Button>
                </CardActions>
            </div>
        </React.Fragment>
    )

    // return (
    //     <div>
    //         <h2>Edit Customer</h2>
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 <label>First Name:</label>
    //                 <input type="text" name="firstName" value={customerData.firstName} onChange={handleChange} />
    //             </div>
    //             <div>
    //                 <label>Last Name:</label>
    //                 <input type="text" name="lastName" value={customerData.lastName} onChange={handleChange} />
    //             </div>
    //             <div>
    //                 <label>City:</label>
    //                 <input type="text" name="city" value={customerData.city} onChange={handleChange} />
    //             </div>
    //             <div>
    //                 <label>Company:</label>
    //                 <input type="text" name="company" value={customerData.company} onChange={handleChange} />
    //             </div>
    //             <div>
    //                 <label>Upload File:</label>
    //                 <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
    //             </div>
    //             <button type="submit">Save</button>
    //         </form>
    //     </div>
    // );
};

export default EditCustomer;