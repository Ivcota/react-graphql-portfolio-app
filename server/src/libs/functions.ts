import dayjs from "dayjs";

export function generateUniqueName(filename: string) {
  const now = dayjs().toISOString();
  return `${now}-${filename}`;
}
