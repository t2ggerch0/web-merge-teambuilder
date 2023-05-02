/**
 * @swagger
 * /question:
 *   get:
 *     tags:
 *       - question
 *     summary: 질문 정보
 *     description: 질문ID로 질문 정보를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: questionId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Question information retrieved successfully
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
