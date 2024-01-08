// Get Token from Local Storage
export function getToken() {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('ACCESS_TOKEN');
        return token;
    }

}
// Set Token from Local Storage
export function setToken(token: string) {
    if (typeof window !== 'undefined' && typeof token !== "undefined") {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.setItem('ACCESS_TOKEN', token);
        return token;
    }
}
// Remove Token from Local Storage
export function removeLocalData() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('typeData');
        return true;
    }
}