/**
 * @swagger
 * /team/todo:
 *   post:
 *     summary: 팀 내에서 특정한 유저 혹은 유저들을 지정하여 todo를 생성합니다.
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
 *         description: Todo content, team ID, and assigned users.
 *         schema:
 *           type: object
 *           properties:
 *             task:
 *               type: string
 *               example: "The content of the task."
 *             teamId:
 *               type: string
 *               example: "6458eb87449770eae6745c3b"
 *             assignedTo:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "60c6e7c9c9e8435138136d20"
 *     responses:
 *       201:
 *         description: The task was successfully created.
 *         schema:
 *           type: object
 *           properties:
 *             newTodo:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "The id of the task."
 *                 task:
 *                   type: string
 *                   example: "The content of the task."
 *                 assignedTo:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "60c6e7c9c9e8435138136d20"
 *                 completed:
 *                   type: boolean
 *                   example: false
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
