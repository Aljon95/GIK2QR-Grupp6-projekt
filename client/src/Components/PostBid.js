import React, { useEffect, useState} from 'react';
import ResourceModel from '../models/resourceModel';
import {TextField, Button, Grid} from '@mui/material';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { toDateTimeString } from '../helper/formatting';


export default function PostBid({onBid}) {
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    return(
       
           

      <Grid container spacing={2}>
           <h2>hej</h2>
          <Grid item xs={12}>
            <TextField
              name='userId'
              label='userId'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='bid'
              label='bid'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              multiline
              minRows={7}
            />
          </Grid>
          
      <Button variant='contained' color='primary' onClick={() => {
          onBid({ userId, amount});
          setUserId('');
          setAmount('');
      }}>
            Lägg Bud
      </Button>
      </Grid>
      
    )
}