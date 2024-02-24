import multer from "multer"
import { v4 } from "uuid"
import path from 'path'
import * as fse from 'fs-extra'
import sharp from "sharp"

import * as fs from 'node:fs/promises';


export class ImageService {
    static initUploadImageMiddleware(name){

        const multerConfig = multer.diskStorage({
            destination: path.join(process.cwd(), 'temp'),
            filename: (req, file, cbk) =>{
                cbk(null, file.originalname)
            }
        })

        const multerFilter = (req, file, cbk) =>{
            if(file.mimetype.startsWith('image/')){
                cbk(null, true)
            }
            else{
                cbk(res.status(400).json({
                    message: "Please upload images only"
                }), false)
            }
        }
        
        return multer({
            storage: multerConfig,
            fileFilter: multerFilter,
        }).single(name)
    }

    static async saveImage(file, options, ...pathSegments){
        
        if(file.size > (options?.maxFileSize ? options.maxFileSize  * 1024 * 1024 : 1 * 1024 * 1024)){
            res.status(400).json({
                message: "File is too large"
            })
        }
        const fileName = `${v4()}.jpeg`
        
        const fullFilePath = path.join(process.cwd(), 'public', ...pathSegments)
        
        await fse.ensureDir(fullFilePath);
        
        await sharp(file.path)
            .resize({height: options?.height ?? 250, width: options?.width ?? 250})
            .toFormat('jpeg')
            .jpeg({quality: 90})
            .toFile(path.join(fullFilePath, fileName))

        await fs.unlink(file.path)
        return path.join(...pathSegments, fileName)
       
    }
}