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
import {
  BigBoxLayout,
  StyledCloseIcon
} from "./LowLevelComponents/StyledComponents";
import styled from "styled-components";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MoreDataWebsite from "./MoreDataWebsite";
import Dialog from "@material-ui/core/Dialog";
import './css/fullScreenDialog.css'

const StyledLblWebsite = styled.label`
  cursor: ${props => (props.link ? "pointer" : "")};
  color: ${props => (props.link ? "#4C84FF" : "#172b51")} !important;
`;

const StyledListItemSecondary = styled(ListItemSecondaryAction)`
  text-align: left;
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  right: 62px !important;
`;

const StyledDialogContent = styled(DialogContent)`
  width: 100%;
  padding: 0px !important;
  overflow-y: unset !important;
`;

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
    width: 24,
    display: "block"
  },
  listDiv: {
    width: "100%"
  },
  listItemSecondary: {
    textAlign: "left",
    width: 32,
    whiteSpace: "nowrap"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  moreBtn: {
    textAlign: "right",
    cursor: "pointer"
  },
  imgMore: {
    marginTop: -4,
    position: "absolute",
    marginLeft: -4
  },
  dialog: {
    background: "#F5F7FB"
  }

};

class SocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      moreDataOpen: false
    };
  }

  openWebsite(url) {
    if (url.startsWith("http")) window.open(url);
    else window.open("http://" + url);
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

        open={this.state.moreDataOpen}
        onClose={() => this.setState({ moreDataOpen: false })}
        aria-labelledby="scroll-dialog-title"
      >
        <StyledCloseIcon
          data-cy={"btnCloseDialog"}
          onClick={() => this.setState({ moreDataOpen: false })}
        >
          <img alt="Close" src={Utils.getImage("Close.png")} />
        </StyledCloseIcon>
        <DialogTitle
          className={"fontStyle3"}
          style={{ textAlign: "center", marginTop: 24 }}
        >
          Website Information
        </DialogTitle>
        <StyledDialogContent>
          <MoreDataWebsite
            width={this.props.width}
            websiteArchive={this.state.report.websiteArchive}
            websiteWhoIs={this.state.report.websiteWhoIs}
          />
        </StyledDialogContent>
      </Dialog>
    );
  }

  render() {
    const { classes } = this.props;
    const haveWebsite = Utils.haveWebsite(this.state.report);
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <div className={classes.title}>
          <Typography className={classNames("fontStyle1")}>
            Online Presence
          </Typography>
          <div data-tip data-for={"tipPresence"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipPresence"}
            place="right"
            effect="solid"
          >
            <span>The supplier’s presence on online platforms</span>
          </ReactTooltip>
        </div>
        <div className={classes.listDiv}>
          <List>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <img alt="website" src={require("./images/Website.svg")} />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -15 }}
                primary={
                  <Typography className={"fontStyle7"}>Website</Typography>
                }
              />
              {haveWebsite &&
              (this.state.report.websiteArchive ||
                this.state.report.websiteWhoIs) ? (
                <ListItemSecondaryAction
                  className={classNames(
                    classes.listItemSecondary,
                    "fontStyle10"
                  )}
                  style={{
                    right: this.props.width > 600 ? 30 : 15
                  }}
                >
                  <div
                    onClick={() => this.setState({ moreDataOpen: true })}
                    className={classNames(classes.moreBtn, "fontStyle6")}
                    data-cy="divMore"
                  >
                    More
                    <img
                      alt="view all"
                      src={require("./images/Back.png")}
                      className={classes.imgMore}
                    />
                  </div>
                </ListItemSecondaryAction>
              ) : (
                ""
              )}
              <StyledListItemSecondary className={"fontStyle10"}>
                <StyledLblWebsite
                  onClick={() =>
                    haveWebsite
                      ? this.openWebsite(this.state.report.website)
                      : ""
                  }
                  link={haveWebsite}
                >
                  {this.state.report.website !== undefined
                    ? this.state.report.website
                    : ""}
                </StyledLblWebsite>
              </StyledListItemSecondary>
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <img alt="linkedin" src={require("./images/Linkedin.png")} />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -15 }}
                primary={
                  <Typography className={"fontStyle7"}>Linkedin</Typography>
                }
              />
              <StyledListItemSecondary
                className={"fontStyle10"}
                onClick={() =>
                  this.state.report.linkedin !== null &&
                  this.state.report.linkedin !== ""
                    ? this.openWebsite(this.state.report.linkedin)
                    : ""
                }
              >
                <StyledLblWebsite
                  link={
                    this.state.report.linkedin !== null &&
                    this.state.report.linkedin !== ""
                  }
                >
                  {this.state.report.linkedin !== undefined
                    ? this.state.report.linkedin
                    : ""}
                </StyledLblWebsite>
              </StyledListItemSecondary>
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <img alt="weibo" src={require("./images/weibo.svg")} />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -15 }}
                primary={
                  <Typography className={"fontStyle7"}>Weibo</Typography>
                }
              />
              <StyledListItemSecondary
                className={"fontStyle10"}
                onClick={() =>
                  this.state.report.weibo !== null &&
                  this.state.report.weibo !== ""
                    ? this.openWebsite(this.state.report.weibo)
                    : ""
                }
              >
                <StyledLblWebsite
                  link={
                    this.state.report.weibo !== null &&
                    this.state.report.weibo !== ""
                  }
                >
                  {this.state.report.weibo !== undefined
                    ? this.state.report.weibo
                    : ""}
                </StyledLblWebsite>
              </StyledListItemSecondary>
            </ListItem>

            <ListItem>
              <ListItemIcon className={classes.icon}>
                <img alt="wechat" src={require("./images/wechat.svg")} />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: -15 }}
                primary={
                  <Typography className={"fontStyle7"}>Wechat</Typography>
                }
              />
              <StyledListItemSecondary
                className={"fontStyle10"}
                onClick={() =>
                  this.state.report.wechat !== null &&
                  this.state.report.wechat !== ""
                    ? this.openWebsite(this.state.report.wechat)
                    : ""
                }
              >
                <StyledLblWebsite
                  link={
                    this.state.report.wechat !== null &&
                    this.state.report.wechat !== ""
                  }
                >
                  {this.state.report.wechat !== undefined
                    ? this.state.report.wechat
                    : ""}
                </StyledLblWebsite>
              </StyledListItemSecondary>
            </ListItem>
          </List>
        </div>
        {this.dialogMoreData()}
      </BigBoxLayout>
    );
  }
}

SocialMedia.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SocialMedia);
