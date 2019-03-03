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
  StyledExpansionPanelDetails,
  StyledChip
} from "./LowLevelComponents/StyledComponents";
import EyeIcon from "@material-ui/icons/RemoveRedEye";

const styles = {
  expansionSummaryInner: {
    margin: "0px !important"
  }
};

function QianzhanRender(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Release Time: {item.publishDate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Filling Time: {item.regDate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.caseCode}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Dishonest Id: {item.dishonestId}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Id Number / Organization Code: {item.cardNum}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Name of Person in Charge: {item.businessEntity}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Enforcement of Court: {item.courtName}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Province: {item.areaName}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Basis for the Symbol: {item.gistId}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Execution units: {item.gistUnit}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Legal Responsibility: {item.legalDuty}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Debtor's Fulfillment: {item.performance}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Debtor Behavior Specific Circumstances:{" "}
        {item.disruptTypeName}
      </Typography>
    </div>
  );
}

function QichachaRender(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Release Time: {item.Publicdate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Filling Time: {item.Liandate}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.Anno}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Organization Code: {item.Orgno}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Dishonest Number: {item.Executeno}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Execute Status: {item.Executestatus}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Behavior Note: {item.Actionremark}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Executive Court: {item.Executegov}
      </Typography>
    </div>
  );
}

function QichachaRenderWithDetails(props) {
  const { item } = props;
  return (
    <div>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Release Time:{" "}
        {item.PUBLIC_DATE
          ? new Date(item.PUBLIC_DATE).toISOString().substr(0, 10)
          : "Unknown"}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Case Number: {item.ANNO}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Name: {item.NAME}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Owner Name: {item.OWNER_NAME}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Organization Number: {item.ORG_NO}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Organization Type: {item.ORG_TYPE_NAME}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Execute Status: {item.EXECUTE_STATUS}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Execute Unite: {item.EXECUTE_UNITE}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Execute Number: {item.EXECUTE_NO}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Executive Court: {item.EXECUTE_GOV}
      </Typography>
      <Typography className={"fontStyle11"}>
        {"\u2022"} Province: {item.PROVINCE}
      </Typography>
      {item.CASE_CONTENT ? (
        <Typography className={"fontStyle11"}>
          {"\u2022"} Case Content: {item.CASE_CONTENT}
        </Typography>
      ) : props.getCaseContent ? (
        <StyledChip
          style={{ marginTop: 5 }}
          type={"info"}
          onClick={() => {
            props.getCaseContent(item.CHINESE_NAME, item.ID);
          }}
          icon={<EyeIcon style={{ color: "#4C84FF" }} />}
          variant={"outlined"}
          label={"Show Case Content"}
        />
      ) : (
        ""
      )}
    </div>
  );
}

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
                      <Typography className={"fontStyle5"}>
                        {item.ACTION_REMARK !== undefined
                          ? item.ACTION_REMARK
                          : item.Name
                          ? item.Name
                          : item.dishonestName}
                      </Typography>
                    }
                    secondary={
                      <Typography className={"fontStyle11"}>
                        {"\u2022 Case Date: " +
                          (item.ACTION_REMARK !== undefined
                            ? item.LIAN_DATE
                              ? new Date(item.LIAN_DATE)
                                  .toISOString()
                                  .substr(0, 10)
                              : "Unknown"
                            : item.Name
                            ? item.Publicdate
                            : item.publishDate)}
                      </Typography>
                    }
                  />
                </StyledExpansionSummary>
                <StyledExpansionPanelDetails>
                  {item.ACTION_REMARK !== undefined ? (
                    <QichachaRenderWithDetails
                      getCaseContent={props.getCaseContent}
                      item={item}
                    />
                  ) : item.Name ? (
                    <QichachaRender item={item} />
                  ) : (
                    <QianzhanRender item={item} />
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
  classes: PropTypes.object.isRequired,
  moreData: PropTypes.array.isRequired,
  getCaseContent: PropTypes.func
};

export default withStyles(styles)(MoreDataDishonest);
