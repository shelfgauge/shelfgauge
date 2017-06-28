import axios from "axios";

import ENV from "config/env";
import Chart from "src/view/chart";

const API = axios.create({ baseURL: ENV.apiUrl });

interface RepoSuite {
  ref: string;
  name: string;
  pullRequest: string;
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
  return {
    width: 100,
    height: 100,
    lines: {
      black: [[20, 100], [40, 60], [70, 80], [100, 20]],
      red: [[10, 90], [40, 60], [80, 70], [20, 20]]
    }
  };
}
