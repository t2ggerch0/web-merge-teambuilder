/**
 * @swagger
 * /class/create-class:
 *   post:
 *     summary: Create a new class
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: The class data to create
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             className:
 *               type: string
 *               example: "Creating web application using public API"
 *             classType:
 *               type: string
 *               example: "web"
 *             classDescription:
 *               type: string
 *               example: "This is a class about web development"
 *             positionTypes:
 *               type: array
 *               items:
 *                 type: string
 *                 example: ["frontend", "backend"]
 *             positionComposition:
 *               type: array
 *               items:
 *                 type: integer
 *                 example: [2, 2]
 *             leaderPosition:
 *               type: string
 *               example: "frontend"
 *             recruitStartDate:
 *               type: string
 *               example: "2023-05-10"
 *             recruitEndDate:
 *               type: string
 *               example: "2023-05-20"
 *             activityStartDate:
 *               type: string
 *               example: "2023-05-21"
 *             activityEndDate:
 *               type: string
 *               example: "2023-06-21"
 *             isSecret:
 *               type: boolean
 *               example: false
 *             isLeaderParticipating:
 *               type: boolean
 *               example: true
 *             questionIds:
 *               type: array
 *               items:
 *                 type: integer
 *                 example: [0, 1, 2, 3]
 *     responses:
 *       201:
 *         description: Successfully created a new class
 *         schema:
 *           type: object
 *           properties:
 *             accessKey:
 *               type: integer
 *               example: 123456
 *             classId:
 *               type: string
 *               example: "6095b5f5b5ab8e1f02e4f3d4"
 *             message:
 *               type: string
 *               example: "Class created successfully"
 *       403:
 *         description: Error creating a new class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid position types and composition"
 *       500:
 *         description: An error occurred while creating the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while creating the class"
 */
