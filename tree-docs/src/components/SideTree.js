import { getTree } from "../api/Database";
import { Container } from 'semantic-ui-react'
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as d3 from "d3"

function SideTree(props) {
  const [is_merge, setIsMerge] = useState(false);
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
      fill = "#555", // fill for nodes
      highlight = "#6fc754",
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
      const dy = 55;
      const dx = width / (root.height + padding);
      tree().nodeSize([dy, dx])(root);

      // Center the tree.
      let y0 = Infinity;
      let y1 = -y0;
      root.each(d => {
        if (d.y > y1) y1 = d.y;
        if (d.y < y0) y0 = d.y;
      });

      // Compute the default height.
      if (height === undefined) height = y1 - y0 + dy * 2;

      svg.attr("viewBox", [-dx * padding , y0 - dy, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("font-family", "sans-serif")
          .attr("font-size", 15);

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
            .attr("d", d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y));

      const node = svg.append("g")
        .selectAll("a")
        .data(root.descendants())
        .join("a")
          .attr("xlink:href", link == null ? null : d => link(d.data, d))
          .attr("target", link == null ? null : linkTarget)
          .attr("transform", d => `translate(${d.x},${d.y})`);

      node.append("circle")
          .attr("fill", d => (d.data.value == state.nodeID) ? highlight : fill)
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
      console.log(is_merge);
      let node = state ? state.nodeID : props.nodeID;
      if (is_merge) {
        if (node != id) {
          navigate("/diff?did1=" + state.nodeID + "&did2=" + id);
        }
      } else {
        navigate("/edit", { state: { nodeID : id }});
      }
    }

      node.on("click", function(d, i) { handleItemClick(i.data.value) });

      return svg.node();
    }

    const { state } = useLocation();

    const ref = useRef();
    useEffect(() => {
        console.log(state);
        let node = state ? state.nodeID : props.nodeID;
        let data = getTree(node);
        const svgElement = d3.select(ref.current);
        const tree = Tree(data, svgElement);
        console.log(tree);
        // svgElement.append(tree[0]);
     }, [is_merge])

    return (
         
      <aside class="col-md-3">
          <div class="sidebar">
          <label style ={{float:"right"}}>Merge Mode</label>
          <br></br>
          <br></br>
          <label class="switch"> 
            <input type="checkbox" onClick={()=>{setIsMerge(!is_merge); console.log(is_merge);}}/>
            <span class="slider round"></span>
          </label>
              <svg ref = {ref} />
          </div>
      </aside>

    )
}

export default SideTree;
