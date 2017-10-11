import { normalize, schema } from 'normalizr';

// Define a users schema
const requests = new schema.Entity('requests',{},{
  idAttribute: '_id',
});

const requestlistSchma = {list:[requests]};

let normalizr_requestlist=(list)=>{
  //console.log("normalizr_requestlist before====>" + JSON.stringify(list));
  const requestlist = normalize(list, requestlistSchma);
  //console.log("normalizr_requestlist after ====>" + JSON.stringify(requestlist));
  return requestlist;
};


// Define a orders schema
const triporders = new schema.Entity('triporders',{},{
  idAttribute: '_id',
});

const tripordersSchma = {list:[triporders]};

const normalizr_triporderslist=(list)=>{
  //console.log("normalizr_triporderslist before====>" + JSON.stringify(list));
  const mytriporders = normalize(list, tripordersSchma);
  //console.log("normalizr_triporderslist after ====>" + JSON.stringify(mytriporders));
  return mytriporders;
};

export {normalizr_requestlist,normalizr_triporderslist};
