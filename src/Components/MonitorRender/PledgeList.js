import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function PledgeList(props) {
  const { data, width } = props;
  return (
    <DivChange width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography key={idx} className={"fontStyle25"}>{`${
            item.RegistNo
          } - NEW`}</Typography>
        );
      })}
    </DivChange>
  );
}

PledgeList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default PledgeList;
