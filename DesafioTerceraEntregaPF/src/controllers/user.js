const multer = require('multer');
const UserService = require('../services/user.service');
const user = new UserService();

const CartService = require('../services/cart.service');
const cart = new CartService();

const { createLogger } = require('../config/logger.config');
const logger = createLogger('PROD');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads');
    }
    , filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const validation = (req, file, cb) => {
    // console.log(file.mimetype);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    }
    else {
        cb(new Error('Only .png and .jpg allowed'), false);
    }
}

const upload = multer({ storage: storage, fileFilter: validation });
const uploadAvatar = upload.single('avatar');
const login = async (req, res) => {
    const userCart = await cart.getUserCart(req.user.id);
    if(userCart.success === false) {
        const cartCreated = await cart.save({user: req.user.id});
    }
    res.status(200).json({
        status: 'success',
        message: "ok",
    });
}

const failedLogin = (req, res) => {
    res.status(401).json({
        status: 'error',
        message: req.flash('loginMessage')
    });
}

const createUser = async (req, res) => {
    const cartCreated = await cart.save({user: req.user.id});
    res.status(200).json({
        status: 'success',
        message: "ok",
    });
}

const failedSignup = (req, res) => {
    res.status(401).json({
        status: 'error',
        message: req.flash('signupMessage')
    });
}

module.exports = {
    createUser, uploadAvatar, failedSignup, login, failedLogin
}