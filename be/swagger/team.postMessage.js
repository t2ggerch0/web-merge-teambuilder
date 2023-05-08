/**
 * @swagger
 * /message:
 *   post:
 *     summary: Send a new message to a team chat.
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
 *                 example: "The ID of the team that the message will be sent to."
 *     responses:
 *       200:
 *         description: The message was successfully sent.
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
