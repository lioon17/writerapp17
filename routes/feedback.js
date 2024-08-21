const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Route to submit feedback
router.post('/submitFeedback', async (req, res) => {
    const { orderId, feedbackText, rating } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const newFeedback = new Feedback({
            orderId,
            feedbackText,
            rating,
            userId
        });

        await newFeedback.save();
        res.json({ success: true, feedback: newFeedback });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to get feedbacks
router.get('/getFeedbacks', async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const feedbacks = await Feedback.find({ userId });
        res.json({ success: true, feedbacks });
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
