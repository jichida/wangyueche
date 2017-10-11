import { createReducer } from 'redux-act';
import {
  setpinchequery,
  getbuscarpool_result,
} from '../actions';


const initial = {
  pinche: {
    query:{},
    resultroute:[],
  },
};

const pinche = createReducer({
  [setpinchequery]: (state, payload) => {
    const query = {...payload};
    return {
        ...state,
        query
    };
  },
  [getbuscarpool_result]: (state, payload) => {
    const {list} = payload;
    let resultroute = [...list];
    return {
        ...state,
        resultroute
    };
  },
}, initial.pinche);

export default pinche;
