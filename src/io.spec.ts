import { getListOfFiles } from "./io";

describe("lists files", function () {
  it("add", function () {
    expect(getListOfFiles("books/*.txt")).toEqual([
      { filename: "books/kafka.metamorphosis.txt", progress: 0 },
      { filename: "books/plato.ion.txt", progress: 0 },
    ]);
  });
});
