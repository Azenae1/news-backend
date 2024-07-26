const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");
const { createUser, login } = require("../controllers/users");
const {
  loginValidation,
  createUserValidation,
} = require("../middlewares/validation");
const NotFoundErr = require("../utils/err_notFound");

router.post("/signup", createUserValidation, createUser);
router.post("/signin", loginValidation, login);

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.use((req, res, next) => {
  next(new NotFoundErr("Not found"));
});

module.exports = router;
