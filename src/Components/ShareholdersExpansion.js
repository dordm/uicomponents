import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import Divider from "@material-ui/core/Divider";
import {
  BigBoxLayout,
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import GroupIcon from "@material-ui/icons/Group";
import Loader from "./LowLevelComponents/Loader";

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
    width: "50%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  expansionSummaryInner: {
    margin: "0px !important"
  }
};

class ShareholdersExpansion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  addSupplier(englishName, chineseName) {
    this.props.addSupplier(englishName, chineseName);
    this.setState({ loading: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout
        style={{ height: "auto" }}
        container={true}
        justify={"flex-start"}
      >
        <Loader open={this.state.loading} />
        <div className={classes.title}>
          <Typography className={classNames("fontStyle1")}>
            Shareholders Data
          </Typography>
          <div data-tip data-for={"tipWebDetails"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipWebDetails"}
            place="right"
            effect="solid"
          >
            <span>Shareholders associates information.</span>
          </ReactTooltip>
        </div>
        {this.props.shareholders && this.props.shareholders.length > 0 ? (
          <div className={classes.listDiv}>
            <List>
              {this.props.shareholders.map((item, idx) => {
                return (
                  <div key={idx}>
                    <StyledListItem>
                      <StyledExpansionPanel style={{ width: "100%" }}>
                        <StyledExpansionSummary
                          style={{
                            cursor:
                              item.associate.length > 0 ? "pointer" : "default"
                          }}
                          IconButtonProps={{
                            style: {
                              padding: 0
                            }
                          }}
                          classes={{
                            content: classes.expansionSummaryInner,
                            expanded: classes.expansionSummaryInner
                          }}
                          expandIcon={
                            item.associate.length > 0 ? <ExpandMoreIcon /> : ""
                          }
                        >
                          <ListItemIcon>
                            <GroupIcon
                              style={{
                                height: 24,
                                width: 24,
                                alignSelf: "center"
                              }}
                            />
                          </ListItemIcon>
                          <StyledListItemText
                            primary={
                              <div style={{ display: "flex" }}>
                                <div style={{ width: "80%" }}>
                                  <Typography className={"fontStyle10"}>
                                    {item.properties.name}{" "}
                                    {item.associate.length > 0
                                      ? `(Shareholder in ${
                                          item.associate.length
                                        } other companies)`
                                      : ""}
                                  </Typography>
                                  <Typography
                                    style={{ width: "80%" }}
                                    className={"fontStyle7"}
                                  >
                                    {"\u2022"} Shares:{" "}
                                    {item.sharesProperties.stockPercent}%
                                  </Typography>
                                </div>
                                {item.label === "Company" &&
                                !window.location.pathname.includes(
                                  "/direct/"
                                ) ? (
                                  <Typography
                                    style={{ cursor: "pointer" }}
                                    className={"fontStyle6"}
                                    onClick={() => {
                                      this.setState({ loading: true });
                                      this.addSupplier(
                                        "Temporary name" + item.id,
                                        item.properties.name
                                      );
                                    }}
                                  >
                                    Request Analysis
                                  </Typography>
                                ) : (
                                  ""
                                )}
                              </div>
                            }
                          />
                        </StyledExpansionSummary>
                        {item.associate.length > 0 ? (
                          <StyledExpansionPanelDetails>
                            <div style={{ width: "100%" }}>
                              {item.associate.map((associate, idx) => (
                                <div
                                  key={idx}
                                  style={{ display: "flex", marginBottom: 12 }}
                                >
                                  <div
                                    style={{
                                      width: "80%"
                                    }}
                                  >
                                    <Typography className={"fontStyle10"}>
                                      {associate.properties.name}
                                    </Typography>
                                    <Typography
                                      style={{ display: "flex" }}
                                      className={"fontStyle7"}
                                    >
                                      {"\u2022"}
                                      {associate.properties.status}
                                      <img
                                        alt={"capital"}
                                        src={require("./images/yuan.svg")}
                                        height={16}
                                        width={16}
                                        style={{
                                          marginTop: 2,
                                          marginLeft: 4,
                                          marginRight: 4
                                        }}
                                      />
                                      ¥{associate.properties.registCapi}
                                    </Typography>
                                  </div>
                                  {window.location.pathname.includes(
                                    "/direct/"
                                  ) ? (
                                    ""
                                  ) : (
                                    <Typography
                                      style={{ cursor: "pointer" }}
                                      className={"fontStyle6"}
                                      onClick={() => {
                                        this.setState({ loading: true });
                                        this.addSupplier(
                                          "Temporary name" + associate.id,
                                          associate.properties.name
                                        );
                                      }}
                                    >
                                      Request Analysis
                                    </Typography>
                                  )}
                                </div>
                              ))}
                            </div>
                          </StyledExpansionPanelDetails>
                        ) : (
                          ""
                        )}
                      </StyledExpansionPanel>
                    </StyledListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </div>
        ) : (
          <NoDataImg />
        )}
      </BigBoxLayout>
    );
  }
}

ShareholdersExpansion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareholdersExpansion);
