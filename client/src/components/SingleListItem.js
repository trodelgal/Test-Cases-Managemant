import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";


export const SingleListItem = (props) => (
  <ListItem>
    {props.children && <ListItemIcon>{props.children}</ListItemIcon>}
    <ListItemText primary={props.primary} secondary={props.secondary} />
  </ListItem>
);