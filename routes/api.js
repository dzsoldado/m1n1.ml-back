const express = require('express');
const router = express.Router()
const { addUrl } = require('../functions/firebase')
const { isValidUrl } = require('../functions/helpers')


router.post('/add', async (req,res)=>{  

  if (req.body.link && isValidUrl(req.body.link)){
    try{
      let result = await addUrl(req.body.link, req.body?.user)
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
    }
    
  }else{
    res.json({'error':'missing or invalid link'})
  } 

})

module.exports = router;