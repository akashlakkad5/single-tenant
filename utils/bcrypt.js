const bcrypt = require('bcrypt');

/**
 * Hashes a password using bcrypt with a salt round of 10.
 *
 * @function bcryptPassword
 * @param {Object} params - The function parameters.
 * @param {string} params.password - The password to be hashed.
 * @returns {Promise<string>} - A promise that resolves with the hashed password.
 *
 * @example
 * const hashedPassword = await bcryptPassword({ password: 'mySecurePassword' });
 * console.log(hashedPassword); // '$2a$10$...hashedPassword...'
 */
exports.bcryptPassword = async (password) => {
    if (!password)
        throw new Error("Password is required to hash");
    return await bcrypt.hash(password, 10);
};

exports.comparePassword = ({password, hash}) => {
    return bcrypt.compare(password, hash);
}