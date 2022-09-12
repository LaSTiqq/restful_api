import express from "express";
import * as u from "../controllers/userController.js";
import {
  verifySessionTokenUser,
  verifySessionTokenAdmin,
} from "../authCheck/authCheck.js";

const router = express.Router();

router.get("/get", verifySessionTokenAdmin, u.getAllUser);

router.get("/get/:id", verifySessionTokenUser, u.getUserById);

router.put("/update/:id", verifySessionTokenUser, u.updateUserById);

router.delete("/delete/:id", verifySessionTokenUser, u.deleteUserById);

export default router;
