import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ShareholdersExpansion from './ShareholdersExpansion'
import CorporationMap from './CorporationMap'

class MoreDataShareholders extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  componentDidMount() {
    const { corporateMap } = this.props;
    const persons = corporateMap.nodes.filter(
      item => item.labels[0] === "Person"
    );
    const companies = corporateMap.nodes.filter(
      item => item.labels[0] === "Company"
    );
    const investRelations = corporateMap.relationships.filter(
      item => item.type === "INVEST"
    );
    const legalRelations = corporateMap.relationships.filter(
      item => item.type === "LEGAL"
    );
    const employRelations = corporateMap.relationships.filter(
      item => item.type === "EMPLOY"
    );

    const supplier = companies.find(
      item => item.properties.name === this.props.chineseName
    );

    const supplierId = supplier.id;

    const shareholdersRelations = investRelations.filter(
      item => item.endNode === supplierId
    );

    let shareholders = [];

    for (let i = 0; i < shareholdersRelations.length; i++) {
      const shareholder = corporateMap.nodes.find(
        item => item.id === shareholdersRelations[i].startNode
      );
      const associateRelations = investRelations.filter(
        item => item.startNode === shareholder.id && item.endNode !== supplierId
      );
      let associate = [];
      for (let j = 0; j < associateRelations.length; j++) {
        const associateComp = companies.find(
          item => item.id === associateRelations[j].endNode
        );
        associate.push(associateComp);
      }
      shareholders.push({
        id: shareholder.id,
        label: shareholder.labels[0],
        properties: shareholder.properties,
        sharesProperties: shareholdersRelations[i].properties,
        associate
      });
    }

    this.setState({
      persons,
      supplier,
      companies,
      investRelations,
      legalRelations,
      employRelations,
      supplierId,
      shareholders
    });
  }
  render() {
    const { corporateMap } = this.props;
    console.log(corporateMap)
    return <Grid justify={"center"} item={true} md={12} container={true} direction={"row"} >
      <ShareholdersExpansion shareholders={this.state.shareholders} width={this.props.width}/>
      <CorporationMap corporateMap={corporateMap} supplier={this.state.supplier} width={this.props.width}/>
    </Grid>;
  }
}

export default MoreDataShareholders;
