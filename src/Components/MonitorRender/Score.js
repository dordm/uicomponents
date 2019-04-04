import React from "react";
import PropTypes from "prop-types";
import { DivChange, StyledArrowRight } from "./StyledComponents";
import { ScoreAvatar } from "@tiidan/uicomponents";

function Score(props) {
  const { data, width } = props;
  return (
    <DivChange style={{ display: "flex", marginTop: 5 }} width={width}>
      <ScoreAvatar score={data.CHANGE_DATA.before / 10} width={width} />
      <StyledArrowRight />
      <ScoreAvatar score={data.CHANGE_DATA.after / 10} width={width} />
    </DivChange>
  );
}

Score.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default Score;
