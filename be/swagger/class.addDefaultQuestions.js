/**
 * @swagger
 * /class/add-default-questions:
 *   post:
 *     summary: classId로 클래스를 찾고, default question을 추가합니다.
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: body
 *         in: body
 *         description: Class ID and question information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *             questionIndexes:
 *               type: array
 *               items:
 *                 type: integer
 *               example: [0,1,2,3,4]
 *             weights:
 *               type: array
 *               items:
 *                 type: integer
 *               example: [3,3,3,4,5]
 *             countScores:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["same","same","same","same","same"]
 *     responses:
 *       201:
 *         description: Successfully added questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Added Question Successfully
 *       403:
 *         description: Error adding questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Only professors can add questions or Class ID not found or Length of questionIndex, weight, and countScores are not same
 *       500:
 *         description: An error occurred while adding questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occurred while creating the class
 */
