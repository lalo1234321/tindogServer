import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import Sales from '../mongoose-models/SalesModel';
import User from '../mongoose-models/userModel';
import Pet from '../mongoose-models/petModel';
import { IPet } from '../interfaces/IPet';

const jwt = require('jsonwebtoken');

export const registerSales = async (req: Request, res: Response) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            message: "Token no introducido"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user: IUser = await User.findById((<any>decoded).uid);
        //console.log(user);
        let aux: IPet = await Pet.findOne({ username: req.body.username });
        if (!aux) {
            return res.status(400).json({
                message: "Mascota no encontrada"
            });
        }
        let userId = "";
        let ownerId = "";
        userId = userId + user._id;
        ownerId = ownerId + aux.owner;
        if (userId !== ownerId) {
            return res.status(400).json({
                message: "Peticion no válida"
            });
        }
        const userNameResult = await Sales.find({ pet: aux._id });
        if (userNameResult.length == 0) {
            let sale = {
                pet: aux._id,
                price: req.body.price,
                location: user.town,
                idSeller: user._id,
                date: new Date()
            }
            Sales.create(sale);
            return res.status(200).json({
                sale: sale,
                message: "Venta publicada exitosamente"
            });
        } else {
            return res.status(404).json({
                message: "La mascota ya esta en venta"
            });
        }
    } catch (er) {
        return res.status(400).json({
            message: "Algo salió mal"
        });
    }

}

export const getAllSales = (req: Request, res: Response) => {
    Sales.find({ idSeller: { $ne: req.userId }, status: "Disponible" }, (err, salesDoc) => {
        if (err) {
            return res.status(404).json({
                message: err
            });
        }
        User.populate(salesDoc, { path: "idSeller" }, function (err, salesDoc) {
            if (err) {
                return res.status(404).json({
                    message: err
                });
            }
            Pet.populate(salesDoc, { path: "pet" }, function (err, salesDoc) {
                if (err) {
                    return res.status(404).json({
                        message: err
                    });
                }
                res.status(200).json({
                    sales: salesDoc
                });
            });
        });

    });
}

export const getAllSalesByUser = (req: Request, res: Response) => {
    Sales.find({ idSeller: req.userId }, (err, salesDoc) => {
        if (err) {
            return res.status(404).json({
                message: err
            });
        }
        User.populate(salesDoc, { path: "idSeller" }, function (err, salesDoc) {
            if (err) {
                return res.status(404).json({
                    message: err
                });
            }
            Pet.populate(salesDoc, { path: "pet" }, function (err, salesDoc) {
                if (err) {
                    return res.status(404).json({
                        message: err
                    });
                }
                res.status(200).json({
                    sales: salesDoc
                });
            });
        });

    });
}

export const getAllSalesByBreedsAndSpeciePet = async (req: Request, res: Response) => {
    let specie = req.body.specie;
    let breed = req.body.breed;
    let query = Sales.find({ idSeller: { $ne: req.userId }, status: "Disponible" }).populate({ path: "pet", model: Pet, match: { specie: specie, breed: breed } }).populate('idSeller');
    query.exec((err, salesDoc) => {
        if (err) {
            return res.status(404).json({
                message: err
            });
        } else {
            let i = 0;
            let j = 0;
            var nsalesDoc = [];
            while (i < salesDoc.length) {
                if (salesDoc[i].pet != null) {
                    nsalesDoc.push(salesDoc[i]);
                    j++;
                }
                i++;
            }
            if (nsalesDoc.length == 0) {
                return res.status(400).json({
                    message: "Aún no hay ventas con esos filtros"
                });
            } else {
                res.status(200).json({
                    sales: nsalesDoc
                });
            }
        }
    });
}

export const deleteSales = async (req: Request, res: Response) => {
    const saleId = req.params.saleId;
    console.log(saleId);
    try {
        const saleResult = await Sales.findById({ _id: saleId });
        if (!saleResult) {
            return res.status(400).json({
                message: "La venta no existe",
                saleId: saleId
            });
        } else {
            let userModify = await Sales.findByIdAndDelete(saleId);
            return res.status(200).json({
                message: "Venta eliminada con éxito"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

export const makePurchase = async (req: Request, res: Response) => {
    let id = req.userId;
    const saleId = req.params.saleId;
    try {
        const saleResult = await Sales.findById({ _id: saleId });
        if (!saleResult) {
            return res.status(400).json({
                message: "La venta no existe",
                saleId: saleId
            });
        } else {
            if (id.length > 0) {
                const sale = await Sales.findByIdAndUpdate(saleId, {
                    $set: {
                        idBuyer: id,
                        status: "No disponible"
                    }
                }, { new: true });
                await Pet.findByIdAndUpdate(sale.pet, {
                    $set: {
                        isDeleted: true
                    }
                }, { new: true });
                return res.status(200).json({
                    message: "Compra con éxito"
                });
            } else {
                return res.status(404).json({
                    message: "Esta vacío el idBuyer de la compra, revise de nuevo"
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}