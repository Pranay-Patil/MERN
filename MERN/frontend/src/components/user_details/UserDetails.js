import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from "react-router-dom";
import axios from 'axios';
import Modalm from '../Modalm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export  default function UserDetails() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);


    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }
    const handleMail = (coupon)=>{
      
      console.log(coupon,'coupon')
     
    }
    const sendMail = id => {
    window.location = '/sendmail/'+id
  }

  
    useEffect(() => {
        axios
        .get("http://localhost:3003/user/user-lists")
        .then((res) => {
            setUsers([...res.data.user_list])
            // console.log(users,'users')
        });
    }, [users])
  // const UsersGet = () => {
  //   fetch("http://localhost:3003/user/user-lists")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setUsers(result)
  //         console.log(users,'users')
  //       }
  //     )
  // }

  const UpdateUser = id => {
    window.location = '/update/'+id
  }

  const UserDelete =async (id) => {

    console.log(id,'useID');
        await axios
        .delete(`http://localhost:3003/user/delete-user/${id}`)

  }

  return (
    
    <div className={classes.root}>
        <div className='title'>
              <h1>Users</h1>
              <div className='title-underline'></div>
        </div>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USERS
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="right">ID</TableCell> */}
                {/* <TableCell align="center">Avatar</TableCell> */}
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                {/* <TableCell align="left">Email</TableCell> */}
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user,index) => (
                <TableRow key={index}>
                  {/* <TableCell align="right">{user._id}</TableCell> */}
                  {/* <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar src={user.avatar} />
                    </Box>
                  </TableCell> */}
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  {/* <TableCell align="left">{user.username}</TableCell> */}
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => UpdateUser(user._id)}>Edit</Button>
                      <Button onClick={() => UserDelete(user._id)}>Del</Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="center">
                  <Button onClick={()=>{sendMail(user._id)}}><MailOutlineIcon/></Button>
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}