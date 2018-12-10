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

class MoreDataTwoTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.moreSubTitle
        };
    }
    render() {
        const { classes } = this.props;
        return this.props.moreData.length > 0 && this.props.moreData2 > 0 ? (
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
                    <MoreData classes={classes} moreData={this.props.moreData} />
                ) : (
                    <MoreData classes={classes} moreData={this.props.moreData2} />
                )}
            </div>
        ) : null;
    }
}

MoreDataTwoTabs.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreDataTwoTabs);