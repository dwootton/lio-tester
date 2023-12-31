import PageComponent from './components/PageContent';
const vgSpec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    background: "white",
    padding: 5,
    width: 200,
    height: 200,
    style: "cell",
    data: [
      {
        name: "brush_store",
        transform: [{ type: "collect", sort: { field: "_vgsid_" } }],
      },
      {
        name: "source_0",
        "url": "https://vega.github.io/vega-datasets/data/cars.json",
        format: { type: "json" },
        transform: [
          { type: "identifier", as: "_vgsid_" },
          {
            type: "filter",
            expr: 'isValid(datum["Horsepower"]) && isFinite(+datum["Horsepower"]) && isValid(datum["Miles_per_Gallon"]) && isFinite(+datum["Miles_per_Gallon"])',
          },
        ],
      },
    ],
    signals: [
      {
        name: "unit",
        value: {"blah":2},
        on: [
          { events: "pointermove", update: "isTuple(group()) ? group() : unit" },
        ],
      }, // requires pointermove to still fire
      {
        name: "brush",
        update: 'vlSelectionResolve("brush_store", "union")',
      },
      {
        name: "brush_tuple",
        on: [
          {
            events: [{ signal: "brush_screen_path" }],
            update:
              'vlSelectionTuples(intersectLasso("marks", brush_screen_path, unit), {unit: ""})',
          },
          { events: [{ source: "view", type: "dblclick" }], update: "null" },
        ],
      },
      {
        name: "brush_screen_path",
        init: "[]",
        on: [],
      },
      {
        name: "brush_modify",
        on: [
          {
            events: { signal: "brush_tuple" },
            update: 'modify("brush_store", brush_tuple, true)',
          },
        ],
      },
    ],
    marks: [
      {
        name: "marks",
        type: "symbol",
        style: ["point"],
        interactive: true,
        from: { data: "source_0" },
        encode: {
          update: {
            opacity: { value: 0.7 },
            fill: { value: "transparent" },
            stroke: [
              {
                test: '!length(data("brush_store")) || vlSelectionIdTest("brush_store", datum)',
                scale: "color",
                field: "Cylinders",
              },
              { value: "grey" },
            ],
            ariaRoleDescription: { value: "point" },
            description: {
              signal:
                '"Horsepower: " + (format(datum["Horsepower"], "")) + "; Miles_per_Gallon: " + (format(datum["Miles_per_Gallon"], "")) + "; Cylinders: " + (isValid(datum["Cylinders"]) ? datum["Cylinders"] : ""+datum["Cylinders"])',
            },
            x: { scale: "x", field: "Horsepower" },
            y: { scale: "y", field: "Miles_per_Gallon" },
          },
        },
      },
    ],
    scales: [
      {
        name: "x",
        type: "linear",
        domain: { data: "source_0", field: "Horsepower" },
        range: [0, { signal: "width" }],
        nice: true,
        zero: true,
      },
      {
        name: "y",
        type: "linear",
        domain: { data: "source_0", field: "Miles_per_Gallon" },
        range: [{ signal: "height" }, 0],
        nice: true,
        zero: true,
      },
      {
        name: "color",
        type: "ordinal",
        domain: { data: "source_0", field: "Cylinders", sort: true },
        range: "ordinal",
        interpolate: "hcl",
      },
    ],
    axes: [
      {
        scale: "x",
        orient: "bottom",
        gridScale: "y",
        grid: true,
        tickCount: { signal: "ceil(width/40)" },
        domain: false,
        labels: false,
        aria: false,
        maxExtent: 0,
        minExtent: 0,
        ticks: false,
        zindex: 0,
      },
      {
        scale: "y",
        orient: "left",
        gridScale: "x",
        grid: true,
        tickCount: { signal: "ceil(height/40)" },
        domain: false,
        labels: false,
        aria: false,
        maxExtent: 0,
        minExtent: 0,
        ticks: false,
        zindex: 0,
      },
      {
        scale: "x",
        orient: "bottom",
        grid: false,
        title: "Horsepower",
        labelFlush: true,
        labelOverlap: true,
        tickCount: { signal: "ceil(width/40)" },
        zindex: 0,
      },
      {
        scale: "y",
        orient: "left",
        grid: false,
        title: "Miles_per_Gallon",
        labelOverlap: true,
        tickCount: { signal: "ceil(height/40)" },
        zindex: 0,
      },
    ],
    legends: [
      {
        stroke: "color",
        symbolType: "circle",
        title: "Cylinders",
        encode: {
          symbols: {
            update: {
              fill: { value: "transparent" },
              opacity: { value: 0.7 },
            },
          },
        },
      },
    ],
  };
export default ()=>{

    return <PageComponent title="Task 1: Explore the Interface"
    description="Objective: Engage with the interface to understand its features and capabilities.
    
    " vegaSpec={vgSpec}/>
}