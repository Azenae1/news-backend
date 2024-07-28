const router = require("express").Router();
const { authorization } = require("../middlewares/auth");
const {
  getArticles,
  addArticle,
  deleteArticle,
} = require("../controllers/articles");
const {
  articleValidation,
  idValidation,
} = require("../middlewares/validation");

router.use(authorization);

router.get("/", getArticles);
router.post("/", articleValidation, addArticle);
router.delete("/:articleId", idValidation, deleteArticle);

module.exports = router;
