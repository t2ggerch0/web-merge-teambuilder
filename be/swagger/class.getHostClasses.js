/**
 * @swagger
 * /class/host:
 *   get:
 *     tags:
 *       - class
 *     summary: 내가 호스트인 클래스 정보
 *     description: 클래스ID로 내가 호스트인 클래스 정보를 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Class information retrieved successfully
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
