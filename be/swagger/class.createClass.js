/**
 * @swagger
 * /class/create-class:
 *   post:
 *     summary: 클래스를 생성하고 유일한 accessKey를 반환합니다.
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
 *         description: The class to create
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             capacity:
 *               type: integer
 *             startDate:
 *               type: string
 *               format: date
 *             endDate:
 *               type: string
 *               format: date
 *     responses:
 *       201:
 *         description: Class created successfully
 *         schema:
 *           type: object
 *           properties:
 *             accessKey:
 *               type: number
 *             classId:
 *               type: string
 *             message:
 *               type: string
 *               example: Class created successfully
 *       403:
 *         description: Only professors can create a class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Only professors can create a class
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
