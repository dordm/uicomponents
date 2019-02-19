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

function MoreDataAdministrativePunishment(props) {
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
                      <Typography className={"fontStyle5"}>
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {item.date ? "\u2022 Case Date: " + item.date : ""}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Case Number: {item.caseNo}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Province: {item.province}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Owner: {item.ownerName}
                    </Typography>
                    <Typography className={"fontStyle11"}>
                      {"\u2022"} Case Reason: {item.reason}
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

MoreDataAdministrativePunishment.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array.isRequired
};

export default withStyles(styles)(MoreDataAdministrativePunishment);
