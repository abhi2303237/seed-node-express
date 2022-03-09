import { Router } from "express";
// import { getSingleResult } from "@utils/db.service";
const router = Router();
export const routes = (app: any) => {
    router.get("/health", async (_, res: any) => {
        try {
            // const result = await getSingleResult("select NOW()");
            // return res.json({ status: true, message: "Retailer App Service is up and running now", data: { version: process.env.VERSION, time: result.data } });
            return res.json({ status: true, message: "Retailer App Service is up and running now", data: { version: process.env.VERSION } });
        } catch (err) {
            return res.json({ status: false, message: "Failed to check health..!", data: { version: process.env.VERSION }, error: err.message });
        }

    });
    app.use(router);
};
