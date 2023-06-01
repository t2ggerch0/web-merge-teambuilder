/**
 * @swagger
 * /class/form-team-with-option:
 *   post:
 *     summary: 특정 질문을 제거 했을 때의 결과값 반환
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
 *             optimalComposition:
 *               type: boolean
 *               example: true
 *             deletedQuestionId:
 *              type: number
 *              example: 0
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
