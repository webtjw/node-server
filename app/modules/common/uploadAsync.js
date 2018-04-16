const fs = require('fs');
const os = require('os');
const path = require('path');
const httpKit = require('../../toolkits/httpKit');
const utils = require('../../toolkits/utils');
const moment = require('moment');


const uploadAsync = async (ctx, next) => {
  // While uploading synchronously, file in the form feild will be storaged in the temporary folder(os.tmpdir()).
  // To get the file, you should use file stream api: createReadStream, createWriteStream.
  // example:
  // let readStream = fs.createReadStream(ctx.request.body.files.file.path);
  // let writeStream = fs.createWriteStream(path.join(__dirname, `../../uploads/${ctx.request.body.files.file.name}`));
  // readStream.pipe(writeStream);
  const {files} = ctx.request.body;
  let result = null;

  if (files && files.file && files.file.path) result = await handleUpload(files.file.path, files.file.name);
  else result = 'upload file not found.';
  
  httpKit.setResponse(ctx, {
    allowMethods: 'POST',
    data: result.success ? result.data : result,
    message: '上传成功'
  });
}

// handler
const handleUpload = async (pathName, name) => {
  const extension = name.match(/\.[A-z0-9]+$/)[0]; // get the filename extension
  const fileName = name.replace(extension, `_${moment().format('YYYYMMDHHmmss') + extension}`);
  try {
    let readStream = fs.createReadStream(pathName);
    var writeStream = fs.createWriteStream(path.join(__dirname, `../../../statics/uploads/${fileName}`));
    readStream.pipe(writeStream);
    readStream.on('end', () => writeStream.end());
  } catch (e) {
    console.error(e);
    writeStream.end();
  }

  return utils.getReturn(true, `${global.globalConfig.origin}/uploads/${fileName}`, 'upload succeed!');
}

module.exports = uploadAsync;