import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import PieChart from "./LowLevelComponents/PieChart";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import {
  BigBoxLayout,
  StyledTitle
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = {
  select: {
    width: 90,
    marginTop: 12,
    border: "1px solid #E4E8ED",
    boxSizing: "border-box",
    borderRadius: 2,
    height: 32,
    background: "#ffffff"
  },
  topIcon: {
    marginTop: -2,
    marginLeft: 6
  }
};

class TopProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      selectMonths: "12"
    };
  }

  getProducts() {
    switch (this.state.selectMonths) {
      case "4":
        if (this.props.type === "import") {
          if (this.state.report.import !== undefined)
            return this.state.report.import.shipmentByProduct.supplier.lastQuarter.sort(
              function(a, b) {
                return b.value_of_goods - a.value_of_goods;
              }
            );
          else return [];
        } else
          return this.state.report.shipmentByProduct.supplier.lastQuarter.sort(
            function(a, b) {
              return b.value_of_goods - a.value_of_goods;
            }
          );
      case "12":
        if (this.props.type === "import") {
          if (this.state.report.import !== undefined)
            return this.state.report.import.shipmentByProduct.supplier.lastYear.sort(
              function(a, b) {
                return b.value_of_goods - a.value_of_goods;
              }
            );
          else return [];
        } else
          return this.state.report.shipmentByProduct.supplier.lastYear.sort(
            function(a, b) {
              return b.value_of_goods - a.value_of_goods;
            }
          );
      case "36":
        if (this.props.type === "import") {
          if (this.state.report.import !== undefined)
            return this.state.report.import.shipmentByProduct.supplier.last3Years.sort(
              function(a, b) {
                return b.value_of_goods - a.value_of_goods;
              }
            );
          else return [];
        } else
          return this.state.report.shipmentByProduct.supplier.last3Years.sort(
            function(a, b) {
              return b.value_of_goods - a.value_of_goods;
            }
          );
      default:
        return [];
    }
  }

  getPeriodStr() {
    switch (this.state.selectMonths) {
      case "4":
        return "last quarter";
      case "12":
        return "last year";
      case "36":
        return "last 3 years";
      default:
        return "";
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <BigBoxLayout
        container={true}
        justify={"flex-start"}
        alignItems={"flex-start"}
      >
        <StyledTitle
          width={this.props.width}
          mobileWidth={"60%"}
          otherWidth={"70%"}
        >
          <Typography className={classNames("fontStyle1")}>
            Top Products in USD
          </Typography>
          <div data-tip data-for={"tipProducts"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipProducts"}
            place="right"
            effect="solid"
          >
            <span>
              {this.props.type === "import"
                ? "Top Products, imported by the supplier with data based on governmental custom sources as declared by the supplier (defined in the Bill of lading)."
                : "Top Products, exported by the supplier with data based on governmental custom sources as declared by the supplier (defined in the Bill of lading)."}
            </span>
          </ReactTooltip>
        </StyledTitle>
        <select
          onChange={e => this.setState({ selectMonths: e.target.value })}
          className={classNames(classes.select, "fontStyle16")}
          defaultValue={this.state.selectMonths}
        >
          <option value={"4"}>Last quarter</option>
          <option value={"12"}>Last year</option>
          <option value={"36"}>Last 3 years</option>
        </select>
        {this.getProducts().length > 0 ? (
          <PieChart
            width={this.props.width}
            data={this.getProducts().slice(0, 4)}
            height={"80%"}
            name={"hscode_desc"}
            unit={"$"}
            dataKey={"value_of_goods"}
            cx={this.props.width > 600 ? 110 : 90}
            cy={100}
            innerRadius={this.props.width > 600 ? 70 : 55}
            outerRadius={this.props.width > 600 ? 85 : 70}
            productsTooltip={true}
            period={this.getPeriodStr()}
            title={"Top Products in USD"}
          />
        ) : (
          <NoDataImg />
        )}
      </BigBoxLayout>
    );
  }
}

TopProducts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopProducts);
