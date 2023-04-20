const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const verifyJwt = require("../../utils/verifyJwt");

const User = require("../../models/User");

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - auth
 *     summary: 유저 정보
 *     description: 토큰을 받고 유저 정보를 반환합니다.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: token is invalid
 *       404:
 *         description: User not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.get("/user", async (req, res) => {
  try {
    // verify JWT
    const userId = verifyJwt(req, res);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;