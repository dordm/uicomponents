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

const options = {
  layout: {
    hierarchical: false
  },
  nodes: {
    shape: "image",
    widthConstraint: 200
  },
  interaction: {
    hover: true,
    tooltipDelay: 0
  },
  physics: {
    enabled: false
  }
};

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
  divWrapper: {
    height: 500,
    overflow: "hidden",
    width: "100%",
    background: "white",
    margin: "1%",
    position:'relative'
  }
};

const events = {
  hoverNode: function(event) {
    let { node } = event;
    ChangeTooltip(node, event, "block");
  },
  blurNode: function(event) {
    let { node } = event;
    setTimeout(() => {
      ChangeTooltip(node, event, "none");
    }, 300);
  }
};

function ChangeTooltip(node, event, display) {
  console.log(event);
  console.log(document.getElementById("myTooltip"));
  if (display === "block" || !this.state.isOnTooltip)
    this.setState({
      xPos: event.pointer.DOM.x,
      yPos: event.pointer.DOM.y - 50,
      displayTooltip: display,
      selectedNode: node
    });
}

class CorporationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: 0,
      yPos: 0,
      displayTooltip: "none",
      isOnTooltip: false,
      selectedNode: ""
    };
    ChangeTooltip = ChangeTooltip.bind(this);
  }

  addSupplier(englishName, chineseName) {
    this.props.addSupplier(englishName, chineseName);
  }

  getGraph() {
    const { corporateMap, supplier } = this.props;
    if (corporateMap && supplier) {
      let theNodes = corporateMap.nodes.slice(0);
      let theRelations = corporateMap.relationships.slice(0);
      theRelations = theRelations.filter(item => item.type === "INVEST");

      const graphRelations = theRelations.map(item => ({
        from: item.startNode,
        to: item.endNode,
        label: "Invest",
        role: item.properties.role,
        shouldCapi: item.properties.shouldCapi,
        stockPercent: item.properties.stockPercent
      }));

      for (let i = 0; i < theNodes.length; i++) {
        theNodes[i].associate = graphRelations.filter(
          item => item.from === theNodes[i].id
        );
        for (let j = 0; j < theNodes[i].associate.length; j++) {
          const item = theNodes.find(
            item => item.id === theNodes[i].associate[j].to
          );
          theNodes[i].associate[j].relation = item;
        }
      }

      const graphNodes = theNodes.map(item => ({
        id: item.id,
        associate: item.associate,
        label: item.properties.englishName,
        nodeType: item.labels[0],
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
                  ? "\nStatus: " + item.properties.status
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
        edges: graphRelations
      };
    } else return null;
  }
  render() {
    const { classes } = this.props;
    const graph = this.getGraph();
    const currentNode = graph.nodes.find(
      node => node.id === this.state.selectedNode
    );
    return (
      <div className={classes.divWrapper}>
        <div
          onMouseEnter={() => this.setState({ isOnTooltip: true })}
          onMouseLeave={() =>
            this.setState({ displayTooltip: "none", isOnTooltip: false })
          }
          id={"myTooltip"}
          className={classNames("tooltip", "fontStyle15")}
          style={{
            position: "absolute",
            left: this.state.xPos,
            top: this.state.yPos,
            zIndex: 10,
            display: this.state.displayTooltip
          }}
        >
          <div>{currentNode ? currentNode.tooltipContent : ""}</div>
          <div>
            {currentNode && currentNode.associate.length > 0
              ? "\nAssociate Companies: "
              : ""}
            {currentNode
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
        </div>
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
          <div className={classes.circle} style={{ background: "#2fd565" }} />
          This Supplier
          <div className={classes.circle} style={{ background: "#a4afbf" }} />
          Other Companies
          <div className={classes.circle} style={{ background: "#4c84ff" }} />
          Persons
        </div>
        {graph && graph.nodes.length > 0 ? (
          <Graph
            style={{ width: "100%", height: "100%" }}
            graph={graph}
            options={options}
            events={events}
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
