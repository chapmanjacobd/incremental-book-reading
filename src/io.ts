import { glob } from "glob";
import shelf from "node-persist";
import { Book } from "./types";

const defaultBookObject = (filename: string) => {
  return { filename, progress: 0, finished: false };
};

export function getListOfFiles(folder: string) {
  return glob.sync(folder).map(defaultBookObject);
}

export async function initializeBooks(): Promise<Book[]> {
  await shelf.init({ dir: "book-status" });

  const cart: Book[] = await shelf.getItem("bookList");
  const booksDir: Book[] = getListOfFiles("./books/**/*.txt");

  // scan for new books and add them to the shelf
  // also removes deleted books ! cool. my implementation is accidentally working perfectly !!
  const bookList = booksDir.map((book) => {
    if (cart && cart.some((b) => b.filename === book.filename))
      return cart.find((b) => b.filename === book.filename);
    return book;
  });

  // MOVE ZIG!!!!!!!!!!!!!!111111111111
  await shelf.setItem("bookList", bookList);

  return bookList;
}

if (!module.parent)
  (async () => {
    console.log(await initializeBooks());
  })();
