import { Request, Response } from 'express';
import { ITerms } from '../interfaces/ITerms';
import Terms from '../mongoose-models/termsModel';

export const registerTerms = async (req: Request, res: Response) => {
    try {
        if (req.body.version.length > 0) {
            if (req.body.description.length > 0) {
                if (req.body.planId.length > 0) {
                    const termsResult = await Terms.find({ version: req.body.version, planId: req.body.planId });
                    if (termsResult.length == 0) {
                        let date = new Date();
                        let term = {
                            version: req.body.version,
                            description: req.body.description,
                            planId: req.body.planId,
                            beginningOfvalidity: date,
                            endOfValidity: new Date(date.getFullYear(), date.getMonth(), date.getDay() + 365),
                            status: "Vigente"
                        }
                        Terms.create(term);
                        res.status(200).json({
                            message: "Término guardado correctamente"
                        });
                    } else {
                        return res.status(404).json({
                            message: "Versión de término junto con este plan existente"
                        });
                    }
                } else {
                    return res.status(404).json({
                        message: "Esta vacío el id del plan, revise de nuevo"
                    });
                }
            } else {
                return res.status(404).json({
                    message: "Esta vacía la descripción del término, revise de nuevo"
                });
            }
        } else {
            return res.status(404).json({
                message: "Esta vacía la versión, revise de nuevo"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

export const getTermsRegister = async (req: Request, res: Response) => {
    //let query = Terms.find({ status: "Vigente", planId: 0 });
    const select:ITerms = await Terms.findOne({ status: "Vigente", planId: 0 });
    console.log(select.description);
    res.status(200).json({
        description: select.description
    });
}