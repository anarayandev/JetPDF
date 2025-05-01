import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import multer from 'multer'
import docxToPDF from 'docx-pdf'
import path from 'path'
import { fileURLToPath } from 'url'
import colors from 'colors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())

//  setting up the file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
app.post('/convertFile', upload.single('wordFile'), (req, res, next) => {

  try {

    if (!req.file) {
      return res.status(400).json({success: false, message: 'No File Uploaded..!'})
    }
    
    //  defining output file path
    let outputPath = path.join(__dirname, 'files', `${req.file.originalname}.pdf`)

    docxToPDF(req.file.path, outputPath, (err,result) => {
      if(err){
        console.log(err);
        return res.status(500).json({ success: false, message: 'Error converting Docx to PDF..!'
        })
      }
      res.download(outputPath, () => {
        console.log('File Downloaded')
      })
    });
    
  } catch (error) {
    console.error(error.message)
    res.status(500).json({success: false, message: 'Internal Server Error'})
  }

})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`.brightBlue))


