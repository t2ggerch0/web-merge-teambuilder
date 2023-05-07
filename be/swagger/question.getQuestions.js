/**
 * @swagger
 * /question:
 *   get:
 *     tags:
 *       - question
 *     summary: 클래스별 질문 리스트
 *     description: 클래스 ID로 해당 클래스에 등록된 모든 질문 리스트를 반환합니다.
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
 *         schema:
 *           type: object
 *           properties:
 *             questions:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Question'
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
