const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const user = req.user;
    res.json({ user });
});

module.exports = router;
