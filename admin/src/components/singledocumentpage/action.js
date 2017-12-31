export const FINDONE = 'FINDONE';
export const FINDONE_LOADING = 'FINDONE_LOADING';
export const FINDONE_FAILURE = 'FINDONE_FAILURE';
export const FINDONE_SUCCESS = 'FINDONE_SUCCESS';

export const findOneAction = (values,dispatch) =>{
  console.log(`findOneAction==>${JSON.stringify(values)}`);
  dispatch({type:FINDONE,payload:values});
}
