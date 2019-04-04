import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function EmployeesList(props) {
  const { data, width } = props;
  return (
    <DivChange width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography
            key={idx}
            className={item.status === "in" ? "fontStyle25" : "fontStyle23"}
          >{`${item.name}, ${
            item.job
          } - ${item.status.toUpperCase()}`}</Typography>
        );
      })}
    </DivChange>
  );
}

EmployeesList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default EmployeesList;