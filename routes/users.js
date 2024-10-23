const router = require("express").Router();
const { authorization } = require("../middlewares/auth");
const { getCurrentUser } = require("../controllers/users");

router.use(authorization);

router.get("/me", getCurrentUser);

module.exports = router;
