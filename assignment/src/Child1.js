import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
const Child1 = ({ data }) => {
  const svgRef = useRef();
  useEffect(() => {
    if (!data.length) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const width = 500;
    const height = 300;
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.total_bill)])
      .range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.tip)])
      .range([height - margin.bottom, margin.top]);
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
    svg.append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.total_bill))
      .attr("cy", (d) => yScale(d.tip))
      .attr("r", 4)
      .attr("fill", "steelblue");
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 40)
      .attr("class", "x-axis-label")
      .text("Total Bill");
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", margin.left - 40)
      .attr("class", "y-axis-label")
      .text("Tips");
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top - 20)
      .attr("class", "chart-title")
      .text("Total Bill vs Tips");
  }, [data]);
  return <svg ref={svgRef} width={500} height={300}></svg>;
};
export default Child1;