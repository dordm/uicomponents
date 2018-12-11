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
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const StyledExpansionPanel = styled(ExpansionPanel)`
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: left;
  box-shadow: none !important;
`;

const StyledListItem = styled(ListItem)`
  padding: 4px 0 4px 0 !important;
`;

const StyledListItemText = styled(ListItemText)`
  margin-left: -25px;
  padding-top: 2px !important;
`;

const StyledExpansionSummary = styled(ExpansionPanelSummary)`
  min-height: 30px !important;
  padding: 8px !important;
  @media (max-width: 600px) {
    padding: 0 !important;
  }
`;

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  padding-top: 0px !important;
  padding-bottom: 8px !important;
  margin: 0px;
`;

const styles = {
    expansionSummaryInner: {
        margin: "0px !important"
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
    },
    typoMore: {
        textAlign: "left",
        marginLeft: 10
    }
};

function MoreData2(props) {
    const { classes } = props;
    return (
        <List>
            {props.moreData.map((item, idx) => {
                return (
                    <div key={idx}>
                        <StyledListItem>
                            <StyledExpansionPanel style={{ width: "100%" }}>
                                <StyledExpansionSummary
                                    IconButtonProps={{
                                        style: {
                                            padding: 0
                                        }
                                    }}
                                    classes={{
                                        content: classes.expansionSummaryInner,
                                        expanded: classes.expansionSummaryInner
                                    }}
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <ListItemIcon>
                                        <img
                                            height={24}
                                            width={24}
                                            alt={"employee"}
                                            src={Utils.getImage('employee.svg')}
                                        />
                                    </ListItemIcon>
                                    <StyledListItemText
                                        primary={
                                            <Typography className={"fontStyle5"}>
                                                {item.jobTitle}
                                            </Typography>
                                        }
                                    />
                                </StyledExpansionSummary>
                                <StyledExpansionPanelDetails>
                                    <div>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Publish Date: {item.publicDate !== '' ? item.publicDate : 'Unknown'}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Address: {item.address !== "" ? item.address : ''} {item.area !== "" ? ', ' + item.area : ''} {item.city !== "" ? ', ' + item.city : ''}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Functional Category: {item.type !== '' ? item.type : 'Not Set'}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Years Requirements: {item.yearsReq !== '' ? item.yearsReq : 'Not Set'}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Salary Range: {item.salaryRange !== '' ? item.salaryRange : 'Not Set'}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Education Requirements: {item.eduReq !== '' ? item.eduReq : 'Not Set'}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Number of Recruits: {item.count !== '' ? item.count : 'Not Set'}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Nature of Work: {item.workingProperty !== '' ? item.workingProperty : 'Not Set'}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Welfare: {item.welfare !== '' ? item.welfare : 'Not Set'}
                                        </Typography>
                                        <Typography className={"fontStyle11"}>
                                            {"\u2022"} Job Description: {item.des !== '' ? item.des : 'Not Set'}
                                        </Typography>
                                    </div>
                                </StyledExpansionPanelDetails>
                            </StyledExpansionPanel>
                        </StyledListItem>
                        <Divider />
                    </div>
                );
            })}
        </List>
    );
}

function MoreData(props) {
    const classes = props.classes;
    return (
        <List>
            {props.moreData.map((item,idx) => {
                return (
                    <div key={idx}>
                        <ListItem>
                            <img
                                height={24}
                                width={24}
                                alt={"employee"}
                                src={Utils.getImage('employee.svg')}
                            />
                            <div>
                                <Typography
                                    className={classNames(classes.typoMore, "fontStyle5")}
                                >
                                    {item.memberName}
                                </Typography>
                                <Typography
                                    className={classNames(classes.typoMore, "fontStyle11")}
                                >
                                    {"\u2022"} Position: {item.position}
                                </Typography>
                            </div>
                        </ListItem>
                        <Divider />
                    </div>
                );
            })}
        </List>
    );
}

class MoreDataEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.moreSubTitle
        };
    }
    render() {
        const { classes } = this.props;
        return this.props.moreData.length > 0 || this.props.moreData2.length > 0 ? (
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
                    <MoreData2 classes={classes} moreData={this.props.moreData2} />
                )}
            </div>
        ) : null;
    }
}

MoreDataEmployees.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreDataEmployees);