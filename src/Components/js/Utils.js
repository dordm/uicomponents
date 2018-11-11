class Utils {
    static getImage(name) {
        return require('../images/' + name)
    }
  static getIcon(iconType) {
    switch (iconType) {
      case "info":
        return require("../images/Info.png");
      case "upArrow":
        return require("../images/Arrow-Up.png");
      case "downArrow":
        return require("../images/Arrow-Down.png");
      case "good":
        return require("../images/Selected.svg");
      case "bad":
        return require("../images/Warning.svg");
      case "insight":
        return require("../images/Insight.svg");
      case "natural":
        return require("../images/Insight.svg");
      case "branch":
        return require("../images/branch.svg");
      default:
        return null;
    }
  }

  static haveWebsite(report) {
    return (
      report != null &&
      report.website != null &&
      (report.website.includes("www") || report.website.includes("http")) &&
      !report.website.includes("inactive")
    );
  }

  static getIconByNumber(iconType) {
    switch (iconType) {
      case 4:
        return require("../images/Arrow-Up.png");
      case 5:
        return require("../images/Arrow-Down.png");
      case 2:
        return require("../images/Selected.svg");
      case 3:
        return require("../images/Warning.svg");
      default:
        return require("../images/Insight.svg");
    }
  }

  static getProfitabilityMsg(val){
      switch (val) {
          case "0 to 10%":
          case "0 to 10%.":
          case "10% to 50%":
          case "10% to 50%.":
              return "Net profit margin";
          case "-10% to 0":
          case "-10% to 0.":
          case "-50% to -10%":
          case "-50% to -10%.":
              return "Net loss margin";
          default:
            return "";
      }
  }

    static getProfitabilityType(val){
        let profitabilityType, profitabilityMsg;
        switch (val) {
            case "0 to 10%":
            case "0 to 10%.":
            case "10% to 50%":
            case "10% to 50%.":
                return 2;
            case "-10% to 0":
            case "-10% to 0.":
            case "-50% to -10%":
            case "-50% to -10%.":
                return 3;
            default:
                return "";
        }
    }

  static getEmployeeMsg(val) {
    let minVal;
    let newVal = val
      .split("")
      .filter(ch => (ch >= "0" && ch <= "9") || ch === "-")
      .join("");
    if (newVal.includes("-")) {
      minVal = newVal.split("-")[0];
    } else minVal = newVal;

    if (minVal >= 1 && minVal <= 100) return "Small company compared to other";
    else if (minVal >= 101) return "Large company compared to other";
    else return "";
  }

  static getEmployeeIcon(val) {
    let minVal;
    let newVal = val
      .split("")
      .filter(ch => (ch >= "0" && ch <= "9") || ch === "-")
      .join("");
    if (newVal.includes("-")) {
      minVal = newVal.split("-")[0];
    } else minVal = newVal;

    if (minVal >= 1 && minVal <= 100) return this.getIconByNumber(5);
    else if (minVal >= 101) return this.getIconByNumber(4);
    else return this.getIconByNumber("");
  }

  static getParenthesisInfo(val) {
    return val.indexOf("(") !== -1 ? val.substr(val.indexOf("(")) : "";
  }

  static deleteParenthesisInfo(val) {
    if (val.indexOf("(") !== -1) return val.substr(0, val.indexOf("("));
    else return val;
  }

  static getLands() {
    return [
      "Any Destination",
      "United States",
      "Latin America",
      "Europe",
      "Asia",
      "Africa",
      "Middle East"
    ];
  }

  static getCountries() {
    return [
      "Afghanistan",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegowina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Cayman Islands",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands",
      "Colombia",
      "Comoros",
      "Congo",
      "Congo, the Democratic Republic of the",
      "Cook Islands",
      "Costa Rica",
      "Cote d'Ivoire",
      "Croatia (Hrvatska)",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "East Timor",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands (Malvinas)",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "France Metropolitan",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard and Mc Donald Islands",
      "Holy See (Vatican City State)",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran (Islamic Republic of)",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea, Democratic People's Republic of",
      "Korea, Republic of",
      "Kuwait",
      "Kyrgyzstan",
      "Lao, People's Democratic Republic",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libyan Arab Jamahiriya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau",
      "Macedonia, The Former Yugoslav Republic of",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia, Federated States of",
      "Moldova, Republic of",
      "Monaco",
      "Mongolia",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia (Slovak Republic)",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "Spain",
      "Sri Lanka",
      "St. Helena",
      "St. Pierre and Miquelon",
      "Sudan",
      "Suriname",
      "Svalbard and Jan Mayen Islands",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Taiwan, Province of China",
      "Tajikistan",
      "Tanzania, United Republic of",
      "Thailand",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "United States Minor Outlying Islands",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (British)",
      "Virgin Islands (U.S.)",
      "Wallis and Futuna Islands",
      "Western Sahara",
      "Yemen",
      "Yugoslavia",
      "Zambia",
      "Zimbabwe"
    ];
  }

  static getCountry(countryName) {
    switch (countryName) {
      case "Israel":
        return require("../images/countries/IL.svg");
      case "Brazil":
        return require("../images/countries/BR.svg");
      case "China":
        return require("../images/countries/CN.svg");
      case "CHINA":
        return require("../images/countries/CN.svg");
      case "United Kingdom":
        return require("../images/countries/GB.svg");
      case "Canada":
        return require("../images/countries/CA.svg");
      case "Korea, Rep.":
        return require("../images/countries/KR.svg");
      case "United States":
        return require("../images/countries/US.svg");
      case "Italy":
        return require("../images/countries/IT.svg");
      case "Vietnam":
        return require("../images/countries/VN.svg");
      case "Mexico":
        return require("../images/countries/MX.svg");
      case "Uzbekstan":
        return require("../images/countries/UZ.svg");
      case "Germany":
        return require("../images/countries/DE.svg");
      case "Netherlands":
        return require("../images/countries/NL.svg");
      case "Turkey":
        return require("../images/countries/TR.svg");
      case "Russia":
        return require("../images/countries/RU.svg");
      case "Ukraine":
        return require("../images/countries/UA.svg");
      case "Colombia":
        return require("../images/countries/CO.svg");
      case "Finland":
        return require("../images/countries/FI.svg");
      case "Iran":
        return require("../images/countries/IR.svg");
      case "France":
        return require("../images/countries/FR.svg");
      case "Poland":
        return require("../images/countries/PL.svg");
      case "Belgium":
        return require("../images/countries/BE.svg");
      case "Spain":
        return require("../images/countries/ES.svg");
      case "Venezuela":
        return require("../images/countries/VE.svg");
      case "Saudi Arabia":
        return require("../images/countries/SA.svg");
      case "Kuwait":
        return require("../images/countries/KW.svg");
      case "Uruguay":
        return require("../images/countries/UY.svg");
      case "Ireland":
        return require("../images/countries/IE.svg");
      case "Japan":
        return require("../images/countries/JP.svg");
      case "India":
        return require("../images/countries/IN.svg");
      case "Philippines":
        return require("../images/countries/PH.svg");
      case "Sweden":
        return require("../images/countries/SE.svg");
      case "Thailand":
        return require("../images/countries/TH.svg");
      case "South Africa":
        return require("../images/countries/ZA.svg");
      case "New Zealand":
        return require("../images/countries/NZ.svg");
      case "Australia":
        return require("../images/countries/AU.svg");
      case "Other":
        return require("../images/countries/WW.svg");
      case "Austria":
        return require("../images/countries/AT.svg");
      case "Slovenia":
        return require("../images/countries/SI.svg");
      case "Iraq":
        return require("../images/countries/IQ.svg");
      case "Cyprus":
        return require("../images/countries/CY.svg");
      case "United Arab Emirates":
        return require("../images/countries/AE.svg");
      case "Malta":
        return require("../images/countries/MT.svg");
      case "Pakistan":
        return require("../images/countries/PK.svg");
      case "Czech Republic":
        return require("../images/countries/CZ.svg");
      case "Chile":
        return require("../images/countries/CL.svg");
      case "Oman":
        return require("../images/countries/OM.svg");
      case "Costa Rica":
        return require("../images/countries/CR.svg");
      case "Indonesia":
        return require("../images/countries/ID.svg");
      case "Yemen":
        return require("../images/countries/YE.svg");
      case "Kirghizia":
        return require("../images/countries/KG.svg");
      case "Malaysia":
        return require("../images/countries/MY.svg");
      case "Portugal":
        return require("../images/countries/PT.svg");
      case "El Salvador":
        return require("../images/countries/SV.svg");
      case "Aruba":
        return require("../images/countries/AW.svg");
      case "Sierra Leone":
        return require("../images/countries/SL.svg");
      case "Nigeria":
        return require("../images/countries/NG.svg");
      case "Qatar":
        return require("../images/countries/QA.svg");
      case "Maldives":
        return require("../images/countries/MV.svg");
      case "Dominica":
        return require("../images/countries/DM.svg");
      case "Nepal":
        return require("../images/countries/NP.svg");
      case "Zambia":
        return require("../images/countries/ZM.svg");
      case "Myanmar":
        return require("../images/countries/MM.svg");
      case "Morocco":
        return require("../images/countries/MA.svg");
      case "Switzerland":
        return require("../images/countries/CH.svg");
      case "Cambodia":
        return require("../images/countries/KH.svg");
      case "Cameroon":
        return require("../images/countries/CM.svg");
      case "Syrian Arab Republic":
        return require("../images/countries/SY.svg");
      case "Bangladesh":
        return require("../images/countries/BD.svg");
      case "Romania":
        return require("../images/countries/RO.svg");
      case "Mauritius":
        return require("../images/countries/MU.svg");
      case "Guatemala":
        return require("../images/countries/GT.svg");
      case "Tanzania":
        return require("../images/countries/TZ.svg");
      case "Ghana":
        return require("../images/countries/GH.svg");
      case "Peru":
        return require("../images/countries/PE.svg");
      case "Sri Lanka":
        return require("../images/countries/LK.svg");
      case "Republic of South Sudan":
        return require("../images/countries/SD.svg");
      case "Panama":
        return require("../images/countries/PA.svg");
      case "HongKong":
        return require("../images/countries/IM.svg");
      case "Argentina":
        return require("../images/countries/AR.svg");
      case "Hungary":
        return require("../images/countries/HU.svg");
      case "Denmark":
        return require("../images/countries/DK.svg");
      case "Greece":
        return require("../images/countries/GR.svg");
      case "Taiwan":
        return require("../images/countries/TW.svg");
      case "Lao PDR":
        return require("../images/countries/LA.svg");
      case "New York":
        return require("../images/countries/US.svg");
      case "Croatia Rep":
        return require("../images/countries/HR.svg");
      case "Paraguay":
        return require("../images/countries/PY.svg");
      case "Serbia":
        return require("../images/countries/RS.svg");
      case "Kazakhstan":
        return require("../images/countries/KZ.svg");
      case "Ecuador":
        return require("../images/countries/EC.svg");
      case "Egypt":
        return require("../images/countries/EG.svg");
      case "Singapure":
        return require("../images/countries/SG.svg");
      case "Reunion":
        return require("../images/countries/FR.svg");
      case "Honduras":
        return require("../images/countries/HN.svg");
      case "Slovakia(Slovak Republic)":
        return require("../images/countries/SK.svg");
      case "Ethiopia":
        return require("../images/countries/ET.svg");
      case "Norway":
        return require("../images/countries/NO.svg");
      default:
        return null;
    }
  }
  static fixNumber(val) {
    try {
      if (val === "" || val == null) return val;
      if (!isNaN(val)) return new Intl.NumberFormat("en").format(val);
      else if (val.length > 1 && !isNaN(val.substr(1)))
        return (
          val.substr(0, 1) + new Intl.NumberFormat("en").format(val.substr(1))
        );
      else return val;
    } catch (e) {
      return "";
    }
  }

  static roundDivision(val1, val2) {
    try {
      const res = Math.round(val1 / val2);
      return isNaN(res) ? "" : res;
    } catch (e) {
      return "";
    }
  }
}

export default Utils;
