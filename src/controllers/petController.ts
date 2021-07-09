import { Request, Response } from "express";
import IFile, { KindOfImage } from "../interfaces/IFile";
import Pet from "../mongoose-models/petModel";
import { MulterFileOps } from "../utils/MulterFileOps";
import { Types } from 'mongoose';
import User from '../mongoose-models/userModel';
import { generateURI_forFile } from '../utils/generateURI';
import Notification from '../mongoose-models/notificationModel';
import AcceptedPets from '../mongoose-models/acceptedPetsModel';
import { IAcceptedPets } from '../interfaces/IAcceptedPets';
import { IPet } from '../interfaces/IPet';
import Message from '../mongoose-models/messageModel';
let fileOps = new MulterFileOps();
import * as fs from 'fs';
import Sales from '../mongoose-models/SalesModel';

const jwt = require('jsonwebtoken');

//changes for commit 
export const registerPet = async (req: Request, res: Response) => {
    let body = req.body;
    let username = body.username;
    let age = req.body.age;
    if (age < 1 || age > 100) {
        return res.status(400).json({
            message: "Edad de mascota no válida",
        });
    }
    const userNameResult = await Pet.find({ username: username });
    if (userNameResult.length == 0) {
        if (fileOps.areAllFilesValid(req.files)) {
            let listOfFilePaths = {};
            let file: IFile;
            const petId = new Types.ObjectId();
            for (let key in req.files) {
                let rawFile = req.files[`${key}`];
                file = fileOps.rearrangeFileStructure(rawFile);
                let extension =
                    file.originalname.split(".")[file.originalname.split(".").length - 1];
                let newFileName = `${petId}.${extension}`;
                let filePath = fileOps.writeFile(file, newFileName);
                listOfFilePaths[`${key}`] = filePath;
            }
            const petDoc = new Pet({
                _id: petId,
                username: req.body.username,
                name: req.body.name,
                age: req.body.age,
                specie: req.body.specie,
                breed: req.body.breed,
                vaccines: req.body.vaccines,
                gender: req.body.gender,
                profileImagePhysicalPath:
                    listOfFilePaths[`${KindOfImage.PROFILE_IMAGE}`],
                medicalCertificateImagePhysicalPath:
                    listOfFilePaths[`${KindOfImage.MEDICAL_CERTIFICATE_IMAGE}`],
                profileImageURI: generateURI_forFile(
                    listOfFilePaths[`${KindOfImage.PROFILE_IMAGE}`]
                ),
                medicalCertificateImageURI: generateURI_forFile(
                    listOfFilePaths[`${KindOfImage.MEDICAL_CERTIFICATE_IMAGE}`]
                ),
                owner: req.userId,
            });
            try {
                await petDoc.save();
                const userDoc = await User.findById(req.userId).exec();
                userDoc.ownedPets.push(petDoc);
                await userDoc.save();
                return res.status(200).json({
                    message: "Mascota registrada",
                    petInfo: {
                        username: req.body.username,
                        name: req.body.name,
                        age: req.body.age,
                        specie: req.body.specie,
                        breed: req.body.breed,
                        vaccines: req.body.vaccines,
                        owner: req.body.owner,
                    },
                });
            } catch (err) {
                return res.status(400).json({
                    message: err.message,
                });
            }
        }
        return res.status(400).json({
            message: "Invalid extension, you should use JPG, JPEG or PNG",
        });
    } else {
        return res.status(404).json({
            message: "Nombre de usuario existente",
        });
    }
};

export const updateProfileImage = async (req: Request, res: Response) => {
    let petId = req.params.petId;
    let file: IFile;
    try {
        file = req.file;

        let pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(400).json({
                message: "Mascota no encontrada",
            });
        }
        let path = "";
        path = pet.profileImagePhysicalPath.valueOf();
        fs.unlink(path, (err) => {
            console.log(err);
        });
        // res.status(200).json({
        //     message: pet
        // });

        if (!file) {
            res.status(400).json({
                message: "No se pudo subir la imagen",
            });
        } else {
            file.dirStorageOption = `../../public/profileImage/`;
            let extension =
                file.originalname.split(".")[file.originalname.split(".").length - 1];
            let filePath = fileOps.writeFile(file, `${petId}.${extension}`);
            console.log(filePath);
            pet.profileImageURI = generateURI_forFile(filePath);
            await pet.save();
            res.status(200).json({
                message: "Imagen subida",
                pet,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: "Error en la petición",
        });
    }
};

export const updateMedicalCertificate = async (req: Request, res: Response) => {
    let petId = req.params.petId;
    let file: IFile;
    try {
        file = req.file;

        let pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(400).json({
                message: "Mascota no encontrada",
            });
        }
        let path = "";
        path = pet.medicalCertificateImagePhysicalPath.valueOf();
        fs.unlinkSync(path);
        if (!file) {
            res.status(400).json({
                message: "No se pudo subir la imagen",
            });
        } else {
            //medicalCertificateImage
            file.dirStorageOption = `../../public/medicalCertificateImage/`;
            let extension =
                file.originalname.split(".")[file.originalname.split(".").length - 1];
            let filePath = fileOps.writeFile(file, `${petId}.${extension}`);
            console.log(filePath);
            pet.medicalCertificateImageURI = generateURI_forFile(filePath);
            await pet.save();
            res.status(200).json({
                message: "Imagen subida",
                pet,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: "Error en la petición",
        });
    }
};

export const retrievePetImage = async (req: Request, res: Response) => {
    const petId = req.params.petId;
    const hostname = "localhost:8080";
    const path = req.params.kindOfImage;

    Pet.findById(petId, (err, petDoc) => {
        if (err)
            return res.status(404).json({
                message: err.message,
            });
        if (!petDoc)
            return res.status(404).json({
                message: "La mascota no existe",
            });
        let pathTokes: string[];
        if (process.platform === "win32") pathTokes = petDoc[`${path}`].split("\\");
        else pathTokes = petDoc[`${path}`].split("/");
        let fileName = pathTokes[pathTokes.length - 1];
        const imageURI = `${hostname}/${path}/${fileName}`;
        res.status(200).json({
            message:
                path == KindOfImage.PROFILE_IMAGE
                    ? "Profile Image"
                    : "Medical Certificate Image",
            img: imageURI,
        });
    });
};

export const retrievePetNotifications = async (req: Request, res: Response) => {
    const petUserName = req.params.petUserName;
    try {
        const results = await Notification.find({ to: petUserName });
        res.status(200).json({
            results,
        });
    } catch (err) {
        res.status(500).json({
            message: "Problemas al obtener las notificaciones",
        });
    }
};

export const deletePetNotification = async (req: Request, res: Response) => {
    const notificationId = req.params.notificationId;
    try {
        const result = await Notification.findOneAndDelete({ _id: notificationId });
        result.delete();
        res.status(200).json({
            message: "Notificación eliminada",
        });
    } catch (err) {
        res.status(500).json({
            message: "Problemas al eliminar la notificación",
        });
    }
};

export const createAcceptedModel = async (req: Request, res: Response) => {
    let idPet = req.params.idPet;
    console.log(idPet);
    try {
        const accepted = new AcceptedPets({
            myPet: idPet,
        });
        await accepted.save();
        res.status(200).json({
            message: "modelo de aceptación creado",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            err,
        });
    }
};

export const acceptPetChat = async (req: Request, res: Response) => {
    let idPet = req.params.idPet;
    let petUserName = req.params.petUserName;
    console.log(idPet);
    console.log(petUserName);
    try {
        let accepted: any = await AcceptedPets.findOne({ myPet: idPet }).exec();
        if (!accepted) {
            accepted = new AcceptedPets({
                myPet: idPet,
            });
        }
        const newPet: any = await Pet.findOne({ username: petUserName });

        if (!accepted.acceptedPets.includes(newPet._id)) {
            accepted.acceptedPets.push(newPet._id);
            await accepted.save();
        }

        // accepted.acceptedPets.push(newPet._id);
        // await accepted.save();

        let acceptedOther: any = await AcceptedPets.findOne({
            myPet: newPet._id,
        }).exec();
        if (!acceptedOther) {
            acceptedOther = new AcceptedPets({
                myPet: newPet._id,
            });
        }
        if (!acceptedOther.acceptedPets.includes(idPet)) {
            acceptedOther.acceptedPets.push(idPet);
            await acceptedOther.save();
        }
        // acceptedOther.acceptedPets.push(idPet);
        // await acceptedOther.save();
        res.status(200).json({
            message: "modelo encontrado",
            accepted,
            acceptedOther,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "algo raro pasó",
        });
    }
};

export const retrieveChats = async (req: Request, res: Response) => {
    let idPet = req.params.idPet;

    try {
        const accepted: any = await AcceptedPets.findOne({ myPet: idPet })
            .populate({
                path: "acceptedPets",
                populate: {
                    path: "owner",
                },
            })
            .exec();

        //const acceptedOther:any = await AcceptedPets.findOne({myPet:newPet._id}).exec();

        res.status(200).json({
            message: "modelo encontrado",
            accepted,
        });
    } catch (err) {
        res.status(500).json({
            message: "algo raro pasó",
        });
    }
};

export const retrieveMessages = async (req: Request, res: Response) => {
    let myPetUserName = req.params.myPetUserName;
    let otherPetUsarName = req.params.otherPetUsarName;

    try {
        const last30 = await Message.find({
            $or: [
                { from: myPetUserName, to: otherPetUsarName },
                { from: otherPetUsarName, to: myPetUserName },
            ],
        })
            .sort({
                createdAt: "desc",
            })
            .limit(30);

        //const acceptedOther:any = await AcceptedPets.findOne({myPet:newPet._id}).exec();

        res.status(200).json({
            message: "mensajes obtenidos",
            last30,
        });
    } catch (err) {
        res.status(500).json({
            message: "No pudimos obtener tus mensajes",
        });
    }
};

export const updateAge = async (req: Request, res: Response) => {
    const petId = req.params.petId;
    let body = req.body;
    try {
        const petResult = await Pet.findById({ _id: petId });
        if (!petResult) {
            return res.status(500).json({
                message: "La mascota no existe",
                petId: petId,
            });
        } else {
            if (body.age.length > 0) {
                if (body.age > 0 && body.age < 100) {
                    let userModify = await Pet.findByIdAndUpdate(
                        petId,
                        { $set: { age: body.age } },
                        { new: true }
                    );
                    return res.status(200).json({
                        message: "Edad de mascota modifcada con éxito",
                    });
                } else {
                    return res.status(500).json({
                        message: "Edad igual a 0 o mayor a 100, revise de nuevo",
                    });
                }
            } else {
                return res.status(500).json({
                    message: "Esta vacía la edad de la mascota, revise de nuevo",
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error",
        });
    }
};

export const updateName = async (req: Request, res: Response) => {
    const petId = req.params.petId;
    let body = req.body;
    try {
        const petResult = await Pet.findById({ _id: petId });
        if (!petResult) {
            return res.status(500).json({
                message: "La mascota no existe",
                petId: petId,
            });
        } else {
            if (body.name.length > 0) {
                let userModify = await Pet.findByIdAndUpdate(
                    petId,
                    { $set: { name: body.name } },
                    { new: true }
                );
                return res.status(200).json({
                    message: "Nombre de mascota modifcado con éxito",
                });
            } else {
                return res.status(500).json({
                    message: "Esta vacío el nombre de la mascota, revise de nuevo",
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error",
        });
    }
};

export const deletePet = async (req: Request, res: Response) => {
    const petId = req.params.petId;
    let body = req.body;
    try {
        const petResult = await Pet.find({ _id: petId, isDeleted: false });
        if (petResult.length == 0) {
            return res.status(500).json({
                message: "La mascota no existe",
                petId: petId,
            });
        } else {
            let userModify = await Pet.findByIdAndUpdate(
                petId,
                { $set: { isDeleted: true } },
                { new: true }
            );
            return res.status(200).json({
                message: "Mascota eliminada con éxito",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error",
        });
    }
};

export const petValoration = (req: Request, res: Response) => {
    const token = req.headers.token;
    const petId = req.body.petId;
    if (!token) {
        return res.status(400).json({
            message: "Token no introducido"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        let userId = decoded.uid;
        let petUsername = req.body.username;
        let stars = req.body.stars;
        if (stars >= 1 && stars <= 5) {
            Pet.findOne({ username: petUsername, previousMeetings: { $ne: petId } },
                (err, pet) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error encontrando mascota",
                        });
                    }
                    if (!pet) {
                        return res.status(400).json({
                            message: "Valoracion ya realizada"
                        });
                    }
                    if (userId != pet.owner) {
                        pet.stars = pet.stars + stars;
                        pet.meetingsNumber++;
                        pet.previousMeetings.push(petId);
                        pet.save();
                        return res.status(200).json({
                            message: "Guardado correctamente",
                            stars: pet.stars / pet.meetingsNumber,
                        });
                    }
                    res.status(400).json({
                        message: "Usuario invalido",
                    });
                });
        } else {
            return res.status(400).json({
                message: "Valor no esperado",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Error en la petición",
        });
    }
};

export const getAllSpeciesPet = async (req: Request, res: Response) => {
    Pet.distinct("specie", (err, petDoc) => {
        if (err)
            return res.status(404).json({
                message: err
            })
        res.json(
            petDoc
        )
    });
}

export const getAllBreedsBySpeciePet = async (req: Request, res: Response) => {
    let specie = req.body.specie;
    if (req.body.specie.length > 0) {
        let query = Pet.find({ specie: specie });
        query.distinct("breed", (err, petDoc) => {
            if (err)
                return res.status(404).json({
                    message: err
                })
            res.json(
                petDoc
            )
        });
    } else {
        return res.status(404).json({
            message: "Esta vacia la especie de la mascota, revise de nuevo"
        });
    }
}