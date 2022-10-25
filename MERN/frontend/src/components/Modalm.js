import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Modalm() {
  const classes = useStyles();

  const { id } = useParams();
    const [discount,setDiscount] = useState({
                couponName:'',
                couponDiscount:''
    })



  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log(discount,'discount')
    await axios.post(`http://localhost:5000/send-mail/${id}`,{
      couponName:discount.couponName,
      couponDiscount:discount.couponDiscount
    })
    await axios.post(`http://localhost:3008/coupon`,{
      couponName:discount.couponName,
      couponDiscount:discount.couponDiscount
    })

  }


  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Send Discount Mail
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Coupon code"
                onChange={(e) =>{setDiscount({...discount,couponName:e.target.value})}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Discount"
                onChange={(e) => {setDiscount({...discount,couponDiscount:e.target.value})}}
              />
            </Grid>
  
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Mail
          </Button>
        </form>
      </div>
    </Container>
  );
}