import Cookies from "js-cookie";
import { APPLICATION } from "~/constants/Appication.constant.ts";

export const getAccessToken = () => {
    return Cookies.get(APPLICATION.ACCESS_TOKEN)
}

export const storeAccessToken = (accessToken) => {
    Cookies.remove(APPLICATION.ACCESS_TOKEN)
    Cookies.set(APPLICATION.ACCESS_TOKEN, accessToken, { expires: APPLICATION.COOKIE_EXPRIES })
}

export const getUserId = () => {
    return Cookies.get(APPLICATION.USER_ID)
}

export const storeUserId = (userId) => {
    Cookies.remove(APPLICATION.USER_ID)
    Cookies.set(APPLICATION.USER_ID, userId, { expires: APPLICATION.COOKIE_EXPRIES })
}

export const getUserRoleId = () => {
    return Cookies.get(APPLICATION.USER_ROLE_ID)
}

export const storeUserRoleId = (roleId) => {
    Cookies.remove(APPLICATION.USER_ROLE_ID)
    Cookies.set(APPLICATION.USER_ROLE_ID, roleId, { expires: APPLICATION.COOKIE_EXPRIES })
}

export const removeAllDataInCookie = () => {
    Cookies.remove(APPLICATION.ACCESS_TOKEN)
    Cookies.remove(APPLICATION.USER_ID)
    Cookies.remove(APPLICATION.USER_ROLE_ID)
}