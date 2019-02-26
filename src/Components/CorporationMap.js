import Graph from "react-graph-vis";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import Utils from "./js/Utils";
import Typography from "@material-ui/core/Typography";
import ReactTooltip from "react-tooltip";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./css/vis-network.min.css";
import { StyledButton } from "./LowLevelComponents/StyledComponents";
import styled from "styled-components";

let isFirefox = typeof InstallTrigger !== "undefined";
let isIE = /*@cc_on!@*/ false || !!document.documentMode;

const StyledDivTooltip = styled.div`
  position: absolute;
  left: ${props => (isFirefox ? 0 : props.xPos)}px;
  top: ${props => (isFirefox ? 0 : props.yPos)}px;
  z-index: 10;
  display: ${props => props.displayTooltip};
  max-height: 200px;
  overflow-y: auto;
`;

const styles = {
  title: {
    marginTop: 19,
    textAlign: "left",
    display: "flex",
    height: "min-content"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  divDictionary: {
    display: "flex",
    marginTop: 3
  },
  divFilter: {
    display: "flex",
    marginTop: 10
  },
  legend: {
    marginRight: 4,
    marginLeft: 4,
    width: 14,
    height: 14
  },
  divWrapper: {
    height: 550,
    overflow: "hidden",
    width: "100%",
    background: "white",
    margin: "1%",
    position: "relative"
  },
  select: {
    marginTop: 2,
    border: "1px solid #E4E8ED",
    boxSizing: "border-box",
    borderRadius: 2,
    height: 32,
    background: "#ffffff"
  }
};

class CorporationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: 0,
      yPos: 0,
      displayTooltip: "none",
      isOnTooltip: false,
      showTopEmps: true,
      selectedLevel: 0,
      showEdgesRelation: true,
      displayByLevel: true,
      showSubsidiaries: true,
      corpMapImg: null,
      displayCanvas: true,
      showBranches: true,
      selectedNode: "",
      events: !isIE
        ? {
            hoverNode: event => {
              let { node } = event;
              if (isFirefox) {
                setTimeout(() => {
                  if (this.state.displayTooltip === "none")
                    this.changeTooltip(node, event, "block");
                }, 200);
              } else this.changeTooltip(node, event, "block");
            },
            blurNode: event => {
              let { node } = event;
              setTimeout(
                () => {
                  this.changeTooltip(node, event, "none");
                },
                isFirefox ? 700 : 300
              );
            }
          }
        : {},
      options: {
        layout: {
          hierarchical: {
            enabled: true,
            nodeSpacing: 150,
            sortMethod: "directed"
          }
        },
        nodes: {
          shape: "image",
          widthConstraint: 150
        },
        interaction: {
          hover: true,
          tooltipDelay: 0,
          hoverConnectedEdges: false
        },
        physics: {
          enabled: false
        },
        groups: {
          myGroup: { size: 50 }
        },
        edges: {
          arrows: "to"
        }
      }
    };

    this.levelsArr = [];
  }

  componentDidMount() {
    if (!this.state.corpMapImg) this.createCorpMapAsImage();
  }

  componentDidUpdate() {
    if (!this.state.corpMapImg) this.createCorpMapAsImage();
  }

  createCorpMapAsImage() {
    if (window.location.pathname.includes("/direct/supplierPdf/")) {
      const canvas = document.getElementsByTagName("canvas");
      if (canvas.length > 0) {
        setTimeout(() => {
          const img = canvas[0].toDataURL("image/png");
          this.setState({ corpMapImg: img, displayCanvas: false });
        }, 2000);
      }
    }
  }

  changeTooltip(node, event, display) {
    if (display === "block" || !this.state.isOnTooltip)
      this.setState({
        xPos: event.pointer.DOM.x + 20,
        yPos: event.pointer.DOM.y - 50,
        displayTooltip: display,
        selectedNode: node
      });
  }

  addSupplier(englishName, chineseName) {
    this.props.addSupplier(englishName, chineseName);
  }

  deepClone(item) {
    return JSON.parse(JSON.stringify(item));
  }

  getGraph() {
    const { corporateMap, supplier, subsidiaries, branches } = this.props;
    if (corporateMap && supplier) {
      let theNodes = corporateMap.nodes.slice(0);
      let theRelations = corporateMap.relationships.slice(0);
      let numLevels = 1;
      let finalNodes = [];
      theRelations = theRelations.filter(
        item =>
          (item.type === "INVEST" ||
            (this.state.showTopEmps &&
              item.type === "EMPLOY" &&
              item.endNode === supplier.id)) &&
          item.startNode !== supplier.id
      );

      if (branches && branches.branches && this.state.showBranches) {
        for (let i = 0; i < branches.branches.length; i++) {
          try {
            let englishName, chineseName;
            if (branches.branches[i].chineseName) {
              englishName = branches.branches[i].name;
              chineseName = branches.branches[i].chineseName;
            } else {
              englishName = branches.branches[i].name.substr(
                0,
                branches.branches[i].name.lastIndexOf("(") - 1
              );
              chineseName = branches.branches[i].name.substr(
                branches.branches[i].name.lastIndexOf("(")
              );
              chineseName = chineseName.substr(1, chineseName.length - 2);
            }
            finalNodes.push(
              this.deepClone({
                id: i,
                labels: ["Company"],
                properties: {
                  englishName: englishName,
                  name: chineseName
                },
                group: "supplierBranches",
                level: 2
              })
            );
            theRelations.push({
              startNode: supplier.id,
              endNode: i,
              properties: {},
              type: "Branch"
            });
          } catch (e) {}
        }
      }

      if (subsidiaries && this.state.showSubsidiaries) {
        for (let i = 0; i < subsidiaries.length; i++) {
          try {
            let englishName, chineseName;
            if (subsidiaries[i].companyNameChinese) {
              englishName = subsidiaries[i].name;
              chineseName = subsidiaries[i].companyNameChinese;
            } else {
              englishName = subsidiaries[i].name.substr(
                0,
                subsidiaries[i].name.lastIndexOf("(") - 1
              );
              chineseName = subsidiaries[i].name.substr(
                subsidiaries[i].name.lastIndexOf("(")
              );
              chineseName = chineseName.substr(1, chineseName.length - 2);
            }
            finalNodes.push(
              this.deepClone({
                id: i + 100,
                labels: ["Company"],
                properties: {
                  englishName: englishName,
                  name: chineseName
                },
                group: "supplierBranches",
                level: 2
              })
            );
            theRelations.push({
              startNode: supplier.id,
              endNode: i + 100,
              properties: {},
              type: "Subsidiary"
            });
          } catch (e) {}
        }
      }

      const graphRelations = theRelations.map(item => ({
        from: item.startNode,
        to: item.endNode,
        role: item.properties.role,
        shouldCapi: item.properties.shouldCapi,
        stockPercent: item.properties.stockPercent,
        type: item.type
      }));

      const shareholdersRelations = graphRelations.filter(
        item => item.to === supplier.id
      );

      let shareholders = [];

      for (let i = 0; i < shareholdersRelations.length; i++) {
        const shareholder = theNodes.find(
          item => item.id === shareholdersRelations[i].from
        );
        const associateRelations = graphRelations.filter(
          item => item.from === shareholder.id
        );
        let associate = [];
        for (let j = 0; j < associateRelations.length; j++) {
          const associateComp = theNodes.find(
            item => item.id === associateRelations[j].to
          );
          const associateItem = associateRelations[j];
          associateItem.relation = associateComp;
          associate.push(associateItem);
        }
        shareholders.push({
          id: shareholder.id,
          labels: shareholder.labels,
          properties: shareholder.properties,
          associate,
          level: 2
        });

        numLevels = 2;
      }

      let thisSupplier = theNodes.find(item => item.id === supplier.id);
      thisSupplier.group = "myGroup";
      thisSupplier.level = 1;
      finalNodes.push(this.deepClone(thisSupplier));

      for (let i = 0; i < shareholders.length; i++) {
        shareholders[i].group =
          shareholders[i].associate.length > 1
            ? i.toString()
            : "supplierAssociate";
        finalNodes.push(this.deepClone(shareholders[i]));
        for (let j = 0; j < shareholders[i].associate.length; j++)
          if (shareholders[i].associate[j].relation.id !== supplier.id) {
            const itemToAdd = theNodes.find(
              item => item.id === shareholders[i].associate[j].relation.id
            );

            const associateRelations = graphRelations.filter(
              item => item.from === itemToAdd.id
            );
            let associates = [];
            for (let k = 0; k < associateRelations.length; k++) {
              const associateComp = theNodes.find(
                item => item.id === associateRelations[k].to
              );
              const associateItem = associateRelations[k];
              associateComp.level = 4;
              associateComp.group = "fourth level";
              associateItem.relation = associateComp;
              associates.push(associateItem);
              finalNodes.push(this.deepClone(associateComp));
              if (numLevels < 4) numLevels = 4;
            }
            finalNodes.push(
              this.deepClone({
                id: itemToAdd.id,
                labels: itemToAdd.labels,
                properties: itemToAdd.properties,
                associate: associates,
                level: 3,
                group: "third level"
              })
            );
            if (numLevels < 3) numLevels = 3;
          }
      }

      finalNodes = finalNodes.sort(function(a, b) {
        let ids = Number.parseInt(a.id) - Number.parseInt(b.id);
        if (ids !== 0) {
          return ids;
        }
        return Number.parseInt(a.level) - Number.parseInt(b.level);
      });

      finalNodes = finalNodes.filter(
        (item, idx) => idx === 0 || item.id != finalNodes[idx - 1].id
      );

      let levelsArr = [];
      for (let i = 1; i < numLevels; i++) levelsArr.push(i);
      this.levelsArr = levelsArr;

      const finalRelations = graphRelations.map(item => ({
        from: item.from,
        to: item.to,
        role: item.role,
        label: this.state.showEdgesRelation
          ? (item.stockPercent && item.stockPercent.toString() + "%") ||
            item.role ||
            item.type
          : "",
        shouldCapi: item.shouldCapi,
        stockPercent: item.stockPercent
      }));

      let filteredRelations = [],
        found;
      if (this.state.showEdgesRelation && this.state.showTopEmps)
        for (let i = 0; i < finalRelations.length; i++) {
          found = false;
          for (let j = 0; j < finalRelations.length; j++) {
            if (
              i !== j &&
              finalRelations[i].from === finalRelations[j].from &&
              finalRelations[i].to === finalRelations[j].to
            ) {
              if (
                finalRelations[i].stockPercent &&
                finalRelations[i].stockPercent > 0
              ) {
              } else {
                finalRelations[i].label = "";
                break;
              }
            }
          }
          if (!found) filteredRelations.push(finalRelations[i]);
        }
      else filteredRelations = finalRelations;

      const lengthLevel3 = finalNodes.filter(item => item.level <= 3).length;
      const lengthLevel4 = finalNodes.filter(item => item.level <= 4).length;

      this.defaultLevel = lengthLevel4 < 30 ? 3 : lengthLevel3 < 30 ? 2 : 1;
      if (this.defaultLevel + 1 > numLevels) this.defaultLevel = numLevels - 1;

      finalNodes = finalNodes.filter(
        item =>
          item.level <=
          (this.state.selectedLevel
            ? this.state.selectedLevel + 1
            : this.defaultLevel + 1)
      );

      const graphNodes = finalNodes.map(item => ({
        id: item.id,
        level: this.state.displayByLevel ? item.level : undefined,
        associate: item.associate,
        label: item.properties.englishName,
        nodeType: item.labels[0],
        group: item.group,
        chineseName: item.properties.name,
        color:
          item.labels[0] === "Person"
            ? "#4c84ff"
            : item.id === supplier.id
            ? "#2fd565"
            : "#a4afbf",
        tooltipContent:
          item.labels[0] === "Person"
            ? `Name: ${item.properties.englishName}\nChinese Name: ${
                item.properties.name
              } ${
                item.properties.role ? "\nRole: " + item.properties.role : ""
              }`
            : `Name: ${item.properties.englishName}\nChinese Name: ${
                item.properties.name
              } ${
                item.properties.registCapi
                  ? "\nCapital: ¥" + item.properties.registCapi
                  : ""
              } ${
                item.properties.status
                  ? "\nStatus: " +
                    (item.properties.status === "surviving" ||
                    item.properties.status === "working"
                      ? "active"
                      : item.properties.status)
                  : ""
              }`,
        title: isIE
          ? item.labels[0] === "Person"
            ? `Name: ${item.properties.englishName}\nChinese Name: ${
                item.properties.name
              } ${
                item.properties.role ? "\nRole: " + item.properties.role : ""
              }`
            : `Name: ${item.properties.englishName}\nChinese Name: ${
                item.properties.name
              } ${
                item.properties.registCapi
                  ? "\nCapital: ¥" + item.properties.registCapi
                  : ""
              } ${
                item.properties.status
                  ? "\nStatus: " +
                    (item.properties.status === "surviving" ||
                    item.properties.status === "working"
                      ? "active"
                      : item.properties.status)
                  : ""
              }`
          : undefined,
        image:
          item.labels[0] === "Person"
            ? require("./images/person.svg")
            : item.id === supplier.id
            ? require("./images/businessGreen.svg")
            : require("./images/businessGrey.svg")
      }));

      return {
        nodes: graphNodes,
        edges: filteredRelations
      };
    } else return null;
  }

  render() {
    const { classes } = this.props;
    const { corpMapImg, displayCanvas } = this.state;
    const graph = this.getGraph();
    const currentNode =
      graph && graph.nodes.find(node => node.id === this.state.selectedNode);

    const BranchesSelect = () => {
      return (
        <div style={{ marginLeft: 10 }}>
          <Typography
            style={{
              width: 75
            }}
            className={"fontStyle19"}
          >
            Branches
          </Typography>
          <select
            onChange={e =>
              this.setState({
                showBranches: e.target.value === "0" ? false : true
              })
            }
            style={{ width: 75 }}
            className={classNames(classes.select, "fontStyle16")}
            defaultValue={this.state.showBranches ? "1" : "0"}
          >
            <option value={"0"}>No</option>
            <option value={"1"}>Yes</option>
          </select>
        </div>
      );
    };

    const SubsidiariesSelect = () => {
      return (
        <div style={{ marginLeft: this.props.width > 600 ? 10 : 0 }}>
          <Typography
            style={{
              width: 75
            }}
            className={"fontStyle19"}
          >
            Subsidiaries
          </Typography>
          <select
            onChange={e =>
              this.setState({
                showSubsidiaries: e.target.value === "0" ? false : true
              })
            }
            style={{ width: 75 }}
            className={classNames(classes.select, "fontStyle16")}
            defaultValue={this.state.showSubsidiaries ? "1" : "0"}
          >
            <option value={"0"}>No</option>
            <option value={"1"}>Yes</option>
          </select>
        </div>
      );
    };

    return (
      <div className={classes.divWrapper}>
        {!isIE ? (
          <StyledDivTooltip
            onMouseEnter={() => this.setState({ isOnTooltip: true })}
            onMouseLeave={() =>
              this.setState({ displayTooltip: "none", isOnTooltip: false })
            }
            id={"myTooltip"}
            xPos={this.state.xPos}
            yPos={this.state.yPos}
            displayTooltip={this.state.displayTooltip}
            className={classNames("tooltip", "fontStyle15")}
          >
            <div>{currentNode ? currentNode.tooltipContent : ""}</div>
            <div>
              {currentNode &&
              currentNode.associate &&
              currentNode.associate.length > 0
                ? "\nAssociate Companies: "
                : ""}
              {currentNode && currentNode.associate
                ? currentNode.associate.map(
                    item =>
                      `\n\u2022 Company Name - ${
                        item.relation.properties.englishName
                      }${
                        item.shouldCapi
                          ? "\nShares Capital - ¥" + item.shouldCapi
                          : ""
                      }${
                        item.stockPercent
                          ? "\nShares Percent - " + item.stockPercent + "%"
                          : ""
                      }`
                  )
                : ""}
            </div>
            {currentNode &&
            currentNode.nodeType === "Company" &&
            this.props.addSupplier &&
            this.props.supplier.id !== currentNode.id ? (
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <StyledButton
                  onClick={() =>
                    this.addSupplier(currentNode.label, currentNode.chineseName)
                  }
                  selected={true}
                >
                  Request Analysis
                </StyledButton>
              </div>
            ) : (
              ""
            )}
          </StyledDivTooltip>
        ) : (
          ""
        )}
        <div
          style={{ marginLeft: this.props.width > 600 ? 24 : 16 }}
          className={classes.title}
        >
          <Typography className={"fontStyle1"}>Corporation Graph</Typography>
          <div data-tip data-for={"tipCorpMap"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipCorpMap"}
            place="right"
            effect="solid"
          >
            <span>Shareholders corporation graph.</span>
          </ReactTooltip>
        </div>
        <div
          style={{ marginLeft: this.props.width > 600 ? 22 : 14 }}
          className={classNames(classes.divDictionary, "fontStyle8")}
        >
          <img
            src={require("./images/businessGreen.svg")}
            className={classes.legend}
          />
          This Supplier
          <img
            src={require("./images/businessGrey.svg")}
            className={classes.legend}
          />
          Other Companies
          <img
            src={require("./images/person.svg")}
            className={classes.legend}
          />
          Persons
        </div>
        <div
          className={classes.divFilter}
          style={{ marginLeft: this.props.width > 600 ? 24 : 16 }}
        >
          <div>
            <Typography
              style={{
                height: this.props.width > 600 ? "" : 35,
                width: this.props.width > 600 ? "" : 60
              }}
              className={"fontStyle19"}
            >
              Levels
            </Typography>
            <select
              onChange={e =>
                this.setState({
                  selectedLevel: Number.parseInt(e.target.value)
                })
              }
              style={{ width: this.props.width > 600 ? 75 : 60 }}
              className={classNames(classes.select, "fontStyle16")}
              defaultValue={
                this.state.selectedLevel
                  ? this.state.selectedLevel
                  : this.defaultLevel
              }
            >
              {this.levelsArr.map((item, idx) => (
                <option key={idx} value={idx + 1}>
                  Level {idx + 1}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginLeft: 10 }}>
            <Typography
              style={{
                height: this.props.width > 600 ? "" : 35,
                width: this.props.width > 600 ? "" : 60
              }}
              className={"fontStyle19"}
            >
              Top Executive
            </Typography>
            <select
              onChange={e =>
                this.setState({
                  showTopEmps: e.target.value === "0" ? false : true
                })
              }
              style={{ width: this.props.width > 600 ? 75 : 60 }}
              className={classNames(classes.select, "fontStyle16")}
              defaultValue={this.state.showTopEmps ? "1" : "0"}
            >
              <option value={"0"}>No</option>
              <option value={"1"}>Yes</option>
            </select>
          </div>
          <div style={{ marginLeft: 10 }}>
            <Typography
              style={{
                height: this.props.width > 600 ? "" : 35,
                width: this.props.width > 600 ? "" : 50
              }}
              className={"fontStyle19"}
            >
              Labels
            </Typography>
            <select
              onChange={e =>
                this.setState({
                  showEdgesRelation: e.target.value === "0" ? false : true
                })
              }
              style={{ width: this.props.width > 600 ? 75 : 50 }}
              className={classNames(classes.select, "fontStyle16")}
              defaultValue={this.state.showEdgesRelation ? "1" : "0"}
            >
              <option value={"0"}>No</option>
              <option value={"1"}>Yes</option>
            </select>
          </div>
          <div style={{ marginLeft: 10 }}>
            <Typography
              style={{
                height: this.props.width > 600 ? "" : 35,
                width: this.props.width > 600 ? "" : 75
              }}
              className={"fontStyle19"}
            >
              Display Mode
            </Typography>
            <select
              onChange={e =>
                this.setState({
                  displayByLevel: e.target.value === "0" ? false : true
                })
              }
              style={{ width: 75 }}
              className={classNames(classes.select, "fontStyle16")}
              defaultValue={this.state.displayByLevel ? "1" : "0"}
            >
              <option value={"0"}>Hierarchical</option>
              <option value={"1"}>By Level</option>
            </select>
          </div>
          {this.props.width > 600 ? <SubsidiariesSelect /> : ""}
          {this.props.width > 600 ? <BranchesSelect /> : ""}
        </div>
        {this.props.width <= 600 ? (
          <div
            className={classes.divFilter}
            style={{ marginLeft: this.props.width > 600 ? 24 : 16 }}
          >
            <SubsidiariesSelect />
            <BranchesSelect />
          </div>
        ) : (
          ""
        )}
        {graph && graph.nodes.length > 0 ? (
          <div style={{ height: "100%" }}>
            <Graph
              style={{
                width: "100%",
                height: "100%",
                display: displayCanvas ? "" : "none"
              }}
              graph={graph}
              options={this.state.options}
              events={this.state.events}
            />
            {corpMapImg ? <img src={corpMapImg} alt={"corpMap"} /> : ""}
          </div>
        ) : (
          <NoDataImg />
        )}
      </div>
    );
  }
}

CorporationMap.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  corporateMap: PropTypes.object,
  addSupplier: PropTypes.func,
  supplier: PropTypes.object.isRequired,
  branches: PropTypes.any,
  subsidiaries: PropTypes.any
};

export default withStyles(styles)(CorporationMap);
