const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

app.post('/api/chat', async (req, res) => {
    const { question } = req.body;
    try {
        const response = await axios.post('https://api.aimlapi.com/v1/chat/completions', {
            "model": "deepseek-r1-distill-qwen-32b",
            "messages": [{ "role": "user", "content": question }],
            "temperature": 0.6,
            "max_completion_tokens": 4096,
            "top_p": 0.95,
            "stream": true,
            "stop": null
        }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});