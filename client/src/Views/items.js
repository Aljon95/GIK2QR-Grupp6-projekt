import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ResourceModel from '../models/resourceModel';
import {Chip} from '@mui/material'

export default function items(props) {
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
                        <Link to={`/users/${item.seller.id}/items`}>
                            Författare: {item.seller.firstName}
                        </Link>
                        <br />
                        {item.tags &&
                        item.tags.map((tag) => (
                            <Link to={`/tags/${tag}/items`}>
                                <Chip key= {`tag_${tag}`} label={tag} color = 'secondary' />
                            </Link>
                        ))}
                        <img src ={item.imageUrl}
                        style={{width: "200px", height: '200px'}} />
                        <p>
                            <Link to = {`/items/${item.id}`}>Titel: {item.title}</Link>
                        </p>
                        <p>Skrivet: {item.createdAt}</p>
                        {item.body}
                    </li>
                );
            })}
    </ul>);  
}