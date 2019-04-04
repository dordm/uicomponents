import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function Address(props) {
  const { data, width } = props;
  return (
    <DivChange width={width}>
      <Typography className={"fontStyle23"}>
        Old Address: {data.CHANGE_DATA.before}
      </Typography>
      <Typography className={"fontStyle25"}>
        New Address: {data.CHANGE_DATA.after}
      </Typography>
    </DivChange>
  );
}

Address.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default Address;
