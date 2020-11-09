import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { IMAGE_DEFAULT } from "../../util/configuration";

export const Movie = ({ id, title, genere, year, image = IMAGE_DEFAULT }) => {
    const classes = useStyles();

    return (
        <Grid item key={id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography>{genere}</Typography>
                    <Typography>{year}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
