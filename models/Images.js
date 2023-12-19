const { Timestamp } = require("firebase-admin/firestore");
class Images {
  imageId;
  imageUrl;
  createdAt;
  updatedAt;
  imageUsageCount;

  /**
   * @param {Object} params
   * @param {string} params.imageId
   * @param {string} params.imageUrl
   * @param {number} params.imageUsageCount
   * @param {Date} params.createdAt
   * @param {Date} params.updatedAt
   **/
  constructor(params) {
    this.imageId = params.imageId;
    this.imageUrl = params.imageUrl;
    this.imageUsageCount = params.imageUsageCount;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static NewImage = (imageData) => {
    try {
      const { imageId, imageUrl, imageUsageCount } = imageData;
      if (!imageId || !imageUrl) {
        return null;
      } else {
        return {
          id: crypto.randomUUID(/-/g, ""),
          imageId,
          imageUrl,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          imageUsageCount,
        };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  get data() {
    return {
      imageId: this.imageId,
      imageUrl: this.imageUrl,
      imageUsageCount: this.imageUsageCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Images;
