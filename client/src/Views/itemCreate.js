import React from 'react';
import ResourceModel from '../models/resourceModel';
import { TextField, Button, Chip, Grid } from '@mui/material';
export default class itemCreate extends React.Component {
  state = { item: {userId: '', title: '', description: '', startingPrice: '',imageUrl: '', seller: {}, } };
  resourceModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.resourceModel = new ResourceModel('items');
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ item: { ...this.state.item, [field]: value } });
  }
  onSave() {
      const itemWithUserId = { ...this.state.item, userId: this.state.item.userId };
      this.resourceModel.create(itemWithUserId).then((result) => {
        console.log(result);
        window.location.href = `/items/${result.id}`;
      });
  }
  render() {
    const item = this.state.item;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='userId'
            label='användar id'
            value={item.userId}
            onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='title'
            label='Titel'
            value={item.title}
            onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='imageUrl'
            label='Bildlänk (max 200 tecken)'
            value={item.imageUrl}
            onChange={this.onChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='description'
            label='Innehåll'
            value={item.description}
            onChange={this.onChange}
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
            value={item.startingPrice}
            onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.4rem' }}>
          <Button variant='contained' color='primary' onClick={this.onSave}>
            Lägg upp
          </Button>
        </Grid>
      </Grid>
    );
  }
}
