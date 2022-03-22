import React, { useEffect, useState} from 'react';
import ResourceModel from '../models/resourceModel';
import { TextField, Button, Chip, Grid } from '@mui/material';


export default function ItemCreate({onCreate}) {
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    return(
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='userId'
            label='användar id'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='title'
            label='Titel'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='imageUrl'
            label='Bildlänk (max 200 tecken)'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='description'
            label='Innehåll'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={7}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='startingPrice'
            label='utgångspris'
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.4rem' }}>
          <Button variant='contained' color='primary' onClick={() => {
          onCreate({title,imageUrl,description,startingPrice,userId});
          console.log(userId, title,imageUrl,description,startingPrice)}}>
            Lägg upp
          </Button>
        </Grid>
      </Grid>
    )}
