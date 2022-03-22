import React, {useState} from 'react';
import {TextField, Button, Grid} from '@mui/material';

export default function PostBid({onBid}) {
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    return(
       
           

      <Grid  container spacing={2}>
          <Grid item xs={12} marginRight= "40rem">
            <TextField
            style={{backgroundColor: "#e6e6e6"}}
              name='userId'
              label='userId'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} marginRight= "40rem" marginBottom="8px">
            <TextField
            style={{backgroundColor: "#e6e6e6"}}
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