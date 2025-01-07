import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from './page/Ticket-List/ticketsSlice'
import loginReducer from './components/Login/loginSlice'
import userReducer from './page/dashboard/userSlice'
import newTicketReducer from './components/AddTicketForm/AddTicketSlice'

const store = configureStore({ 
    reducer: {
        tickets: ticketsReducer,
        login: loginReducer,
        user: userReducer,
        openTicket: newTicketReducer
    }
});

export default store;