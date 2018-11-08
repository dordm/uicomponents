import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { BigBoxLayout } from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

const StyledTitle = styled.div`
  display: flex;
  width: ${props => (props.width > 600 ? "70%" : "60%")};
`;

const styles = {
  title: {
    marginTop: 19,
    marginLeft: 24,
    textAlign: "left",
    display: "flex",
    height: "min-content",
    width: "100%"
  },
  icon: {
    height: 16,
    width: 16,
    marginTop: -2
  },
  listDiv: {
    width: "100%"
  },
  listItemSecondary: {
    textAlign: "left",
    width: "45%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  date: {
    marginTop: 4
  }
};

class PublicFinancial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      date: this.props.date
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <StyledTitle width={this.props.width}>
            <Typography className={classNames("fontStyle1")}>
              Financial
            </Typography>
            <div data-tip data-for={"tipFinancial"}>
              <img
                alt="info"
                src={Utils.getIcon("info")}
                className={classes.topIcon}
              />
            </div>
            <ReactTooltip
              className={classNames("tooltip", "fontStyle14")}
              id={"tipFinancial"}
              place="right"
              effect="solid"
            >
              <span>
                Financial data of public company as reported to the Stock
                Exchange
              </span>
            </ReactTooltip>
          </StyledTitle>
          {this.state.date !== "" && this.state.data != null ? (
            <Typography className={classNames(classes.date, "fontStyle12")}>
              {this.state.date}
            </Typography>
          ) : (
            ""
          )}
        </div>
        {this.state.data != null ? (
          <div className={classes.listDiv}>
            <List>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img alt="revenue" src={require("./images/revenue.svg")} />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>Revenue</Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {"$" +
                    new Intl.NumberFormat("en").format(this.state.data.revenue)}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img
                    alt="net profit"
                    src={require("./images/netProfit.svg")}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>Net Profit</Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {"$" +
                    new Intl.NumberFormat("en").format(
                      this.state.data.netProfit
                    )}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img
                    alt="total assets"
                    src={require("./images/assets.svg")}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Total Assets
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {"$" +
                    new Intl.NumberFormat("en").format(
                      this.state.data.totalAssets
                    )}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img
                    alt="total liabilities"
                    src={require("./images/liabilities.svg")}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: -25 }}
                  primary={
                    <Typography className={"fontStyle7"}>
                      Total Liabilities
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                >
                  {"$" +
                    new Intl.NumberFormat("en").format(
                      this.state.data.totalLiabilities
                    )}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                {this.state.data.icon !== undefined ? (
                  <ListItemIcon className={classes.icon}>
                    <img alt="msg" src={Utils.getIcon("")} />
                  </ListItemIcon>
                ) : (
                  ""
                )}
                <ListItemText
                  style={{ marginLeft: -35 }}
                  primary={<Typography className={"fontStyle11"} />}
                />
              </ListItem>
            </List>
          </div>
        ) : (
          <NoDataImg />
        )}
      </BigBoxLayout>
    );
  }
}

PublicFinancial.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicFinancial);