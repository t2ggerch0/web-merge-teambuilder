/**
 * @swagger
 * /class/add-custom-questions:
 *   post:
 *     summary: 클래스ID로 클래스를 찾고, custom question을 추가합니다.
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
 *             questions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   type:
 *                     type: string
 *                     example: custom
 *                   options:
 *                     type: array
 *                     items:
 *                       type: string
 *                   isMandatory:
 *                     type: boolean
 *                   weight:
 *                     type: integer
 *                   scoringType:
 *                     type: string
 *                     enum: [single, multi, points]
 *                   countScore:
 *                     type: string
 *                     enum: [same, different]
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
 *               example: Only professors can add questions or Class ID not found
 *       500:
 *         description: An error occurred while adding questions to the class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occurred while creating the class
 */
