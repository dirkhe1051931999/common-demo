const router = require("koa-router")();
const github = require("./github.controller");
router.get("/github", github.githubOauth);
module.exports = router;
