const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user login and token generation
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login to obtain a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: Nawwal
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: admin
 *     responses:
 *       200:
 *         description: JWT token returned
 *       400:
 *         description: Username and role are required
 */
router.post('/login', (req, res) => {
    const { username, role } = req.body;

    if (!username || !role) {
        return res.status(400).json({ message: 'Username and role are required!' });
    }

    const user = {
        id: 1,
        username,
        role
    };

    const token = jwt.sign(user, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;


// const express = require('express');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// /**
//  * @swagger
//  * /api/v1/login:
//  *   post:
//  *     summary: Login to obtain a JWT token
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - username
//  *               - role
//  *             properties:
//  *               username:
//  *                 type: string
//  *               role:
//  *                 type: string
//  *                 enum: [admin, user]
//  *     responses:
//  *       200:
//  *         description: JWT token returned
//  */
// router.post('/login', (req, res) => {
//     const { username, role } = req.body;

//     if (!username || !role) {
//         return res.status(400).json({ message: 'Username and role are required!' });
//     }

//     const user = {
//         id: 1,
//         username,
//         role
//     };

//     const token = jwt.sign(user, 'your_jwt_secret', { expiresIn: '1h' });

//     res.json({ token });
// });

// module.exports = router;


