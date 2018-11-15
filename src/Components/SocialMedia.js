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
import { BigBoxLayout } from "./LowLevelComponents/StyledComponents";
import styled from "styled-components";

const StyledLblWebsite = styled.label`
  cursor: ${props => (props.link ? "pointer" : "")};
  color: ${props => (props.link ? "#4C84FF" : "#172b51")} !important;
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
    width: 24
  },
  listDiv: {
    width: "100%"
  },
  listItemSecondary: {
    textAlign: "left",
    width: "60%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
  // lblWebsite: {
  //   cursor: "pointer",
  //   color: "#4C84FF !important"
  // }
};

class SocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report
    };
  }

  openWebsite(url) {
    if (url.startsWith("http")) window.open(url);
    else window.open("http://" + url);
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
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
                onClick={() =>
                  haveWebsite ? this.openWebsite(this.state.report.website) : ""
                }
              >
                <StyledLblWebsite link={haveWebsite}>
                  {this.state.report.website !== undefined
                    ? this.state.report.website
                    : ""}
                </StyledLblWebsite>
              </ListItemSecondaryAction>
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
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
                onClick={() => this.state.report.linkedin !== null && this.state.report.linkedin !== '' ? this.openWebsite(this.state.report.linkedin) : '' }
              >
                  <StyledLblWebsite link={this.state.report.linkedin !== null && this.state.report.linkedin !== ''}>
                      {this.state.report.linkedin !== undefined
                          ? this.state.report.linkedin
                          : ""}
                  </StyledLblWebsite>
              </ListItemSecondaryAction>
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
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
                onClick={() => this.state.report.weibo !== null && this.state.report.weibo !== '' ? this.openWebsite(this.state.report.weibo) : '' }
              >
                  <StyledLblWebsite link={this.state.report.weibo !== null && this.state.report.weibo !== ''}>
                      {this.state.report.weibo !== undefined
                          ? this.state.report.weibo
                          : ""}
                  </StyledLblWebsite>
              </ListItemSecondaryAction>
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
              <ListItemSecondaryAction
                className={classNames(classes.listItemSecondary, "fontStyle10")}
                onClick={() => this.state.report.wechat !== null && this.state.report.wechat !== '' ? this.openWebsite(this.state.report.wechat) : '' }
              >
                  <StyledLblWebsite link={this.state.report.wechat !== null && this.state.report.wechat !== ''}>
                      {this.state.report.wechat !== undefined
                          ? this.state.report.wechat
                          : ""}
                  </StyledLblWebsite>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              {this.state.report.socialIcon !== undefined ? (
                <ListItemIcon className={classes.icon}>
                  <img
                    alt="msg"
                    src={Utils.getIcon(this.state.report.socialIcon)}
                  />
                </ListItemIcon>
              ) : (
                ""
              )}
              <ListItemText
                style={{ marginLeft: -15 }}
                primary={
                  <Typography className={"fontStyle11"}>
                    {this.state.report.socialMsg !== undefined
                      ? this.state.report.socialMsg
                      : ""}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </div>
      </BigBoxLayout>
    );
  }
}

SocialMedia.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SocialMedia);
