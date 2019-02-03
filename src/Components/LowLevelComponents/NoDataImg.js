import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NoDataImgBig = styled.img`
  width: 100%;
  height: inherit;
`;

const NoDataImgSmall = styled.img`
  height: inherit;
  margin-top: 20px;
  width: ${props => (props.width > 1050 ? "100%" : "65%")};
`;

const DivNoDataImgBig = styled.div`
  width: 100%;
  height: 250px;
`;

class NoDataImg extends Component {
  render() {
    return this.props.smallBox ? (
      <NoDataImgSmall
        width={this.props.width}
        alt="NoData"
        src={require("../images/NoData.svg")}
      />
    ) : (
      <DivNoDataImgBig>
        <NoDataImgBig alt="NoData" src={require("../images/NoData.svg")} />
      </DivNoDataImgBig>
    );
  }
}

NoDataImg.propTypes = {
  smallBox: PropTypes.bool,
  width: PropTypes.number
};

export default NoDataImg;
