import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";
import {
  SmallBoxLayout,
  StyledTitle,
  StyledCloseIcon,
  StyledDialogContent
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

const StyledDivTitle = styled.div`
  display: flex;
  width: ${props =>
    props.width > 600
      ? props.date !== ""
        ? "60%"
        : "75%"
      : props.date !== ""
      ? "65%"
      : "80%"};
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
    marginLeft: 20,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
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
    cursor: "pointer"
  },
  dialog: {
    margin: 16
  }
};

class TwoInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content1: this.props.content1,
      content2: this.props.content2,
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
            <StyledDivTitle date={this.props.date} width={this.props.width}>
              <Typography className={classNames("fontStyle1")}>
                {this.props.name}
              </Typography>
              <div data-tip data-for={"tip" + this.props.name}>
                <img
                  alt="info"
                  src={Utils.getIcon("info")}
                  className={classes.topIcon}
                />
              </div>
              <ReactTooltip
                className={classNames("tooltip", "fontStyle14")}
                id={"tip" + this.props.name}
                place="right"
                effect="solid"
              >
                <span>{this.props.infoText}</span>
              </ReactTooltip>
            </StyledDivTitle>
            {this.props.moreBtn && this.props.moreData != null ? (
              <div
                onClick={() => this.setState({ moreOpen: true })}
                className={classNames(classes.moreBtn, "fontStyle6")}
                data-cy="divMore"
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
            {this.props.date !== "" ? (
              <Typography className={classNames(classes.date, "fontStyle12")}>
                {this.props.date}
              </Typography>
            ) : (
              ""
            )}
          </StyledTitle>
          <div
            data-cy="divContent"
            style={{ display: "inline-flex", width: "100%", marginTop: 20 }}
          >
            {this.state.content1 !== "" && this.state.content1 != null ? (
              <div
                style={{
                  width:
                    this.state.content2 !== "" && this.state.content2 != null
                      ? "50%"
                      : "100%"
                }}
                data-cy="divContent1"
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
                  {this.props.content1Lbl}
                </Typography>
              </div>
            ) : (
              ""
            )}
            {this.state.content2 !== "" && this.state.content2 != null ? (
              <div
                data-cy="divContent2"
                style={{ paddingRight: 10, width: "50%" }}
              >
                <Typography
                  className={classNames(classes.content, "fontStyle18")}
                >
                  {this.state.content2}
                </Typography>
                <Typography
                  style={{ marginTop: -3 }}
                  className={classNames(classes.content, "fontStyle19")}
                >
                  {this.props.content2Lbl}
                </Typography>
              </div>
            ) : (
              ""
            )}
          </div>
          {this.props.bottomMsg !== "" &&
          this.props.bottomMsg !== undefined &&
          this.props.bottomMsg !== null ? (
            <div
              data-tip
              data-for={"tipBtmMsg" + this.props.name}
              data-cy="divBottomMsg"
              style={{ overflow: "hidden" }}
            >
              <Typography
                className={classNames(classes.bottomContent, "fontStyle11")}
                style={{ marginTop: this.props.content1Lbl === "" ? 25 : 10 }}
              >
                {this.props.bottomIcon != null ? (
                  <img
                    height={24}
                    width={24}
                    alt="bottomIcon"
                    className={classes.bottomIcon}
                    src={this.props.bottomIcon}
                  />
                ) : (
                  ""
                )}
                <label
                  style={{ marginLeft: this.props.bottomIcon != null ? 25 : 0 }}
                >
                  {this.props.bottomMsg}
                </label>
              </Typography>
            </div>
          ) : (
            ""
          )}
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipBtmMsg" + this.props.name}
            place="bottom"
            effect="solid"
          >
            <span>{this.props.bottomMsg}</span>
          </ReactTooltip>
        </div>
        {this.props.moreBtn ? (
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
              style={{ textAlign: "center" }}
            >
              {this.props.moreTitle}
            </DialogTitle>
            <StyledDialogContent>{this.props.moreData}</StyledDialogContent>
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
          {this.props.name}
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
