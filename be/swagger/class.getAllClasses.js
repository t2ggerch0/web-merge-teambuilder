/**
 * @swagger
 * /class/all:
 *   get:
 *     tags:
 *       - class
 *     summary: 모든 class 정보를 반환
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
