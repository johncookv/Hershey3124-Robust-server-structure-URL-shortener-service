const router = require("express").Router();
const controller = require("./url-controller");
const usesRouter = require("../uses/uses.router");
router.use("/:urlId/uses", controller.urlExists, usesRouter);
const methodNotAllowed = require("../errors/methodNotAllowed");
router
  .route("/:urlId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed)

router.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed)

module.exports = router;