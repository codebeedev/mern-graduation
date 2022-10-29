import userService from "../services/userService";

let handleLogin = async (req, res) => {
  // lấy ra giá trị id và password
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs paramerter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      users: [],
    });
  }
  let users = await userService.getAllUser(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

let handleCreateUser = async (req, res) => {
  let createUser = await userService.createNewUser(req.body);
  return res.status(200).json(createUser);
};

let handleEditUser = async (req, res) => {
  let editUser = await userService.editUser(req.body);
  return res.status(200).json(editUser);
};

let handleDeleteUser = async (req, res) => {
  let deleteUser = await userService.deleteUser(req.body.id);
  return res.status(200).json(deleteUser);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleGetAllUsers: handleGetAllUsers,
  handleLogin: handleLogin,
  handleCreateUser: handleCreateUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
