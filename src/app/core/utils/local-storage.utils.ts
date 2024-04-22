export class LocalStorageUtils {
    public clearSessionStorage() {
        localStorage.removeItem('dsa.token');
    }

    public getUserToken(): string {
        return localStorage.getItem('dsa.token')!;
    }

    public setUserToken(token: string) {
        localStorage.setItem('dsa.token', token);
    }

}