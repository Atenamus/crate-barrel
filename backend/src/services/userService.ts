import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { db } from "../db/db.js";
import { userTable } from "../db/schema.js";
import type { createUserType, loginUserType } from "../validations/userValidation.js";

export const findUserByEmail = async (email: string) => {
  return (await db.select({
    id: userTable.id,
    email: userTable.email,
    password: userTable.password
  }).from(userTable).where(eq(userTable.email, email)).limit(1))
}

export const createUser = async (user: createUserType) => {
  const hashedPassword = await bcrypt.hash(user.password, 5)
  return await db.insert(userTable).values({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword,
    address: user.address
  }).returning({
    id: userTable.id,
    firstName: userTable.firstName,
    lastName: userTable.lastName,
    email: userTable.email,
    address: userTable.address
  })
}

export const loginUser = async (user: loginUserType) => {
  const isUserPresent = await findUserByEmail(user.email)
  if (!isUserPresent) {
    throw new Error("User not Found")
  }
  const passwordMatched = bcrypt.compare(user.password, isUserPresent[0]?.password!)

  if (!passwordMatched) {
    throw new Error("Invalid Password")
  }
  const generatedToken = sign({ userId: isUserPresent[0]?.id }, process.env.JWT_SECRET!)
  return generatedToken
}
