import ResourceModel from '../models/resourceModel';
import {Grid} from '@mui/material';
import ItemInfo from '../Components/ItemInfo';
import PostBid from '../Components/PostBid';
import React from 'react';



export default class ItemDetail extends React.Component {
  state = { item: {userId: '', title: '', description: '', startingPrice: '', seller: {}, },bid: {userId: '', itemId: '', bid: '', } };
  resourceModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.resourceModel = new ResourceModel('items');
    this.addBid = this.addBid.bind(this);
  }
  async fetchItem() {
    console.log("fetch")
    this.id = this.props.match.params.id;
    this.resourceModel.getById(this.id).then((item) => {
      this.setState({ item });
    });
  }
  componentDidMount() {
    this.fetchItem();
  }

  addBid(newBid) {
      this.resourceModel.addBid(this.id ,newBid.userId, newBid.amount).then(() => {//this.state.bid.userId, this.state.bid.bid
        window.location.href = `/items/${this.id}/`;
      });
  }

  render() {
    console.log("render")
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
