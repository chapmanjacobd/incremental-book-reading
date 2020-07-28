import { schedule } from "./schedule";
import * as persist from "node-persist";

persist.init()
persist.readDirectory('');


setItem('bookList', { ... });

const main = async () => schedule(storage.getItem('bookList'));
if (!module.parent)
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
