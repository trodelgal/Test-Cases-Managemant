import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  H1,
  Wrapper,
  TitleWrapper,
  Center,
  GridDiv,
} from "../styles/styledComponents";
import "react-loading-wrapper/dist/index.css";
import { useForm, Controller } from "react-hook-form";
import DoneIcon from "@material-ui/icons/Done";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import { ActionBtn, ErrorBtn } from "../formRelated";

const AddTest = () => {
  const { register, handleSubmit, errors, control } = useForm();
  const history = useHistory();
  const empty = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await Axios.post("/api/test/", data);
      Swal.fire("Success!", "", "success");
    } catch (error) {
      Swal.fire("Error Occurred", error.message, "error");
    }
  };

  return (
    <>
      <Wrapper>
        <Center>
          <TitleWrapper>
            <H1>Add Test</H1>
          </TitleWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <br />
              <TextField
                id="name"
                name="name"
                inputRef={register({
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name needs to be a minimum of 2 letters",
                  },
                })}
                label="Name"
              />
              {!empty ? (
                errors.name ? (
                  <Tooltip title={errors.name.message}>
                    <IconButton style={{ cursor: "default" }}>
                      <ErrorOutlineIcon
                        style={{ width: "30px", height: "30px" }}
                        color="error"
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton style={{ cursor: "default" }}>
                    <DoneIcon color="action" />
                  </IconButton>
                )
              ) : null}
              <br />
            </div>
            <div>
              <br />
              <TextField
                id="writer"
                name="writer"
                inputRef={register({
                  required: "writer is required",
                })}
                label="Writer"
              />
              {!empty ? (
                errors.writer ? (
                  <Tooltip title={errors.writer.message}>
                    <IconButton style={{ cursor: "default" }}>
                      <ErrorOutlineIcon
                        style={{ width: "30px", height: "30px" }}
                        color="error"
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton style={{ cursor: "default" }}>
                    <DoneIcon color="action" />
                  </IconButton>
                )
              ) : null}
              <br />
              <br />
              <TextField
                id="sprint"
                name="sprint"
                inputRef={register({
                  required: "sprint is required",
                })}
                label="Sprint"
              />
              {!empty ? (
                errors.sprint ? (
                  <Tooltip title={errors.sprint.message}>
                    <IconButton style={{ cursor: "default" }}>
                      <ErrorOutlineIcon
                        style={{ width: "30px", height: "30px" }}
                        color="error"
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton style={{ cursor: "default" }}>
                    <DoneIcon color="action" />
                  </IconButton>
                )
              ) : null}
              <br />
              <br />
              <TextField
                id="description"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                name="description"
                inputRef={register({
                  required: "Description is required",
                })}
                label="Description"
              />
              {!empty ? (
                errors.description ? (
                  <ErrorBtn tooltipTitle={errors.description.message} />
                ) : (
                  <ActionBtn />
                )
              ) : null}
              <br />
              <br />
              <TextField
                id="feature"
                name="feature"
                inputRef={register()}
                label="Feature"
              />
              {!empty ? (
                errors.feature ? (
                  <Tooltip title={errors.feature.message}>
                    <IconButton style={{ cursor: "default" }}>
                      <ErrorOutlineIcon
                        style={{ width: "30px", height: "30px" }}
                        color="error"
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton style={{ cursor: "default" }}>
                    <DoneIcon color="action" />
                  </IconButton>
                )
              ) : null}
              <br />
              <TextField
                id="appLocation"
                name="appLocation"
                inputRef={register()}
                label="App Location"
              />
              {!empty ? (
                errors.appLocation ? (
                  <Tooltip title={errors.appLocation.message}>
                    <IconButton style={{ cursor: "default" }}>
                      <ErrorOutlineIcon
                        style={{ width: "30px", height: "30px" }}
                        color="error"
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton style={{ cursor: "default" }}>
                    <DoneIcon color="action" />
                  </IconButton>
                )
              ) : null}
              <br />
              <TextField
                id="environment"
                name="environment"
                inputRef={register()}
                label="Environment"
              />
              {!empty ? (
                errors.environment ? (
                  <Tooltip title={errors.environment.message}>
                    <IconButton style={{ cursor: "default" }}>
                      <ErrorOutlineIcon
                        style={{ width: "30px", height: "30px" }}
                        color="error"
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton style={{ cursor: "default" }}>
                    <DoneIcon color="action" />
                  </IconButton>
                )
              ) : null}
              <br />
            </div>
            <br />
            <br />
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
    </>
  );
};

export default AddTest;
