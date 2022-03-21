import React, { useEffect, useState} from 'react';
import ResourceModel from '../models/resourceModel';
import {Grid } from '@mui/material';
import SmallCardItem from '../Components/SmallCardItem';



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
{items.length > 0 && 
    items.map(item => {
        console.log("image",item);
    })}

    return (
        <Grid container spacing={2}>
            {items.length > 0 &&
                items.map(item => {
                    return (<SmallCardItem item={item} key = {`item_${item.id}`}/>);
            })}
        </Grid>
    );

}
