import React from 'react';
import { storiesOf } from '@storybook/react';
import CompanyScore from '../src/Components/CompanyScore'
import RecommendCredit from '../src/Components/RecommendCredit'
import TopInsights from '../src/Components/TopInsights'
import PieChartWrapper from '../src/Components/PieChartWrapper'
import Industry from '../src/Components/Industry'
import TopProducts from '../src/Components/TopProducts'
import TotalExports from '../src/Components/TotalExports'
import TopCountries from '../src/Components/TopCountries'
import RegistrationDetails from '../src/Components/RegistrationDetails'
import SocialMedia from '../src/Components/SocialMedia'
import Certifications from '../src/Components/Certifications'
import Media from '../src/Components/Media'
import InfoCard from '../src/Components/InfoCard'
import TwoInfoCard from '../src/Components/TwoInfoCard'
import PublicFinancial from '../src/Components/PublicFinancial'
import PublicFinancialRatio from '../src/Components/PublicFinancialRatio'
import MoreDataTwoTabs from '../src/Components/MoreDataTwoTabs'
import reportData from './MockData/reportData'
import '../src/Components/css/fonts.css'
import '../src/Components/css/tooltip.css'
import Utils from '../src/Components/js/Utils'

const investmentsList = reportData.foreignInvestmentList != null &&
reportData.foreignInvestmentList !== undefined
    ? reportData.foreignInvestmentList.map(investment => ({
        name: investment.name,
        icon: "branch"
    }))
    : [];

const branchesList = reportData.branchesData != null &&
reportData.branchesData !== undefined
    ? reportData.branchesData.branches.map(branch => ({
        name: branch.name,
        icon: "branch"
    }))
    : [];


storiesOf('Components', module)
    .add('Company Score', () => (
        <CompanyScore width={window.innerWidth} report={reportData} />
    ))
    .add('Recommend Credit', () => (
        <RecommendCredit width={window.innerWidth} report={reportData} />
    ))
    .add('Top Insights', () => (
        <TopInsights width={window.innerWidth} category={"Overview"} data={reportData.insights} />
    ))
    .add('Shareholders', () => (
        <PieChartWrapper width={window.innerWidth}
                         infoText={"The company current shareholder."}
                         title={"Shareholders"}
                         data={reportData.shareholders}
                         bottomIcon={2}
                         bottomMsg={"this supplier his good shareholder and not good dasvsdfd asddffdvsda fgasdfasdfdv savsdvsad dfsavsdvdswf"}
                         dataKey={"percent"} />
    ))
    .add('Industry', () => (
        <Industry width={window.innerWidth} report={reportData} />
    ))
    .add('Top Products', () => (
        <TopProducts width={window.innerWidth} report={reportData} />
    ))
    .add('Total Exports', () => (
        <TotalExports width={window.innerWidth} report={reportData} />
    ))
    .add('Top Countries', () => (
        <TopCountries width={window.innerWidth} report={reportData} />
    ))
    .add('Registration Details', () => (
        <RegistrationDetails width={window.innerWidth} report={reportData} />
    ))
    .add('Social Media', () => (
        <SocialMedia width={window.innerWidth} report={reportData} />
    ))
    .add('Certifications', () => (
        <Certifications width={window.innerWidth} report={reportData} />
    ))
    .add('Top Media', () => (
        <Media width={window.innerWidth} report={reportData} />
    ))
    .add('Public Financial', () => (
        <PublicFinancial width={window.innerWidth} data={reportData.publicFinancial} date={"Jan 2017 - Dec 2017"} />
    ))
    .add('Public Financial Ratio', () => (
        <PublicFinancialRatio width={window.innerWidth} date={"Jan 2017 - Dec 2017"} data={reportData.publicFinancialRatio} />
    ))
    .add('Info Card', () => (
        <InfoCard
            width={window.innerWidth}
            name={"Total Exports"}
            infoText={
                "The supplier’s total export last year in USD (not including local sales), based on governmental custom data."
            }
            date={""}
            content={Utils.fixNumber(
                "$" + reportData.totalExport.content
            )}
            bottomIcon={Utils.getIconByNumber(reportData.totalExport.totalExportMsgType)}
            bottomMsg={reportData.totalExport.totalExportMsg}
        />
    ))
    .add('Info Card with Date', () => (
        <InfoCard
            width={window.innerWidth}
            name={"Total Exports"}
            infoText={
                "The supplier’s total export last year in USD (not including local sales), based on governmental custom data."
            }
            date={reportData.totalExport.date}
            content={Utils.fixNumber(
                "$" + reportData.totalExport.content
            )}
            bottomIcon={Utils.getIconByNumber(reportData.totalExport.totalExportMsgType)}
            bottomMsg={reportData.totalExport.totalExportMsg}
        />
    ))
    .add('Two Info Card', () => (
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
        />
    ))
    .add('Two Info Card with single value', () => (
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
    .add('Two Info Card with drill down', () => (
        <TwoInfoCard
            width={window.innerWidth}
            name={"Investments and Branches"}
            date={""}
            infoText={"The company subsidiaries and branches"}
            content1={
                reportData.foreignInvestment !== undefined
                    ? reportData.foreignInvestment
                    : ""
            }
            content1Lbl={"No. of Investments"}
            content2={
                reportData.numberOfBranches !== undefined
                    ? reportData.numberOfBranches
                    : ""
            }
            content2Lbl={"Branches"}
            bottomIcon={null}
            bottomMsg={""}
            moreBtn={true}
            moreTitle={"Investments and Branches"}
            moreData={
                investmentsList.length > 0 || branchesList.length > 0 ?
                <MoreDataTwoTabs
                    moreData={
                        investmentsList
                    }
                    moreData2={
                        branchesList
                    }
                    moreSubTitle={"Investments"}
                    moreSubTitle2={"Branches"}
                /> : null
            }
        />
    ))
    .add('Two Info Card with drill down and text', () => (
        <TwoInfoCard
            width={window.innerWidth}
            name={"Investments and Branches"}
            date={""}
            infoText={"The company subsidiaries and branches"}
            content1={
                reportData.foreignInvestment !== undefined
                    ? reportData.foreignInvestment
                    : ""
            }
            content1Lbl={"No. of Investments"}
            content2={
                reportData.numberOfBranches !== undefined
                    ? reportData.numberOfBranches
                    : ""
            }
            content2Lbl={"Branches"}
            bottomIcon={Utils.getIconByNumber(4)}
            bottomMsg={"some text message"}
            moreBtn={true}
            moreTitle={"Investments and Branches"}
            moreData={
                investmentsList.length > 0 || branchesList.length > 0 ?
                <MoreDataTwoTabs
                    moreData={
                        investmentsList
                    }
                    moreData2={
                        branchesList
                    }
                    moreSubTitle={"Investments"}
                    moreSubTitle2={"Branches"}
                />
                    : null
            }
        />
    ));