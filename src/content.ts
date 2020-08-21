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

  setItem("bookList", [...bookList, nextBook]);

  const percent = ((endIndex / nextBookContents.length) * 100).toFixed(0);

  return {
    title: `${nextBook.filename} (${percent}%)`,
    body: nextEmailWords,
  };
}

if (!module.parent)
  (async () => {
    await initializeBooks()
      .then((b) => {
        console.log(getText(b, 400));
      })
      .catch(handleErr);
  })();
