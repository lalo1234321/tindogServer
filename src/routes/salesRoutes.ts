import { Router, Request, Response } from 'express';
import { ISales } from '../interfaces/ISales';
import Sales from '../mongoose-models/SalesModel';
import User from '../mongoose-models/userModel';
import { validateJWT } from '../middleware/validateJWT';

const router = Router();

//explorar las ventas
router.get('/sales', [validateJWT], (req: Request, res: Response) => {
    Sales.find({ status: "Disponible" }, (err, salesDoc) => {
        if (err) {
            return res.status(404).json({
                message: err
            });
        } else {
            User.populate(salesDoc, { path: "idBuyer" }, function (err, salesDoc) {
                if (err) {
                    return res.status(404).json({
                        message: err
                    });
                } else {
                    res.json(
                        salesDoc
                    );
                    return res.status(200).json({
                        message: salesDoc
                    });
                }
            });
        }
    });
});

router.put('/deleteSales/:saleId', [validateJWT], async (req: Request, res: Response) => {
    const saleId = req.params.saleId;
    console.log(saleId);
    try {
        const saleResult = await Sales.findById({ _id: saleId });
        if (!saleResult) {
            return res.status(500).json({
                message: 'La venta no existe.',
                petId: saleId
            });
        } else {
            let userModify = await Sales.findByIdAndDelete(saleId);
            return res.status(200).json({
                message: "Venta eliminada con éxito."
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Ha ocurrido un error.'
        });
    }
});

router.post('/sales/register', (req: Request, res: Response) => {
    let idSeller = req.body.id;
    //recibir un token y extraer la info del usuario
});

export default router;