import {Request, Response} from 'express';

export default interface IFile extends Express.Multer.File {
    dirStorageOption?: number;
}