import { Router } from "express";

const router = Router();

router.get("/:username");
router.get("/");
router.put("/follow");
router.put("/unfollow");
router.delete("/:username");
router.delete("/");

export default router;
