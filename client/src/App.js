import './App.css';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Views/Home';
import items from './Views/items';
import itemEdit from './Views/itemEdit';
import itemDetail from './Views/itemDetail';
import itemCreate from './Views/itemCreate';

function App() {
  return (
    <div className='App'>
      <Router>
        <AppBar position='relative' style={{
          backgroundColor: "#8D704A60"
        }}>
          
        <h1 style={{color: "#00aa00"}}>Auktion</h1>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Button variant= "contained" color ="info" style={{
          backgroundColor: "#8D704A"
        }} ><Link to='/'>Hem</Link></Button>
            </Typography>
            <Button variant= "contained" color ="info" style={{
          backgroundColor: "#8D704A",
          marginRight: "1rem"
        }}>
              <Link to='/items/'>Visa alla Auktioner</Link>
            </Button>
            <Button variant= "contained" color ="info" style={{
          backgroundColor: "#8D704A"
        }} >
              <Link to='/items/new'>Skapa Auktion</Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            maxWidth: '60rem',
            margin: '1rem auto'
          }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/items/new' component={itemCreate} />
            <Route exact path='/items/:id' component={itemDetail} />
            <Route exact path='/items/:id/edit' component={itemEdit} />
            <Route exact path='/items/' component={items} />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;
