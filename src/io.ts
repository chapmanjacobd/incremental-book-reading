import { glob } from "glob";
import cart from "node-persist";
import { Book } from "./types";

const defaultBookObject = (filename: string) => {
  return { filename, progress: 0, finished: false };
};

export function getListOfFiles(folder: string) {
  return glob.sync(folder).map(defaultBookObject);
}

export async function initializeBooks(): Promise<Book[]> {
  await cart.init({ dir: "book-status" });

  const past: Book[] = await cart.getItem("bookList");
  const future: Book[] = getListOfFiles("./books/*.txt");

  const bookList = future.map((book) => {
    if (past.some((b) => b.filename === book.filename))
      return past.find((b) => b.filename === book.filename);
    return book;
  });

  await cart.setItem("bookList", bookList);

  return bookList;
}

if (!module.parent)
  (async () => {
    await initializeBooks();
  })();
