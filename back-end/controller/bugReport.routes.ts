/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Bugreport:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            createdAt:
 *              type: Date
 *            updatedAt:
 *              type: Date
 *            user:
 *              $ref: '#/components/schemas/User'
 *            title:
 *              type: string
 *              description: title of report.
 *            description:
 *              type: string
 *              description: text about cause of a bug.
 *            resolved:
 *              type: boolean
 *              description: boolean wether or not bug is resolved. default = false.
 */
import express, { NextFunction, Request, Response } from 'express';
import bugReportService from '../service/bugReport.service';
import { BugReportInput } from '../types';
const bugReportRouter = express.Router()

/**
 * @swagger
 * /bugreports:
 *   get:
 *     summary: Get a list of all bug reports.
 *     responses:
 *       200:
 *         description: A list of all bug reports.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Bugreport'
 */
bugReportRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await bugReportService.getAllBugReports();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /bugreports:
 *   post:
 *      summary: Create a bugreport
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BugreportInput'
 *      responses:
 *         200:
 *            description: The created bugreport object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/BugReport'
 */
bugReportRouter.post('/',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bugReport = <BugReportInput>req.body;
        const result = await bugReportService.createBugReport
        (bugReport);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

export {bugReportRouter}