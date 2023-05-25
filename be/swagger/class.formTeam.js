/**
 * @swagger
 * /class/form-team:
 *   post:
 *     summary: Form a team for a class
 *     tags:
 *       - class
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: The ID of the class to form a team for
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *               example: "6095b5f5b5ab8e1f02e4f3d4"
 *     responses:
 *       201:
 *         description: Successfully formed a team
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: Unauthorized access, user is not the host, recruit end date not passed, or team already formed
 *       500:
 *         description: An error occurred while forming the team
 */
