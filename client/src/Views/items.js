import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ResourceModel from '../models/resourceModel';
import {Grid, Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';



export default function Items(props) {
const resourceModel = new ResourceModel("items");
const [items, setitems] = useState ([]);
const url = props.match.url;
console.log(url);


useEffect(() => {
    resourceModel.getAll().then(items => {
        setitems(items);
    })
}, []);
{items.length > 0 && 
    items.map(item => {
        console.log("image",item);
    })}
return (
    <Grid container spacing={2}>
        {items.length > 0 && 
            items.map(item => {
                return (
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
                                    Upplagd: {item.createdAt} <br/>
                                    Slut datum: {item.endDate}
                                </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small"><a href={`/items/${item.id}`}>Titta vidare</a></Button>
                            </CardActions>
                        </Card>
                    </Grid>   
                );
            })}
        </Grid>
    );  
}