import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import {
  BigBoxLayout,
  StyledTitle
} from "./LowLevelComponents/StyledComponents";

let isIE = /*@cc_on!@*/ false || !!document.documentMode;

const RiskLbl = styled.label`
  fontsize: 14px;
  color: ${props => props.color} !important;
  fontweight: 500;
`;

const StyledVertLine = styled.div`
  width: 2px;
  height: 30px;
  margin: auto;
  position: absolute;
  overflow: hidden;
  z-index: 1000;
  margin-left: calc(
    ${props => props.marginLeft} -
      ${props =>
        props.marginLeft !== "0%"
          ? props.width > 1050
            ? "40px"
            : "20px"
          : "0"}
  );
`;

const StyledScoreLine = styled.div`
  color: #ffffff;
  padding-top: 12px !important;
  padding-bottom: 6px !important;
  border-bottom: 6px solid #ff3b77;
  position: relative;
  margin-bottom: ${props =>
    props.width < 500 ? "5px" : props.isIE == "true" ? "6px" : "10px"};
  &:before {
    content: "";
    position: absolute;
    height: 6px;
    width: 20%;
    bottom: -6px;
    left: 60%;
    background-color: #f97413;
  }
  &:after {
    content: "";
    position: absolute;
    height: 6px;
    width: 20%;
    bottom: -6px;
    left: 60%;
    background-color: #f97413;
    left: 79.6%;
    width: 20.5%;
    background-color: #2fd565;
  }
`;

const styles = {
  divLine: {
    width: "100%",
    margin: 20,
    marginTop: 30,
    fontWeight: "normal",
    fontFamily: "Roboto",
    fontStyle: "normal",
    textAlign: "right"
  },
  divScore: {
    marginTop: 24,
    fontFamily: "Roboto",
    fontStyle: "normal",
    textAlign: "center"
  },
  scoreLabel: {
    fontSize: 64,
    color: "#182D5A",
    fontWeight: "normal"
  },
  lbl0: {
    fontSize: 14,
    position: "absolute",
    color: "#182D5A",
    textAlign: "left",
    marginTop: 2
  },
  lbl10: {
    fontSize: 14,
    color: "#182D5A",
    marginRight: -2
  },
  lblHighRisk: {
    fontSize: 10,
    position: "absolute",
    color: "#A4AFBF",
    textAlign: "left",
    marginTop: 5
  },
  lblLowRisk: {
    fontSize: 10,
    color: "#A4AFBF"
  },

  vertLineInner: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#182D5A",
    top: "30%"
  },
  divBottomMsg: {
    background: "#ffffff",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 24
  },
  bottomMsg: {
    marginTop: 4,
    textAlign: "left"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class CompanyScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report
    };
  }

  designRiskLbl(score) {
    if (score == null) return <RiskLbl color={"#4c84ff"}>Calculating</RiskLbl>;
    else if (score < 6) return <RiskLbl color={"#FF3B77"}>High Risk</RiskLbl>;
    else if (score < 8) return <RiskLbl color={"#F97413"}>Medium Risk</RiskLbl>;
    else return <RiskLbl color={"#2FD565"}>Low Risk</RiskLbl>;
  }

  bottomMsg(score, classes) {
    if (score == null)
      return (
        <div className={classes.divBottomMsg}>
          <img
            style={{ height: 24, width: 24 }}
            alt="flag"
            src={Utils.getIcon("natural")}
          />
          <Typography className={classNames(classes.bottomMsg, "fontStyle11")}>
            Our system calculating the supplier score
          </Typography>
        </div>
      );
    else if (score < 6)
      return (
        <div className={classes.divBottomMsg}>
          <img
            style={{ height: 24, width: 24 }}
            alt="flag"
            src={Utils.getIcon("bad")}
          />
          <Typography className={classNames(classes.bottomMsg, "fontStyle11")}>
            Below average supplier
          </Typography>
        </div>
      );
    else if (score < 8)
      return (
        <div className={classes.divBottomMsg}>
          <img
            style={{ height: 24, width: 24 }}
            alt="flag"
            src={Utils.getIcon("natural")}
          />
          <Typography className={classNames(classes.bottomMsg, "fontStyle11")}>
            Average supplier
          </Typography>
        </div>
      );
    else
      return (
        <div className={classes.divBottomMsg}>
          <img
            style={{ height: 24, width: 24 }}
            alt="flag"
            src={Utils.getIcon("good")}
          />
          <Typography className={classNames(classes.bottomMsg, "fontStyle11")}>
            Excellent supplier
          </Typography>
        </div>
      );
  }

  getScoreMargin() {
    let buksaSize;
    if (this.props.width > 1650) {
      buksaSize = 48 * 0.6;
    } else if (this.props.width > 1250) {
      buksaSize = 48 * 0.8;
    } else if (this.props.width > 1050) {
      buksaSize = 48 * 0.95;
    } else if (this.props.width > 800) {
      buksaSize = 95 * 0.6;
    } else if (this.props.width > 600) {
      buksaSize = 95 * 0.8;
    } else {
      buksaSize = 95 * 0.95;
    }
    return this.state.report.score != null
      ? (this.state.report.score / 100) * buksaSize + "%"
      : 0;
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <StyledTitle
            width={this.props.width}
            mobileWidth={"60%"}
            otherWidth={"65%"}
          >
            <Typography className={classNames("fontStyle1")}>
              Company Score
            </Typography>
            <div data-tip data-for={"tipScore"}>
              <img
                alt="info"
                src={Utils.getIcon("info")}
                className={classes.topIcon}
              />
            </div>
            <ReactTooltip
              className={classNames("tooltip", "fontStyle14")}
              id={"tipScore"}
              place="right"
              effect="solid"
            >
              <span>
                The company score is based by analyzing the data of the
                supplier's financial and legal risks as well as his trade data
                history and his IP (intellectual property), compared to other
                suppliers in the same industry.
              </span>
            </ReactTooltip>
          </StyledTitle>
          <div data-cy={"divScore"} className={classes.divScore}>
            <label className={classes.scoreLabel}>
              {this.state.report.score != null
                ? (this.state.report.score / 10).toFixed(1)
                : "N/A"}
            </label>
            <br />
            {this.designRiskLbl(
              this.state.report.score != null
                ? this.state.report.score / 10
                : null
            )}
          </div>
        </div>

        <div className={classes.divLine}>
          <div className={classes.lbl0}>0</div>
          <label className={classes.lbl10}>10</label>
          <StyledVertLine
            width={this.props.width}
            marginLeft={this.getScoreMargin()}
          >
            <div className={classes.vertLineInner} />
          </StyledVertLine>
          <StyledScoreLine width={this.props.width} isIE={isIE} />
          <div className={classes.lblHighRisk}>High Risk</div>
          <label className={classes.lblLowRisk}>Low Risk</label>
        </div>
        {/*{this.bottomMsg(this.state.report.score / 10, classes)}*/}
      </BigBoxLayout>
    );
  }
}

CompanyScore.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CompanyScore);
