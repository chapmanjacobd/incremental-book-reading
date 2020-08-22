import { readFileSync } from "fs";
import { setItem } from "node-persist";
import { initializeBooks } from "./io";
import { Book } from "./types";
import { handleErr } from "./utils";

export function getText(shelf: Book[], wordsPerEmail: number) {
  let currentBook = shelf.filter((x) => !x.finished)[0];

  const bookTxt = readFileSync(currentBook.filename, { encoding: "utf-8" }).split(" ");
  const endIndex = currentBook.progress + wordsPerEmail;

  const nextEmailWords = bookTxt.slice(0 + currentBook.progress, endIndex);

  currentBook.progress = endIndex;
  currentBook.finished = endIndex >= bookTxt.length;

  // update reading progress
  setItem(
    "bookList",
    shelf.map((book) => {
      if (book.filename === currentBook.filename) return currentBook;
      return book;
    })
  );

  const percent = ((endIndex / bookTxt.length) * 100).toFixed(0);
  const basename = currentBook.filename.split("/").pop();

  return {
    title: `${basename} (${percent}%)`,
    body: nextEmailWords.join(" "),
  };
}

if (!module.parent)
  (async () => {
    await initializeBooks()
      .then((b) => {
        console.log(getText(b, 160));
      })
      .catch(handleErr);
  })();
