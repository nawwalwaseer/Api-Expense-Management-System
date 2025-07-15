const {addExpense, updateExpense, deleteExpense} = require("../controllers/expenseController")
const Expense = require("../models/Expense")

jest.mock("../models/Expense")


describe('addExpense Controller', () => {
    it('should add an expense and return 201 status', async () => {
        const req = {
            body: {
                title: 'Lunch',
                amount: 500,
                category: 'Food',
                date: '2024-07-11',
                notes: '',
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        Expense.mockImplementation((data) => ({
    ...data,
    save: jest.fn().mockResolvedValue(data)
}));

        await addExpense(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
        
    });
});


describe('updateExpense Controller', () => {
    it('should update an expense and return 200 status', async () => {
        const req = {
            params: { id: 'mockExpenseId' },
            body: {
                title: 'Updated Title',
                amount: 600,
                category: 'Updated Category',
                date: '2024-07-11',
                notes: 'Updated Note'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockUpdatedExpense = {
            _id: 'mockExpenseId',
            ...req.body
        };
        Expense.findByIdAndUpdate.mockResolvedValue(mockUpdatedExpense);

        await updateExpense(req, res);

        expect(Expense.findByIdAndUpdate).toHaveBeenCalledWith(
            'mockExpenseId',
            req.body,
            { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "expense updated!",
            expense: mockUpdatedExpense
        });
    });
});

describe('deleteExpense', ()=>{
    it('should delete an expense with id', async () => {
        const req = {
            params: {id:"mockExpenseId"}
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockDeletedExpense = {
            id: "mockExpenseId",
            title: "Groceries",
            amount: 200
        }

        Expense.findByIdAndDelete.mockResolvedValue(mockDeletedExpense)

        await deleteExpense(req,res)

        expect(Expense.findByIdAndDelete).toHaveBeenCalledWith("mockExpenseId")
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockDeletedExpense)
    })

    it('should return a 404 status if expense not found', async () => {
        const req = {
            params: {id:"notExistingId"}
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        Expense.findByIdAndDelete.mockResolvedValue(null)

        await deleteExpense(req,res)

        expect(Expense.findByIdAndDelete).toHaveBeenCalledWith("notExistingId")
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({error:'expense not found'})

    })
})