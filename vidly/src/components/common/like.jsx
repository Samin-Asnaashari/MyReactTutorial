import React from "react";

// Input: liked: boolean
// Output: onClick

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      area-hidden="true"
      onClick={props.onClick}
    />
  );
};

export default Like;
