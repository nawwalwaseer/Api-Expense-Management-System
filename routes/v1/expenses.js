const express = require("express");
const router = express.Router();

const checkRole = require('../../middleware/checkRole');
const authenticateToken = require('../../middleware/authMiddleware');

const {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,
    getSummary,
} = require("../../controllers/expenseController");

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: API for managing expenses
 */

/**
 * @swagger
 * /api/v1/expenses/add:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: [Food, Transport, Apparel, Other]
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not an Admin
 */
router.post('/add', authenticateToken, checkRole('admin'), addExpense);

/**
 * @swagger
 * /api/v1/expenses:
 *   get:
 *     summary: Retrieve all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get("/", getAllExpenses);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense updated
 */
router.put("/:id", updateExpense);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted
 */
router.delete("/:id", deleteExpense);

/**
 * @swagger
 * /api/v1/expenses/summary/all:
 *   get:
 *     summary: Get summary of all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Expense summary
 */
router.get("/summary/all", getSummary);

module.exports = router;



