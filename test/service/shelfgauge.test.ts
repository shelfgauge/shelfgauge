import { expect, _ } from "test/support";

import * as shelfgauge from "src/service/shelfgauge";

describe("service/shelfgauge", () => {
  function createSuite(
    timeMs: number,
    tests: { [name: string]: number }
  ): shelfgauge.RepoSuite {
    return {
      ref: "",
      name: "",
      pullRequest: null,
      ranAt: new Date(timeMs).toISOString(),
      createdAt: new Date(timeMs).toISOString(),

      env: {
        source: "",
        info: ""
      },

      tests: _.map(tests, (value, name) => ({ name, value }))
    };
  }
  const suites: shelfgauge.RepoSuite[] = [
    createSuite(1000, { foo: 1, bar: 9 }),
    createSuite(2000, { foo: 2, bar: 8 }),
    createSuite(3000, { foo: 3, bar: 7 })
  ];

  describe("toChartCoords", () => {
    it("creates a list of stuff", function() {
      const data = shelfgauge.toChartCoords(suites);
      expect(data).to.have.deep.members([
        { name: "foo", x: 1000, y: 1 },
        { name: "foo", x: 2000, y: 2 },
        { name: "foo", x: 3000, y: 3 },
        { name: "bar", x: 1000, y: 9 },
        { name: "bar", x: 2000, y: 8 },
        { name: "bar", x: 3000, y: 7 }
      ]);
    });
  });

  describe("toChart", () => {
    it("has a line per test", () => {
      const chart = shelfgauge.toChart(suites);
      expect(Object.keys(chart.lines)).to.have.length(2);
    });

    it("has a coord per suite", () => {
      const chart = shelfgauge.toChart(suites);
      expect(Object.values(chart.lines)[0]).to.have.length(3);
    });

    it("has correct width / height", () => {
      const chart = shelfgauge.toChart(suites, { width: 40, height: 50 });
      expect(chart.width).to.equal(40);
      expect(chart.height).to.equal(50);
    });

    it("has x / y clamped to width / height", () => {
      const chart = shelfgauge.toChart(suites, { width: 40, height: 50 });
      _.forEach(chart.lines, coords => {
        for (const coord of coords) {
          expect(coord.x).to.be.lte(chart.width);
          expect(coord.y).to.be.lte(chart.height);
        }
      });
    });
  });
});
