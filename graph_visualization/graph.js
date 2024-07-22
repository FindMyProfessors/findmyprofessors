d3.json("UCF.json")
  .then((schema) => {
    const data = {
      nodes: [],
      links: [],
    };

    // Add school node
    data.nodes.push({ id: schema.name, group: "school" });

    // Add professor nodes and links
    schema.professors.forEach((prof) => {
      const profId = `${prof.firstname} ${prof.lastName}`;
      data.nodes.push({ id: profId, group: "professor" });
      //data.links.push({ source: schema.name, target: profId });

      // Add course nodes and links
      Object.values(prof.courses).forEach((course) => {
        data.nodes.push({ id: course.code, group: "course" });
        data.links.push({ source: profId, target: course.code });
      });
    });

    // Add course nodes (if not already added) and links to school
    schema.courses.forEach((course) => {
      if (!data.nodes.find((node) => node.id === course.code)) {
        data.nodes.push({ id: course.code, group: "course" });
      }
      data.links.push({ source: schema.name, target: course.code });
    });

    // D3.js force-directed graph
    const svg = d3
      .select("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const zoom = d3.zoom().scaleExtent([0.1, 10]).on("zoom", zoomed);

    svg.call(zoom);

    const container = svg.append("g");

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

    const link = container
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link");

    const node = container
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("fill", (d) => color(d.group))
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", nodeClicked); // Add click event listener

    node.append("title").text((d) => d.id);

    simulation.nodes(data.nodes).on("tick", ticked);

    simulation.force("link").links(data.links);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function zoomed(event) {
      container.attr("transform", event.transform);
    }

    function nodeClicked(event, d) {
      alert(`Node ID: ${d.id}\nGroup: ${d.group}`);
    }

    // Update SVG size on window resize
    window.addEventListener("resize", () => {
      svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
      simulation.force(
        "center",
        d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
      );
      simulation.alpha(1).restart();
    });
  })
  .catch((error) => {
    console.error("Error loading the JSON file:", error);
  });
