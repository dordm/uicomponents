import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function MortgageList(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography key={idx} className={"fontStyle25"}>{`${
            item.RegisterNo
          } - NEW`}</Typography>
        );
      })}
    </DivChange>
  );
}

MortgageList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default MortgageList;
