import { expect, _ } from "test/support";

import * as shelfgauge from "src/service/shelfgauge";

describe("service/shelfgauge", () => {
  describe("toChart", () => {
    function createSuite(tests: {
      [name: string]: number;
    }): shelfgauge.RepoSuite {
      return {
        ref: "",
        name: "",
        pullRequest: null,
        ranAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),

        env: {
          source: "",
          info: ""
        },

        tests: _.map(tests, (value, name) => ({ name, value }))
      };
    }
    const suites: shelfgauge.RepoSuite[] = [
      createSuite({ foo: 1, bar: 9 }),
      createSuite({ foo: 2, bar: 8 }),
      createSuite({ foo: 3, bar: 7 })
    ];

    it("has a line per test", () => {
      const chart = shelfgauge.toChart(suites);
      expect(Object.keys(chart.lines)).to.have.length(2);
    });

    it("has a coord per suite", () => {
      const chart = shelfgauge.toChart(suites);
      expect(Object.values(chart.lines)[0]).to.have.length(3);
    });
  });
});
