import { SinceLastMonth, ThenLastWeek, TotalEarning, TotalSales, TotalVisitors } from "../../../utils/Constant";
import { totalEarningChart, totalLikesOption, visitorChart } from "./ChartData";

export const totalEarningData =[
    {
        badgeColor:"primary",
        badge:"$",
        title:TotalEarning,
        amount:"$20.790",
        color:"secondary",
        icon:"arrow-down",
        percentage:"- 36.28%",
        time:SinceLastMonth,
        chartId:"expensesChart",
        charts:totalEarningChart,
        type:"bar"
    },
    {
        badgeColor:"dark",
        svgIcon:"fill-Buy",
        title:TotalSales,
        amount:"$65.340",
        color:"dark",
        icon:"arrow-up",
        percentage:"- 90.28%",
        time:ThenLastWeek,
        chartId:"totalLikesAreaChart",
        charts:totalLikesOption,
        type:"area"
    },
    {
        badgeColor:"secondary",
        svgIcon:"user",
        title:TotalVisitors,
        amount:"$46.564",
        color:"secondary",
        icon:"arrow-down",
        percentage:"- 25.28%",
        time:SinceLastMonth,
        chartClass:"incom-chart",
        chartId:"Incomechrt",
        charts:visitorChart,
        type:"radialBar"
    }
]