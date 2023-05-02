/**
 * @swagger
 * /class/submit-answers:
 *   post:
 *     tags:
 *       - class
 *     summary: 학생의 회원가입 시, Answers을 제출합니다.
 *     description:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: false
 *         type: string
 *       - name: classId
 *         in: body
 *         description: questionId키의 밸류는 해당 question의 answer 리스트입니다.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             classId:
 *               type: string
 *             questionIds:
 *               type: array
 *               items:
 *                 type: string
 *             questionId:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: Answers submitted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Answers submitted successfully
 *       400:
 *         description: Invalid request body or missing required parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Invalid request body or missing required parameters
 *       401:
 *         description: User is not authorized to submit answers
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User is not authorized to submit answers
 *       403:
 *         description: Question is not ended or question length is not equal
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Question is not ended or question length is not equal
 *       500:
 *         description: Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occured while submitting answers
 */
