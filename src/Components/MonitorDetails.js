import React, { Component } from "react";
import PropTypes from "prop-types";
import EmployeesList from "./MonitorRender/EmployeesList";
import ShareholdersList from "./MonitorRender/ShareholdersList";
import BranchesList from "./MonitorRender/BranchesList";
import InvestmentsList from "./MonitorRender/InvestmentsList";
import AdministrativePunishmentsList from "./MonitorRender/AdministrativePunishmentsList";
import BusinessExceptionsList from "./MonitorRender/BusinessExceptionsList";
import AdministrativeLicensesList from "./MonitorRender/AdministrativeLicensesList";
import CertificatesList from "./MonitorRender/CertificatesList";
import ImportExportList from "./MonitorRender/ImportExportList";
import LawEnforcementList from "./MonitorRender/LawEnforcementList";
import CourtCasesList from "./MonitorRender/CourtCasesList";
import TrademarksList from "./MonitorRender/TrademarksList";
import DishonestList from "./MonitorRender/DishonestList";
import MortgageList from "./MonitorRender/MortgageList";
import PenaltiesList from "./MonitorRender/PenaltiesList";
import PatentsList from "./MonitorRender/PatentsList";
import PledgeList from "./MonitorRender/PledgeList";
import CountriesList from "./MonitorRender/CountriesList";
import ProductsList from "./MonitorRender/ProductsList";
import RegistrationStatus from "./MonitorRender/RegistrationStatus";
import Address from "./MonitorRender/Address";
import Capital from "./MonitorRender/Capital";
import LegalRepresentative from "./MonitorRender/LegalRepresentative";
import Score from "./MonitorRender/Score";
import Industry from "./MonitorRender/Industry";

class MonitorDetails extends Component {
  render() {
    const { data, width } = this.props;
    switch (data.CHANGE_FIELD) {
      case "INDUSTRY":
        return <Industry data={data} width={width} />;
      case "SCORE":
        return <Score data={data} width={width} />;
      case "LEGAL_REPRESENTATIVE":
        return <LegalRepresentative data={data} width={width} />;
      case "REGISTRATION_STATUS":
        return <RegistrationStatus data={data} width={width} />;
      case "ADDRESS":
        return <Address data={data} width={width} />;
      case "CAPITAL":
        return <Capital data={data} width={width} />;
      case "EMPLOYEES_LIST":
        return <EmployeesList width={width} data={data} />;
      case "SHAREHOLDERS_LIST":
        return <ShareholdersList width={width} data={data} />;
      case "BRANCHES_NEW":
      case "BRANCHES_CLOSE":
        return <BranchesList width={width} data={data} />;
      case "MISSING_FOREIGN_INVESTMENT":
      case "NEW_FOREIGN_INVESTMENT":
        return <InvestmentsList width={width} data={data} />;
      case "ADMINISTRATIVE_PUNISHMENT_LIST":
        return <AdministrativePunishmentsList width={width} data={data} />;
      case "BUSINESS_EXCEPTIONS_LIST":
        return <BusinessExceptionsList width={width} data={data} />;
      case "NEW_ADMINISTRATIVE_LICENSE":
      case "EXPIRED_ADMINISTRATIVE_LICENSE":
        return <AdministrativeLicensesList width={width} data={data} />;
      case "EXPIRED_CERTIFICATES_LIST":
      case "NEW_CERTIFICATES_LIST":
        return <CertificatesList width={width} data={data} />;
      case "IMPORT_EXPORT_LICENSE":
        return <ImportExportList width={width} data={data} />;
      case "LAW_ENFORCEMENT_LIST":
        return <LawEnforcementList width={width} data={data} />;
      case "COURT_CASES_LIST":
        return <CourtCasesList width={width} data={data} />;
      case "TRADEMARKS_LIST":
        return <TrademarksList width={width} data={data} />;
      case "DISHONEST_LIST":
        return <DishonestList width={width} data={data} />;
      case "MORTGAGE_LIST":
        return <MortgageList width={width} data={data} />;
      case "PENALTY_LIST":
        return <PenaltiesList width={width} data={data} />;
      case "PATENTS_LIST":
        return <PatentsList width={width} data={data} />;
      case "PLEDGE_LIST":
        return <PledgeList width={width} data={data} />;
      case "COUNTRIES_LIST":
        return <CountriesList width={width} data={data} />;
      case "PRODUCTS_LIST":
        return <ProductsList width={width} data={data} />;
      default:
        return <div />;
    }
  }
}

MonitorDetails.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
};

export default MonitorDetails;
