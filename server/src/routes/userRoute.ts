import express from "express";
import { getorders, login, register } from "../services/userService";
import validateJWT, { extendReuest } from "../middlewares/ValidateJWT";
import { getActiveCartForUser } from "../services/cartService";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const result = await register({ firstName, lastName, email, password });
  res.status(result.statusCode).json(result.data);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await login({ email, password });
  res.status(result.statusCode).json(result.data);
});

router.get("/order", validateJWT, async (req: extendReuest, res) => {
  const userId = req?.user?._id;
  const { statucode, data } = await getorders({ userId });
  res.status(statucode).send(data);
});

export default router;
