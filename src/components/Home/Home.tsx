import React, {useState, useEffect}  from 'react'
import {Navbar} from '../Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 // import { useGetData } from '../../custom-hooks'
import { Link } from 'react-router-dom';
import {Paper} from '@material-ui/core';
import { Drawer as MUIDrawer, 
      ListItem, 
      List, 
      ListItemIcon, 
      ListItemText, 
      Theme,
      useTheme, 
      makeStyles, 
      createStyles,
      AppBar,
      Toolbar,
      IconButton,
      Typography,
      Divider,
      Button,
      Dialog, 
      DialogActions, 
      DialogContent,
      DialogContentText, 
      DialogTitle  ,
  } from '@material-ui/core';
  import CssBaseline from '@material-ui/core/CssBaseline';
  import MenuIcon from '@material-ui/icons/Menu'
  import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
  import ChevronRightIcon from '@material-ui/icons/ChevronRight'
  import clsx from 'clsx';
  import { RouteComponentProps, withRouter, Switch, Route } from "react-router-dom";
  import { Notes } from '../Notes';
import { ContactForm } from '../ContactForm/ContactForm'



interface Props {
    title: string;
}

const useStyles = makeStyles({
    background: {
        backgroundImage: `linear-gradient(rgba(0, 49, 85) 0%, rgba(121,147,163,1) 47%, rgba(249,249,249,1) 100%)`,
        width: '100%',
        height: '90%',
        backgroundPosition: 'center',
        position: 'absolute',
        zIndex: -1,
    },
    main_text: {
        textAlign: 'center',
        position: 'relative',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
    },
    button_text: {
        color: 'white',
        textDecoration: 'none',
    },
})

export const Home = ( props: Props ) => {
    const classes = useStyles();
    var api_key = "5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk";
    var url = "https://api.nasa.gov/planetary/apod?api_key=5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk";
    const [data, setData] = useState(Object);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
  
    useEffect(() => {
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response;
        })
        .then(data => {
            console.log(data)
            setData(data);
        })
        .catch(error  => {
            console.error(("Error loading data"), error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
       
        }, [])
  
    return (
        <>
        <Navbar/>
            
            <div className={`${classes.background}`}>
            <div className={classes.main_text}>
                <h1>{ props.title }</h1>
                {/* <Button>
                    <Link to='/car_inventory' className={classes.button_text}>Welcome to the Car Inventory</Link>
                </Button> */}
               <h1>NASA Astronomy Picture Of The Day</h1>
        
                <h2 id="title"></h2>
                 <h3>Date: {data.date} <span id="date"></span></h3>
                <img id="pic" src= {data.hdurl} alt="NASA Picture Of The Day" width="30%"></img>
                
                
                <p id="explanation"> {data.explanation}</p>
            
            </div>
            </div>
        </>
    )
        
      
}


    


