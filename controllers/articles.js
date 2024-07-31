const Article = require("../models/article");

const BadRequestErr = require("../utils/err_badRequest");
const NotFoundErr = require("../utils/err_notFound");
const ForbiddenErr = require("../utils/err_forbidden");

const getArticles = (req, res, next) => {
  // console.log("GET articles");
  Article.find({ owner: req.user._id })
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const addArticle = (req, res, next) => {
  console.log("POST articles");
  console.log(req.user._id);
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestErr(err.message));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  console.log("DELETE articles");
  const { itemId } = req.params;

  Article.findById(itemId)
    .orFail()
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return next(new ForbiddenErr("You can't delete this article"));
      }
      return Article.findByIdAndDelete(itemId).then((user) => {
        res.send(user);
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundErr("Article not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestErr("Invalid data"));
      }
      return next(err);
    });
};

module.exports = { getArticles, addArticle, deleteArticle };
