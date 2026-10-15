import { compareSync } from "bcrypt";
export default function compare(password: string, hash: string) {
  const result = compareSync(password, hash);
  return result;
}