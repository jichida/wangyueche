import { createReducer } from 'redux-act';
import {
    ui_setsidebaropen,
    ui_pinchesetdateshow,
    ui_clickpinchetypebtn,
    ui_lvyoudabasetdateshow1,
    ui_lvyoudabasetdateshow2,
    ui_editprofilesetbirthdayshow,
    ui_setcarmap
} from '../actions';

const initial = {
  appui:{
    home:{
      issidedbaropen:false
    },
    pinche:{
      isquerydateshow:false,
      pinchetypetabbtn:0
    },
    lvyoudaba:{
      isstartdateopen:false,
      isenddateopen:false,
    },
    editprofile:{
      birthdaydateopen:false
    },
    carmap:{
        ispagenow: false,//是否预约
        ridedatesel: new Date(),//当前选择的日期
    }
  }
};

const appui = createReducer({
    [ui_setcarmap]: (state, data) => {
        return {
            ...state,
            carmap:{
                ...state.carmap,
                ...data,
            }
        };
    },
  [ui_setsidebaropen]: (state, issidedbaropen) => {
    return {
            ...state,
            home:{
              ...state.home,
              issidedbaropen,
            }
        };
  },
  [ui_pinchesetdateshow]: (state, isquerydateshow) => {
    return {
            ...state,
            pinche:{
              ...state.pinche,
              isquerydateshow,
            }
        };
  },
  [ui_clickpinchetypebtn]: (state, pinchetypetabbtn) => {
        return {
            ...state,
            pinche:{
                ...state.pinche,
                pinchetypetabbtn,
            }
        };
    },
    [ui_lvyoudabasetdateshow1]: (state, isstartdateopen) => {
          return {
              ...state,
              lvyoudaba:{
                  ...state.lvyoudaba,
                  isstartdateopen,
              }
          };
      },
      [ui_lvyoudabasetdateshow2]: (state, isenddateopen) => {
            return {
                ...state,
                lvyoudaba:{
                    ...state.lvyoudaba,
                    isenddateopen,
                }
            };
      },
    [ui_editprofilesetbirthdayshow]: (state, birthdaydateopen) => {
            return {
                ...state,
                editprofile:{
                    ...state.editprofile,
                    birthdaydateopen,
                }
            };
      },
}, initial.appui);

export default appui;
