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
  width: ${props => (props.width > 600 ? "65%" : "45%")};
`;

const StyledDivMore = styled.div`
  text-align: right;
  cursor: pointer;
  margin-left: ${props => (props.width > 600 ? "30px" : "5px")};
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
    width: "48%",
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
  bottomIcon: {
    position: "absolute",
    marginTop: -4
  },
  dialog: {
    margin: 16
  },
  divWrapper: {
    height: "auto",
    width: "100%",
    background: "white",
    paddingTop: 8
  }
};

class CashFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOpen: false
    };
  }

  moreData() {
    const { classes } = this.props;
    const data = this.props.listedData && this.props.listedData.cashFlow;
    return (
      <div className={classes.divWrapper}>
        {data ? (
          <List>
            {this.renderListItem(
              "Absorption Investment Cash Received",
              data.absorptionInvestmentCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Assets Cash Paid",
              data.assetsCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Assets Net Cash Paid",
              data.assetsNetCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Assets Net Cash Received",
              data.assetsNetCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Borrowings Cash Received",
              data.borrowingsCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Cash In Flows",
              data.cashInFlows,
              "revenue.svg"
            )}
            {this.renderListItem("Cash Paid", data.cashPaid, "revenue.svg")}
            {this.renderListItem(
              "Cash Received",
              data.cashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Current Ratio",
              data.currentRatio,
              "revenue.svg",
              false
            )}
            {this.renderListItem(
              "Debt Cash Paid",
              data.debtCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Distribution Cash Paid",
              data.distributionCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Employees Cash Paid",
              data.employeesCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Financing Cash In Flow",
              data.financingCashInFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Financing Cash Out Flow",
              data.financingCashOutFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Financing Net Cash Flows",
              data.financingNetCashFlows,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Investing Net Cash Flow",
              data.investingNetCashFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Investment Cash In Flow",
              data.investmentCashInFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Investment Cash Out Flow",
              data.investmentCashOutFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Investment Cash Paid",
              data.investmentCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Investment Cash Received",
              data.investmentCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Net Cash Flows",
              data.netCashFlows,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Operating Cash Out Flow",
              data.operatingCashOutFlow,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Other Cash Paid",
              data.otherCashPaid,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Other Cash Received",
              data.otherCashReceived,
              "revenue.svg"
            )}
            {this.renderListItem(
              "Tax Refund Received",
              data.taxRefundReceived,
              "revenue.svg"
            )}
            {this.renderListItem("Taxes Paid", data.taxesPaid, "revenue.svg")}
          </List>
        ) : (
          ""
        )}
      </div>
    );
  }

  renderListItem(label, value, img, formatVal = true) {
    const { classes } = this.props;
    return (
      <ListItem>
        <ListItemIcon className={classes.icon}>
          <img
            height={16}
            width={16}
            alt="img"
            src={require("./images/" + img)}
          />
        </ListItemIcon>
        <ListItemText
          style={{ marginLeft: -25 }}
          primary={
            <Typography style={{ maxWidth: "50%" }} className={"fontStyle7"}>
              {label}
            </Typography>
          }
        />
        <ListItemSecondaryAction
          className={classNames(classes.listItemSecondary, "fontStyle10")}
        >
          {value
            ? formatVal
              ? "$" + new Intl.NumberFormat("en").format(value)
              : value
            : "Not Set"}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  render() {
    const { classes } = this.props;
    const data = this.props.listedData && this.props.listedData.cashFlow;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <StyledTitle width={this.props.width}>
            <Typography className={classNames("fontStyle1")}>
              Cash Flow
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
          {data ? (
            <Typography className={classNames(classes.date, "fontStyle12")}>
              {data.date}
            </Typography>
          ) : (
            ""
          )}
          {data ? (
            <StyledDivMore
              onClick={() => this.setState({ moreOpen: true })}
              className={"fontStyle6"}
              data-cy="divMore"
              width={this.props.width}
            >
              More
              <img
                alt="view all"
                src={require("./images/Back.png")}
                className={classes.bottomIcon}
              />
            </StyledDivMore>
          ) : (
            ""
          )}
        </div>
        {data ? (
          <div className={classes.listDiv}>
            <List>
              {this.renderListItem("Cash Paid", data.cashPaid, "revenue.svg")}
              {this.renderListItem(
                "Cash Received",
                data.cashReceived,
                "revenue.svg"
              )}
              {this.renderListItem(
                "Employees Cash Paid",
                data.employeesCashPaid,
                "revenue.svg"
              )}
              {this.renderListItem("Taxes Paid", data.taxesPaid, "revenue.svg")}
              {this.renderListItem(
                "Current Ratio",
                data.currentRatio,
                "revenue.svg",
                false
              )}
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
            Cash Flow
          </DialogTitle>
          <StyledDialogContent>{this.moreData()}</StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

CashFlow.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  listedData: PropTypes.object
};

export default withStyles(styles)(CashFlow);
