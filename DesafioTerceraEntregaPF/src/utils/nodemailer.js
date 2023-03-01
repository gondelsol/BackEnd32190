const config = require('../config/nodemailer.config');
const { emailAdmin } = require('../config/globals');
const { createLogger } = require('../config/logger.config');
const logger = createLogger('PROD');

const sendMailSignup = async(mailOptions) => {
    const options = {
        from: 'Servidor Node.js',
        to: emailAdmin,
        subject: 'Nuevo registro',
        html: `
            <h1>Se ha registrado un nuevo usuario</h1>
            <p>Nombre: ${mailOptions.user.name}</p>
            <p>Usuario: ${mailOptions.user.username}</p>
            <p>Dirección: ${mailOptions.user.address}</p>
            <p>Edad: ${mailOptions.user.age}</p>
            <p>Teléfono: ${mailOptions.user.phone}</p>
            <!-- <p>Avatar: ${mailOptions.user.avatar}</p> -->
        `
    }
    try {
        const info = await config.sendMail(options)
        // logger.info(info);
        return true;
    } catch (error) {
        logger.error(error);
        return error.message;
    }
}

const sendMailOrder = async(mailOptions) => {
    let htmlProducts = `
    <ul>`;
    mailOptions.user.cart.products.map((prod) => htmlProducts += `<li>
        <p>${prod.name} - ${prod.description} (${prod.stock} x $${prod.price}) - Total: $${prod.stock * prod.price} </p>
    </li>`);
    htmlProducts += `</ul>
    `;
    const options = {
        from: 'Servidor Node.js',
        to: emailAdmin,
        subject: `Nuevo pedido de ${mailOptions.user.name}  ${mailOptions.user.username} `,
        html: `
            <h1>Se ha registrado un nuevo pedido de:</h1>
            <p>Nombre: ${mailOptions.user.name}</p>
            <p>Usuario: ${mailOptions.user.username}</p>
            <p>Dirección: ${mailOptions.user.address}</p>
            <p>Edad: ${mailOptions.user.age}</p>
            <p>Teléfono: ${mailOptions.user.phone}</p>
            <p>Productos pedidos: ${htmlProducts}</p>
            <!-- <p>Avatar: ${mailOptions.user.avatar}</p> -->
        `
    }
    // logger.info(options.html);
    try {
        const info = await config.sendMail(options)
        // logger.info(info);
        return {
            success: true,
        }
    } catch (error) {
        logger.error(error);
        return {
            success: false,
            message: error.message,
        }
    }
}

module.exports = { sendMailSignup, sendMailOrder };