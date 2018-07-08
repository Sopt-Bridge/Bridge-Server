const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/:contentsCategory/:lastcontentsIdx' , async (req, res) =>{
    let contentsCategory = req.params.contentsCategory;
    let lastcontentsIdx = req.params.lastcontentsIdx;
   
    let maxindex = Number.MAX_VALUE;
    if(!contentsCategory || !lastcontentsIdx){
        res.status(400).send({
            message : "null Value"
        });
    } else {
    if(lastcontentsIdx == 0){
        lastcontentsIdx = maxindex+1;
    }

    let getQuery = 'SELECT contentsTitle, contentsInfo, contentsHit, contentsDate, contentsLike, contentsType, contentsRuntime, hashName1, hashName2, hashName3 FROM Contents WHERE contentsCategory=? and contentsIdx < ? ORDER BY contentsDate DESC limit 12'
    
    let getResult = await db.queryParam_Arr(getQuery,[contentsCategory, lastcontentsIdx]);
    
    if(!getResult){
        
        res.status(500).send({
            message : "Server Error"
        });
    } else {
        res.status(201).send({
            message : "ok",
            data : [{contents_list:getResult}]
        });
        }
    }
});

module.exports = router;