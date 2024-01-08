// Set Guest User Details in Session Storage
export function setGuestUserDetails(data: any) {
    sessionStorage.setItem('guid', btoa(JSON.stringify(data)));
}
// Get Guest User Details in Session Storage
export const getGuestUserDetails = () => {
    const typeData: any = sessionStorage.getItem('guid');
    if (typeData === null) {
        return '';
    }
    try {
        const guestData: any = JSON.parse(atob(typeData));
        return guestData;
    } catch (e) {
        return
    }
}
// Remove Guest User Details in Session Storage
export function removeGuestUserDetails() {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('guid');
        return true;
    }
}