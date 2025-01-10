// import axios from "axios"
import { fetchTicketFail, fetchTicketLoading, fetchTicketSuccess, searchTickets, fetchSingleTicketFail,fetchSingleTicketLoading, fetchSingleTicketSuccess,
    replyTicketFail, replyTicketLoading, replyTicketSuccess, closeTicketLoading, closeTicketSuccess, closeTicketFail
 } from './ticketsSlice';
import { getAllTickets, getSingleTicket, updateReplyTicket, updateTicketStatusClosed } from '../../api/ticketApi'

export const fetchAllTickets = () => async (dispatch) => {
    dispatch(fetchTicketLoading());
    try {
        const result = await getAllTickets()
        
        result.data.result.length && 
        dispatch(fetchTicketSuccess(result.data.result))
    } catch (error) {
        dispatch(fetchTicketFail(error.message))
    }
}

export const filterSearchTicket = (str) => (dispatch) => {
    dispatch(searchTickets(str))
}

export const fetchSingleTicket = (_id) => async (dispatch) => {
    dispatch(fetchSingleTicketLoading());
    try {
        const result = await getSingleTicket(_id);
        if (result.data.result) {
          dispatch(fetchSingleTicketSuccess(result.data.result));
        } else {
          dispatch(fetchSingleTicketFail('No ticket found'));
        }
    } catch (error) {
    dispatch(fetchSingleTicketFail(error.message));
    }
}

export const replyOnTicket = (_id, msgObj) => async (dispatch) => {
    dispatch(replyTicketLoading());
    try {
        const result = await updateReplyTicket(_id, msgObj);
        console.log(result);
        
        if(result.status == 'error'){
            return dispatch(replyTicketFail(result.message));
        }

        dispatch(fetchSingleTicket(_id))
        dispatch(replyTicketSuccess(result.message));
    } catch (error) {
        console.log(error.message);
        dispatch(replyTicketFail(error.message));
    }
}

export const closeTicket = (_id) => async (dispatch) => {
    dispatch(closeTicketLoading());
    try {
      const result = await updateTicketStatusClosed(_id);
      if (result.status === "error") {
        return dispatch(closeTicketFail(result.message));
      }
  
      dispatch(fetchSingleTicket(_id));
  
      dispatch(closeTicketSuccess("Status Updated successfully"));
    } catch (error) {
      console.log(error.message);
      dispatch(closeTicketFail(error.message));
    }
  };