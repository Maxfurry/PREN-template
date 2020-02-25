const { Profile } = require('../../database/models');

/**
 * Declares user profile model manager class.
 * user profile model manager class contains user profile queries.
 */
class UserProfile {
  /**
   * Create a new user profile
   * @param {object} userProfileDetails user profile info
   * @param {boolean} emailnotification whether the user should recieve email notification or not
   * @returns {object} The created user profile
   */
  static async createUserProfile(userId, userProfileDetails) {
    const createdUserProfile = await Profile.create({
      user_id: userId,
      ...userProfileDetails
    });
    return createdUserProfile;
  }

  /**
   * Update user profile
   * @param {string} userId The userId of the user to be updated.
   * @param {object} userProfileUpdate Field to be updated as key and new update as value.
   * @static
   * @memberof User
   * @returns {object} details updated
   */
  static async updateUserProfile(userId, userProfileUpdate) {
    const updatedRecord = await Profile.update(userProfileUpdate, {
      where: {
        user_id: userId
      },
      returning: true
    });
    return updatedRecord;
  }
}

module.exports = UserProfile;
