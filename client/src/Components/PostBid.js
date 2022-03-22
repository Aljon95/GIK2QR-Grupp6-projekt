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
          <Grid item xs={12} marginRight= "40rem">
            <TextField
              name='userId'
              label='userId'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} marginRight= "40rem" marginBottom="8px">
            <TextField
              name='bid'
              label='bid'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          
      <Button style={{marginLeft: "5rem"}} variant='contained' color='primary' onClick={() => {
          onBid({ userId, amount});
          setUserId('');
          setAmount('');
      }}>
            Lägg Bud
      </Button>
      </Grid>
      
    )
}