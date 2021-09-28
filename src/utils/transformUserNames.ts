export function transformUserName(username: string): string {
    return username.replace(/ +/g, "_");
}
