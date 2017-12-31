import {
    FINDONE,
    FINDONE_LOADING,

    FINDONE_FAILURE,
    FINDONE_SUCCESS,

} from './action';

export default (previousState = {
  mapdata:{
    'systemconfig':{
      isLoading:true,
      isget:false,
      record:{}
    }
  }
}, { type, payload }) => {
    if (type === FINDONE_LOADING) {
        let mapdata = {...previousState.mapdata};
        mapdata[payload.resource] = {
          isLoading:true,
          isget:false,
          record:{}
        };
        return {...previousState,mapdata};
    }
    else if (type === FINDONE_FAILURE) {
      let mapdata = {...previousState.mapdata};
      mapdata[payload.resource] = {
        isLoading:false,
        isget:false,
        record:{}
      };
      return {...previousState,mapdata};
    }
    else if(type === FINDONE_SUCCESS) {
      let mapdata = {...previousState.mapdata};
      mapdata[payload.resource] = {
        isLoading:false,
        isget:true,
        record:payload.json
      };
      return {...previousState,mapdata};;
    }
    return previousState;
}
