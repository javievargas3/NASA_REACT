import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Navbar} from '../Navbar'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, createStyles, makeStyles, Theme } from '@material-ui/core';
import { ContactForm } from '../ContactForm';
import Container from '@mui/material/Container';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => createStyles({
  main: {
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `blue`,
      width: '100%',
      height: '100%',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "Georgia, 'Times New Roman', Times, serif",
  },
  h3: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'black',
  },
  text: {
      display: 'flex',
      flexDirection: 'column',
      color: '#4ef3b4',
      textDecoration: 'none',
      backgroundColor: 'white',
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  logo:{
      margin: '0 0 0 0.45em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
 
 
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar:{
    display: 'flex',
    backgroundColor: '#003155',
    color: 'white',
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
  },
  toolbar_button: {
    marginLeft: 'auto',
    backgroundColor: '#4169e1',
    color: 'white',
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
  },
  margin_top: {
      marginTop: '50px',
  },
  font: {
      fontFamily: "Georgia, 'Times New Roman', Times, serif",
  },
  leftMargin: {
      marginLeft: '240px',
  },
}))

export const Search = () => {
  const classes = useStyles();
  const [value2, setValue2] = React.useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogClickOpen = () => {
        setDialogOpen(true)
    };

    const handleDialogClickClose = () => {
        setDialogOpen(false)
    };

    const [value, setValue] = useState<Date | null>(null);
    const [date, setDate] = useState(String);
    const [nasa, setNasa] = useState(Object);
    const API_KEY = "5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    
    const getNasa = async(start_date: any)=>{
      fetch(url + "&start_date=" + `${start_date}` + "&end_date=" + `${start_date}`);
              try {
                const response = await fetch(url + "&start_date=" + `${start_date}` + "&end_date=" + `${start_date}`);
                const data = await response.json();
                setNasa(data)
              } catch (error) {
                  console.error(error);
              }
            }
            const cards = [1];
      function checkResponse(data: any){
          if(data[0]?.media_type==="image"){
              return(
                <Container sx={{ py: 0 }} maxWidth="md">
                <Grid container spacing={4}>
                  {cards.map((card) => (
                    <Grid item key={card} xs={20} sm={20} md={20}>
                      <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            pt: '0',
                          }}
                          image={data[0]?.hdurl}
                          alt="random"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                          {data[0]?.title}
                          <br></br>             
                          {data[0]?.date}
                          </Typography>
                          <Typography>
                            {data[0]?.explanation}
                          </Typography>
                        </CardContent>
                        {/* <CardActions>
                          <Button size="small">View</Button>
                          <Button size="small">Edit</Button>
                        </CardActions> */}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
              );
           }
             return (<h2 style={{textAlign: "center"}}>
                <p> Pick a Date to Display Image</p></h2>
             );
           }
      function getDate(value: Date) {
            const d = value
            let year = d?.getFullYear().toString();
            let month2 = d?.getMonth().valueOf();
            if (month2 != null) {
              month2 += 1;
            }
            let month = month2?.toString();
            let day = d?.getDate().toString();
            if (d?.getMonth() &&  d?.getMonth().valueOf() < 10) {
              month = "0" + month?.valueOf().toString();
            }
            if (d?.getDate() &&  d?.getDate().valueOf() < 10) {
              day = "0" +day?.valueOf().toString();
            }
            let date = year + "-" + month + "-" + day;
            setDate(date);
            getNasa(date);
      }
  return (
  
  <div>
  <Navbar/>
 <div>
  <Button className={classes.toolbar_button} onClick={handleDialogClickOpen}>ADD NOTES</Button>

                    {/* Dialog Pop Up */}
                    <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Notes</DialogTitle>
                        <DialogContent>
                            <DialogContentText></DialogContentText>
                           <ContactForm />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClickClose} color="primary">Cancel</Button>
                            <Button onClick={handleDialogClickOpen} color="primary">Done</Button>
                        </DialogActions>
                    </Dialog>
                    </div>
  


                    <div>
        <h2 style={{textAlign: "center"}}>
      

   <LocalizationProvider dateAdapter={AdapterDateFns}>
     <DatePicker
       disableFuture
       label="Choose Date"
       value={value}
       onChange={(newValue) => {
         if (newValue) {
         getDate(newValue);
         }
       }}
       renderInput={(params) =>
         <TextField {...params} /> }
     />
   </LocalizationProvider>
</h2></div>
   <div> {checkResponse(nasa)}</div>


</div> );
}

 
