import React, { useEffect, useState} from 'react';
import ResourceModel from '../models/resourceModel';
import {TextField, Button, Grid} from '@mui/material';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { toDateTimeString } from '../helper/formatting';


export default function ItemInfo({item, bid}) {
    return(
        <Grid container spacing={2} columns={2}>
      <Grid xs={1}>
        <img src ={item.imageUrl} style={{width: "25rem", height: '25rem'}}/>
      </Grid>
      <Grid xs={1}>
        
      {item.seller ? (
        <div>
          <a href={`/items/${item.id}/edit`}>
            <Fab color="secondary" aria-label="edit"><EditIcon/></Fab>
          </a>
          <h2>{item.title}</h2>
          
          <p>Säljare: {item.seller.firstName}</p>
          <p>Föremålsbeskrivning: <br/>{item.description}</p>
          <p>Utgångspris: {item.startingPrice}kr</p>
          <p>Upplagd: {toDateTimeString(item.createdAt)} </p>
          <p>Slut datum: {toDateTimeString(item.endDate)}</p>
        </div>
      ) : (
        <p>Laddar</p>
      )}
      </Grid>
      <ul>
        <p>Tidigare bud</p>
            {item.bids && item.bids.map(bid => {
              return (
              <li key ={`bid_${bid.id}`}>
                {bid}
              
              </li>)
            })}
      </ul>
    </Grid>
    )
}