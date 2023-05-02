/**
 * @swagger
 * /auth/user:
 *   delete:
 *     tags:
 *       - auth
 *     summary: 회원 탈퇴
 *     parameters:
 *       - name: email
 *         in: query
 *         description: 삭제할 유저의 이메일
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 유저 삭제 성공
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User deleted successfully
 *       404:
 *         description: 유저가 존재하지 않음
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User not found
 *       500:
 *         description: 서버 내부 오류
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
