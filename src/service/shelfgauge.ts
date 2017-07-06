import * as _ from "lodash";
import axios from "axios";

import ENV from "config/env";
import { Chart, Coord } from "src/view/chart";

import { normalize } from "src/util/math";
import { createFromKeys } from "src/util/object";

const API = axios.create({ baseURL: ENV.apiUrl });

export interface RepoSuite {
  ref: string;
  name: string;
  pullRequest: string | null;
  ranAt: string;
  createdAt: string;

  env: {
    source: string;
    info: string;
  };

  tests: Array<{
    name: string;
    value: number;
  }>;
}

export async function getRepoSuites(source: string, name: string) {
  const response = await API.get(`/repo/${source}/${name}/suite`);
  return response.data.data as RepoSuite[];
}

const COLORS = ["black", "red", "blue", "yellow"];

type ChartCoord = Coord & { name: string };

export function toChartCoords(suites: RepoSuite[]): ChartCoord[] {
  const coords = [] as ChartCoord[];
  for (const suite of suites) {
    const date = Date.parse(suite.ranAt).valueOf();
    for (const test of suite.tests) {
      coords.push({
        name: test.name,
        x: date,
        y: test.value
      });
    }
  }

  return coords;
}

export function toChart(
  suites: RepoSuite[],
  { width = 100, height = 100 } = {}
): Chart {
  const lines = toChartCoords(suites);
  const xs = _.map(lines, l => l.x);
  const ys = _.map(lines, l => l.y);
  const xMin = _.min(xs);
  const xMax = _.max(xs);
  const yMin = _.min(ys);
  const yMax = _.max(ys);
  const normalized = lines.map(line => {
    return {
      ...line,
      x: width * normalize(line.x, xMin!, xMax!),
      y: height * normalize(line.y, yMin!, yMax!)
    };
  });

  return {
    width: width,
    height: height,
    lines: _.groupBy(normalized, "name")
  };
}
