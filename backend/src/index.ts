import "dotenv/config"
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userController from "./cotrollers/userController.js"
import { logger } from "hono/logger"
import { cors } from "hono/cors"

const app = new Hono()
app.use(logger())
app.use("/api/v1/*", cors())

app.route("/api/v1/user", userController)

serve(app, (info) => {
  console.log(`Server running on port :${info.port}`);
})



