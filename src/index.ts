import { getItem, init, setItem } from "node-persist";
import { getListOfFiles } from "./io";
import { schedule } from "./schedule";
import { Book } from "./types";

const main = async () => {
  await init({ dir: "book-status" });

  const past = await getItem("bookList");
  const future = getListOfFiles("./books/**/*.txt");
  const present = future.filter((y) => !past.find((x) => y.filename === x.filename));

  const bookList: Book[] = [...future, ...present];

  await setItem("bookList", bookList);

  schedule(bookList);
};
if (!module.parent)
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
