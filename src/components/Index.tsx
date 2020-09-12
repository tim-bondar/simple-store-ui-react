import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography,
    Button,
    IconButton,
    AppBar,
    Toolbar,
    createStyles,
    Theme,
    Box, Snackbar
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {logoutUser} from '../redux/actions/user.actions'
import {connect} from "react-redux";
import {User} from "../models/user";
import Grid from "@material-ui/core/Grid";
import {StoreItem} from "../models/storeItem";
import {getItems} from "../services/storeItems.service";
import {ItemCard} from "./ItemCard";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingTop: 50,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        item: {
            width: 250,
            margin: 20
        },
    }),
);

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface ModalProps {
    open: boolean,
    item: StoreItem | null
}

function Index(props: any) {
    const logout = () => {
        props.logoutUser();
    }

    const user = props.user.user as User;
    const classes = useStyles();

    const [dataVersion, setNewVersion] = useState(0);
    const [popup, setOpen] = useState({} as ModalProps);
    const [items, setItems] = useState([] as StoreItem[]);

    useEffect(() => {
        (async () => {
            setItems((await getItems()).data)
        })();
    }, [dataVersion])

    const handleClose = () => {
        setOpen(
            {
                open: false,
                item: null
            }
        );
    };

    const itemCards = items
        .sort((a, b) => a.title < b.title ? 1 : -1)
        .map((item: StoreItem, i: number) =>
            (<ItemCard
                item={item}
                isAdmin={user.isAdmin}
                refreshFunc={() => setNewVersion(dataVersion + 1)}
                openModal={setOpen}/>))

    return (
        <Box display='flex' flex='1' justifyContent='space-around' className={classes.root}>
            <Grid
                container
                direction="row">
                <AppBar position="absolute">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h5" className={classes.title}>
                            Simple Store
                        </Typography>
                        <Typography variant="h6" className={classes.title} style={{textAlign: "right", paddingRight: 20}}>
                            Hello, {user.firstName} {user.lastName}.
                        </Typography>
                        <Button color="inherit" variant="outlined" onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <Container style={{paddingTop: 50}}>
                    <Grid
                        container
                        direction="row">
                        {itemCards}
                    </Grid>
                </Container>
            </Grid>
            <Snackbar open={popup.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    You successfully purchased <b>{popup.item?.title}</b>. Thank you for your support!
                </Alert>
            </Snackbar>
        </Box>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    logoutUser
};

export default connect(mapStateToProps, mapActionsToProps)(Index)
