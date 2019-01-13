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
  },
  bottomMsg: {
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
  }
};

class WebsiteChanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteChanges: null
    };
  }
  componentDidMount() {
    this.setState({ websiteChanges: this.props.websiteChanges });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.websiteChanges !== this.props.websiteChanges)
      this.setState({ websiteChanges: this.props.websiteChanges });
  }
  getWebsiteData() {
    const data = [];

    for (let i = 1; i < this.state.websiteChanges.length; i++) {
      const change = this.state.websiteChanges[i];
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
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
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
        {this.state.websiteChanges && this.state.websiteChanges.length > 0 ? (
          <div style={{ width: "100%" }}>
            <BarChart
              height={"88%"}
              width={this.props.width}
              dataKeyBar={"Changes"}
              dataKey={"name"}
              data={this.getWebsiteData()}
            />
            <Typography
              className={classNames(classes.bottomMsg, "fontStyle11")}
            >
              {this.props.bottomMsg ? (
                <img
                  alt="bottomIcon"
                  className={classes.bottomIcon}
                  src={this.props.bottomIcon}
                />
              ) : (
                ""
              )}
              <label style={{ marginLeft: 25 }}>{this.props.bottomMsg}</label>
            </Typography>
          </div>
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
