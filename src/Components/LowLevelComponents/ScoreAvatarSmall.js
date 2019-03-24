import React from "react";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledScoreAvatarSmall = styled(Avatar)`
  left: 35%;
  margin-top: 7px;
  height: 24px !important;
  width: 24px !important;
  font-size: 12px !important;
  color: ${props => props.color} !important;
  background: ${props => props.back} !important;
  border: ${props => props.border} !important;
`;

const ScoreAvatarSmall = function(props) {
  if (props.score == null)
    return (
      <StyledScoreAvatarSmall
        back={"rgba(255, 26, 94, 0.03)"}
        color={"#cc003d"}
        border={"1px solid #cc003d"}
      >
        N/A
      </StyledScoreAvatarSmall>
    );
  else if (props.score < 5)
    return (
      <StyledScoreAvatarSmall
        back={"rgba(255, 26, 94, 0.03)"}
        color={"#cc003d"}
        border={"1px solid #cc003d"}
      >
        {props.score.toFixed(1)}
      </StyledScoreAvatarSmall>
    );
  else if (props.score < 6)
    return (
      <StyledScoreAvatarSmall
        back={"rgba(255, 59, 119, 0.03)"}
        color={"#FF3B77"}
        border={"1px solid #FF3B77"}
      >
        {props.score.toFixed(1)}
      </StyledScoreAvatarSmall>
    );
  else if (props.score < 7)
    return (
      <StyledScoreAvatarSmall
        back={"rgba(224, 97, 6, 0.05)"}
        color={"#c75605"}
        border={"1px solid #c75605"}
      >
        {props.score.toFixed(1)}
      </StyledScoreAvatarSmall>
    );
  else if (props.score < 8)
    return (
      <StyledScoreAvatarSmall
        back={"rgba(249, 116, 19, 0.05)"}
        color={"#F97413"}
        border={"1px solid #F97413"}
      >
        {props.score.toFixed(1)}
      </StyledScoreAvatarSmall>
    );
  else
    return (
      <StyledScoreAvatarSmall
        mobile={props.width < 600 ? "true" : "false"}
        back={"rgba(47, 213, 101, 0.03)"}
        color={"#2FD565"}
        border={"1px solid #2FD565"}
      >
        {props.score.toFixed(1)}
      </StyledScoreAvatarSmall>
    );
};

ScoreAvatarSmall.propTypes = {
  score: PropTypes.number
};

export default ScoreAvatarSmall;
