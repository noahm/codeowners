import { statSync } from "node:fs";

export function isDirectorySync(filepath: string) {
  if (typeof filepath !== "string") {
    throw new Error("expected filepath to be a string");
  }
  const stat = statSync(filepath, { throwIfNoEntry: false });
  if (!stat) return false;
  return stat.isDirectory();
}

export function times<T>(count: number, cb: (n: number) => T, indexAt = 0): Array<T> {
  const ret: T[] = [];
  for (let i = indexAt; i < count + indexAt; i++) {
    ret.push(cb(i));
  }
  return ret;
}

export function padEnd(input: string, length: number): string {
  const strLength = length ? input.length : 0;
  return length && strLength < length
    ? input + times(length - strLength, () => " ").join("")
    : input || "";
}

export function intersection<T>(a: Array<T>, b: Array<T>): Array<T> {
  const aItems = new Set(a);
  const ret: Array<T> = [];
  for (const item of b) {
    if (aItems.has(item)) {
      ret.push(item);
    }
  }
  return ret;
}

/**
 * convert from gitignore format (https://git-scm.com/docs/gitignore#_pattern_format)
 * to glob format describing the CODEOWNERS behavior (https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#example-of-a-codeowners-file)
 *
 * @param filePattern a pattern expressed on a line of a CODEOWNERS file
 * @returns a glob expression that will match the intended files when eval'd in the codeowners root directory
 */
export function convertPatternToGlob(filePattern: string) {
  let glob = filePattern;
  // first handle the beginning
  if (glob.startsWith("/")) {
    glob = `.${glob}`;
  } else {
    glob = `**/${glob}`;
  }
  // then handle the ending
  if (glob.endsWith("/")) {
    glob += "**/*";
  }
  return glob;
}
