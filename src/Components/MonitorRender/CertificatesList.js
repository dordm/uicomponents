import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { DivChange } from "./StyledComponents";

function CertificatesList(props) {
  const { data, width } = props;
  return (
    <DivChange width={width}>
      {data.CHANGE_DATA.change.map((item, idx) => {
        return (
          <Typography
            key={idx}
            className={data.CHANGE_TYPE === 2 ? "fontStyle25" : "fontStyle23"}
          >{`${item.CERTIFICATE_NAME} - ${
            data.CHANGE_TYPE === 2 ? "NEW" : "EXPIRED"
          }`}</Typography>
        );
      })}
    </DivChange>
  );
}

CertificatesList.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default CertificatesList;
