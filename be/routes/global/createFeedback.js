const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const Feedback = require("../../models/Feedback");

router.post('/feedback', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 피드백 메시지 생성
        const feedback = new Feedback({
            name,
            email,
            message,
        });

        // 피드백 메시지 저장
        await feedback.save();

        res.status(201).json({ message: 'Feedback sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;