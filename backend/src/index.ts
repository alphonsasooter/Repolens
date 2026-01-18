import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

/* ✅ TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Analyzer API is running ");
});

/* ✅ GITHUB LOGIN ROUTE */
app.get("/api/auth/github", (req, res) => {
  const redirectUrl =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`;

  res.redirect(redirectUrl);
});

/* ✅ GITHUB CALLBACK ROUTE */
app.get("/api/auth/github/callback", (req, res) => {
  res.send("GitHub callback reached successfully");
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});