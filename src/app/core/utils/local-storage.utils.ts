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
    public setUserName(name: string) {
        localStorage.setItem('user.name', name);
    }
    public getUserName() {
        return localStorage.getItem('user.name');
    }

}