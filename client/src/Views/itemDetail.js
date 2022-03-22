import React, { useEffect, useState} from 'react';
import ResourceModel from '../models/resourceModel';
import {TextField, Button, Grid} from '@mui/material';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { toDateTimeString } from '../helper/formatting';
import ItemInfo from '../Components/ItemInfo';
import PostBid from '../Components/PostBid';



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

  addBid(newBid) {
      this.resourceModel.addBid(this.id ,newBid.userId, newBid.amount).then(() => {//this.state.bid.userId, this.state.bid.bid
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
  return (
    <>
      <ItemInfo item={item} bid={bid}/>
      <Grid>
        <PostBid onBid={this.addBid} /> 
      </Grid>
    </>

    );
  }
}
