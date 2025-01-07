import axios from 'axios'

const rootUrl = 'http://localhost:3000/v1/'
const loginUrl = rootUrl + 'users/login'
const userProfileUrl = rootUrl + 'users'
const logoutUrl = rootUrl + 'users/logout'
const refreshTokenUrl = rootUrl + 'tokens'

export const userRegistration = async (frmData) => {
    try {
        const res = await axios.post(userProfileUrl, frmData);
        return res.data;
    } catch (error) {
        console.error('Error during user login:', error);
        throw error;
    }
};
export const userLogin = async (frmData) => {
    try {
        const res = await axios.post(loginUrl, frmData);
        return res.data;
    } catch (error) {
        console.error('Error during user login:', error);
        throw error;
    }
};

export const fetchUser = async () => {
    try {
        const accessJWT = sessionStorage.getItem('accessJWT')
        
        if(!accessJWT){
            throw new Error("Token not found");
        }
        
        const res = await axios.get(userProfileUrl,{
            headers:{
                Authorization: accessJWT
            }
        });

        return res.data;
        
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const fetchNewAccessJWT = async () => {
    try {
      const crmSite = localStorage.getItem('crmSite');
      if (!crmSite) {
        throw new Error('No refresh token found');
      }
      const { refreshJWT } = JSON.parse(crmSite);
      if (!refreshJWT) {
        throw new Error('No refresh token found');
      }
      const res = await axios.get(refreshTokenUrl, {
        headers: {
          Authorization: refreshJWT,
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error during fetching new access JWT:', error);
      throw error;
    }
  };

export const userLogout = async () => {
    try {
        await axios.delete(logoutUrl, {
            headers: {
                Authorization: sessionStorage.getItem('accessJWT')
            }
        })
    } catch (error) {
        console.log(error);
    }
}