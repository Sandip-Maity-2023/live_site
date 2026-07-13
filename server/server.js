// // const express=require('express');
// // const cors=require('cors');
// // const dotenv=require('dotenv');
// import portfolioRoutes from "./routes/portfolioRoute.js";

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// //dotenv configuration
// dotenv.config();

// //rest object
// const app=express();

// //midlewares
// app.use(cors());
// app.use(express.json());

// //routes
// // app.get("/",(req,res)=>{
// //     res.send('<h1>Welcome To Node Server</h1>')
// // })
// app.use("/api/v1/portfolio", portfolioRoutes);

// //port
// const PORT=process.env.PORT || 5000;

// //listen
// app.listen(PORT,()=>{
//     console.log(`Server Running On PORT ${PORT} `)
// });

// app.get("/", (req, res) => {
//   res.send("Portfolio API Running");
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import portfolioRoutes from "./routes/portfolioRoute.js";

// Handle ES module path naming conventions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv configuration
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// API routes (Must be declared BEFORE serving static files)
app.use("/api/v1/portfolio", portfolioRoutes);

app.get("/api-status", (req, res) => {
  res.send("Portfolio API Running");
});

// Serve frontend static assets from the client dist folder (Vite outputs to 'dist', not 'build')
app.use(express.static(path.join(__dirname, "../client/dist")));

// Fallback route: Route everything else to React's index.html
// CHANGED: "*" to "(.*)" to support Express v5 routing syntax
// Fallback route: Route everything else to React's index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`);
});
