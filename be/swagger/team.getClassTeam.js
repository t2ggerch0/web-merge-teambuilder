/**
 * @swagger
 * /team/classTeam:
 *   get:
 *     tags:
 *       - team
 *     summary: 특정 클래스의 팀리스트를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: classId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Target team information retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: 60c6f02b33e2cb92c0d0ab3f
 *               name:
 *                 type: string
 *                 example: Team A
 *               class:
 *                 type: string
 *                 example: 60c6e7c9c9e8435138136d20
 *               leader:
 *                 type: string
 *                 example: 60c6e7c9c9e8435138136d20
 *               conditionId:
 *                 type: number
 *                 example: 1
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: 60c6e7c9c9e8435138136d20
 *               contextByUser:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: 60c6e7c9c9e8435138136d20
 *                     answer:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       example: [0, 1, 2, 3]
 *                     name:
 *                       type: string
 *                     positionIndex:
 *                       type: number
 *               isDirty:
 *                 type: boolean
 *                 example: false
 *               chat:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sender:
 *                       type: string
 *                       example: "60c6e7c9c9e8435138136d20"
 *                     message:
 *                       type: string
 *                       example: "Hello, team members!"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-08T12:00:00.000Z"
 *       403:
 *         description: User has no team
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */