import * as _ from "lodash";
import axios from "axios";

import ENV from "config/env";
import Chart, { Coord } from "src/view/chart";

import { ensure } from "src/util/object";

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

export function toChart(suites: RepoSuite[]): Chart {
  const linesByName: { [key: string]: Coord[] } = {};
  for (const suite of suites) {
    const x = Date.parse(suite.ranAt).valueOf();
    for (const test of suite.tests) {
      const line = ensure(linesByName, test.name, () => []);
      line.push({ x, y: test.value });
    }
  }

  const lines = Object.values(linesByName);

  return {
    width: _(lines).flatten().map("x").max() as number,
    height: _(lines).flatten().map("y").max() as number,
    lines: _.mapKeys(lines, (line, index) => COLORS[index])
  };
}
