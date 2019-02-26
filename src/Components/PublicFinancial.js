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
import {
  BigBoxLayout,
  StyledDialogContent,
  StyledCloseIcon
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const StyledTitle = styled.div`
  display: flex;
  width: ${props => (props.width > 600 ? "55%" : "35%")};
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
    marginTop: -2,
    display: "block"
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
  },
  moreBtn: {
    textAlign: "right",
    cursor: "pointer",
    marginLeft: 30
  },
  bottomIcon: {
    position: "absolute",
    marginTop: -4
  },
  dialog: {
    margin: 16
  }
};

class PublicFinancial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOpen: false
    };
  }

  moreDataFinancial() {
    return <div>data</div>;
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
          {this.props.date ? (
            <Typography className={classNames(classes.date, "fontStyle12")}>
              {this.props.date}
            </Typography>
          ) : (
            ""
          )}
          {this.props.listedData ? (
            <div
              onClick={() => this.setState({ moreOpen: true })}
              className={classNames(classes.moreBtn, "fontStyle6")}
              data-cy="divMore"
            >
              More
              <img
                alt="view all"
                src={require("./images/Back.png")}
                className={classes.bottomIcon}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {this.props.data && this.props.data.revenue ? (
          <div className={classes.listDiv}>
            <List>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img
                    alt="revenue"
                    height={16}
                    width={16}
                    src={require("./images/revenue.svg")}
                  />
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
                    new Intl.NumberFormat("en").format(this.props.data.revenue)}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img
                    height={16}
                    width={16}
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
                      this.props.data.netProfit
                    )}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img
                    height={16}
                    width={16}
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
                      this.props.data.totalAssets
                    )}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <img
                    height={16}
                    width={16}
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
                      this.props.data.totalLiabilities
                    )}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        ) : (
          <NoDataImg />
        )}
        <Dialog
          PaperProps={{
            classes: {
              root: classes.dialog
            }
          }}
          open={this.state.moreOpen}
          onClose={() => this.setState({ moreOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            data-cy={"btnCloseDialog"}
            onClick={() => this.setState({ moreOpen: false })}
          >
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle
            className={"fontStyle3"}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            Financial Data
          </DialogTitle>
          <StyledDialogContent>{this.moreDataFinancial()}</StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

PublicFinancial.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.object,
  date: PropTypes.string,
  listedData: PropTypes.object
};

export default withStyles(styles)(PublicFinancial);
