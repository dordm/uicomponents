import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Utils from "./js/Utils";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import {
  StyledTitle,
  BigBoxLayout,
  StyledCloseIcon,
  StyledDialogContent
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

let isIE = /*@cc_on!@*/ false || !!document.documentMode;

const styles = {
  divViewAll: {
    marginTop: 19,
    cursor: "pointer",
    height: "fit-content"
  },
  divInsights: {
    marginLeft: 28,
    marginRight: 28,
    width: "100%",
    marginTop: 15,
    height: 230
  },
  divInsight: {
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
  typoAllInsights: {
    textAlign: "left",
    marginLeft: 10
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  dialog: {
    margin: 16
  }
};

function GetInsights(props) {
  return (
    <div data-cy="divInsights">
      {props.data.slice(0, 4).map(insight => {
        return (
          <div key={props.data.indexOf(insight)}>
            <div className={props.classes.divInsight}>
              <img
                height={24}
                width={24}
                alt={"msg"}
                src={Utils.getIconByNumber(insight.type)}
                className={props.classes.icons}
              />
              <Typography
                className={classNames(props.classes.typo, "fontStyle5")}
                dangerouslySetInnerHTML={{ __html: insight.text }}
              />
            </div>
            <Divider />
          </div>
        );
      })}
    </div>
  );
}

class TopInsights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allInsightsOpen: false,
      category: this.props.category
    };
  }

  getFilteredInsights() {
    return this.props.data.filter(
      insight =>
        insight.text !== "" &&
        insight.text !== null &&
        (insight.category === this.state.category ||
          this.state.category === "Overview")
    );
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
            Top Insights
          </Typography>
          <div data-tip data-for={"tipInsights"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "tipInsights")}
            id={"tipInsights"}
            place="right"
            effect="solid"
          >
            <span>
              {this.state.category === "Overview"
                ? "The supplier’s top insights."
                : "The supplier top insights in this category."}
            </span>
          </ReactTooltip>
        </StyledTitle>
        {this.getFilteredInsights().length > 0 ? (
          <div
            data-cy="viewAllInsights"
            className={classNames(classes.divViewAll, "fontStyle6")}
            onClick={() => this.setState({ allInsightsOpen: true })}
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

        {this.getFilteredInsights().length > 0 ? (
          <div className={classes.divInsights}>
            <GetInsights
              classes={classes}
              category={this.state.category}
              data={this.getFilteredInsights()}
            />
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
          open={this.state.allInsightsOpen}
          onClose={() => this.setState({ allInsightsOpen: false })}
          aria-labelledby="scroll-dialog-title"
        >
          <StyledCloseIcon
            onClick={() => this.setState({ allInsightsOpen: false })}
          >
            <img alt="Close" src={require("./images/Close.png")} />
          </StyledCloseIcon>
          <DialogTitle className={"fontStyle3"} style={{ textAlign: "center", marginTop:24 }}>
            All Insights
          </DialogTitle>
          <StyledDialogContent>
            <List>
              {this.getFilteredInsights().map((insight, idx) => {
                return (
                  <div key={idx}>
                    <ListItem>
                      <img
                        height={24}
                        width={24}
                        alt={insight.type}
                        src={Utils.getIconByNumber(insight.type)}
                      />
                      <Typography
                        className={classNames(
                          classes.typoAllInsights,
                          "fontStyle5"
                        )}
                        dangerouslySetInnerHTML={{ __html: insight.text }}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </StyledDialogContent>
        </Dialog>
      </BigBoxLayout>
    );
  }
}

TopInsights.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopInsights);
