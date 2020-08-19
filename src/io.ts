import { glob } from "glob";

const defaultBookObject = (filename: string) => {
  return { filename, progress: 0, finished: false };
};

export function getListOfFiles(folder) {
  return glob.sync(folder).map(defaultBookObject);
}
