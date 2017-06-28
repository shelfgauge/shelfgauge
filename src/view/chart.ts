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

export default Chart;
