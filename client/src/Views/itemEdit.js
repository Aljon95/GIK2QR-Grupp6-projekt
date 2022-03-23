import React from 'react';
import ResourceModel from '../models/resourceModel';
import ItemEdit from '../Components/ItemEdit'

export default class itemEdit extends React.Component {
  state = { item: {userId: '', title: '', description: '', startingPrice: '',imageUrl: '', seller: {}, } };
  resourceModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.resourceModel = new ResourceModel('items');
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  fetchItem() {
    console.log("fetch run")
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

  onSave(newEdit) {
    const itemWithItemId = {id: this.id, title: newEdit.title, imageUrl: newEdit.imageUrl, description: newEdit.description};
    console.log("id",this.id, "edit", newEdit)
      this.resourceModel.update(itemWithItemId).then(() => {
        window.location.href = `/items/${this.state.item.id}`;
      });
  }

  onDelete() {
    this.resourceModel.remove(this.id).then(() => {
      window.location.href = '/';
    });
  }
  render() {
    console.log("render run")
    const item = this.state.item;
    return (
      <ItemEdit item={item} onEdit={this.onSave} onDelete={this.onDelete} /> 
    );
  } 
}