import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {Box, Card, CardContent, CardHeader} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import img from '../background.png'
import {AuthenticationRequest} from "../models/authentication";
import {login} from "../services/users.service";
import {AllActions, useAsyncDispatch} from "../redux/store";

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export function Login(props: any) {
    const classes = useStyles();

    const dispatch = useAsyncDispatch<AllActions>();
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        const userData: AuthenticationRequest = {
            username: values.username,
            password: values.password,
        };

        dispatch(login(userData, props.history));
        setLoading(false);
    }

    const handleChange = (e: any) => {
        e.persist();
        setValues((values: any) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Box display='flex' flex='1' justifyContent='space-around' style={{height: '100vh', backgroundImage: `url(${img})`}}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Card className={classes.root}>
                    <CardHeader
                        title="Simple store app"
                        subheader="Hint: use 'user' or 'admin' for both credentials"
                    />
                    <CardContent>
                        <Box component='div'>
                            <TextField
                                autoComplete='none'
                                margin='none'
                                value={values.username}
                                fullWidth
                                label='Username'
                                name='username'
                                type='text'
                                onChange={handleChange}
                            />
                            <TextField
                                autoComplete='off'
                                margin='normal'
                                value={values.password}
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                onChange={handleChange}
                            />
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center">
                                <Button type='submit' variant='contained' color='primary' disabled={loading} onClick={handleSubmit}
                                        style={{marginTop: 20}}>
                                    Login
                                    {loading && (<CircularProgress className='loader' size={30} color='secondary'/>)}
                                </Button>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    )
}
