const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:pageIdx/:userIdx', async (req, res) => {
		 let pageIdx = req.params.pageIdx;
   		let userIdx = req.params.userIdx;

         if(!pageIdx || !userIdx){
         	res.status(400).send({
         		message : "null Value"
         	});
         } else {
         	pageIdx = pageIdx*20;
		    let viewQuery = 'SELECT Hashtag.hashName, Hashtag.hashCnt, Hashtag.hashImg From Hashtag,Subscribe WHERE Subscribe.userIdx=? and Subscribe.hashName=Hashtag.hashName limit ?,10'
			let viewResult = await db.queryParam_Arr(viewQuery, [userIdx, parseInt(pageIdx, 10)]);

			if (!viewResult) {
				res.status(500).send({
					message : "Server error"
				});
			} else {
				res.status(201).send({
					message : "ok",
					data : [{hashcontents_list : viewResult}]
				});
			}
		}
		
});

module.exports = router;