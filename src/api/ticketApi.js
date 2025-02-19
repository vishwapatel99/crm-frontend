import axios from 'axios'
const rootUrl = 'http://localhost:3000/v1/'
const TicketUrl = rootUrl + 'tickets/'
const closeTicketUrl = rootUrl + 'tickets/close-ticket/'

export const getAllTickets = () => {
    return new Promise (async(resolve, reject) => {
        try {
            const result = await axios.get( TicketUrl,{
            headers:{
                Authorization: sessionStorage.getItem('accessJWT')
            }}
        )
        resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const getSingleTicket = (_id) => {
    return new Promise (async(resolve, reject) => {
        try {
            const result = await axios.get( TicketUrl + _id,{
            headers:{
                Authorization: sessionStorage.getItem('accessJWT')
            }}
        )
        resolve(result)
        } catch (error) {
            console.log(error.message);
            reject(error)
        }
    })
}

export const updateReplyTicket = (_id, msgObj) => {
    return new Promise (async(resolve, reject) => {
        try {
            const result = await axios.put( TicketUrl + _id, msgObj,{
            headers:{
                Authorization: sessionStorage.getItem('accessJWT'),
            }}
            
        )
        resolve(result.data)
        } catch (error) {
            console.log(error.message);
            reject(error)
        }
    })
}

export const updateTicketStatusClosed = (_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.patch(
          closeTicketUrl + _id, {},
          {
            headers: {
              Authorization: sessionStorage.getItem("accessJWT"),
            },
          }
        );
  
        resolve(result.data);
      } catch (error) {
        console.log(error.message);
        reject(error);
      }
    });
  };

export const createNewTicket = (frmData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(TicketUrl, frmData, {
                headers: {
                    Authorization: sessionStorage.getItem("accessJWT"),
                },
            });

            resolve(result.data);
        } catch (error) {
            console.log(error.message);
            reject(error);
        }
    });
};