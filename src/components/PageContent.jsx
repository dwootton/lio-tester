// components/PageComponent.jsx
import { Typography } from '@suid/material';
import { createEffect, createSignal, onMount } from 'solid-js';
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

let PageContent= (props) => {
  const [initializeVegaVisualization, setInitializeVegaVisualization] = createSignal(null);

  // Load the module when the component mounts
  onMount(async () => {
    const module = await import('linked-interactive-objects');
    const lio = await module.default;
    console.log('module in pc',lio,lio.initializeVegaVisualization);
    setInitializeVegaVisualization({'func':lio.initializeVegaVisualization});
  });

  // Use the initializeVegaVisualization function inside your component
  // You can check if it's loaded by seeing if it's not null
  const isModuleLoaded = () => initializeVegaVisualization() !== null;

  createEffect(() => {
    if(isModuleLoaded()) {
      console.error('props.vegaSpec',vgSpec,document.querySelector('#vis'));
      console.log(initializeVegaVisualization,initializeVegaVisualization())
      initializeVegaVisualization().func( props.vegaSpec,'vis')
    }
  })


  // use the value from lio.initializeVegaVisualization here


 

  console.log('page component props', props);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">{props.header}</h1>
          <Typography variant='h6'>{props.title}</Typography>
          <div id="vis"></div>
          <p>{props.description}</p>
          <button 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.onDemoClick}>
            Press here for demo gif if you're struggling
          </button>
        </div>
      </div>
    );
  };



export default PageContent;
