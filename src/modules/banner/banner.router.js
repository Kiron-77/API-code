const { USER_ROLES } = require('../../config/constants.config')
const authCheck = require('../../middlewares/auth.middleware')
const PermissionCheck = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const { validator } = require('../../middlewares/validator.middleware')
const bannerCtrl = require('./banner.controller')
const { bannerCreateSchema } = require('./banner.request')

const router = require('express').Router()
router.get("/home",bannerCtrl.listForHome)
router.route('/')
    .post(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        uploader.single('image'),
        validator(bannerCreateSchema),
        bannerCtrl.createBanner
)
    .get(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        bannerCtrl.listAllBanners
)
router.route("/:id")
    .get(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        bannerCtrl.getBannerDetail
)
    .put(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        uploader.single('image'),
        validator(bannerCreateSchema),
        bannerCtrl.updateById

        
)
    .delete(
        authCheck,
        PermissionCheck(USER_ROLES.admin),
        bannerCtrl.deleteById
)



// .post(authCheck,PermisionCheck(USER_ROLES.admin))


module.exports = router;