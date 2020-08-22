import { readFileSync } from "fs";
import { setItem } from "node-persist";
import { initializeBooks } from "./io";
import { Book } from "./types";
import { handleErr } from "./utils";

export function getText(bookList: Book[], wordsPerEmail: number) {
  let nextBook = bookList.filter((x) => !x.finished)[0];

  const nextBookContents = readFileSync(nextBook.filename, { encoding: "utf-8" }).split(" ");

  const startIndex = 0 + nextBook.progress;
  const endIndex = nextBook.progress + wordsPerEmail;

  const nextEmailWords = nextBookContents.slice(startIndex, endIndex);

  nextBook.progress = endIndex;
  nextBook.finished = endIndex >= nextBookContents.length;

  const updatedBookList = bookList.map((book) => {
    if (book.filename === nextBook.filename) return nextBook;
    return book;
  });

  setItem("bookList", updatedBookList);

  const percent = ((endIndex / nextBookContents.length) * 100).toFixed(0);

  return {
    title: `${nextBook.filename.split("/").pop()} (${percent}%)`,
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
