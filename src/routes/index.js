const router = require("express").Router();

router.use("/role", require("../features/roles/route"));
router.use("/auth", require("../features/auth/routes"));
router.use("/merchant", require("../features/merchant/routes"));
router.use("/profile", require("../features/profile/routes"));
router.use("/dropbox", require("../helpers/dropbox"));
router.use("/user", require("../features/users/routes"));

module.exports = router;
