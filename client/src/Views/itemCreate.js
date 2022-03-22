import React from 'react';
import ResourceModel from '../models/resourceModel';
import ItemCreate from '../Components/ItemCreate';
export default class itemCreate extends React.Component {
  resourceModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.resourceModel = new ResourceModel('items');
    this.onSave = this.onSave.bind(this);
  }


  onSave(newItem) {
      const itemWithUserId = { title: newItem.title, imageUrl: newItem.imageUrl, description: newItem.description, startingPrice: newItem.startingPrice, userId: newItem.userId };
      console.log(itemWithUserId)
      this.resourceModel.create(itemWithUserId).then((result) => {
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
