import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import {
  StyledTitle,
  BigBoxLayout,
  StyledCloseIcon
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

let isIE = /*@cc_on!@*/ false || !!document.documentMode;

const styles = {
  divViewAll: {
    marginTop: 19,
    cursor: "pointer"
  },
  divMedia: {
    marginLeft: 28,
    marginRight: 28,
    width: "100%"
  },
  innerDivMedia: {
    textAlign: "left",
    marginTop: 7,
    marginBottom: 7
  },
  typo: {
    marginTop: 2,
    textAlign: "left",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkitLineClamp": 2,
    "-webkitBoxOrient": "vertical",
    whiteSpace: isIE ? "nowrap" : "",
    textOverflow: isIE ? "ellipsis" : "",
    marginLeft: 25
  },
  icons: {
    marginTop: -2,
    position: "absolute"
  },
  typoAllMedia: {
    textAlign: "left",
    marginLeft: 10
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      allMediaOpen: false
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
            Top Media
          </Typography>
          <div data-tip data-for={"tipMedia"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipMedia"}
            place="right"
            effect="solid"
          >
            <span>The supplier on the online media</span>
          </ReactTooltip>
        </StyledTitle>
        {this.state.report.medias !== undefined &&
        this.state.report.medias.length > 0 ? (
          <div
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allMediaOpen: true })}
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
        {this.state.report.medias !== undefined &&
        this.state.report.medias.length > 0 ? (
          <div className={classes.divMedia}>
            {this.state.report.medias.slice(0, 4).map((media, idx) => {
              return (
                <div key={idx}>
                  <div className={classes.innerDivMedia}>
                    <img
                      height={24}
                      width={24}
                      alt={"media"}
                      src={require("./images/Media.svg")}
                      className={classes.icons}
                    />
                    <Typography
                      className={classNames(classes.typo, "fontStyle5")}
                    >
                      {media.headline}
                      {"\n"}
                    </Typography>
                  </div>
                  <Divider />
                </div>
              );
            })}
          </div>
        ) : (
          <NoDataImg />
        )}

        <Dialog
          open={this.state.allMediaOpen}
          onClose={() => this.setState({ allMediaOpen: false })}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ allMediaOpen: false })}
          >
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle className={"fontStyle3"} style={{ textAlign: "center" }}>
            All Media
          </DialogTitle>
          <DialogContent>
            <List>
              {this.state.report.medias !== undefined &&
              this.state.report.medias.length > 0
                ? this.state.report.medias.map((media, idx) => {
                    return (
                      <div key={idx}>
                        <ListItem>
                          <img
                            height={24}
                            width={24}
                            alt={"media"}
                            src={require("./images/Media.svg")}
                          />
                          <Typography
                            className={classNames(
                              classes.typoAllMedia,
                              "fontStyle5"
                            )}
                          >
                            {media.headline}
                            {"\n"}
                          </Typography>
                        </ListItem>
                        {this.state.report.medias.indexOf(media) <
                        this.state.report.medias.length - 1 ? (
                          <Divider />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
                : ""}
            </List>
          </DialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Media);
