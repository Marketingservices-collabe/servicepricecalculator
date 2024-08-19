const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.post('/calculate', (req, res) => {
    try {
        const { laborCosts, materialCosts, overheadExpenses, profit } = req.body;

        if (
            laborCosts === undefined ||
            materialCosts === undefined ||
            overheadExpenses === undefined ||
            profit === undefined
        ) {
            return res.status(400).json({ error: 'All cost inputs must be provided' });
        }

        const totalCost = laborCosts + materialCosts + overheadExpenses;
        const totalPrice = totalCost + profit;

        const profitPercentage = (profit / totalPrice) * 100 || 0;
        const markupPercentage = (profit / totalCost) * 100 || 0;

        return res.json({
            totalPrice: totalPrice.toFixed(2),
            profitPercentage: profitPercentage.toFixed(2),
            markupPercentage: markupPercentage.toFixed(2),
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
