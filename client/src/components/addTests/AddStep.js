import React, { useState, useMemo, useEffect, useCallback } from "react";
import network from "../../helpers/network";
import {
  H1,
  Wrapper,
  TitleWrapper,
  Center,
  GridDiv,
} from "../../styles/styledComponents";
import {
    validEmailRegex,
  } from "../../helpers/patterns";
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
import { useSelector } from "react-redux";
import AdminNavBar from "./AdminNavBar";

const AddClient = () => {
  const { register, handleSubmit, errors, control } = useForm();
  const currentBusiness = useSelector((state) => state.currentBusiness);
  const history = useHistory();

  const empty = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onSubmit = async (data) => {
    try {
        data.businessId =  currentBusiness.id
        console.log(data);
      const res = await network.post("/api/V1/user/", data);
      Swal.fire("Success!", "", "success");
      history.push(`/clients`);
    } catch (error) {
      Swal.fire("Error Occurred", error.message, "error");
    }
  };

  return (
    <>
      <AdminNavBar />
      <Wrapper>
        <Center>
          <TitleWrapper>
            <H1>Add Client</H1>
          </TitleWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <br />
                <TextField
                  id="name"
                  name="username"
                  inputRef={register({
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Full Name needs to be a minimum of 2 letters",
                    },
                  })}
                  label="Full Name"
                />
                {!empty ? (
                  errors.username ? (
                    <Tooltip title={errors.username.message}>
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
                  id="email"
                  name="email"
                  inputRef={register({
                    required: "Email is required",
                    pattern: {
                        value: validEmailRegex,
                        message: "Please Enter a Valid Email",
                      },
                  })}
                  label="Email"
                />
                {!empty ? (
                  errors.email ? (
                    <Tooltip title={errors.email.message}>
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

export default AddClient;
