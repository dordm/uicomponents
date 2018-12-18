import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
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

function MoreDataTrademarks(props) {
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
                    <StyledAvatar
                      imgProps={{
                        style: {
                          objectFit: "contain"
                        }
                      }}
                      src={item.imgUrl}
                      alt={"Trademark Image"}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://s3-us-west-2.amazonaws.com/tiidan-qichacha-imgs/logos/default.jpgdefault.jpg";
                      }}
                    />
                  </ListItemIcon>
                  <StyledListItemText
                    primary={
                      <Typography className={"fontStyle7"}>
                        {item.branType}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  <div>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Registration Number: {item.regNo}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Date of Application: {item.applicationDate}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Trademark Status:{" "}
                      {item.brandProcess !== ""
                        ? item.brandProcess
                        : "Approved"}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Application Name:{" "}
                      {item.name !== "" ? item.name : "Unknown"}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Applicant Name: {item.proposer}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Applicant Address: {item.proposerAddr}
                    </Typography>
                    <Typography className={"fontStyle7"}>
                      {"\u2022"} Trademark Attorney Name: {item.brandAgent}
                    </Typography>
                    {item.serviceList !== "();" ? (
                      <div>
                        <Typography className={"fontStyle7"}>
                          {"\u2022"} Service Items:{" "}
                        </Typography>
                        <div>
                          {item.serviceList
                            .replace("();", "")
                            .split(";")
                            .map((service, idx) => (
                              <Typography
                                key={idx}
                                style={{ marginLeft: 7 }}
                                className={"fontStyle7"}
                              >
                                {service}
                              </Typography>
                            ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
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

MoreDataTrademarks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreDataTrademarks);
