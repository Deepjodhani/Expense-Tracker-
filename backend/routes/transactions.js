const auth = require('../middleware/auth');
const { register, login, getUser } = require('../controllers/auth');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenses');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const router = require('express').Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/user', auth, getUser);

// Transaction routes
router.post('/add-income', auth, addIncome);
router.get('/get-incomes', auth, getIncomes);
router.delete('/delete-income/:id', auth, deleteIncome);
router.post('/add-expense', auth, addExpense);
router.get('/get-expenses', auth, getExpense);
router.delete('/delete-expense/:id', auth, deleteExpense);

module.exports = router;