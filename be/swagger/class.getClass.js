/**
 * @swagger
 * /class:
 *   get:
 *     tags:
 *       - class
 *     summary: 클래스 ID로 특정 클래스를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: classId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Class information retrieved successfully
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
