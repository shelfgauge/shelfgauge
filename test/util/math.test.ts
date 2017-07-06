import { expect } from "test/support";

import * as math from "src/util/math";

describe("util/math", () => {
  describe("normalize()", () => {
    it("converts x=min to 0", () => {
      expect(math.normalize(1, 1, 10.5)).to.equal(0);
    });

    it("converts x=max to 1", () => {
      expect(math.normalize(10.5, 1, 10.5)).to.equal(1);
    });

    it("converts x=midpoint to 0.5", () => {
      expect(math.normalize(15, 10, 20)).to.equal(0.5);
    });
  });
});
