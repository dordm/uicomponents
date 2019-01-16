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

const StyledDivTooltip = styled.div`
  position: absolute;
  left: ${props => props.xPos}px;
  top: ${props => props.yPos}px;
  z-index: 10;
  display: ${props => props.displayTooltip};
  max-height: 200px;
  overflow-y: auto;
`;

const styles = {
  title: {
    marginTop: 19,
    marginLeft: 24,
    textAlign: "left",
    display: "flex",
    height: "min-content"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  },
  divDictionary: {
    marginLeft: 22,
    display: "flex",
    marginTop: 3
  },
  circle: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginTop: 3,
    marginRight: 4,
    marginLeft: 4
  },
  legend: {
    marginRight: 4,
    marginLeft: 4,
    width: 14,
    height: 14
  },
  divWrapper: {
    height: 500,
    overflow: "hidden",
    width: "100%",
    background: "white",
    margin: "1%",
    position: "relative"
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
      selectedNode: "",
      events: {
        hoverNode: event => {
          let { node } = event;
          this.changeTooltip(node, event, "block");
        },
        blurNode: event => {
          let { node } = event;
          setTimeout(() => {
            this.changeTooltip(node, event, "none");
          }, 300);
        }
      },
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
        }
      }
    };
  }

  changeTooltip(node, event, display) {
    if (display === "block" || !this.state.isOnTooltip)
      this.setState({
        xPos: event.pointer.DOM.x,
        yPos: event.pointer.DOM.y - 50,
        displayTooltip: display,
        selectedNode: node
      });
  }

  addSupplier(englishName, chineseName) {
    this.props.addSupplier(englishName, chineseName);
  }

  getGraph() {
    const { corporateMap, supplier } = this.props;
    if (corporateMap && supplier) {
      let theNodes = corporateMap.nodes.slice(0);
      let theRelations = corporateMap.relationships.slice(0);
      theRelations = theRelations.filter(
        item => item.type === "INVEST" && item.startNode !== supplier.id
      );

      const graphRelations = theRelations.map(item => ({
        from: item.startNode,
        to: item.endNode,
        role: item.properties.role,
        shouldCapi: item.properties.shouldCapi,
        stockPercent: item.properties.stockPercent
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
          associate
        });
      }

      let finalNodes = [];
      let thisSupplier = theNodes.find(item => item.id === supplier.id);
      thisSupplier.group = "myGroup";
      finalNodes.push(thisSupplier);

      for (let i = 0; i < shareholders.length; i++) {
        shareholders[i].group = i.toString();
        finalNodes.push(shareholders[i]);
        for (let j = 0; j < shareholders[i].associate.length; j++)
          if (shareholders[i].associate[j].relation.id !== supplier.id) {
            const itemToAdd = theNodes.find(
              item => item.id === shareholders[i].associate[j].relation.id
            );
            itemToAdd.group = i.toString();
            finalNodes.push(itemToAdd);
          }
      }

      finalNodes = finalNodes.sort(function(a, b) {
        return Number.parseInt(b.id) - Number.parseInt(a.id);
      });
      finalNodes = finalNodes.filter(
        (item, idx) => idx === 0 || item.id != finalNodes[idx - 1].id
      );

      const finalRelations = graphRelations.map(item => ({
        from: item.to === supplier.id ? item.to : item.from,
        to: item.to === supplier.id ? item.from : item.to,
        role: item.role,
        shouldCapi: item.shouldCapi,
        stockPercent: item.stockPercent
      }));

      const graphNodes = finalNodes.map(item => ({
        id: item.id,
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
        image:
          item.labels[0] === "Person"
            ? require("./images/person.svg")
            : item.id === supplier.id
            ? require("./images/businessGreen.svg")
            : require("./images/businessGrey.svg")
      }));
      return {
        nodes: graphNodes,
        edges: finalRelations
      };
    } else return null;
  }

  render() {
    const { classes } = this.props;
    const graph = this.getGraph();
    const currentNode = graph && graph.nodes.find(
      node => node.id === this.state.selectedNode
    );
    return (
      <div className={classes.divWrapper}>
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
        <div className={classes.title}>
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
        <div className={classNames(classes.divDictionary, "fontStyle8")}>
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
        {graph && graph.nodes.length > 0 ? (
          <Graph
            style={{ width: "100%", height: "100%" }}
            graph={graph}
            options={this.state.options}
            events={this.state.events}
          />
        ) : (
          <NoDataImg />
        )}
      </div>
    );
  }
}

CorporationMap.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CorporationMap);
