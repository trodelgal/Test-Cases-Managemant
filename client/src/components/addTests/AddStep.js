import React, { useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import {
  Wrapper,
  Center,
  H1,
} from "../styles/styledComponents";
import { Button, TextField, Modal } from "@material-ui/core";
import { useParams } from "react-router-dom";

export default function SignIn({added}) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { id } = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const onSubmit = async (stepData) => {
    try {
      stepData.testId = id;
      console.log(stepData);
      const { data } = await Axios.post("/api/step/", stepData);
      handleClose()
      added()
    } catch (error) {
      alert(error)
    }
  };

  const body = (
    <Wrapper>
      <Center>
        <H1>Add step</H1>
        <br/>
        <br/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ minWidth: 500 }}
            id="details"
            label="Details"
            inputRef={register({
              required: "Details is required",
            })}
            name="details"
          />
          {generateBrs(2)}
          <TextField
           style={{ minWidth: 500 }}
            id="expected"
            inputRef={register()}
            label="Expected Result"
            name="expectedResult"
          />
          {generateBrs(2)}
          <TextField
           style={{ minWidth: 500 }}
            id="Actual Result"
            inputRef={register()}
            label="Actual Result"
            name="actualResult"
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
  );

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="secondary">
        +
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
}

const generateBrs = (num) => {
  const arrOfSpaces = [];
  for (let i = 0; i < num; i++) {
    arrOfSpaces.push(<br />);
  }
  return arrOfSpaces;
};
