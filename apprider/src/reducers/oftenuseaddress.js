import { createReducer } from 'redux-act';
import {
    getoftenuseaddress_result
} from '../actions';


const initial = {
    oftenuseaddress: {

    },
};

const oftenuseaddress = createReducer({
    [getoftenuseaddress_result]:(state, payload) => {
        const {oftenuseaddress} = payload;
        return { ...state,...oftenuseaddress};
    },
}, initial.oftenuseaddress);

export default oftenuseaddress;
