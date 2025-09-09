import { Hono } from "hono";
import { createUserSchema, loginSchema } from "../validations/userValidation.js";
import { createUser, findUserByEmail, loginUser } from "../services/userService.js";

const userController = new Hono()

userController.post("/create", async (c) => {
  const { success, data, error } = createUserSchema.safeParse(c.req.json())
  if (!success) {
    return c.json({
      message: "Validation error",
      error: error
    }, 411)
  }
  console.log(data);
  try {
    const isUserPresent = await findUserByEmail(data.email)
    if (isUserPresent) {
      return c.json({
        "message": "User is already present"
      }, 403)
    }
    const user = await createUser(data)
    return c.json({
      message: "User Created",
      user
    }, 200)
  } catch (error) {
    return c.json({
      message: "Something went wrong",
      error
    }, 500)
  }
})

userController.post("/login", async (c) => {
  const { success, data, error } = loginSchema.safeParse(c.req.json())
  if (!success) {
    return c.json({
      message: "Validation error",
      error: error
    }, 411)
  }
  try {
    const token = await loginUser(data)
    return c.json({
      message: "Login Success",
      token
    }, 200)
  } catch (error) {
    c.json({
      message: error
    })
  }
})


export default userController;
