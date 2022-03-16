import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ResourceModel from '../models/resourceModel';
import {Chip} from '@mui/material'
import { borderRadius } from '@mui/system';

export default function Items(props) {
const resourceModel = new ResourceModel("items");
const [items, setitems] = useState ([]);
const url = props.match.url;
console.log(url);


useEffect(() => {
    resourceModel.getAll().then(items => {
        setitems(items);
    })
}, []);
console.log(items);
return (
    <ul>
        {items.length > 0 && 
            items.map(item => {
                return (
                    <li key = {`item_${item.id}`}>
                            <Link to = {`/items/${item.id}`}>Föremål: {item.title}</Link>
                        <br />

                        {/* <img src ={item.imageUrl} style={{width: "200px", height: '200px'}} /> */}
                        <p>

                            <Link to={`/users/${item.seller.id}/items`}>
                            Säljare: {item.seller.firstName}
                            </Link>
                            <br/>
                            Utgångspris: {item.startingPrice}kr
                            <br/>
                            Senaste bud: {item.bids[0]}kr
                        </p>
                        <p>Upplagd: {item.createdAt}</p>
                        {item.body}
                    </li>
                );
            })}
    </ul>);  
}