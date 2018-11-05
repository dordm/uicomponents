import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import {
  SmallBoxLayout,
  StyledTitle,
  StyledCloseIcon
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

const StyledDivTitle = styled.div`
  display: flex;
  width: ${props => (props.width > 600 ? "60%" : "65%")};
`;

const styles = {
  date: {
    marginTop: 4
  },
  content: {
    marginLeft: 24,
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  bottomContent: {
    textAlign: "left",
    marginLeft: 20
  },
  bottomIcon: {
    position: "absolute",
    marginTop: -4
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  moreBtn: {
    textAlign: "right",
    marginTop: 10,
    marginRight: 36,
    cursor: "pointer"
  },
  typoMore: {
    textAlign: "left",
    marginLeft: 10
  },
  tabIndicator: {
    backgroundColor: "#4C84FF"
  },
  tabTextColor: {
    color: "#182D5A",
    backgroundColor: "Transparent"
  },
  tab: {
    textTransform: "none",
    height: 64,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    minWidth: 50
  },
  tabLabel: {
    fontSize: "14px"
  }
};

function MoreData(props) {
  const classes = props.classes;
  return (
    <List>
      {props.moreData.map(item => {
        return (
          <div key={props.moreData.indexOf(item)}>
            <ListItem>
              <img
                height={24}
                width={24}
                alt={item.icon}
                src={Utils.getIcon(item.icon)}
              />
              <Typography
                className={classNames(classes.typoMore, "fontStyle5")}
              >
                {item.name}
                {"\n"}
              </Typography>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
}

class MoreDataSplited extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.moreSubTitle
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Tabs
          value={this.state.selectedTab}
          id={"tabs"}
          classes={{
            indicator: classes.tabIndicator,
            root: classes.tabTextColor
          }}
          onChange={(event, value) => this.setState({ selectedTab: value })}
          fullWidth
        >
          <Tab
            className={classes.tab}
            value={this.props.moreSubTitle}
            label={
              <span className={classes.tabLabel}>
                {this.props.moreSubTitle}
              </span>
            }
          />
          <Tab
            className={classes.tab}
            value={this.props.moreSubTitle2}
            label={
              <span className={classes.tabLabel}>
                {this.props.moreSubTitle2}
              </span>
            }
          />
        </Tabs>
        {this.state.selectedTab === this.props.moreSubTitle ? (
          <MoreData classes={classes} moreData={this.props.moreData} />
        ) : (
          <MoreData classes={classes} moreData={this.props.moreData2} />
        )}
      </div>
    );
  }
}

class TwoInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      date: this.props.date,
      infoText: this.props.infoText,
      content1: this.props.content1,
      content2: this.props.content2,
      content1Lbl: this.props.content1Lbl,
      content2Lbl: this.props.content2Lbl,
      bottomIcon: this.props.bottomIcon,
      bottomMsg: this.props.bottomMsg,
      moreOpen: false
    };
  }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.content1 !== this.props.content1) {
            this.setState({
                content1: Utils.fixNumber(this.props.content1)
            });
        }
        if (prevProps.content2 !== this.props.content2) {
            this.setState({
                content2: Utils.fixNumber(this.props.content2)
            });
        }
    }

  render() {
    const { classes } = this.props;
    return (this.state.content1 !== "" &&
      this.state.content1 != null &&
      this.state.content1 !== "null") ||
      (this.state.content2 !== "" &&
        this.state.content2 != null &&
        this.state.content2 !== "null") ? (
      <SmallBoxLayout container={true} direction={"column"}>
        <div style={{ width: "100%" }}>
          <StyledTitle
            width={this.props.width}
            otherWidth={""}
            mobileWidth={""}
          >
            <StyledDivTitle
              style={{ width: this.state.date === "" ? "100%" : "" }}
              width={this.props.width}
            >
              <Typography className={classNames("fontStyle1")}>
                {this.state.name}
              </Typography>
              <div data-tip data-for={"tip" + this.state.name}>
                <img
                  alt="info"
                  src={Utils.getIcon("info")}
                  className={classes.topIcon}
                />
              </div>
              <ReactTooltip
                className={classNames("tooltip", "fontStyle14")}
                id={"tip" + this.state.name}
                place="right"
                effect="solid"
              >
                <span>{this.state.infoText}</span>
              </ReactTooltip>
            </StyledDivTitle>
            {this.state.date !== "" ? (
              <Typography className={classNames(classes.date, "fontStyle12")}>
                {this.state.date}
              </Typography>
            ) : (
              ""
            )}
          </StyledTitle>
          <div style={{ display: "inline-flex", width: "100%", marginTop: 20 }}>
            {this.state.content1 !== "" && this.state.content1 != null ? (
              <div
                style={{
                  width:
                    this.state.content2 !== "" && this.state.content2 != null
                      ? "50%"
                      : "100%"
                }}
              >
                <Typography
                  className={classNames(classes.content, "fontStyle17")}
                >
                  {this.state.content1}
                </Typography>
                <Typography
                  style={{ marginTop: -3 }}
                  className={classNames(classes.content, "fontStyle19")}
                >
                  {this.state.content1Lbl}
                </Typography>
              </div>
            ) : (
              ""
            )}
            {this.state.content2 !== "" && this.state.content2 != null ? (
              <div style={{ paddingRight: 10, width: "50%" }}>
                <Typography
                  className={classNames(classes.content, "fontStyle18")}
                >
                  {this.state.content2}
                </Typography>
                <Typography
                  style={{ marginTop: -3 }}
                  className={classNames(classes.content, "fontStyle19")}
                >
                  {this.state.content2Lbl}
                </Typography>
              </div>
            ) : (
              ""
            )}
          </div>
          {this.props.moreBtn &&
          (this.props.moreData.length > 0 ||
            this.props.moreData2.length > 0) ? (
            <div
              onClick={() => this.setState({ moreOpen: true })}
              className={classNames(classes.moreBtn, "fontStyle6")}
            >
              More
              <img
                alt="view all"
                src={require("./images/Back.png")}
                style={{ marginTop: -4, position: "absolute" }}
              />
            </div>
          ) : (
            ""
          )}
          {this.state.bottomMsg !== "" &&
          this.state.bottomMsg !== undefined &&
          this.state.bottomMsg !== null ? (
            <Typography
              className={classNames(classes.bottomContent, "fontStyle11")}
              style={{ marginTop: this.state.content1Lbl === "" ? 25 : 10 }}
            >
              {this.state.bottomIcon != null ? (
                <img
                  height={24}
                  width={24}
                  alt="bottomIcon"
                  className={classes.bottomIcon}
                  src={this.state.bottomIcon}
                />
              ) : (
                ""
              )}
              <label
                style={{ marginLeft: this.state.bottomIcon != null ? 25 : 0 }}
              >
                {this.state.bottomMsg}
              </label>
            </Typography>
          ) : (
            ""
          )}
        </div>
        {this.props.moreBtn ? (
          <Dialog
            open={this.state.moreOpen}
            onClose={() => this.setState({ moreOpen: false })}
            aria-labelledby="scroll-dialog-title"
          >
            <StyledCloseIcon onClick={() => this.setState({ moreOpen: false })}>
              <img alt="Close" src={require("./images/Close.png")} />
            </StyledCloseIcon>
            <DialogTitle
              className={"fontStyle3"}
              style={{ textAlign: "center" }}
            >
              {this.props.moreTitle}
            </DialogTitle>
            <DialogContent>
              {this.props.moreSubTitle !== undefined &&
              this.props.moreSubTitle2 !== undefined ? (
                <MoreDataSplited
                  classes={classes}
                  moreData={this.props.moreData}
                  moreData2={this.props.moreData2}
                  moreSubTitle={this.props.moreSubTitle}
                  moreSubTitle2={this.props.moreSubTitle2}
                />
              ) : (
                <MoreData classes={classes} moreData={this.props.moreData} />
              )}
            </DialogContent>
          </Dialog>
        ) : (
          ""
        )}
      </SmallBoxLayout>
    ) : (
      <SmallBoxLayout>
        <StyledTitle
          style={{ position: "absolute" }}
          width={this.props.width}
          mobileWidth={""}
          otherWidth={""}
          className={"fontStyle1"}
        >
          {this.state.name}
        </StyledTitle>
        <NoDataImg width={this.props.width} smallBox={true} />
      </SmallBoxLayout>
    );
  }
}

TwoInfoCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TwoInfoCard);
