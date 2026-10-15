import * as bcrypt from "bcrypt";
export default function Encrypt(password: string) {
  const salt = 10;
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}