/**
 * @swagger
 * /auth/verify:
 *   post:
 *     tags:
 *       - auth
 *     summary: 회원가입
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: default유저를 실제 유저로 덮어씁니다.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             verifyCode:
 *               type: number
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 1
 *       400:
 *         description: 인증코드 불일치
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 0
 *             message:
 *               type: string
 *               example: invalid verify code
 *       409:
 *         description: 이미 등록된 이름이 있음
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 0
 *             message:
 *               type: string
 *               example: duplicated name
 *       500:
 *         description: 서버 내부 오류
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
