import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Child1 from "./Child1";
import Child2 from "./Child2";
import tips from "./tips.csv";
import './App.css';
const App = () => {
  const [data, setChartData] = useState([]);
  useEffect(() => {
    d3.csv(tips).then((data) => {
      const formattedData = data.map((d) => ({
        total_bill: +d.total_bill,
        tip: +d.tip,
        day: d.day
      }));
      setChartData(formattedData);
    });
  }, []);
  return (
    <div className="app-wrapper">
      <div className="chart-section">
        <Child1 data={data} />
      </div>
      <div className="chart-section">
        <Child2 data={data} />
      </div>
    </div>
  );
};
export default App;