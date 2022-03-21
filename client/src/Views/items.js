import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ResourceModel from '../models/resourceModel';
import {Grid, Paper, Typography } from '@mui/material';



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
                    <Grid xs={6} md={4}>
                            <Link to = {`/items/${item.id}`}>Föremål: {item.title}</Link>
                        <br />
                                <img src ={item.imageUrl} style={{width: "200px", height: '200px'}} />
                        <p>
                            <Link to={`/users/${item.seller.id}/items`}>
                            Säljare: {item.seller.firstName}
                            </Link>
                            <br/>
                            Utgångspris: {item.startingPrice}kr
                            <br/>
                            Senaste bud: {item.bids[0]}kr
                        </p>
                        <p>
                            Upplagd: {item.createdAt} <br/>
                            Slut datum: {item.endDate}
                        </p>
                        {item.body}
                    </Grid>   
                );
            })}
        </Grid>
    );  
}