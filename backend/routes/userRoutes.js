import express from "express";
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUserById, updateUserProfile } from "../controllers/userController.js";
import {admin, protect} from "../middleware/authMiddleware.js";

const router=express.Router();

router.route("/").post(registerUser)
router.route("/").get(protect,admin,getUsers)
router.post("/login",authUser)
router.route("/profile")
    .get(protect,getUserProfile)
    .put(protect,updateUserProfile)
router.route("/:id")
    .delete(protect,admin,deleteUser)
    .get(protect,admin,getUserById)
    .put(protect,admin,updateUserById);
export default router