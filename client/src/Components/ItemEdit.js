import { TextField, Button, Grid } from '@mui/material';
import React, {useState} from 'react';



export default function ItemEdit({onEdit, onDelete, item}) {
    
    const [title, setTitle] = useState(`${item.title}`);
    const [description, setDescription] = useState(item.description);
    const [imageUrl, setImageUrl] = useState(item.imageUrl);
    
    return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            style={{backgroundColor: "#e6e6e6"}}
            name='title'
            label='Titel'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
          style={{backgroundColor: "#e6e6e6"}}
            name='description'
            label='Beskrivning'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={7}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
        style={{backgroundColor: "#e6e6e6"}}
          name='imageUrl'
          label='Bildlänk (max 200 tecken)'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          multiline
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.4rem' }}>
          <Button variant='contained' color='primary' onClick={() => {
          onEdit({title,imageUrl,description});
          }}>
            Lägg upp
          </Button>

          <Button variant='contained' color='error' onClick={() => {onDelete({})}}>
            Ta bort
          </Button>
        
      </Grid>
    </Grid>
    )
}
       