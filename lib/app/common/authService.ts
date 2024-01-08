import router from 'next/router';
import { GuestUser, Tokens, User } from '../../storage/index';
import { INDEX_PAGE } from './routeConstants';
import { logoutApi } from '../../api/sdk/auth';

// on Logout From Local Storage Function
export const onLogout = async () => {
    await logoutApi();
    Tokens.removeLocalData();
    User.removeSignupUserDetails();
    GuestUser.removeGuestUserDetails();
    router.push(INDEX_PAGE);
    return true;
};
// get Token From Local Storage  Function
export const getToken = () => Tokens.getToken();
// get User Details From Local Storage Function
export const getUserDetails = () => User.getUserDetails();

// Check Function for User logged-in on the basis of Local Storage Data
export const isLoggedIn = () => {
    if (getToken() && getUserDetails()) {
        return true;
    } else {
        Tokens.removeLocalData();
        return false
    }
};