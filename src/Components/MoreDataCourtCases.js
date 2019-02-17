import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles/index";
import classNames from 'classnames';
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
  },
  listItemTitle: {
    background: "#f0f1f5",
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    justifyContent: "center",
    display: "flex"
  }
};

const casesTypes = {
  ms: "Civil",
  xs: "Criminal",
  xz: "Administrative",
  zscq: "IP",
  pc: "Compensation",
  zx: "Execution",
  other: "Other"
};

function MoreDataCourtCases(props) {
  const { classes } = props;
  const data =
    props.moreData && props.moreData[0].CASE_NAME
      ? props.moreData.sort(function(a, b) {
          return ("" + a.CASE_TYPE).localeCompare(b.CASE_TYPE);
        })
      : props.moreData;
  return (
    <List>
      {data.map((item, idx) => {
        return (
          <div key={idx}>
            {idx === 0 || data[idx - 1].CASE_TYPE !== item.CASE_TYPE ? (
              <StyledListItem
                className={classNames(classes.listItemTitle, "fontStyle27")}
                style={{ marginTop: idx !== 0 ? 20 : 0 }}
              >
                {casesTypes[item.CASE_TYPE]}
              </StyledListItem>
            ) : (
              ""
            )}
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
                      <Typography className={"fontStyle5"}>
                        {item.CASE_NAME ? item.CASE_NAME : item.title}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {item.CASE_NAME
                          ? item.SUBMIT_DATE
                            ? "\u2022 Case Date: " +
                              item.SUBMIT_DATE.toString().substr(0, 10)
                            : ""
                          : "\u2022 Case Date: " + item.date}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  {item.CASE_NAME ? (
                    <div>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Date:{" "}
                        {item.SUBMIT_DATE
                          ? item.SUBMIT_DATE.toString().substr(0, 10)
                          : ""}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Case Number: {item.CASE_NO}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Judicial Institution: {item.COURT}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Case Type: {item.CASE_TYPE}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Is Prosecutor:{" "}
                        {item.IS_PROSECUTOR ? "Yes" : "No"}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Is Defendant:{" "}
                        {item.IS_DEFENDANT ? "Yes" : "No"}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Update Date:{" "}
                        {item.UPDATE_DATE
                          ? item.UPDATE_DATE.toString().substr(0, 10)
                          : ""}
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Date: {item.date}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Case Number: {item.num}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Judicial Institution: {item.ch}
                      </Typography>
                      <Typography className={"fontStyle11"}>
                        {"\u2022"} Case Content: {item.content}
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

MoreDataCourtCases.propTypes = {
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array.isRequired
};

export default withStyles(styles)(MoreDataCourtCases);
