import React, { useEffect, useState} from 'react';
import ResourceModel from '../models/resourceModel';
import {TextField, Button, Grid} from '@mui/material';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { toDateTimeString } from '../helper/formatting';



export default class ItemDetail extends React.Component {
  state = { item: {userId: '', title: '', description: '', startingPrice: '', seller: {}, },bid: {userId: '', itemId: '', bid: '', } };
  resourceModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.resourceModel = new ResourceModel('items');
    this.onChange = this.onChange.bind(this);
    this.addBid = this.addBid.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  fetchItem() {
    this.id = this.props.match.params.id;
    this.resourceModel.getById(this.id).then((item) => {
      this.setState({ item });
    });
  }
  componentDidMount() {
    this.fetchItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchItem();
    }
  }
  onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ bid: { ...this.state.bid, [field]: value } });
  }

  addBid() {
      this.resourceModel.addBid(this.id ,this.state.bid.userId, this.state.bid.bid).then(() => {
        window.location.href = `/items/${this.id}/`;
      });
  }

  onDelete() {
    this.resourceModel.remove(this.id).then(() => {
      window.location.href = '/';
    });
  }
  render() {
    const item = this.state.item;
    const bid = this.state.bid;
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
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='userId'
              label='userId'
              value={bid.userId}
              onChange={this.onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='bid'
              label='bid'
              value={bid.bid}
              onChange={this.onChange}
              fullWidth
              multiline
              minRows={7}
            />
          </Grid>
          
      <Button variant='contained' color='primary' onClick={this.addBid}>
            Lägg Bud
      </Button>
      </Grid> 
    </Grid>
  );
    }
  }
