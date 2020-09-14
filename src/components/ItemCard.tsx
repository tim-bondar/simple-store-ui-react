import {StoreItem} from "../models/storeItem";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, createStyles, Theme,
    Typography
} from "@material-ui/core";
import picture from "../logo.svg";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {disableItem, enableItem} from "../services/storeItems.service";
import {ModalProps} from "./Home";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        item: {
            width: 250,
            margin: 20
        },
    }),
);

export interface ItemCardProps {
    item: StoreItem,
    isAdmin: boolean,
    refreshFunc: () => void,
    openModal: (props: ModalProps) => void
}

export function ItemCard(props: ItemCardProps) {
    const classes = useStyles();
    const {item, isAdmin, refreshFunc, openModal} = props;

    const handleDisableItem = async (id: string) => {
        await disableItem(id);
        refreshFunc();
    }

    const handleEnableItem = async (id: string) => {
        await enableItem(id);
        refreshFunc();
    }

    return (
        <Card className={classes.item} key={item.id}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Picture"
                    height="150"
                    image={picture}
                    title="Picture"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid
                    container
                    direction="row">
                    <Button size="medium" color="primary" variant="contained" onClick={() => openModal({open: true, item: item})}
                            disabled={!item.isAvailable}>
                        $ {item.price}
                    </Button>
                    {isAdmin && (item.isAvailable ?
                        <Button size="small" color="primary" style={{marginLeft: 50}} onClick={() => handleDisableItem(item.id)}>
                            disable
                        </Button>
                        :
                        <Button size="small" color="primary" style={{marginLeft: 50}} onClick={() => handleEnableItem(item.id)}>
                            enable
                        </Button>)
                    }

                </Grid>
            </CardActions>
        </Card>
    );
}
