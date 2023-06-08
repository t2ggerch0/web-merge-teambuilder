/**
 * @swagger
 * /team/todo/{todoId}:
 *   delete:
 *     summary: 팀 내에서 todoId로 특정 todo를 삭제합니다.
 *     tags:
 *       - team
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: true
 *         type: string
 *       - name: todoId
 *         description: ID of the todo to be deleted.
 *         in: path
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Team ID.
 *         schema:
 *           type: object
 *           properties:
 *             teamId:
 *               type: string
 *               example: "6458eb87449770eae6745c3b"
 *     responses:
 *       200:
 *         description: Todo deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Todo deleted successfully
 *       404:
 *         description: Team not found or Todo not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Team not found or Todo not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
