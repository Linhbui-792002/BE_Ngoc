import createHttpError from "http-errors";
import { CaculateRepo } from "../repositories/index.js";

const categoryByPptk = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await CaculateRepo.caculatePptk({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'caculate pptk success',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const categoryByCPT = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await CaculateRepo.caculateCPT({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'caculate CPT success',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const categoryBySPT = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await CaculateRepo.caculateSPT({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'caculate SPT success',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    categoryByPptk,
    categoryByCPT,
    categoryBySPT
};