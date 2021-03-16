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

export default function AddPrerequisite({added}) {
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
      console.log(stepData)
      const { data } = await Axios.post("/api/prerequisite/", stepData);
      handleClose()
      added()
    } catch (error) {
      alert(error)
    }
  };

  const body = (
    <Wrapper>
      <Center>
        <H1>Add data</H1>
        <br/>
        <br/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ minWidth: 270 }}
            id="Description"
            label="Description"
            inputRef={register({
              required: "Description is required",
            })}
            name="description"
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
