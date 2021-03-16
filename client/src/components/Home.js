import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Loading } from "react-loading-wrapper";
import { Button } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import WarningIcon from '@material-ui/icons/Warning';
import {
  StyledLink,
  H1,
  Wrapper,
  TitleWrapper,
  Center,
  GridDiv,
} from "./styles/styledComponents";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const {getTests} = props;
  const [open, setOpen] = React.useState(false);
  const [color, setColor]=React.useState(""); 
  const classes = useRowStyles();

  React.useEffect(()=>{
    (()=>{
      if(row.pass==="true"){
        setColor("green")
      }else if(row.pass==="false"){
        setColor("red")
      }else if(row.pass==="warning"){
        setColor("orange")
      }
  })()
  },[])
  async function testPass(id){
    const date = new Date().toDateString();
    await Axios.put(`/api/test/${id}`,{hapend:date, pass:"true"})
    getTests()
    setColor("green")
  } 
  async function testFail(id){
    const date = new Date().toDateString();
    await Axios.put(`/api/test/${id}`,{hapend:date, pass:"false"})
    getTests()
    setColor("red")
  } 
  async function testReset(id){
    await Axios.put(`/api/test/${id}`,{hapend:"", pass:null})
    getTests()
    setColor("")
  } 
  async function testWarning(id){
    await Axios.put(`/api/test/${id}`,{hapend:"", pass:"warning"})
    getTests()
    setColor("orange")
  } 

  return (
    <React.Fragment>
      <TableRow className={classes.root} style={{backgroundColor:color}}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        {/* <TableCell>{row.writer}</TableCell> */}
        <TableCell>{row.sprint}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.Steps.length}</TableCell>
        <TableCell>
          <Button onClick={()=>testPass(row.id)}><CheckCircleOutlineIcon/></Button>
          <Button onClick={()=>testFail(row.id)}><SmsFailedIcon/></Button>
          <Button onClick={()=>testReset(row.id)}><RotateLeftIcon/></Button>
          <Button onClick={()=>testWarning(row.id)}><WarningIcon/></Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                <b>More details</b>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Happend</TableCell>
                    <TableCell>Automatic</TableCell>
                    <TableCell>App Location</TableCell>
                    <TableCell>Environment</TableCell>
                    <TableCell>Sprint</TableCell>
                    <TableCell>Show</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row &&
                    <TableRow key={row.name}>
                      <TableCell>
                        {row.hapend}
                      </TableCell>
                      <TableCell>No</TableCell>
                      <TableCell>{row.appLocation}</TableCell>
                      <TableCell>
                        {row.environment}
                      </TableCell>
                      <TableCell>
                        {row.sprint}
                      </TableCell>
                      <TableCell>
                        <StyledLink to={`/singletest/${row.id}`}>
                          <Button color="secondary" variant="contained">Show Test</Button>
                        </StyledLink>
                      </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


function Home() {
  const [tests, setTests] = useState([]);

  async function getTests(){
    const { data } = await Axios.get(`/api/test/`);
    console.log(data);
    setTests(data);
  }

  useEffect(() => {
    getTests()
  }, []);

  return (
    <TableContainer style={{margin:8, marginLeft:8, width:"90wh"}} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{backgroundColor:"black"}}>
            <TableCell />
            <TableCell style={{color:"white"}}><b>Name</b></TableCell>
            {/* <TableCell style={{color:"white"}}><b>Writer</b></TableCell> */}
            <TableCell style={{color:"white"}}><b>Sprint</b></TableCell>
            <TableCell style={{color:"white"}}><b>Description</b></TableCell>
            <TableCell style={{color:"white"}}><b>Steps</b></TableCell>
            <TableCell style={{color:"white"}}><b>Pass/Not</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.map((test) => (
            <Row key={test.name} row={test} getTests={getTests} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default Home;