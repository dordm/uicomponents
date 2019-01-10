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
  StyledTitle,
  StyledCloseIcon
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import styled from "styled-components";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MoreDataShareholders from "./MoreDataShareholders";
import Dialog from "@material-ui/core/Dialog";
import "./css/fullScreenDialog.css";

const StyledDialogContent = styled(DialogContent)`
  width: 100%;
  padding: 0px !important;
  overflow-y: unset !important;
`;

const styles = {
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
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  divViewAll: {
    marginTop: 19,
    cursor: "pointer",
    height: "fit-content"
  },
  dialog: {
    background: "#F5F7FB"
  }
};

class PieChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allShareholdersOpen: false
    };
  }

  dialogMoreData() {
    const { classes } = this.props;
    return (
      <Dialog
        PaperProps={{
          classes: {
            root: classNames("fullScreenDialog", classes.dialog)
          }
        }}
        open={this.state.allShareholdersOpen}
        onClose={() => this.setState({ allShareholdersOpen: false })}
        aria-labelledby="scroll-dialog-title"
      >
        <StyledCloseIcon
          data-cy={"btnCloseDialog"}
          onClick={() => this.setState({ allShareholdersOpen: false })}
        >
          <img alt="Close" src={Utils.getImage("Close.png")} />
        </StyledCloseIcon>
        <DialogTitle
          className={"fontStyle3"}
          style={{ textAlign: "center", marginTop: 24 }}
        >
          Corporate Map
        </DialogTitle>
        <StyledDialogContent>
          <MoreDataShareholders
            addSupplier={this.props.addSupplier}
            width={this.props.width}
            corporateMap={this.props.corporateMap}
            chineseName={this.props.chineseName}
          />
        </StyledDialogContent>
      </Dialog>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <StyledTitle
          width={this.props.width}
          mobileWidth={"65%"}
          otherWidth={"75%"}
        >
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
        {this.props.title === "Shareholders" && this.props.corporateMap ? (
          <div
            data-cy="viewAllShareholders"
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allShareholdersOpen: true })}
          >
            View All
            <img
              alt="view all"
              src={require("./images/Back.png")}
              style={{ marginTop: -4, position: "absolute" }}
            />
          </div>
        ) : (
          ""
        )}
        {this.props.data !== undefined && this.props.data.length > 0 ? (
          <PieChart
            width={this.props.width}
            height={"70%"}
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
        {this.props.data !== undefined && this.props.data.length > 0 ? (
          <div
            data-tip
            data-for={"tipBtmMsg" + this.props.title}
            data-cy="divBottomMsg"
            style={{ overflow: "hidden" }}
          >
            <Typography
              className={classNames(classes.bottomMsg, "fontStyle11")}
            >
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
          </div>
        ) : (
          ""
        )}
        <ReactTooltip
          className={classNames("tooltip", "fontStyle14")}
          id={"tipBtmMsg" + this.props.title}
          place="bottom"
          effect="solid"
        >
          <span>{this.props.bottomMsg}</span>
        </ReactTooltip>
        {this.dialogMoreData()}
      </BigBoxLayout>
    );
  }
}

PieChartWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PieChartWrapper);
