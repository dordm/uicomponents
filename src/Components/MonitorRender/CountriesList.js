import React from "react";
import PropTypes from "prop-types";
import { DivChange } from "./StyledComponents";
import { StyledChip, Utils } from "@tiidan/uicomponents";
import Avatar from "@material-ui/core/Avatar";

function CountriesList(props) {
  const { data, width, boxlayout } = props;
  return (
    <DivChange boxlayout={boxlayout} width={width}>
      {data.CHANGE_DATA.change.slice(0,10).map((item, idx) => {
        return (
          <StyledChip
            style={{ marginRight: 10, marginBottom: 10 }}
            key={idx}
            type={"info"}
            avatar={
              <Avatar
                style={{ height: 28, width: 28 }}
                src={Utils.getCountry(item)}
              />
            }
            label={item}
            variant={"outlined"}
          />
        );
      })}
    </DivChange>
  );
}

CountriesList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  boxlayout: PropTypes.string
};

export default CountriesList;
