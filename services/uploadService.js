const fs = require('fs');

const uploadService = async (path) => {
  try {
    const savePath = path.join(__dirname, `../statics/uploads/${ctx.request.body.files.file.name}`)
    let readStream = fs.createReadStream(path);
    let writeStream = fs.createWriteStream(savePath);
    readStream.pipe(writeStream);

    return {success: true, url: ''}
  } catch (e) {
    return {}
  }
}

module.exports = uploadService;