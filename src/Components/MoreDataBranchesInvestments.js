import React, { Component } from "react";
import Utils from "./js/Utils";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import classNames from "classnames";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Loader from "./LowLevelComponents/Loader";

const styles = {
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
  },
  typoMore: {
    textAlign: "left",
    marginLeft: 10
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
              <div style={{ display: "flex", width: "80%" }}>
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
              </div>
              {window.location.pathname.includes("/direct/") ? (
                ""
              ) : (
                <Typography
                  style={{ cursor: "pointer" }}
                  className={"fontStyle6"}
                  onClick={() => {
                    props.changeLoader(true);
                    props.addSupplier(
                      item.name.substr(0, item.name.lastIndexOf("(") - 1),
                      item.name.substr(item.name.lastIndexOf("("))
                    );
                    props.changeLoader(false);
                  }}
                >
                  Request Analysis
                </Typography>
              )}
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
}

class MoreDataBranchesInvestments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.moreSubTitle,
      loading: false
    };
  }

  changeLoader(val) {
    this.setState({ loading: val });
  }

  render() {
    const { classes } = this.props;
    return this.props.moreData.length > 0 || this.props.moreData2.length > 0 ? (
      <div>
        <Loader open={this.state.loading} />
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
            data-cy={"tab1"}
            className={classes.tab}
            value={this.props.moreSubTitle}
            label={
              <span className={classes.tabLabel}>
                {this.props.moreSubTitle}
              </span>
            }
          />
          <Tab
            data-cy={"tab2"}
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
          <MoreData
            addSupplier={this.props.addSupplier}
            changeLoader={this.changeLoader}
            classes={classes}
            moreData={this.props.moreData}
          />
        ) : (
          <MoreData
            addSupplier={this.props.addSupplier}
            changeLoader={this.changeLoader}
            classes={classes}
            moreData={this.props.moreData2}
          />
        )}
      </div>
    ) : null;
  }
}

MoreDataBranchesInvestments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreDataBranchesInvestments);
