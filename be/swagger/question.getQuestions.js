/**
 * @swagger
 * /question:
 *   get:
 *     tags:
 *       - question
 *     summary: 특정 클래스의 질문 리스트를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: classId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Question list retrieved successfully
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
