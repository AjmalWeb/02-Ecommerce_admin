import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";

import Widget from "../components/Widget/Widget";
import { widgetData } from "../components/Widget/widgetData";
import Featured from "../components/Featured/Featured";
import { FeaturedData } from "../components/Featured/FeaturedData";
import Chart from "../components/Chart/Chart";
import { ChartData } from "../components/Chart/ChartData";
import Table from "../components/Table/Table";
import { TableData } from "../components/Table/TableData";

const TableDiv = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 20px;
  margin: 20px;
`;

function DashboardHome() {
  return (
    <Box>
      <Box sx={{ display: "flex", padding: "20px", gap: "20px" }}>
        {/* <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" /> */}

        {widgetData.map((item, index) => {
          return <Widget item={item} key={index} />;
        })}
      </Box>
      <Box sx={{ display: "flex", padding: "5px 20px", gap: "20px" }}>
        <Featured item={FeaturedData} />
        <Chart
          title="Last 6 Months (Revenue)"
          aspect={2 / 1}
          data={ChartData}
        />
        {/*<div style={{flex:"4",backgroundColor:"green"}}></div>*/}
      </Box>

      <TableDiv>
        <div
          style={{
            fontWeight: " 500",
            color: "gray",
            marginBottom: "15px",
          }}
        >
          Latest Transactions
        </div>
        <Table rows={TableData} />
      </TableDiv>
    </Box>
  );
}

export default DashboardHome;
