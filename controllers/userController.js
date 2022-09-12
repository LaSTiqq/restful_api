import userModel from "../models/userModel.js";

export const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({}, { password: 0 });
    return res.status(202).json(allUser);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send(`User has been successfully deleted`);
  } catch (error) {
    console.error(error);
  }
};

export const updateUserById = async (req, res) => {
  try {
    if (!req.body.isAdmin) {
      const updateUser = await userModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updateUser);
    }
    return res.status(401).send(`You can't grant admin role to regular user`);
  } catch (error) {
    console.error(error);
  }
};
