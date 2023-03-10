const express = require('express');
const router = express.Router()
const { findUrl, addClick } = require('../functions/firebase')


router.get('/', (req, res)=>{
  res.send("</h1>URL shortening service</h1>");
})

router.get('/:id', async (req,res)=>{
  const {url, urlID} = await findUrl(req.params.id);
  if(url){
    addClick(req.headers, urlID)
    res.redirect(url)
  }else{
    res.send('URL NOT FOUND')
  }

})

module.exports = router;