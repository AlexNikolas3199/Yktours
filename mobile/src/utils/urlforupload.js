import personDefault from '../../src/img/profile_img.png'

export const UPLOAD_URL='http://194.67.109.59:8000/'

export const getUploadURL = (image) => {
    return image ? { uri: UPLOAD_URL + image } : personDefault
}