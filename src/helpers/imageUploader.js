const SDK_ID = 'AWS_SDK_SCRIPT_TAG'
const AWS_SDK_URL = 'https://sdk.amazonaws.com/js/aws-sdk-2.182.0.min.js'

class ImageUploader {
  constructor(options = {}) {
    this.bucketName = options.bucketName         || 'custom-case-images'
    this.bucketRegion = options.bucketRegion     || 'us-east-1'
    this.identityPoolId = options.identityPoolId || 'us-east-1:a562e9cd-41a1-44e1-921c-d2132f6d6844'

    this.init()
  }

  init() {
    // eslint-disable-next-line no-console
    this.loadAWSScript().then(this.setAWSCredentials.bind(this)).catch(console.error)
  }

  loadAWSScript() {
    return new Promise((resolve, reject) => {
      const el = document.getElementById(SDK_ID)
      // Already load script
      if (el) return

      const script = document.createElement('script')
      script.id = SDK_ID
      script.src = AWS_SDK_URL
      script.onload = resolve
      script.onerror = () => reject("Couldn't load AWS SDK script")

      document.body.appendChild(script)
    })
  }

  setAWSCredentials() {
    const self = this
    
    AWS.config.update({
      correctClockSkew: true,
      region: self.bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: self.identityPoolId
      })
    })

    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {
        Bucket: self.bucketName
      }
    })

    this.s3 = s3
  }

  upload(blob) {
    var self = this

    return new Promise((resolve, reject) => {
      var imageName = self.uniqName(5)

      self.s3.upload(
        {
          Key: 'image-customizations/' + imageName + '.png',
          contentType: 'image/png',
          Body: blob,
          ACL: 'public-read'
        },
        function(err, data) {
          if (err) {
            reject(err)
          }
          resolve(data.Location)
        }
      )
    })
  }

  uniqName(strenth = 3) {
    if (strenth <= 0) {
      return (
        '-' +
        (
          Number(String(Math.random()).slice(2)) +
          Date.now() +
          Math.round(performance.now())
        ).toString(36)
      )
    } else {
      return this.uniqName(0) + this.uniqName(strenth - 1)
    }
  }
}

export default ImageUploader
