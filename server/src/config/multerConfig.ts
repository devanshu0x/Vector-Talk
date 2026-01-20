import multer from "multer";

const storage=multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/')
    },
    filename: function (req,file,cb){
        const uniquePrefix=Date.now()+""+Math.round(Math.random()*1e9);
        cb(null,`${uniquePrefix}-${file.originalname}`);
    }
})

export const upload=multer({limits: {
    fileSize: 20 * 1024 * 1024, 
  },storage:storage})