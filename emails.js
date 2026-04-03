const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
const FROM_EMAIL = process.env.FROM_EMAIL || 'orders@techxocean.com';

class EmailService {
    async sendOrderConfirmation(email, orderDetails) {
        if (process.env.RESEND_API_KEY === 're_123456789_placeholder' || !process.env.RESEND_API_KEY) {
            console.log(`[Email Mock] Order Confirmation sent to ${email} for Order ${orderDetails.id}`);
            return;
        }

        try {
            await resend.emails.send({
                from: FROM_EMAIL,
                to: email,
                subject: `Order Confirmation - TechX Ocean (Order #${orderDetails.id})`,
                html: `
                    <h2>Thank you for your order!</h2>
                    <p>Your order <strong>#${orderDetails.id}</strong> has been confirmed.</p>
                    <p>Total: ৳${orderDetails.total}</p>
                    <p>We will notify you once it ships.</p>
                    <p>- TechX Ocean Team</p>
                `
            });
            console.log(`Email sent to ${email}`);
        } catch (error) {
            console.error('Email send failed:', error);
        }
    }

    async sendOrderStatusUpdate(email, orderId, status, trackingUrl) {
        if (process.env.RESEND_API_KEY === 're_123456789_placeholder' || !process.env.RESEND_API_KEY) {
            console.log(`[Email Mock] Status update (${status}) sent to ${email}`);
            return;
        }
        
        try {
            await resend.emails.send({
                from: FROM_EMAIL,
                to: email,
                subject: `Order Update - TechX Ocean (Order #${orderId})`,
                html: `
                    <h2>Your order status has been updated!</h2>
                    <p>Order <strong>#${orderId}</strong> is now: <strong>${status}</strong>.</p>
                    ${trackingUrl ? `<p>Track your package: <a href="${trackingUrl}">${trackingUrl}</a></p>` : ''}
                `
            });
        } catch (error) {
            console.error('Email send failed:', error);
        }
    }
}

module.exports = new EmailService();
