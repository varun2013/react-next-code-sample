const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const URL = (uri: string) => `${BASE_URL}${uri}`;
/***** Auth Api Routes *******/
export const LOGIN = URL('/auth/login');
export const CASE_STUDIES = URL('/auth/case-studies');
export const LOGOUT = URL('/auth/logout');
export const FORGOT_PASSWORD = URL('/auth/forgot-password');
export const VERIFY_TOKEN = URL('/auth/verify-token');
export const RESET_PASSWORD = URL('/auth/reset-password');
export const EDIT_PROFILE = URL('/auth/profile');
export const EDIT_PROFILE_IMAGE = URL('/auth/profile-image');
export const CHANGE_PASSWORD = URL('/auth/change-password');
export const GET_PROFILE = URL('/auth/get-user');