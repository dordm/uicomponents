import Graph from "react-graph-vis";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import Utils from "./js/Utils";
import { BigBoxLayout } from "./LowLevelComponents/StyledComponents";
import Typography from "@material-ui/core/Typography";
import ReactTooltip from "react-tooltip";
import NoDataImg from "./LowLevelComponents/NoDataImg";
import PropTypes from "prop-types";
import classNames from "classnames";

const graph = {
  nodes: [
    { id: 1, label: "Node 1 dfasds ", title: "test title", color: "red" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" }
  ],
  edges: [
    { from: 1, to: 2, label: "rel1", title: "test title 2" },
    { from: 1, to: 3, label: "rel2" },
    { from: 2, to: 4, label: "rel3" },
    { from: 2, to: 5, label: "rel4" },
    { from: 3, to: 2, label: "rel5" }
  ]
};

const options = {
  layout: {
    hierarchical: false
  },
  nodes: {
    shape: "dot"
  },
  interaction: {
    hover: true,
    tooltipDelay: 0
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
  }
};

class CorporationMap extends Component {
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
        title:
          (item.properties.role ? "Role: " + item.properties.role + ". " : "") +
          (item.properties.shouldCapi && item.properties.shouldCapi > 0
            ? "Capital: " + item.properties.shouldCapi + ". "
            : "") +
          (item.properties.stockPercent
            ? "Percent: " + item.properties.stockPercent + "%"
            : "")
      }));

      const graphNodes = theNodes.map(item => ({
        id: item.id,
        label: item.properties.name,
        color:
          item.labels[0] === "Person"
            ? "blue"
            : item.id === supplier.id
            ? "green"
            : "red",
        title:
          item.labels[0] === "Person"
            ? item.properties.role
              ? "Role: " + item.properties.role
              : undefined
            : (item.properties.registCapi
                ? "Capital: " + item.properties.registCapi + ". "
                : "") +
              (item.properties.status
                ? "Status: " + item.properties.status
                : "")
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
    return (
      <BigBoxLayout
        style={{ height: "auto", overflow: "hidden" }}
        container={true}
        justify={"flex-start"}
      >
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
        {graph && graph.nodes.length > 0 ? (
          <Graph
            style={{ width: "100%", height: "100%" }}
            graph={graph}
            options={options}
            events={{}}
          />
        ) : (
          <NoDataImg />
        )}
      </BigBoxLayout>
    );
  }
}

CorporationMap.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CorporationMap);
