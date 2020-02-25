const { Profile } = require('../../database/models'),
  user = require('../../database/models').User;
/**
 * Declares user model manager class.
 * user model manager class contains user queries.
 */
class UserModelManager {
  /**
   *@param {email} email The user's username.
   * @param {password} password The user's password.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async create(email, password) {
    const createdRecord = await user.create({
      email,
      password
    });
    return createdRecord;
  }

  /**
   *  @static
   * @param {*} limit
   * @param {*} offset
   * @returns {*} object
   * @memberof UserModelManager
   */
  static async listAllUsers(limit, offset) {
    const users = await user.findAll({
      attributes: { exclude: ['password'] },
      include: [
        { model: Profile, as: 'Profile' }
      ],
      limit,
      offset
    });
    return users;
  }

  /**
   * @param {string} columnName The collumn to be search.
   * @param {string} value The value to search for.
   * @static
   * @memberof User
   * @returns {null} if user is not found.
   * @returns {object} if user is found.
   */
  static async getUser(columnName, value) {
    const UserRecord = await user.findOne({
      include: [
        { model: Profile, as: 'Profile' }
      ],
      where: { [columnName]: value },
      attributes: { exclude: ['password'] }
    });
    return UserRecord;
  }

  /**
   * @param {string} email The collumn email to be search.
   * @static
   * @memberof User
   * @returns {false} If user is not verified.
   * @returns {true} If user is verified.
   */
  static async getUserStatus(columnName, value) {
    const status = await user.findOne({
      where: { [columnName]: value },
      attributes: ['isverified']
    });
    return status;
  }

  /**
   * @param {string} email The collumn email to be search.
   * @static
   * @memberof User
   * @returns {null} if user is not found.
   * @returns {string} if user is found returns password.
   */
  static async getUserPassword(email) {
    const password = await user.findOne({
      where: { email },
      attributes: ['password']
    });
    return password;
  }

  /**
   * @param {id} id The user's id.
   * @param {object} newData The field to be updated and value.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async updateUser(id, newData) {
    const updatedRecord = await user.update(newData, {
      where: { id },
      returning: true,
    });
    return updatedRecord;
  }

  /**
   * @param {id} id The user's id.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async deleteUser(id) {
    const deletedRecord = await user.destroy({
      where: { id }
    });
    return deletedRecord;
  }
}

module.exports = UserModelManager;
