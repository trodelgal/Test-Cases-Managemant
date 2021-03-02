import React from "react";
import { ErrorOutline as ErrorOutlineIcon } from "@material-ui/icons";
import { iconStyle, errorIconStyle } from "../styles/styledComponents";
import { IconButton, Tooltip } from "@material-ui/core";


export const ErrorBtn = (props) => (
  <Tooltip title={props.tooltipTitle}>
    <IconButton style={iconStyle}>
      <ErrorOutlineIcon style={errorIconStyle} color="error" />
    </IconButton>
  </Tooltip>
);
