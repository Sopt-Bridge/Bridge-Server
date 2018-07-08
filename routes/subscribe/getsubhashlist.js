const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:lastcontentsIdx/:userIdx', async (req, res) => {
		 let lastcontentsIdx = req.params.lastcontentsIdx;
   		let userIdx = req.params.userIdx;
         let maxindex = Number.MAX_VALUE;

         if(!lastcontentsIdx || !userIdx){
         	res.status(400).send({
         		message : "null Value"
         	});
         } else {

         if(lastcontentsIdx == 0){
             lastcontentsIdx = maxindex+1;
         }
		    let viewQuery = 'SELECT Hashtag.hashName, Hashtag.hashCnt, Hashtag.hashImg From Hashtag,Subscribe WHERE Subscribe.userIdx=? and Subscribe.hashName=Hashtag.hashName and subIdx<? limit 10'
			let viewResult = await db.queryParam_Arr(viewQuery, [userIdx, lastcontentsIdx]);

			if (!viewResult) {
				res.status(500).send({
					message : "Server error"
				});
			} else {
				res.status(201).send({
					message : "ok",
					data : [{contents_list : viewResult}]
				});
			}
		}
		
});

module.exports = router;