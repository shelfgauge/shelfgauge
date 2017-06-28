import * as _ from "lodash";
import axios from "axios";

import ENV from "config/env";
import Chart, { Coord } from "src/view/chart";

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

export function toChart(suites: RepoSuite[]): Chart {
  const lines: { [key: string]: Coord[] } = {};
  for (const suite of suites) {
    const x = Date.parse(suite.ranAt).valueOf();
    for (const test of suite.tests) {
      const line = (lines[test.name] = lines[test.name] || []);
      line.push({ x, y: test.value });
    }
  }

  return {
    width: 100,
    height: 100,
    lines: lines
  };
}
