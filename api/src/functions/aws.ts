const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export const downloadStateFile = async (projectId) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${projectId}/terraform.tfstate`,
  }

  try {
    const data = await s3.getObject(params).promise()
    return data.Body
  } catch (error) {
    console.error(`Error downloading state file: ${error}`)
    throw error
  }
}
