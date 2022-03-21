import { getTree } from "../api/Database";
import { Container } from 'semantic-ui-react'
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import * as d3 from "d3"

function TreeView() {
  var navigate = useNavigate();
    // Copyright 2021 Observable, Inc.
    // Released under the ISC license.
    // https://observablehq.com/@d3/tree
    function Tree(data, svg, { // data is either tabular (array of objects) or hierarchy (nested objects)
      path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
      id = Array.isArray(data) ? d => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
      parentId = Array.isArray(data) ? d => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
      children, // if hierarchical data, given a d in data, returns its children
      tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
      sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
      label, // given a node d, returns the display name
      title, // given a node d, returns its hover text
      link, // given a node d, its link (if any)
      linkTarget = "_blank", // the target attribute for links (if any)
      width = 1000, // outer width, in pixels
      height, // outer height, in pixels
      r = 4, // radius of nodes
      padding = 1, // horizontal padding for first and last column
      fill = "#6fc754", // fill for nodes
      fillOpacity, // fill opacity for nodes
      stroke = "#555", // stroke for links
      strokeWidth = 2.5, // stroke width for links
      strokeOpacity = 0.4, // stroke opacity for links
      strokeLinejoin, // stroke line join for links
      strokeLinecap, // stroke line cap for links
      halo = "#fff", // color of label halo 
      haloWidth = 3, // padding around the labels
    } = {}) {

      // If id and parentId options are specified, or the path option, use d3.stratify
      // to convert tabular data to a hierarchy; otherwise we assume that the data is
      // specified as an object {children} with nested objects (a.k.a. the “flare.json”
      // format), and use d3.hierarchy.
      const root = path != null ? d3.stratify().path(path)(data)
          : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
          : d3.hierarchy(data, children);

      // Compute labels and titles.
      const descendants = root.descendants();
      const L = descendants.map(d => {console.log(d); return d.data.name;});
      const IDs = descendants.map(d => { return d.data.value; });

      // Sort the nodes.
      if (sort != null) root.sort(sort);

      // Compute the layout.
      const dx = 40;
      const dy = width / (root.height + padding);
      tree().nodeSize([dx, dy])(root);

      // Center the tree.
      let x0 = Infinity;
      let x1 = -x0;
      root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      // Compute the default height.
      if (height === undefined) height = x1 - x0 + dx * 2;

      svg.attr("viewBox", [-dy * padding / 2, x0 - dx, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
          .attr("font-family", "sans-serif")
          .attr("font-size", 20);

      svg.append("g")
          .attr("fill", "none")
          .attr("stroke", stroke)
          .attr("stroke-opacity", strokeOpacity)
          .attr("stroke-linecap", strokeLinecap)
          .attr("stroke-linejoin", strokeLinejoin)
          .attr("stroke-width", strokeWidth)
        .selectAll("path")
          .data(root.links())
          .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));

      const node = svg.append("g")
        .selectAll("a")
        .data(root.descendants())
        .join("a")
          .attr("xlink:href", link == null ? null : d => link(d.data, d))
          .attr("target", link == null ? null : linkTarget)
          .attr("transform", d => `translate(${d.y},${d.x})`);

      node.append("circle")
          .attr("fill", d => d.children ? stroke : fill)
          .attr("r", r);

      if (title != null) node.append("title")
          .text(d => title(d.data, d));

      if (L) node.append("text")
          .attr("dy", "0.3em")
          .attr("x", d => d.children ? -6 : 6)
          .attr("text-anchor", d => d.children ? "end" : "start")
          .text((d, i) => L[i])
          .call(text => text.clone(true))
          .attr("fill", "none")
          .attr("stroke", halo)
          .attr("stroke-width", haloWidth);
      
    function handleItemClick(id) {
      console.log("CLICKED");
      console.log(id);
      navigate("/edit", { state: { nodeID : id }});
    }

      node.on("click", function(d, i) { handleItemClick(i.data.value) });

      return svg.node();
    }

    const { state } = useLocation();

    const ref = useRef();
    useEffect(() => {
        console.log(state);
        console.log(state.nodeID);
        let data = getTree(state.nodeID);
        const svgElement = d3.select(ref.current);
        const tree = Tree(data, svgElement);
        console.log(tree);
        // svgElement.append(tree[0]);
     }, [])

    return (
      <>
        <NavBar light={true}/>
        <div id="hero" class="hero overlay subpage-hero tree-hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Tree View</h1>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">Home</a></li>
                  <li class="breadcrumb-item">Tree View</li>
                </ol>
            </div>
            </div>
        </div>
        <main id="main" class="site-main">

          <section class="site-section subpage-site-section section-portfolio">
            <div class="container">
              <svg ref = {ref} />
            </div>
          </section>
        </main>
      </>

    )
}

export default TreeView;
