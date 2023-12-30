import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Defina o diretório onde as imagens serão salvas
    cb(null, 'caminho/para/o/diretorio')
  },
  filename: function (req, file, cb) {
    // Defina o nome do arquivo
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Opções do multer
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de tamanho da imagem (opcional)
  fileFilter: function (req, file, cb) {
    // Filtre os tipos de arquivos permitidos (opcional)
    if (
      file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png'
    ) {
      cb(null, true)
    } else {
      cb(new Error('Apenas são permitidos arquivos JPG, JPEG ou PNG!'))
    }
  }
}).single('img')
