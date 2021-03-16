import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import AddStep from "../addTests/AddStep";
import Axios from 'axios';
import { Button, TextField, Modal } from "@material-ui/core";
import {
  Wrapper,
  Center,
  H1,
} from "../styles/styledComponents";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function StepsTable({ steps, deleted }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [step, setStep] = React.useState({
    expectedResult:"",
    actualResult:"",
    details:""
  });
  const { register, handleSubmit, errors } = useForm();
  const { id } = useParams();


  const handleClose = () => {
    setOpenModal(false);
    deleted()
  };

  const onSubmit = async (stepData) => {
    try {
      console.log(stepData);
      const { data } = await Axios.put(`/api/step/${step.id}`, stepData);
      handleClose()
    } catch (error) {
      alert(error)
    }
  };

  async function deleteData(dataId) {
    const { data } = await Axios.patch('/api/step/delete', { dataId: dataId });
    deleted()
  }
  async function testPass(id) {
    const date = new Date().toDateString();
    await Axios.put(`/api/step/${id}`, { hapend: date, pass: true })
    deleted()
  }
  async function testFail(id,i) {
    const date = new Date().toDateString();
    await Axios.put(`/api/step/${id}`, { hapend: date, pass: false })
    setStep(i)
    setOpenModal(true)
  }
  async function testReset(id) {
    await Axios.put(`/api/step/${id}`, { hapend: "", pass: null })
    deleted()
  }

  return (
    <div>
      <h2>STEPS ({steps.length})<AddStep added={deleted} /> </h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Details</StyledTableCell>
              <StyledTableCell>Expected Result</StyledTableCell>
              <StyledTableCell>Actual Result</StyledTableCell>
              <StyledTableCell>Pass/Fail</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {steps &&
              steps.map((row,i) => {
                let color;
                if (row.pass) {
                  color = "green"
                } else if (row.pass === false) {
                  color = "red"
                }
                return (
                  <StyledTableRow style={{ backgroundColor: color }} key={row.details}>
                    <StyledTableCell component="th" scope="row">
                      {row.details}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.expectedResult}
                    </StyledTableCell>
                    <StyledTableCell>{row.actualResult}</StyledTableCell>
                    <StyledTableCell>
                      <label>
                        <Button onClick={() => testPass(row.id)}><CheckCircleOutlineIcon fontSize="small" /></Button>
                        <Button onClick={() => testFail(row.id, row)}><SmsFailedIcon fontSize="small" /></Button>
                        <Button onClick={() => testReset(row.id)}><RotateLeftIcon fontSize="small" /></Button>
                      </label>
                    </StyledTableCell>
                    <StyledTableCell >
                      {row.pass}
                      <button onClick={() => deleteData(row.id)}>delete</button>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleClose}>
        <Wrapper>
          <Center>
            <H1>Edit Step</H1>
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                style={{ minWidth: 500 }}
                id="details"
                label="Details"
                inputRef={register({
                  required: "Details is required",
                })}
                name="details"
                defaultValue={step.details}
              />
              {generateBrs(2)}
              <TextField
                style={{ minWidth: 500 }}
                id="expected"
                inputRef={register()}
                label="Expected Result"
                name="expectedResult"
                defaultValue={step.expectedResult}
              />
              {generateBrs(2)}
              <TextField
                style={{ minWidth: 500 }}
                id="Actual Result"
                inputRef={register()}
                label="Actual Result"
                name="actualResult"
                defaultValue={step.actualResult}
              />
              {generateBrs(2)}
              <Button
                id="submitButton"
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
            </Button>
            </form>
          </Center>
        </Wrapper>
      </Modal>
    </div>
  );
}

const generateBrs = (num) => {
  const arrOfSpaces = [];
  for (let i = 0; i < num; i++) {
    arrOfSpaces.push(<br />);
  }
  return arrOfSpaces;
};