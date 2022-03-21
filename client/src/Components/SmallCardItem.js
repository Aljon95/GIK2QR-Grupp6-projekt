import {Grid, Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import { flexbox } from '@mui/system';
import { toDateTimeString } from '../helper/formatting';


export default function SmallCardItem({item}) {
    return(
        <Grid xs={6} md={4} padding="1rem">
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={item.imageUrl}
                    alt="No image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Utgångspris: {item.startingPrice}kr
                        <br/>
                        Senaste bud: {item.bids[0]}kr
                        <br/>
                        Upplagd: {toDateTimeString(item.createdAt)} <br/>
                        Slut datum: {toDateTimeString(item.endDate)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{backgroundColor: "pink"}}>
                          <a href={`/items/${item.id}`}>Titta vidare</a>
                    </Button>
                </CardActions>
            </Card>
        </Grid>  
    );
}