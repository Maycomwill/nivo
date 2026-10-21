export function validadeExp(exp: string): boolean {
  const token_exp = Number(exp);
  if (token_exp * 1000 <= Date.now()) {
    return false;
  }
  return true;
}
