/**
 * @swagger
 * /class/join-class:
 *   post:
 *     summary: 특정 클래스에 입장합니다.
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: The data to join the class
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *               example: "6095b5f5b5ab8e1f02e4f3d4"
 *             accessKey:
 *               type: integer
 *               example: 123456
 *             position:
 *               type: string
 *               example: "frontend"
 *             answers:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   questionId:
 *                     type: string
 *                     example: "0"
 *                   answer:
 *                     type: integer
 *                     example: 2
 *     responses:
 *       201:
 *         description: Successfully joined a class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "joined class successfully"
 *       403:
 *         description: Error joining a class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid access key"
 *       500:
 *         description: An error occurred while joining the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while joining the class"
 */
