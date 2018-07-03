const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const pool = require('../../module/pool.js');





//recent 동영상 data 가져오기 


router.get(('/:contents_category') , async(req, res) =>{
    let contents_category = req.params.contents_category;
    
    let getQuery = 
    'SELECT * FROM Contents WHERE contents_category=? ORDER BY contents_recent DESC limit ?'
    // contents_idx  추가해주기 
    
    let getResult = await pool.queryParam_Arr(getQuery,[contents_category,12]);
    
    if(!getResult){
        res.stauts(500).send({
            message : "Server Error"
        })
    } else {
        res.status(200).send({
            message : "ok",
            data : [getResult]
        });
        
    }
});

module.exports = router;