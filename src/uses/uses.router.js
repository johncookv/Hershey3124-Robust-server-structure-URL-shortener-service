const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
router
  .route("/:usesId")
  .get(controller.read)
  .delete(controller.delete)
  .all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
