/**
 * @swagger
 * /class/end-question:
 *   post:
 *     tags:
 *       - class
 *     summary: 질문 추가 시퀀스를 끝냅니다
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: classId
 *         in: body
 *         description: The ID of the class to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *     responses:
 *       201:
 *         description: EndQuestion flag set successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Added Question Successfully
 *       403:
 *         description: User is not professor of class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User is not professor of class
 *       500:
 *         description: Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Server Error
 */
