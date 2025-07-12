import { VercelRequest, VercelResponse } from "@vercel/node";
import express, { Request, Response } from "express";
import { sendSuccess } from "./utils/response";

import { createLog, updateAppHealth } from "./integration";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use((req: Request, res: Response, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);

  // Capture the original send method
  const originalJson = res.json;
  res.json = function (body?: any) {
    console.log(`[RESPONSE] ${res.statusCode} ${JSON.stringify(body)}`);
    return originalJson.call(this, body);
  };

  next();
});

app.get("/", async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: `Hello, House Haven with Express on Vercel!` });
});

app.get("/health", async (req: Request, res: Response) => {
  const startTime = Date.now();

  console.log(`[HEALTH] Starting health check for appId: ${process.env.APPID}`);

  const res2 = await updateAppHealth(Number(process.env.APPID!), true);
  console.log(`[HEALTH] updateAppHealth response:`, res2);

  const healthData = {
    name: "House Haven",
    id: process.env.APPID,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    ...res2.data,
  };

  console.log(`[HEALTH] Final health data:`, healthData);
  const responseTime = Date.now() - startTime;

  // Create a log before sending the response
  await createLog(Number(process.env.APPID!), healthData.name, {
    logType: "success",
    message: "Health check passed",
    statusCode: 200,
    endpoint: "/health",
    additionalData: healthData,
    method: "GET",
    responseTime,
  });

  sendSuccess(res, healthData, "House Haven is running successfully");
});

// Only listen if not running in a serverless environment
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 1423;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default (req: VercelRequest, res: VercelResponse) => app(req, res);
