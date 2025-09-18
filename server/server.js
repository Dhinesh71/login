const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", require("./routes/auth"));


// Export the app for Vercel serverless deployment
module.exports = app;

// Only listen when running locally
if (require.main === module) {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
