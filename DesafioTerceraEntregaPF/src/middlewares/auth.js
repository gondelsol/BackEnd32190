const checkAdmin = (req, res, next) => {
    const logger = req.app.get('logger');
    const path = req.originalUrl;
    const metodo = req.method;
    // logger.info(req.user);
    if (!req.user.admin) {
    // if (ADMIN !== true){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${path} método ${metodo} no autorizada`
        });
    }
    next();
}

const checkAuth = (req, res, next) => {
    if (req.user) {
        return res.redirect('/dashboard');
    }
    next();
}
const checkLogout = (req, res, next) => {
    // console.log(req.user);
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
}

module.exports = {
    checkAdmin, checkAuth, checkLogout
}