const ShortUniqueId = require('short-unique-id');
const firebase = require('firebase-admin')
const { db, auth } = require('../firebase')
const { requestHeadersParser, getCountryFromIp } = require('./helpers')

const uid = new ShortUniqueId({ length: 6 });

async function verifyIdToken(id_token){
  try{
    const decodedToken = await auth.verifyIdToken(id_token);
    return decodedToken;
    
  }catch(err){
    console.log(err)
    return 0;
  }

}

async function addUrl(original_link, user=null){

  let linkID = uid();
  const linksRef = db.collection('url');
  const docRef = linksRef.doc();

  try{
    // first check if the url doesn't already exist
    const result = await linksRef.where('original_link', '==', original_link).get();
    if(!result.empty) return 1;

    await docRef.set({
      original_link,
      short_link:linkID,
      user,
      created_at: new Date().toUTCString()
      
    });
    return linkID;

  }catch(err){
    console.log(err)
    return 0;
  }
}

async function findUrl(short_url){

  const linksRef = db.collection('url');
  const result = await linksRef.where('short_link', '==', short_url).get();

  if(result.empty) return ;

  return {
    url: result.docs[0].data().original_link, 
    urlID: result.docs[0].id
  };
}

async function addClick(headers, urlID){
  const urlRef = db.collection('url').doc(urlID);
  const clickRef = urlRef.collection('clicks').doc();
  
  const date = new Date();
  const requestData = requestHeadersParser(headers)
  const country = await getCountryFromIp(requestData.ip)

  await clickRef.set({
    date: date.toUTCString(),
    ...requestData,
    ...country
  });
  await urlRef.update({clicks_count : firebase.firestore.FieldValue.increment(1)})
}


module.exports = {
  addUrl,
  findUrl,
  addClick,
  verifyIdToken,
}