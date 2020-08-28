import { emailDays, nextCron } from "../src/utils";

describe("calculate tab", function () {
  it("crons", () => expect(emailDays(32).length).toBe(32));
  it("crons", () => expect(emailDays(30).length).toBe(30));
  it("crons", () => expect(emailDays(15).length).toBe(15));
  it("crons", () => expect(emailDays(10)).toEqual([1, 4, 7, 10, 13, 16, 19, 22, 25, 28]));
  it("crons", () => expect(emailDays(8)).toEqual([1, 4, 8, 12, 16, 20, 24, 28]));
  it("crons", () => expect(emailDays(4)).toEqual([1, 8, 16, 24]));
  it("tabs", () => expect(nextCron(4)).toEqual("* * 1 * *"));
});
