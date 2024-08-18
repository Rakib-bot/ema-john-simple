// ShipmentForm.js
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
    Container, Typography, TextField, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@mui/material';
import { userContext } from '../../App';

const ShipmentForm = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext) // Access default values from context
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: loggedInUser.name || "",
            email: loggedInUser.email,
        },
    });

    const onSubmit = (data) => {
        console.log('Form Data:', data);
    };

    return (

        <Container component="main" maxWidth="sm">

            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Shipment Management Form
                </Typography>

                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                {...register('name', { required: 'Name is required' })}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Country"
                                {...register('country', { required: 'Country is required' })}
                                error={Boolean(errors.country)}
                                helperText={errors.country?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                {...register('address', { required: 'Address is required' })}
                                error={Boolean(errors.address)}
                                helperText={errors.address?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Zip Code"
                                {...register('zipCode', { required: 'Zip Code is required' })}
                                error={Boolean(errors.zipCode)}
                                helperText={errors.zipCode?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                {...register('postalCode', { required: 'Postal Code is required' })}
                                error={Boolean(errors.postalCode)}
                                helperText={errors.postalCode?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default ShipmentForm;
