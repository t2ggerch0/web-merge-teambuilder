/**
 * @swagger
 * /global/feedback:
 *   post:
 *     summary: 앱에 유저피드백을 보냅니다.
 *     tags:
 *       - global
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Feedback message content.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: John Doe
 *             email:
 *               type: string
 *               format: email
 *               example: johndoe@example.com
 *             message:
 *               type: string
 *               example: Your app is great!
 *     responses:
 *       201:
 *         description: Feedback sent successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Feedback sent successfully
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Server Error
 */
