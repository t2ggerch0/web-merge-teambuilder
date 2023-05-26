/**
 * @swagger
 * /team/message:
 *   post:
 *     summary: 메시지를 생성합니다.
 *     tags:
 *       - team
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Message content and team ID.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *                 type: string
 *                 example: "The content of the message."
 *             teamId:
 *                 type: string
 *                 example: "6458eb87449770eae6745c3b"
 *     responses:
 *       200:
 *         description: The message was successfully sent.
 *         schema:
 *           type: object
 *           properties:
 *             sender:
 *                 type: string
 *                 example: 60c6e7c9c9e8435138136d20
 *             message:
 *                 type: string
 *                 example: "The content of the message."
 *       404:
 *         description: Team not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Team not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
