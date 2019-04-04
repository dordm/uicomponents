import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function Industry(props) {
  const { data, width } = props;
  return (
    <DivChange width={width}>
      <Typography className={"fontStyle23"}>
        Old Business Scope: {data.CHANGE_DATA.before}
      </Typography>
      <Typography className={"fontStyle25"}>
        New Business Scope: {data.CHANGE_DATA.after}
      </Typography>
    </DivChange>
  );
}

Industry.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default Industry;
