const router = require("express").Router();
const bookCrud = require("../utils/book-crud");

router.route("/")
  .get(bookCrud.findAll)
  .post(bookCrud.create);

router
  .route("/:id")
  .delete(bookCrud.remove);

module.exports = router;
