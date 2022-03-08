import { Router } from "express";
const router = Router();
export const routes = (app: any) => {
    router.get("/health", async (_, res: any) => {
        res.json({ status: true, message: "Retailer App Service is up and running now", data: { version: process.env.VERSION } });
    });
    app.use(router);
};
