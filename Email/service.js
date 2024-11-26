const nodemailer = require('nodemailer');

module.exports = {
    async sendMail(mailReq) {
        try {
            // Create a transporter with custom SMTP settings
            const transporter = nodemailer.createTransport({
                host: mailReq.host,
                port: mailReq.port,
                secure: false, // Use TLS
                auth: {
                    user: mailReq.userName,
                    pass: mailReq.password
                }
            });

            // Email options
            let mailOptions = {
                from: `"Crm360Manager" ${mailReq.From}`,
                to: mailReq.To,
                subject: mailReq.subject,
                text: 'Email sent via custom SMTP server',
                html: mailReq.body
            };

            // Send email
            const info = await transporter.sendMail(mailOptions);
            return { success: true, message: info.response }
        } catch (error) {
            return error;
        }
    }
}