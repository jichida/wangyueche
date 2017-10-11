import { normalize, schema } from 'normalizr';

// Define a users schema
const emerygencycontact = new schema.Entity('emerygencycontact',{},{
  idAttribute: '_id',
});

const emerygencycontactlistSchma = {list:[emerygencycontact]};

let normalizr_emerygencycontactlist=(list)=>{
  console.log("normalizr_emerygencycontactlist before====>" + JSON.stringify(list));
  const newemerygencycontactlist = normalize(list, emerygencycontactlistSchma);
  console.log("normalizr_emerygencycontactlist after ====>" + JSON.stringify(newemerygencycontactlist));
  return newemerygencycontactlist;
};

// Define a orders schema
const triporders = new schema.Entity('triporders',{},{
  idAttribute: '_id',
});

const tripordersSchma = {list:[triporders]};

const normalizr_triporderslist=(list)=>{
  console.log("normalizr_triporderslist before====>" + JSON.stringify(list));
  const mytriporders = normalize(list, tripordersSchma);
  console.log("normalizr_triporderslist after ====>" + JSON.stringify(mytriporders));
  return mytriporders;
};


export {normalizr_emerygencycontactlist,normalizr_triporderslist};
// Define your comments schema
// const comment = new schema.Entity('comments', {
//   creator: user,
//   comments: [ comment ],
//   loves:[user]
// },{idAttribute: '_id'});
//
// // Define your article
// const topics = new schema.Entity('topics', {
//   creator: user,
//   comments: [ comment ],
//   loves:[user]
// },{idAttribute: '_id'});

// const mySchema = { docs: [ topics ] }
// // const docSchema = new schema.Object({ docs: new schema.Array(topics) });
//
// let normalizrtopiclist=(oldtopicdataobj)=>{
//   console.log("normalizrtopiclist before====>" + JSON.stringify(oldtopicdataobj));
//   const newtopicdataobj = normalize(oldtopicdataobj, mySchema);
//   console.log("normalizrtopiclist after ====>" + JSON.stringify(newtopicdataobj));
//   return newtopicdataobj;
// };
//
// export {normalizrtopiclist};
