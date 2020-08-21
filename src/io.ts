import { glob } from "glob";
import { getItem, init, setItem } from "node-persist";
import { Book } from "./types";

const defaultBookObject = (filename: string) => {
  return { filename, progress: 0, finished: false };
};

export function getListOfFiles(folder: string) {
  return glob.sync(folder).map(defaultBookObject);
}

export async function initializeBooks() {
  await init({ dir: "book-status" });

  const past = await getItem("bookList");
  const future = getListOfFiles("./books/**/*.txt");
  const present = future.filter((y) => !past.find((x) => y.filename === x.filename));

  const bookList: Book[] = [...future, ...present];

  await setItem("bookList", bookList);

  return bookList;
}
