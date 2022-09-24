const { processUpload } = require("../../utils/upload")
const { GraphQLUpload } = require('graphql-upload');

const Upload = {
	Upload: GraphQLUpload,
	Mutation: {
		singleUpload: (_parent, { upload }, { prisma }) => {
			return processUpload(upload)
		},
		multiUpload: (_parent, { upload }, { prisma }) => {
			return upload.map(async (upload) => processUpload(upload))
		}
	}
}

module.exports = {
	Upload
}
