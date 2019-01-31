import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Utils from "./js/Utils";
import {
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";

const styles = {
  expansionSummaryInner: {
    margin: "0px !important"
  }
};

function MoreDataDishonest(props) {
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
                      alt={"dishonest"}
                      src={Utils.getImage("mace.svg")}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle7"}>
                        {item.Name ? item.Name : item.dishonestName}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  {item.Name ? (
                    <div>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Release Time: {item.Publicdate}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Filling Time: {item.Liandate}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Case Number: {item.Anno}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Organization Code: {item.Orgno}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Dishonest Number: {item.Executeno}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Execute Status: {item.Executestatus}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Behavior Note: {item.Actionremark}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Executive Court: {item.Executegov}
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Release Time: {item.publishDate}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Filling Time: {item.regDate}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Case Number: {item.caseCode}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Dishonest Id: {item.dishonestId}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Id Number / Organization Code: {item.cardNum}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Name of Person in Charge:{" "}
                        {item.businessEntity}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Enforcement of Court: {item.courtName}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Province: {item.areaName}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Basis for the Symbol: {item.gistId}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Execution units: {item.gistUnit}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Legal Responsibility: {item.legalDuty}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Debtor's Fulfillment: {item.performance}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Debtor Behavior Specific Circumstances:{" "}
                        {item.disruptTypeName}
                      </Typography>
                    </div>
                  )}
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

MoreDataDishonest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreDataDishonest);
