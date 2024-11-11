const KeyRepository = require("../repositories/Keys");

class KeyService {
    /**
   * Gets User Keys by UserId.
   * @param {string} userId - The userId of the user.
   * @param {string} keyLimit - The maximum number of keys that a user can have.
   * @returns {boolean} - If the number of keys user has, is withing limits, then true else false.
   */
    async getUserKeysById(userId, keyLimit) {
        const keysObject = KeyRepository.getById(userId);
        if(keysObject.length >= keyLimit) {
            return false;
        }
        return true;
    }

    /**
   * Create a New Key.
   * @param {string} newKey - The userId of the user.
   * @returns {boolean} - If the number of keys user has, is withing limits, then true else false.
   */
    async createNewKey(newKey) {
        return KeyRepository.create(newKey);
    }
}

module.exports = KeyService;