import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import WebsiteDetails from "./WebsiteDetails";
import WebsiteChanges from "./WebsiteChanges";
import TwoInfoCard from "./TwoInfoCard";
import Utils from "./js/Utils";

class MoreDataWebsite extends Component {
  getLastYearChanges() {
    const { websiteArchive } = this.props;
    return (
      websiteArchive.latestChanges &&
      websiteArchive.latestChanges.filter(
        change => change[1].substr(0, 4) == new Date().getFullYear() - 1
      ).length
    );
  }

  getBtmMsgChanges(lastYearChanges) {
    return lastYearChanges === 0
      ? "No site changes over the last year"
      : "Site actively maintained";
  }

  getBtmIconChanges(lastYearChanges) {
    return lastYearChanges === 0
      ? Utils.getIconByNumber(3)
      : Utils.getIconByNumber(2);
  }

  getWebsiteLifetime() {
    const { websiteWhoIs } = this.props;
    try {
      return Math.round(websiteWhoIs.WhoisRecord.estimatedDomainAge / 365);
    } catch (e) {
      return "";
    }
  }

  getWebsiteStatuses() {
    const { websiteWhoIs } = this.props;
    const status = websiteWhoIs.WhoisRecord.status;
    if (status) {
      const statuses = status
        .split(" ")
        .filter(
          item =>
            item !== "serverDeleteProhibited" &&
            item !== "serverRenewProhibited" &&
            item !== "serverTransferProhibited" &&
            item !== "serverUpdateProhibited" &&
            item !== "clientDeleteProhibited" &&
            item !== "clientRenewProhibited" &&
            item !== "clientTransferProhibited" &&
            item !== "clientUpdateProhibited" &&
            item !== "addPeriod" &&
            item !== "autoRenewPeriod" &&
            item !== "renewPeriod" &&
            item !== "transferPeriod" &&
            item !== "pendingUpdate" &&
            item !== "pendingTransfer"
        );
      let res = "";
      if (statuses.length === 0) return "ok";
      for (let i = 0; i < statuses.length; i++) {
        switch (statuses[i]) {
          case "inactive":
            res += "inactive, ";
            break;
          case "ok":
            res += "ok, ";
            break;
          case "pendingCreate":
            res += "pendingCreate, ";
            break;
          case "pendingDelete":
            res += "pendingDelete, ";
            break;
          case "pendingRenew":
            res += "pendingRenew, ";
            break;
          case "pendingRestore":
            res += "pendingRestore, ";
            break;
          case "redemptionPeriod":
            res += "redemptionPeriod, ";
            break;
          case "serverHold":
            res += "serverHold, ";
            break;
          case "clientHold":
            res += "clientHold, ";
            break;
        }
      }
      if (res.length > 0) return res.substr(0, res.length - 2);
      else return "";
    } else return "";
  }

  getWebsiteStatus(websiteStatuses) {
    const statuses = websiteStatuses.split(", ");
    for (let i = 0; i < statuses.length; i++) {
      switch (statuses[i]) {
        case "inactive":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The domain name cannot be used because the name servers haven't been entered or there is a problem with the name servers"
          };
        case "ok":
          return {
            websiteStatus: "Good",
            websiteStatusMsg:
              "The domain name is active and can be used for websites, email, or to register name servers"
          };
        case "pendingCreate":
          return {
            websiteStatus: "Good",
            websiteStatusMsg:
              "Request to create domain has been received and is being processed"
          };
        case "pendingDelete":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The domain expired and is no longer available for redemption. The registry is about to erase it. A domain name remains in this status for five days before it is deleted"
          };
        case "pendingRenew":
          return {
            websiteStatus: "Good",
            websiteStatusMsg:
              "Request to renew your domain has been received and is being processed"
          };
        case "pendingRestore":
          return {
            websiteStatus: "Good",
            websiteStatusMsg:
              "A domain name that had expired is being restored to ACTIVE status"
          };
        case "redemptionPeriod":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The domain name expired, and the registry is waiting for 30 days as a precautionary measure before releasing it"
          };
        case "serverHold":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The registry placed the domain name on hold, and it cannot be used"
          };
        case "clientHold":
          return {
            websiteStatus: "Bad",
            websiteStatusMsg:
              "The registrar placed the domain name on hold, and it cannot be used"
          };
      }
    }
    return { websiteStatus: "", websiteStatusMsg: "" };
  }

  getGlobalRank() {
    const { websiteSimilarWeb } = this.props;
    if (websiteSimilarWeb.global_rank) {
      const rankYear = websiteSimilarWeb.global_rank[0].date.substr(0, 4);
      const beforeRank = websiteSimilarWeb.global_rank[0].global_rank;
      let rankMsg = "",
        rankIcon = null;
      let rank =
        websiteSimilarWeb.global_rank[websiteSimilarWeb.global_rank.length - 1]
          .global_rank;
      if (rank > beforeRank) {
        const changeRate = ((rank - beforeRank) * 100) / beforeRank;
        rankMsg = `The website rank increased by ${changeRate.toFixed(
          0
        )}% during the last quarter of ${rankYear}`;
        rankIcon = Utils.getIconByNumber(2);
      }
      if (beforeRank > rank) {
        const changeRate = ((beforeRank - rank) * 100) / rank;
        rankMsg = `The website rank decreased by ${changeRate.toFixed(
          0
        )}% during the last quarter of ${rankYear}`;
        rankIcon = Utils.getIconByNumber(3);
      }
      return {
        globalRank: new Intl.NumberFormat("en").format(rank),
        rankMsgType: rankIcon,
        rankMsg
      };
    } else return { globalRank: null, rankMsgType: null, rankMsg: "" };
  }

  render() {
    const { websiteArchive, websiteWhoIs } = this.props;
    const lastYearChanges = this.getLastYearChanges();
    const btmMsgChanges = this.getBtmMsgChanges(lastYearChanges);
    const btmIconChanges = this.getBtmIconChanges(lastYearChanges);
    const websiteLifetime = this.getWebsiteLifetime();
    const websiteStatuses = this.getWebsiteStatuses();
    const { websiteStatus, websiteStatusMsg } = this.getWebsiteStatus(
      websiteStatuses
    );
    const { globalRank, rankMsgType, rankMsg } = this.getGlobalRank();

    return (
      <div>
        {/*<Grid item={true} md={12} container={true} direction={"row"}>*/}
        <TwoInfoCard
          width={this.props.width}
          name={"Website Lifetime"}
          date={""}
          infoText={'Website lifetime, based on "Who Is Website"'}
          content1={websiteLifetime}
          content1Lbl={"Years"}
          content2={""}
          content2Lbl={""}
          bottomIcon={null}
          bottomMsg={""}
        />
        <TwoInfoCard
          width={this.props.width}
          name={"Global Rank"}
          date={""}
          infoText={
            'Website global rank in the last year, based on "Similar Web"'
          }
          content1={globalRank}
          content1Lbl={"Global Rank"}
          content2={""}
          content2Lbl={""}
          bottomIcon={rankMsgType}
          bottomMsg={rankMsg}
        />
        <TwoInfoCard
          width={this.props.width}
          name={"Domain Status"}
          date={""}
          infoText={'Domain status, based on "Who Is Website"'}
          content1={websiteStatus}
          content1Lbl={websiteStatuses ? "Statuses: " + websiteStatuses : ""}
          content2={""}
          content2Lbl={""}
          bottomIcon={
            websiteStatus === "Good"
              ? Utils.getIconByNumber(2)
              : websiteStatus === "Bad"
              ? Utils.getIconByNumber(3)
              : null
          }
          bottomMsg={websiteStatusMsg}
        />
        <WebsiteDetails
          width={this.props.width}
          websiteWhoIs={websiteWhoIs.WhoisRecord}
        />
        <WebsiteChanges
          width={this.props.width}
          websiteChanges={websiteArchive.latestChanges}
          bottomMsg={btmMsgChanges}
          bottomIcon={btmIconChanges}
        />
        {/*</Grid>*/}
      </div>
    );
  }
}

export default MoreDataWebsite;
