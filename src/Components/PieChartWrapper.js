import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import PieChart from "./LowLevelComponents/PieChart";
import Typography from "@material-ui/core/Typography";
import Utils from "./js/Utils";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import {
  BigBoxLayout,
  StyledTitle
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

const styles = {
  bottomMsg: {
    marginTop: -20,
    marginLeft: 22,
    marginRight: 10,
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  bottomIcon: {
    position: "absolute",
    marginTop: -4,
    height: 24,
    width: 24
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class PieChartWrapper extends Component {

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <StyledTitle width={this.props.width} mobileWidth={""} otherWidth={""}>
          <Typography className={classNames("fontStyle1")}>
            {this.props.title}
          </Typography>
          <div data-tip data-for={"tip" + this.props.title}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tip" + this.props.title}
            place="right"
            effect="solid"
          >
            <span>{this.props.infoText}</span>
          </ReactTooltip>
        </StyledTitle>
        {this.props.data !== undefined && this.props.data.length > 0 ? (
          <PieChart
            width={this.props.width}
            height={"80%"}
            data={this.props.data}
            unit={"%"}
            dataKey={this.props.dataKey}
            cx={this.props.width > 600 ? 110 : 90}
            cy={100}
            innerRadius={this.props.width > 600 ? 70 : 55}
            outerRadius={this.props.width > 600 ? 85 : 70}
            title={this.props.title}
          />
        ) : (
          <NoDataImg />
        )}
        <Typography className={classNames(classes.bottomMsg, "fontStyle11")}>
          {this.props.bottomMsg !== "" && this.props.bottomMsg !== null ? (
            <img
              alt="bottomIcon"
              className={classes.bottomIcon}
              src={Utils.getIconByNumber(this.props.bottomIcon)}
            />
          ) : (
            ""
          )}
          <label style={{ marginLeft: 25 }}>{this.props.bottomMsg}</label>
        </Typography>
      </BigBoxLayout>
    );
  }
}

PieChartWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PieChartWrapper);
