import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import { BigBoxLayout } from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import BarChart from "./LowLevelComponents/BarChart";

const styles = {
  title: {
    marginTop: 19,
    marginLeft: 24,
    textAlign: "left",
    display: "flex",
    height: "min-content"
  },
  icon: {
    height: 24,
    width: 24
  },
  listDiv: {
    width: "100%"
  },
  listItemSecondary: {
    textAlign: "left",
    width: "50%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class WebsiteChanges extends Component {
  getWebsiteData() {
    const data = [];

    for (let i = 1; i < this.props.websiteChanges.length; i++) {
      const change = this.props.websiteChanges[i];
      const year = change[1].substr(0, 4);
      let found = false;
      for (let j = 0; j < data.length; j++) {
        if (data[j].name === year) {
          found = true;
          data[j].Changes = data[j].Changes + 1;
          break;
        }
      }
      if (!found) data.push({ name: year, Changes: 1 });
    }

    return data;
  }
  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <Typography className={classNames("fontStyle1")}>
            Website Changes
          </Typography>
          <div data-tip data-for={"tipWebChanges"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipWebChanges"}
            place="right"
            effect="solid"
          >
            <span>
              Website changes information. The data is based on "Web Archive".
            </span>
          </ReactTooltip>
        </div>
        {this.props.websiteChanges && this.props.websiteChanges.length > 0 ? (
          <BarChart
            height={"80%"}
            width={this.props.width}
            dataKeyBar={"Changes"}
            dataKey={"name"}
            data={this.getWebsiteData()}
          />
        ) : (
          <NoDataImg />
        )}
      </BigBoxLayout>
    );
  }
}

WebsiteChanges.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WebsiteChanges);
