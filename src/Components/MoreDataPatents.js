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

function MoreDataPatents(props) {
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
                      alt={"patent"}
                      src={Utils.getImage("diploma.svg")}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle7"}>
                        {item.patentName}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Number: {item.patentNo}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Request Date: {item.patentDate}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Type: {item.patentType}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Classification Number: {item.patentClass}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Status: {item.patentLegalStatus}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Publish Date: {item.patentOpenDate}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Address: {item.patentAddr}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent City: {item.patentCity}
                    </Typography>
                    {item.patentInventor !== "" ? (
                      <div>
                        <Typography className={"fontStyle7"}>
                          {"\u2022"} Patent Inventors:{" "}
                        </Typography>
                        <div>
                          {item.patentInventor
                            .split(";")
                            .map((inventor, idx) => (
                              <Typography
                                key={idx}
                                style={{ marginLeft: 7 }}
                                className={"fontStyle7"}
                              >
                                {inventor}
                              </Typography>
                            ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Applicant: {item.patentApplicant}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Agency: {item.patentAgency}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Agent: {item.patentAgent}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Patent Summary: {item.patentAbstract}
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

MoreDataPatents.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array.isRequired
};

export default withStyles(styles)(MoreDataPatents);
