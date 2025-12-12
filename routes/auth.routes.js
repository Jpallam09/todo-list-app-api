import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post("/signIn", signIn)

authRouter.post("/signUp", signUp)

// authRouter.post("logout")

export default authRouter;