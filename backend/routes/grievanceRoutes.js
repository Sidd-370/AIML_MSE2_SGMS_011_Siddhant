import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  search
} from "../controllers/grievanceController.js";

const router = express.Router();

router.post("/grievances", auth, create);
router.get("/grievances", auth, getAll);
router.get("/grievances/:id", auth, getOne);
router.put("/grievances/:id", auth, update);
router.delete("/grievances/:id", auth, remove);
router.get("/grievances/search", auth, search);

export default router;