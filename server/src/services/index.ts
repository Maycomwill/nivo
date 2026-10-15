import compare from "./compare_passwords";
import Encrypt from "./encrypt_password";
import signToken from "./sign_token";
import VerifyToken from "./verify_token";

const services = {
  compare_password: compare,
  sign_token: signToken,
  verify_token: VerifyToken,
  encrypt_password: Encrypt,
};

export default services;