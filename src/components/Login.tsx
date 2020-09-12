﻿﻿import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {Box, Card, CardContent, CardHeader} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import img from '../background.png'
//redux stuff
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/user.actions'
import {AuthenticationRequest} from "../models/authentication";

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

function Login(props: any) {
    const classes = useStyles();

    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(props.UI.loading);
    }, [props.UI])

    const handleSubmit = () => {
        setLoading(true);

        const userData: AuthenticationRequest = {
            username: values.username,
            password: values.password,
        };
        props.loginUser(userData, props.history);
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

//this map the states to our props in this functional component
const mapStateToProps = (state: any) => ({
    user: state.user,
    UI: state.UI
});

//this map actions to our props in this functional component
const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(Login)
