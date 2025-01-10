import axios from 'axios'
const rootUrl = 'http://localhost:3000/v1/'
const otpReqUrl = rootUrl + 'users/reset-password'
const updatePassUrl = rootUrl + 'users/reset-password'

export const reqPasswordOtp = (email) => {
    return new Promise (async(resolve, reject) => {
        try {
            const {data} = await axios.post( otpReqUrl, {email})
            console.log(data);
            
            resolve(data)
        } catch (error) {
            console.error(error)
            const errMsg = error.response?.data?.message || "An error occurred";
            reject({ message: errMsg });
        }
    })
}

export const updateUserPassword = passObj => {
    return new Promise (async(resolve, reject) => {
        try {
            const {data} = await axios.patch( updatePassUrl, passObj)
            console.log(data);
            
            resolve(data)
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || "An error occurred";
            reject({ message: errMsg });
        }
    })
}