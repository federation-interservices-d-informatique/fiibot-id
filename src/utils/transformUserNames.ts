/**
 * Removes all spaces from an username and replace them by _
 * @param username The username
 * @returns {string} Clean username
 */
export function transformUserName(username: string): string {
    return username.replace(/ +/g, "_");
}
