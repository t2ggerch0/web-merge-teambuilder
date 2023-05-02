/**
 * @swagger
 * /class/end-answer:
 *   post:
 *     tags:
 *       - class
 *     summary: 답변 시퀀스를 끝냅니다
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
 *         description: EndAnswer flag set successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Added Answer Successfully
 *       403:
 *         description: User is not professor of class or student length doesn't match answer length
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User is not professor of class or student length doesn't match answer length
 *       500:
 *         description: Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Server Error
 */
