/**
 * @swagger
 * /auth/user:
 *   get:
 *     tags:
 *       - auth
 *     summary: 유저 정보
 *     description: 토큰을 받고 유저 정보를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
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
 *               example: Authorization header missing or Invalid token
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
