import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Utils from "./js/Utils";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import {
  StyledTitle,
  BigBoxLayout,
  StyledCloseIcon
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

const styles = {
  icon: {
    height: 24,
    width: 24
  },
  listDiv: {
    width: "100%",
    height: 210
  },
  listItemSecondary: {
    textAlign: "left",
    left: "65%",
    transform: "none !important",
    top: "25%"
  },
  bottomMsg: {
    marginTop: -10,
    marginRight: 10,
    marginLeft: 22,
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
  listItem: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  divViewAll: {
    marginTop: 19,
    cursor: "pointer"
  }
};

class Certifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      allCertificatesOpen: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout container={true} justify={"flex-start"}>
        <StyledTitle
          width={this.props.width}
          mobileWidth={"65%"}
          otherWidth={"75%"}
        >
          <Typography className={classNames("fontStyle1")}>
            Certifications
          </Typography>
          <div data-tip data-for={"tipCertifications"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipCertifications"}
            place="right"
            effect="solid"
          >
            <span>The supplier’s certifications</span>
          </ReactTooltip>
        </StyledTitle>
        {this.state.report.certificates.length > 0 ? (
          <div
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allCertificatesOpen: true })}
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
        {this.state.report.certificates.length > 0 ? (
          <div className={classes.listDiv}>
            <div className={classes.listDiv}>
              <List disablePadding={true} dense={true}>
                {this.state.report.certificates.filter(certificate => certificate.name !== '').slice(0, 5).map(certificate => {
                  return (
                    <ListItem key={certificate.name}>
                      <ListItemIcon className={classes.icon}>
                        <img
                          alt="certificate"
                          src={require("./images/Certification.svg")}
                        />
                      </ListItemIcon>
                      <ListItemText
                        style={{ marginLeft: -25, maxWidth: "58%" }}
                        primary={
                          <div>
                            <div data-tip data-for={"tip" + certificate.name}>
                              <Typography
                                className={classNames(
                                  "fontStyle7",
                                  classes.listItem
                                )}
                              >
                                {certificate.name}
                              </Typography>
                            </div>
                            <ReactTooltip
                              className={classNames("tooltip", "fontStyle14")}
                              id={"tip" + certificate.name}
                              place="bottom"
                              effect="solid"
                            >
                              <span>{certificate.name}</span>
                            </ReactTooltip>
                          </div>
                        }
                      />
                      <ListItemSecondaryAction
                        className={classNames(
                          classes.listItemSecondary,
                          "fontStyle10"
                        )}
                      >
                        {certificate.validity === 1
                          ? "Valid (" + certificate.expiration + ")"
                          : "Invalid"}
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </div>
            {/*{this.state.report.certificateInsight !== "" ? (*/}
            {/*<Typography*/}
            {/*className={classNames(classes.bottomMsg, "fontStyle11")}*/}
            {/*>*/}
            {/*<img*/}
            {/*alt="bottomIcon"*/}
            {/*className={classes.bottomIcon}*/}
            {/*src={Utils.getIconByNumber(*/}
            {/*this.state.report.certificateInsightType*/}
            {/*)}*/}
            {/*/>*/}
            {/*<label style={{ marginLeft: 25 }}>*/}
            {/*{this.state.report.certificateInsight}*/}
            {/*</label>*/}
            {/*</Typography>*/}
            {/*) : (*/}
            {/*""*/}
            {/*)}*/}
          </div>
        ) : (
          <NoDataImg />
        )}
        <Dialog
          open={this.state.allCertificatesOpen}
          onClose={() => this.setState({ allCertificatesOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ allCertificatesOpen: false })}
          >
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle className={"fontStyle3"} style={{ textAlign: "center" }}>
            All Certificates
          </DialogTitle>
          <DialogContent style={{ padding: "0 0 0" }}>
            <List>
              {this.state.report.certificates.filter(certificate => certificate.name !== '').map(certificate => {
                return (
                  <div key={certificate.name}>
                    <ListItem
                      style={{
                        padding: this.props.width > 600 ? "" : "8px 8px"
                      }}
                    >
                      <ListItemIcon className={classes.icon}>
                        <img
                          alt="certificate"
                          src={require("./images/Certification.svg")}
                        />
                      </ListItemIcon>
                      <ListItemText
                        style={{ marginLeft: -25, maxWidth: "58%" }}
                        primary={
                          <Typography className={"fontStyle7"}>
                            {certificate.name}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction
                        className={classNames(
                          classes.listItemSecondary,
                          "fontStyle10"
                        )}
                      >
                        {certificate.validity === 1
                          ? "Valid Until " + certificate.expiration
                          : "Invalid"}
                      </ListItemSecondaryAction>
                    </ListItem>
                    {this.state.report.certificates.indexOf(certificate) <
                    this.state.report.certificates.length - 1 ? (
                      <Divider />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </List>
          </DialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

Certifications.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Certifications);
