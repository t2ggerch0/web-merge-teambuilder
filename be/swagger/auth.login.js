/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags:
 *       - auth
 *     parameters:
 *       - in: body
 *         name: body
 *         description:
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 1
 *             token:
 *               type: string
 *             user:
 *               type: string
 *       401:
 *         description: 이메일 없음 혹은 비밀번호 불일치
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 0
 *             message:
 *               type: string
 *               example: email not found or password not matched
 *       500:
 *         description: 서버 내부 오류
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
