import * as xmlbuilder from "xmlbuilder";
import { forEach } from "lodash";

export interface Coord {
  x: number;
  y: number;
}

export interface Chart {
  width: number;
  height: number;
  lines: {
    [color: string]: Coord[];
  };
}

export function render(chart: Chart): string {
  const root = xmlbuilder
    .create("svg")
    .a("xmlns", "http://www.w3.org/2000/svg")
    .a("width", chart.width)
    .a("height", chart.height);

  forEach(chart.lines, (line, color) => {
    const points = line.map(p => `${p.x},${p.y}`).join("\t");
    root.element("polyline", { color, points });
  });

  return root.end();
}
