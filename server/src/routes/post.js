import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/u/:username");
router.get("/tags/:tag");
router.get("/:postId");
router.put("/:postId");
router.delete("/:postId");

export default router;
