import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function PenaltiesList(props) {
  const { data, width } = props;
  return (
    <DivChange width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography key={idx} className={"fontStyle25"}>{`${
            item.PenaltyType ? item.PenaltyType : item.DocNo
          } - NEW`}</Typography>
        );
      })}
    </DivChange>
  );
}

PenaltiesList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default PenaltiesList;
