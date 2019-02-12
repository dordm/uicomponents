import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import LineTwoCharts from "../Components/LineTwoCharts";
import LineChart from "../Components/LineChart";
import classNames from "classnames";
import Utils from "./js/Utils";
import ReactTooltip from "react-tooltip";
import {
  BigBoxLayout,
  StyledTitle
} from "./LowLevelComponents/StyledComponents";
import NoDataImg from "./LowLevelComponents/NoDataImg";

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

class TotalExports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report,
      selectMonths: 36
    };
  }

  getExportData() {
    let data = [];
    let industry, supplier;
    if (this.props.type === "import") {
      try {
        industry = this.state.report.import.shipmentsOverTime.industry;
        supplier = this.state.report.import.shipmentsOverTime.supplier;
      } catch (e) {
        industry = [];
        supplier = [];
      }
    } else {
      industry = this.state.report.shipmentsOverTime.industry;
      supplier = this.state.report.shipmentsOverTime.supplier;
    }

    for (let i = 0; i < supplier.length; i++) {
      try {
        let currIndustry = industry.find(
          item =>
            item.year == supplier[i].year && item.month == supplier[i].month
        );
        if (currIndustry !== null)
          data.push({
            name:
              "Q" +
              supplier[i].month +
              "-Y" +
              supplier[i].year.toString().substr(2),
            supplier: supplier[i].value_of_goods,
            industry: currIndustry.value_of_goods
          });
      } catch (e) {}
    }
    if (data.length < 2) {
      for (let i = 0; i < supplier.length; i++) {
        try {
          data.push({
            name:
              "Q" +
              supplier[i].month +
              "-Y" +
              supplier[i].year.toString().substr(2),
            supplier: supplier[i].value_of_goods
          });
        } catch (e) {}
      }
    }
    return data;
  }

  render() {
    const { classes } = this.props;
    const exportData = this.getExportData();
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
            {this.props.type === "import"
              ? "Total Imports in USD"
              : "Total Exports in USD"}
          </Typography>
          <div data-tip data-for={"tipExports"}>
            <img
              alt="info"
              src={Utils.getIcon("info")}
              className={classes.topIcon}
            />
          </div>
          <ReactTooltip
            className={classNames("tooltip", "fontStyle14")}
            id={"tipExports"}
            place="right"
            effect="solid"
          >
            <span>
              {this.props.type === "import"
                ? "The supplier’s import in USD, compared to tens of suppliers in the same industry."
                : "The supplier’s export in USD, compared to tens of suppliers in the same industry."}
            </span>
          </ReactTooltip>
        </StyledTitle>
        <br />
        <br />
        {exportData.length > 1 ? (
          // exportData[1].industry !== undefined ? (
          //   <LineTwoCharts
          //     height={"80%"}
          //     data={exportData}
          //     keyX={"name"}
          //     dataKey1={"supplier"}
          //     dataKey2={"industry"}
          //     legend={true}
          //     unit={true}
          //     tooltipUnit={"$"}
          //     width={this.props.width}
          //   />
          // ) : (
            <LineChart
              height={"80%"}
              data={exportData}
              keyX={"name"}
              dataKey={"supplier"}
              legend={true}
              unit={true}
              tooltipUnit={"$"}
              width={this.props.width}
            />
          // )
        ) : (
          <NoDataImg />
        )}
      </BigBoxLayout>
    );
  }
}

TotalExports.propTypes = {
  classes: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  type: PropTypes.string
};

export default withStyles(styles)(TotalExports);
