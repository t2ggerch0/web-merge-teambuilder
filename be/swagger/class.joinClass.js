/**
 * @swagger
 * /class/join-class:
 *   post:
 *     summary: accessKey로 클래스에 입장합니다.
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: body
 *         in: body
 *         description: accessKey
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             accessKey:
 *               type: number
 *     responses:
 *       201:
 *         description: joined class successfully
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: number
 *             message:
 *               type: string
 *               example: joined class successfully
 *       500:
 *         description: An error occurred while joining the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occurred while joining the class
 */
