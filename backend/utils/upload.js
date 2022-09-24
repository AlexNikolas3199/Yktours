const fs = require('fs');
const shortid = require('shortid');

const uploadsDir = `${__dirname}/../public`;

const storeUpload = async ({ stream, filename }) => {
    const randomName = await shortid.generate();
    const extension = filename.split('.').pop();
    const fileName = `${randomName}.${extension}`;
    const path = `${uploadsDir}/${fileName}`;

    return new Promise((resolve, reject) =>
        stream
            .pipe(fs.createWriteStream(path))
            .on('finish', () => resolve({ name: fileName }))
            .on('error', reject)
    );
};

const processUpload = async (upload) => {
    try {
        const { createReadStream, filename } = await upload;
        let stream = createReadStream()
        const { name } = await storeUpload({ stream, filename });
        return name;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteFile = (fileName) => {
    const _path = `${uploadsDir}/${fileName}`;
    fs.unlink(_path, () => {});
};

module.exports = {
    processUpload,
    deleteFile
};