import {Request, Response} from 'express';

export default interface IFile extends Express.Multer.File {
    dirStorageOption?: string;
}

export enum KindOfImage {
    PROFILE_IMAGE = "profileImage",
    MEDICAL_CERTIFICATE_IMAGE = "medicalCertificateImage"
}
