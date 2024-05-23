    import express from "express";
    import userAuth from "../middlewares/authMiddleware.js";
    import { createJobController, getAllJobsController } from "../controllers/jobController.js";
    import { updateJobController } from './../controllers/jobController.js';

    const router = express.Router();

    router.post('/create-job', userAuth, createJobController);
    router.get("/get-job", userAuth, getAllJobsController);

    router.patch("/update-job/:id", userAuth, updateJobController);
    export default router;
