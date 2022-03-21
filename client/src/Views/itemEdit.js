import React from 'react';
import ResourceModel from '../models/resourceModel';
import { TextField, Button, Grid } from '@mui/material';

export default class itemEdit extends React.Component {
  state = { item: {userId: '', title: '', description: '', startingPrice: '',imageUrl: '', seller: {}, } };
  resourceModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.resourceModel = new ResourceModel('items');
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
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
    this.setState({ item: { ...this.state.item, [field]: value } });
  }

  onSave() {
      this.resourceModel.update(this.state.item).then(() => {
        window.location.href = `/items/${this.state.item.id}`;
      });
  }

  onDelete() {
    this.resourceModel.remove(this.id).then(() => {
      window.location.href = '/';
    });
  }

    render() {
      const item = this.state.item;
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='title'
              label='Titel'
              value={item.title}
              onChange={this.onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
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
            name='imageUrl'
            label='Bildlänk (max 200 tecken)'
            value={item.imageUrl}
            onChange={this.onChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.4rem' }}>
          <Button variant='contained' color='primary' onClick={this.onSave}>
            Spara
          </Button>
          {!isNaN(this.id) && this.id > 0 && (
            <Button variant='contained' color='error' onClick={this.onDelete}>
              Ta bort
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}
