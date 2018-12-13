import React from "react";
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
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Utils from "./js/Utils";

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
  }
};

function MoreDataCourtCases(props) {
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
                      style={{ alignSelf: "center" }}
                      height={24}
                      width={24}
                      alt={"court case"}
                      src={Utils.getImage("mace.svg")}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle7"}>
                        {item.title}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Date: {item.date}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Case Number: {item.num}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Judicial Institution: {item.ch}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Case Content: {item.content}
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

MoreDataCourtCases.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreDataCourtCases);
