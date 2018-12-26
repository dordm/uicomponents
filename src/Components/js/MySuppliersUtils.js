class MySuppliersUtils {
  static getIsTradeStr(isTradeVal) {
    switch (isTradeVal) {
      case "both":
        return "Trade/Manufacture Company";
      case "yes":
        return "Trade Company";
      case "no":
        return "Manufacture Company";
      default:
        return "";
    }
  }
  static getGraphData(shipments) {
    var data = [];
    if (shipments !== null) {
      for (var i = 0; i < shipments.length; i++) {
        if (shipments[i] !== undefined && shipments[i] !== null) {
          var item = {
            period:
              "Y" +
              shipments[i].year.toString().substr(2) +
              "-Q" +
              shipments[i].month,
            Supplier: shipments[i].value_of_goods
          };
          data.push(item);
        }
      }
    }

    return data;
  }
}

export default MySuppliersUtils;
