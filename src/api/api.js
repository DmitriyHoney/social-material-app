import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '718dc875-a290-4b03-a341-95d2eb3ffe02'
    }
});

export const profileApi = {
    getUserData(userId) {
        return instance.get(`profile/${userId}`)
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    setUserStatus(newStatusText) {
        return instance.put(`profile/status`, {status: newStatusText})
    },
    setNewProfilePhoto(formData) {
        return instance.put(`profile/photo`, formData,  {
            headers: { 'content-type': 'multipart/form-data' }
        })
    },
    setEditProfileData(formData) {
        return instance.put(`profile`, {...formData, AboutMe: formData.aboutMe})
    }
};



export const authApi = {
    getAuthUser() {
        return instance.get(`auth/me`)
    },
    setLoginUserData(formData) {
        return instance.post(`auth/login`, {...formData})
    },
    logoutUser() {
        return instance.delete(`auth/login`)
    },
    getCaptchaUrl() {
        return instance.delete(`/security/get-captcha-url`)
    }
}


export const usersApi = {
    getUsersPage(pageNumber, countUsers = "7", friend = "", findUser = "") {
        return instance.get(`users/?page=${pageNumber}&count=${countUsers}&friend=${friend}&term=${findUser}`)
    },
    getFollowStateOnUser(userId) {
        return instance.get(`follow/${userId}`)
    },
    followOnUser(userId) {
        return instance.post(`follow/${userId}`)
    },
    unFollowOnUser(userId) {
        return instance.delete(`follow/${userId}`)
    }
   
}