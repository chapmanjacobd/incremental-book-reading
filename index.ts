import { schedule } from "./src/schedule";

const bookList = [
  "./books/kafka.metamorphosis.txt",
  "./books/plato.ion.txt",
  "./books/kafka.metamorphosis.txt",
  "./books/plato.ion.txt",
];

const main = async () => schedule(bookList);
if (!module.parent)
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
