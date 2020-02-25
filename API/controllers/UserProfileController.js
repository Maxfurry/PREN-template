const bcrypt = require('bcrypt');
const userModelManager = require('../lib/modelManagers/usermodel');
const profileModelManager = require('../lib/modelManagers/profileModel');
const {
  successResponse,
  failureResponse,
  serverFailure
} = require('../lib/utils/messageHandler');
const {
  DATABASE_UPDATED_CODE
} = require('../constants');

const create = async (req, res) => {
  let newProfile = {};
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  try {
    const newUser = await userModelManager.create(
      req.body.email,
      hashedPassword
    );

    if (newUser) {
      newProfile = await profileModelManager.createUserProfile(newUser.id, req.body);
    }

    newProfile.dataValues.email = newUser.email;

    return successResponse(res, 'New user succesfully created', newProfile, DATABASE_UPDATED_CODE);
  } catch (error) {
    return res.send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModelManager.listAllUsers();
    return successResponse(res, 'All users fetched succesfully', users);
  } catch (error) {
    return serverFailure(res);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModelManager.getUser('id', req.params.id);

    if (!user) {
      return failureResponse(res, 'User does not exist');
    }

    return successResponse(res, 'User fetched successfully', user);
  } catch (error) {
    return serverFailure(res);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModelManager.updateUser(req.params.id, req.body);

    if (!updatedUser[0]) {
      return failureResponse(res, 'User does not exist');
    }

    return successResponse(res, 'User updated successfully', updatedUser[1], DATABASE_UPDATED_CODE);
  } catch (error) {
    return serverFailure(res);
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedProfile = await profileModelManager.updateUserProfile(req.params.id, req.body);

    if (!updatedProfile[0]) {
      return failureResponse(res, 'User does not exist');
    }

    return successResponse(res, 'User updated successfully', updatedProfile[1], DATABASE_UPDATED_CODE);
  } catch (error) {
    return serverFailure(res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModelManager.deleteUser(req.params.id);

    if (!deletedUser) {
      return failureResponse(res, 'User does not exist');
    }

    return successResponse(res, 'User deleted successfully', {}, DATABASE_UPDATED_CODE);
  } catch (error) {
    return serverFailure(res);
  }
};

module.exports = {
  create,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  updateProfile };
