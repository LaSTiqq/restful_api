import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new userModel({
      ...req.body,
      password: hash,
    });
    if (!req.body.isAdmin) {
      await newUser.save();
      return res.status(201).send("New user is registered");
    }
    return res.status(401).send("You can't register as an admin");
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("Wrong email or password");
    }

    const userPassword = await bcrypt.compare(req.body.password, user.password);
    if (!userPassword) {
      return res.status(404).send("Wrong email or password");
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_JWT,
      {
        expiresIn: "1 day",
      }
    );

    return res
      .cookie("session_token", token, {
        httpOnly: true,
      })
      .status(201)
      .send(`Login succeed`);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};
