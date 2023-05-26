/**
 * @swagger
 * /class/form-team:
 *   post:
 *     summary: Form a team for a class
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *                 description: The ID of the class to form a team for
 *             example:
 *               classId: "60b9b0b9b3b3b3b3b3b3b3b3"
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
