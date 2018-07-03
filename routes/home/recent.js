const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/:contents_category/:lastcontents_idx' , async (req, res) =>{
    let contents_category = req.params.contents_category;
    let lastcontents_idx = req.params.lastcontents_idx;
   
    let maxindex = Number.MAX_VALUE;

    if(lastcontents_idx == 0){
        lastcontents_idx = maxindex+1;
    }

    let getQuery = 'SELECT * FROM Contents WHERE contents_category=? and contents_idx < ? ORDER BY contents_recent DESC limit 12'
    
    let getResult = await db.queryParam_Arr(getQuery,[contents_category, lastcontents_idx]);
    
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
});

module.exports = router;