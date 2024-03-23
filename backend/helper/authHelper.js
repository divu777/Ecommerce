import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRound = 2;
    const hashedPass = await bcrypt.hash(password, saltRound);
    return hashedPass;
  } catch (err) {
    console.log(err);
  }
};

export const comparePassword = async (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};
