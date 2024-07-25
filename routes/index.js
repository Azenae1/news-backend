const router = require("express").Router();
const userRouter = require("./users");
const NotFoundError = require("../utils/err_notFound");
const { createUser, login } = require("../controllers/users");
const {
  loginValidation,
  createUserValidation,
} = require("../middlewares/validation");

router.post("/signup", createUserValidation, createUser);
router.post("/signin", loginValidation, login);

router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Not found"));
});

module.exports = router;
