import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ResourceModel from '../models/resourceModel';
import {TextField, Button, Grid} from '@mui/material';

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
    console.log('hello world')
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
        window.location.href = `/items/${this.id}/addBid`;
      });
  }

  onDelete() {
    this.resourceModel.remove(this.id).then(() => {
      window.location.href = '/';
    });
  }
  // ItemDetail(props) {
  // const id = props.match.params.id;
  // const isValidId = !isNaN(id);
  // const resourceModel = new ResourceModel("items");
  // const [item, setItem] = useState ({});
  // const onBid = resourceModel.addBid(id);
  
  // useEffect(() => {
  //   if (isValidId) {
  //     resourceModel.getById(id).then(item => {
  //       setItem(item);
  //   });
  //   }
      
  // }, []);
  // useEffect(() => {
  //     resourceModel.addBid(id).then(item => {
  //       setItem(item);
  //   });
      
  // }, []);
  //  onBid() {
  //    console.log('ALBIN');
  //   this.resourceModel.addBid(this.state.item).then(() => {
  //     window.location.href = `/items/${this.id}`;
  //   });
  // }
  render() {
    const item = this.state.item;
    const bid = this.state.bid;
  return(
    <>
      {item.seller ? (
        <div>
          <Button variant = 'contained' color='secondary'>
            <Link to={`/items/${item.id}/edit`}>Ändra</Link>
          </Button>
          <h2>{item.title}</h2>
          <p>Säljare: {item.seller.firstName}</p>
          <p>Föremålsbeskrivning: <br/>{item.description}</p>
        </div>
      ) : (
        <p>Laddar</p>
      )}
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
          </Grid>
      <Button variant='contained' color='primary' onClick={this.addBid}>
            Lägg Bud
      </Button>
    </>
  );
    }
  }
