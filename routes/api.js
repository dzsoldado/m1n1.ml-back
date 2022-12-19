const express = require('express');
const router = express.Router()
const { addUrl, verifyIdToken } = require('../functions/firebase')
const { isValidUrl } = require('../functions/helpers')


router.post('/add', async (req,res)=>{  

  if (req.body.link && isValidUrl(req.body.link)){
    try{

      const decodedToken = req.body?.id_token && await verifyIdToken(req.body.id_token);

      const result = await addUrl(req.body.link, decodedToken.uid)
      switch(result){
        case 0: res.json({
          'error': 'An error accured'
        }); break;
        case 1: res.json({
          'error': 'Url already exists'
        }); break;
        default : res.json({
          'generated_url': `https://${req.hostname}/${result}` 
        })
      }
    } catch(err){
      res.json({'error':'An error accured'})
      console.log(err)
    }
    
  }else{
    res.json({'error':'missing or invalid link'})
  } 

})

module.exports = router;