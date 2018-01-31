const fs = require('fs');
const os = require('os');
const path = require('path');
const ctxKit = require('../../../toolkits/ctxKit');


const uploadAsync = async (ctx, next) => {
  ctxKit.setAllowMethod(ctx, 'POST').setResponseType(ctx, 'json');
  
  // While uploading synchronously, file in the form feild will be storaged in the temporary folder(os.tmpdir()).
  // To get the file, you have to use file stream api: createReadStream, createWriteStream.
  // example:
  // let readStream = fs.createReadStream(ctx.request.body.files.file.path);
  // let writeStream = fs.createWriteStream(path.join(__dirname, `../../uploads/${ctx.request.body.files.file.name}`));
  // readStream.pipe(writeStream);
  let result = await handleUpload();
}

const handleUpload = async () => {
  return true;
}

module.exports = uploadAsync;