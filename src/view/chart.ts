interface Coord {
  0: number;
  1: number;
}

interface Chart {
  width: number;
  height: number;
  lines: {
    [color: string]: Coord[];
  };
}

export default Chart;
