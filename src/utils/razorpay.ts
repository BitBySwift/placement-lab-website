import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Function to create payment orders
export const createOrder = async (amount, currency) => {
    const options = {
        amount: amount * 100, // amount in paise
        currency: currency,
        receipt: `receipt_order_${Math.random()}`,
    };
    return razorpay.orders.create(options);
};

// Function to verify payment signatures
export const verifyPayment = (paymentId, orderId, signature) => {
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + '|' + paymentId)
        .digest('hex');
    return generatedSignature === signature;
};

// Helper functions for payments
export const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};
