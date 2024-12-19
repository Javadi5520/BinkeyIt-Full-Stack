import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";
import { addCategoryController, getCategoryController, updateCategoryController, deleteCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, admin, addCategoryController);
categoryRouter.get("/get", getCategoryController);
categoryRouter.put("/update", auth, admin, updateCategoryController);
categoryRouter.delete("/delete", auth, admin, deleteCategoryController);

export default categoryRouter;
