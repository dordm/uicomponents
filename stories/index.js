import React from "react";
import { storiesOf } from "@storybook/react";
import CompanyScore from "../src/Components/CompanyScore";
import RecommendCredit from "../src/Components/RecommendCredit";
import TopInsights from "../src/Components/TopInsights";
import PieChartWrapper from "../src/Components/PieChartWrapper";
import Industry from "../src/Components/Industry";
import TopProducts from "../src/Components/TopProducts";
import TotalExports from "../src/Components/TotalExports";
import TopCountries from "../src/Components/TopCountries";
import RegistrationDetails from "../src/Components/RegistrationDetails";
import SocialMedia from "../src/Components/SocialMedia";
import Certifications from "../src/Components/Certifications";
import Media from "../src/Components/Media";
import InfoCard from "../src/Components/InfoCard";
import TwoInfoCard from "../src/Components/TwoInfoCard";
import PublicFinancial from "../src/Components/PublicFinancial";
import PublicFinancialRatio from "../src/Components/PublicFinancialRatio";
import MoreDataCourtCases from "../src/Components/MoreDataCourtCases";
import MoreDataEmployees from "../src/Components/MoreDataEmployees";
import MoreDataLawEnforcement from "../src/Components/MoreDataLawEnforcement";
import reportData from "./MockData/reportData";
import "../src/Components/css/fonts.css";
import "../src/Components/css/tooltip.css";
import Utils from "../src/Components/js/Utils";
import CompanyChanges from "../src/Components/CompanyChanges";
import WebsiteChanges from "../src/Components/WebsiteChanges";
import CorporationMap from "../src/Components/CorporationMap";

const investmentsList =
  reportData.foreignInvestmentList != null &&
  reportData.foreignInvestmentList !== undefined
    ? reportData.foreignInvestmentList.map(investment => ({
        name: investment.name,
        icon: "branch"
      }))
    : [];

const branchesList =
  reportData.branchesData != null && reportData.branchesData !== undefined
    ? reportData.branchesData.branches.map(branch => ({
        name: branch.name,
        icon: "branch"
      }))
    : [];

storiesOf("Components", module)
  .add("Company Score", () => (
    <CompanyScore width={window.innerWidth} report={reportData} />
  ))
  .add("Recommend Credit", () => (
    <RecommendCredit width={window.innerWidth} report={reportData} />
  ))
  .add("Top Insights", () => (
    <TopInsights
      width={window.innerWidth}
      category={"Overview"}
      data={reportData.insights}
    />
  ))
  .add("Corporation Graph", () => (
    <CorporationMap
      width={window.innerWidth}
      corporateMap={reportData.corporateMap}
      supplier={reportData.corporateMap.nodes.find(
        item => item.properties.name === reportData.originalName
      )}
      subsidiaries={reportData.foreignInvestmentList}
      branches={reportData.branchesData}
    />
  ))
  .add("Shareholders", () => (
    <PieChartWrapper
      width={window.innerWidth}
      infoText={"The company current shareholder."}
      title={"Shareholders"}
      data={reportData.shareholders}
      bottomIcon={2}
      bottomMsg={
        "this supplier his good shareholder and not good dasvsdfd asddffdvsda fgasdfasdfdv savsdvsad dfsavsdvdswf"
      }
      dataKey={"percent"}
      corporateMap={reportData.corporateMap}
      chineseName={reportData.originalName}
    />
  ))
  .add("Industry", () => (
    <Industry width={window.innerWidth} report={reportData} />
  ))
  .add("Website Changes", () => (
    <WebsiteChanges
      width={window.innerWidth}
      websiteChanges={reportData.websiteArchive.latestChanges}
    />
  ))
  .add("Top Products", () => (
    <TopProducts width={window.innerWidth} report={reportData} />
  ))
  .add("Total Exports", () => (
    <TotalExports width={window.innerWidth} report={reportData} />
  ))
  .add("Top Countries", () => (
    <TopCountries width={window.innerWidth} report={reportData} />
  ))
  .add("Registration Details", () => (
    <RegistrationDetails width={window.innerWidth} report={reportData} />
  ))
  .add("Company Changes", () => (
    <CompanyChanges width={window.innerWidth} report={reportData} />
  ))
  .add("Social Media", () => (
    <SocialMedia width={window.innerWidth} report={reportData} />
  ))
  .add("Certifications", () => (
    <Certifications width={window.innerWidth} report={reportData} />
  ))
  .add("Top Media", () => (
    <Media width={window.innerWidth} report={reportData} />
  ))
  .add("Public Financial", () => (
    <PublicFinancial
      width={window.innerWidth}
      data={reportData.publicFinancial}
      date={"Jan 2017 - Dec 2017"}
    />
  ))
  .add("Public Financial Ratio", () => (
    <PublicFinancialRatio
      width={window.innerWidth}
      date={"Jan 2017 - Dec 2017"}
      data={reportData.publicFinancialRatio}
    />
  ))
  .add("Info Card", () => (
    <InfoCard
      width={window.innerWidth}
      name={"Total Exports"}
      infoText={
        "The supplier’s total export last year in USD (not including local sales), based on governmental custom data."
      }
      date={""}
      content={Utils.fixNumber("$" + reportData.totalExport.content)}
      bottomIcon={Utils.getIconByNumber(
        reportData.totalExport.totalExportMsgType
      )}
      bottomMsg={reportData.totalExport.totalExportMsg}
    />
  ))
  .add("Info Card with Date", () => (
    <InfoCard
      width={window.innerWidth}
      name={"Total Exports"}
      infoText={
        "The supplier’s total export last year in USD (not including local sales), based on governmental custom data."
      }
      date={reportData.totalExport.date}
      content={Utils.fixNumber("$" + reportData.totalExport.content)}
      bottomIcon={Utils.getIconByNumber(
        reportData.totalExport.totalExportMsgType
      )}
      bottomMsg={reportData.totalExport.totalExportMsg}
    />
  ))
  .add("Two Info Card", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Law court cases in the last 2 years"}
      infoText={
        "A lawsuit which the company involved as plaintiff or defendant."
      }
      date={""}
      content1={reportData.lawCases.content1}
      content1Lbl={reportData.lawCases.content1Lbl}
      content2={reportData.lawCases.content2}
      content2Lbl={reportData.lawCases.content2Lbl}
      bottomIcon={Utils.getIconByNumber(reportData.lawCases.bottomIcon)}
      bottomMsg={reportData.lawCases.bottomMsg}
      moreBtn={true}
      moreTitle={"Court Cases"}
      moreData={<MoreDataCourtCases moreData={reportData.courtCases} />}
    />
  ))
  .add("Two Info Card with single value", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Number of Employees"}
      infoText={
        "Estimated number of employees, usually range. The information gathered from the company reporting or web data."
      }
      date={""}
      content1={reportData.employees.content1}
      content1Lbl={reportData.employees.content1Lbl}
      content2={""}
      content2Lbl={""}
      bottomIcon={Utils.getIconByNumber(reportData.employees.bottomIcon)}
      bottomMsg={reportData.employees.bottomMsg}
    />
  ))
  .add("Two Info Card with drill down", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"Employees"}
      date={""}
      infoText={"The company employees"}
      content1={"100-200"}
      content1Lbl={"(Web Data)"}
      content2={""}
      content2Lbl={""}
      bottomIcon={null}
      bottomMsg={""}
      moreBtn={true}
      moreTitle={"Employees"}
      moreData={
        reportData.employeesList.length > 0 ||
        reportData.jobsList.length > 0 ? (
          <MoreDataEmployees
            moreData={reportData.employeesList}
            moreData2={reportData.jobsList}
            moreSubTitle={"Employees"}
            moreSubTitle2={"Job "}
          />
        ) : null
      }
    />
  ))
  .add("Law Enforcement example", () => (
    <TwoInfoCard
      width={window.innerWidth}
      name={"law enforcement"}
      date={""}
      infoText={"The company subsidiaries and branches"}
      content1={reportData.lawEnforcement.length}
      content1Lbl={"law enforcement"}
      content2Lbl={""}
      bottomIcon={Utils.getIconByNumber(4)}
      bottomMsg={"some text message"}
      moreBtn={true}
      moreTitle={"Enforcement List"}
      moreData={<MoreDataLawEnforcement moreData={reportData.lawEnforcement} />}
    />
  ));
