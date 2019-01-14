import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import Divider from "@material-ui/core/Divider";
import {
  StyledExpansionPanel,
  StyledListItem,
  StyledListItemText,
  StyledExpansionSummary,
  StyledExpansionPanelDetails
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import GroupIcon from "@material-ui/icons/Group";

const styles = {
  title: {
    marginTop: 19,
    marginLeft: 24,
    textAlign: "left",
    display: "flex",
    height: "min-content"
  },
  icon: {
    height: 24,
    width: 24
  },
  listDiv: {
    width: "100%"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  expansionSummaryInner: {
    margin: "0px !important"
  },
  divWrapper: {
    height: "auto",
    width: "100%",
    background: "white",
    paddingTop: 8
  }
};

class ShareholdersExpansion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addSupplier(englishName, chineseName) {
    this.props.addSupplier(englishName, chineseName);
  }
  componentDidMount() {
    const { corporateMap } = this.props;
    const persons = corporateMap.nodes.filter(
      item => item.labels[0] === "Person"
    );
    const companies = corporateMap.nodes.filter(
      item => item.labels[0] === "Company"
    );
    const investRelations = corporateMap.relationships.filter(
      item => item.type === "INVEST"
    );
    const legalRelations = corporateMap.relationships.filter(
      item => item.type === "LEGAL"
    );
    const employRelations = corporateMap.relationships.filter(
      item => item.type === "EMPLOY"
    );

    const supplier = companies.find(
      item => item.properties.name === this.props.chineseName
    );

    const supplierId = supplier.id;

    const shareholdersRelations = investRelations.filter(
      item => item.endNode === supplierId
    );

    let shareholders = [];

    for (let i = 0; i < shareholdersRelations.length; i++) {
      const shareholder = corporateMap.nodes.find(
        item => item.id === shareholdersRelations[i].startNode
      );
      const associateRelations = investRelations.filter(
        item => item.startNode === shareholder.id && item.endNode !== supplierId
      );
      let associate = [];
      for (let j = 0; j < associateRelations.length; j++) {
        const associateComp = companies.find(
          item => item.id === associateRelations[j].endNode
        );
        associate.push(associateComp);
      }
      shareholders.push({
        id: shareholder.id,
        label: shareholder.labels[0],
        properties: shareholder.properties,
        sharesProperties: shareholdersRelations[i].properties,
        associate
      });
    }

    this.setState({
      persons,
      supplier,
      companies,
      investRelations,
      legalRelations,
      employRelations,
      supplierId,
      shareholders
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.divWrapper}>
        <div className={classes.title}>
          <Typography className={classNames("fontStyle1")}>
            Shareholders Data
          </Typography>
          <div data-tip data-for={"tipWebDetails"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipWebDetails"}
            place="right"
            effect="solid"
          >
            <span>Shareholders associates information.</span>
          </ReactTooltip>
        </div>
        {this.state.shareholders && this.state.shareholders.length > 0 ? (
          <div className={classes.listDiv}>
            <List>
              {this.state.shareholders.map((item, idx) => {
                return (
                  <div key={idx}>
                    <StyledListItem>
                      <StyledExpansionPanel style={{ width: "100%" }}>
                        <StyledExpansionSummary
                          style={{
                            cursor:
                              item.associate.length > 0 ? "pointer" : "default"
                          }}
                          IconButtonProps={{
                            style: {
                              padding: 0
                            }
                          }}
                          classes={{
                            content: classes.expansionSummaryInner,
                            expanded: classes.expansionSummaryInner
                          }}
                          expandIcon={
                            item.associate.length > 0 ? <ExpandMoreIcon /> : ""
                          }
                        >
                          <ListItemIcon>
                            <GroupIcon
                              style={{
                                height: 24,
                                width: 24,
                                alignSelf: "center"
                              }}
                            />
                          </ListItemIcon>
                          <StyledListItemText
                            primary={
                              <div style={{ display: "flex" }}>
                                <div>
                                  <Typography className={"fontStyle10"}>
                                    {item.properties.englishName}
                                    {" ("} {item.properties.name} {") "}
                                    {item.associate.length > 0
                                      ? `(Shareholder in ${
                                          item.associate.length
                                        } other companies)`
                                      : ""}
                                  </Typography>
                                  <Typography
                                    style={{ width: "80%" }}
                                    className={"fontStyle7"}
                                  >
                                    {"\u2022"} Shares:{" "}
                                    {item.sharesProperties.stockPercent}%
                                  </Typography>
                                </div>
                                {item.label === "Company" &&
                                !window.location.pathname.includes(
                                  "/direct/"
                                ) ? (
                                  <Typography
                                    style={{
                                      cursor: "pointer",
                                      height: "fit-content"
                                    }}
                                    className={"fontStyle6"}
                                    onClick={() => {
                                      this.addSupplier(
                                        item.properties.englishName,
                                        item.properties.name
                                      );
                                    }}
                                  >
                                    Request Analysis
                                  </Typography>
                                ) : (
                                  ""
                                )}
                              </div>
                            }
                          />
                        </StyledExpansionSummary>
                        {item.associate.length > 0 ? (
                          <StyledExpansionPanelDetails
                            style={{
                              paddingRight:
                                this.props.innerWidth > 600 ? 16 : 8,
                              paddingLeft: this.props.innerWidth > 600 ? 16 : 8
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              {item.associate.map((associate, idx) => (
                                <div
                                  key={idx}
                                  style={{ display: "flex", marginBottom: 12 }}
                                >
                                  <div>
                                    <Typography className={"fontStyle10"}>
                                      {associate.properties.englishName} {" ("}{" "}
                                      {associate.properties.name} {")"}
                                    </Typography>
                                    <Typography
                                      style={{ display: "flex" }}
                                      className={"fontStyle7"}
                                    >
                                      {"\u2022 "}
                                      {associate.properties.status}
                                      <img
                                        alt={"capital"}
                                        src={require("./images/yuan.svg")}
                                        height={16}
                                        width={16}
                                        style={{
                                          marginTop: 2,
                                          marginLeft: 4,
                                          marginRight: 4
                                        }}
                                      />
                                      ¥{associate.properties.registCapi}
                                    </Typography>
                                  </div>
                                  {window.location.pathname.includes(
                                    "/direct/"
                                  ) ? (
                                    ""
                                  ) : (
                                    <Typography
                                      style={{
                                        cursor: "pointer",
                                        height: "fit-content"
                                      }}
                                      className={"fontStyle6"}
                                      onClick={() => {
                                        this.addSupplier(
                                          associate.properties.englishName,
                                          associate.properties.name
                                        );
                                      }}
                                    >
                                      Request Analysis
                                    </Typography>
                                  )}
                                </div>
                              ))}
                            </div>
                          </StyledExpansionPanelDetails>
                        ) : (
                          ""
                        )}
                      </StyledExpansionPanel>
                    </StyledListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </div>
        ) : (
          <NoDataImg />
        )}
      </div>
    );
  }
}

ShareholdersExpansion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareholdersExpansion);
