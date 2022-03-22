import React from 'react';
import ResourceModel from '../models/resourceModel';
import { TextField, Button, Chip, Grid } from '@mui/material';
import ItemCreate from '../Components/ItemCreate';
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
  onSave(newItem) {
      const itemWithUserId = { ...this.state.item, userId: this.state.item.userId };
      console.log(newItem)
      this.resourceModel.create({newItem}).then((result) => {
        console.log(result);
        window.location.href = `/items/${result.id}`;
      });
  }
  render() {
    return (
<ItemCreate onCreate={this.onSave} /> 
    );
  }
}
