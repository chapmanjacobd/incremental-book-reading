import { glob } from "glob";
import cart from "node-persist";
import { Book } from "./types";

const defaultBookObject = (filename: string) => {
  return { filename, progress: 0, finished: false };
};

export function getListOfFiles(folder: string) {
  return glob.sync(folder).map(defaultBookObject);
}

export async function initializeBooks() {
  await cart.init({ dir: "book-status" });

  const past: Book[] = await cart.getItem("bookList");
  console.log(past);
  const future = getListOfFiles("./books/*.txt");
  const present = past ? future.filter((y) => !past.find((x) => y.filename === x.filename)) : [];

  const bookList = future.map((book) => {
    if (past.some((b) => b.filename === book.filename))
      return past.find((b) => b.filename === book.filename);
    return book;
  });

  await cart.setItem("bookList", bookList);

  return bookList;
}
