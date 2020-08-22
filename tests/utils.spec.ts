import { emailDays } from "./utils";

describe("calculate tab", function () {
  it("crons", () => expect(emailDays(30).length).toBe(30));
  it("crons", () => expect(emailDays(15).length).toBe(15));
  it("crons", () => expect(emailDays(8).length).toBe(8));
  it("crons", () => expect(emailDays(4).length).toBe(4));
});
