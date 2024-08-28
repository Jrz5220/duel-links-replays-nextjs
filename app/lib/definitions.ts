export type User = {
    id: string,
    username: string,
    email: string,
    idForResettingPwd: string,
    attempts: number,
    favorites: Array<string>,
    history: Array<string>
}