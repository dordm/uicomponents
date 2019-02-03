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

function MoreDataLawEnforcement(props) {
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
                        {item.Id ? item.Name : item.name}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  {item.Id ? (
                    <div>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Filling Time: {item.Liandate}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Case Number: {item.Anno}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Executive Court: {item.ExecuteGov}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Status: {item.Status}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Id Number / Organization Code:{" "}
                        {item.PartyCardNum}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Landmark: {item.Biaodi}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Update Time: {item.Updatedate}
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Date: {item.date}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Case Number: {item.num}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Enforcement of Court: {item.court}
                      </Typography>
                      <Typography className={"fontStyle7"}>
                        {"\u2022"} Execution Target:{" "}
                        {item.execMoney
                          ? item.execMoney[0] +
                            new Intl.NumberFormat("en").format(
                              item.execMoney.substr(1)
                            )
                          : ""}
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

MoreDataLawEnforcement.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array.isRequired
};

export default withStyles(styles)(MoreDataLawEnforcement);
