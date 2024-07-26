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

router.get("/", getArticles);

router.use(authorization);

router.post("/", articleValidation, addArticle);
router.delete("/:articleId", idValidation, deleteArticle);

module.exports = router;
