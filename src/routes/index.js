const router = require("express").Router();

router.use("/role", require("../features/roles/route"));
router.use("/auth", require("../features/auth/route"));

module.exports = router;
