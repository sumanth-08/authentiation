const express = require("express")
const router = express.Router()
const { signup, signin, signout, list, add } = require("../controllers/user")


router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signout)

router.get('/list', list)
router.post('/.add', add)


module.exports = router