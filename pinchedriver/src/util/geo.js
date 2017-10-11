import geolib from 'geolib';
import {getcurrentlocationfn} from '../env/geo';

export const getcurrentpos =()=> {
  return new Promise(resolve => {
     getcurrentlocationfn((locz)=>{
        if(locz[0] !== 0 && locz[1] !== 0){
          resolve({lat:locz[1],lng:locz[0]});
        }
      });
  });
}

let getstringofdistance2 = (leftdistance)=>{
  let leftdistancetxt = '';
  if(leftdistance >= 1000){
    leftdistance = parseFloat((leftdistance/1000).toFixed(1));
    leftdistancetxt =  leftdistance + '千米';
  }
  else{
    leftdistance = parseInt(leftdistance,10);
    leftdistancetxt = leftdistance + '米';
  }
  return leftdistancetxt;
};

export const getdistance =(fromlocation,tolocation)=>{
  let distance = geolib.getDistance(
    {latitude: fromlocation[1], longitude: fromlocation[0]},
    {latitude: tolocation[1], longitude: tolocation[0]}
  );
  return getstringofdistance2(distance);
}

export const getstringofdistance=(distance)=>{
  return  getstringofdistance2(distance);
};

export const getstringoftime=(leftduring)=>{
  let leftduringtxt = '';
  if(leftduring >= 60){
    leftduring = parseFloat((leftduring/60).toFixed(1));
    leftduringtxt = leftduring + '分';
  }
  else{
    leftduring = parseInt(leftduring,10);
    leftduringtxt = leftduring + '秒';
  }
  return leftduringtxt;
}
