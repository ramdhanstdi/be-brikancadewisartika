const router = require("express").Router();

router.use("/role", require("../features/roles/route"));
router.use("/auth", require("../features/auth/routes"));
router.use("/form", require("../features/form/routes"));

module.exports = router;
