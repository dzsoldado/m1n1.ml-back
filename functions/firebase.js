const ShortUniqueId = require('short-unique-id');
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

async function findUrl(short){

  const linksRef = db.collection('url');
  const result = await linksRef.where('short_link', '==', short).get();

  if(result.empty) return;
  let foundUrl;
  result.forEach(doc=>{
    foundUrl = doc.data()
  })
  return foundUrl.original_link
}

async function addClick(headers, urlID){
  const clicksRef = db.collection('click');
  const docRef = clicksRef.doc();
  
  const date = new Date();
  const requestData = requestHeadersParser(headers)
  const country = await getCountryFromIp(requestData.ip)

  await docRef.set({
    urlID,
    date: date.toUTCString(),
    ...requestData,
    ...country
  });
}


module.exports = {
  addUrl,
  findUrl,
  addClick,
  verifyIdToken,
}