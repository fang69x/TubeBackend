import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js"; 
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

// In user.routes.js, add this before the upload.fields middleware
router.route("/register").post(
    (req, res, next) => {
        console.log("Request body before Multer:", req.body);
        console.log("Request files before Multer:", req.files);
        next();
    },
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    (req, res, next) => {
        console.log("Request body after Multer:", req.body);
        console.log("Request files after Multer:", req.files);
        next();
    },
    registerUser
);
export default router;