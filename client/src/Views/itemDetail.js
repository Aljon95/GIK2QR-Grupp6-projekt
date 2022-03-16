import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ResourceModel from '../models/resourceModel';
import {Button, Chip} from '@mui/material';

export default function ItemDetail(props) {
  const id = props.match.params.id;
  const isValidId = !isNaN(id);
  const resourceModel = new ResourceModel("items");
  const [item, setItem] = useState ({});

  useEffect(() => {
    if (isValidId) {
      resourceModel.getById(id).then(item => {
        setItem(item);
    });
    }
      
  }, []);
  console.log(item);
    
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
      <Button variant = 'contained' color='error'>
            <Link to={`/items/${item.id}/addBid`}>Lägg bud</Link>
      </Button>
    </>
  );
}