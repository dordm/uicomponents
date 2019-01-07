import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import WebsiteDetails from "./WebsiteDetails";
import WebsiteChanges from "./WebsiteChanges";
import TwoInfoCard from "./TwoInfoCard";

class MoreDataWebsite extends Component {
  render() {
    const { websiteArchive, websiteWhoIs } = this.props;
    return (
      <Grid item={true} md={12} container={true} direction={"row"}>
        <WebsiteDetails
          width={this.props.width}
          websiteWhoIs={websiteWhoIs.WhoisRecord}
        />
        <WebsiteChanges
          width={this.props.width}
          websiteChanges={websiteArchive.latestChanges}
        />
        <TwoInfoCard
          width={this.props.width}
          name={"Website Lifetime"}
          date={""}
          infoText={'Website lifetime, based on "Who Is Website"'}
          content1={Math.round(
            websiteWhoIs.WhoisRecord.estimatedDomainAge / 365
          )}
          content1Lbl={"Years"}
          content2={""}
          content2Lbl={""}
          bottomIcon={null}
          bottomMsg={""}
        />
        <TwoInfoCard
          width={this.props.width}
          name={"Website Changes (last year)"}
          date={""}
          infoText={'Website changes in the last year, based on "Web Archive"'}
          content1={
            websiteArchive.latestChanges &&
            websiteArchive.latestChanges.filter(
              change => change[1].substr(0, 4) == new Date().getFullYear() - 1
            ).length
          }
          content1Lbl={"Changes"}
          content2={""}
          content2Lbl={""}
          bottomIcon={null}
          bottomMsg={""}
        />
        <TwoInfoCard
          width={this.props.width}
          name={"Domain Status"}
          date={""}
          infoText={'Domain status, based on "Who Is Website"'}
          content1={websiteWhoIs.WhoisRecord.status}
          content1Lbl={"Status"}
          content2={""}
          content2Lbl={""}
          bottomIcon={null}
          bottomMsg={""}
        />
      </Grid>
    );
  }
}

export default MoreDataWebsite;
