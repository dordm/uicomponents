import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function AdministrativePunishmentsList(props) {
  const { data, width } = props;
  return (
    <DivChange width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography key={idx} className={"fontStyle25"}>{`${
            item.Name
          } - NEW`}</Typography>
        );
      })}
    </DivChange>
  );
}

AdministrativePunishmentsList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default AdministrativePunishmentsList;
