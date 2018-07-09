const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
		 let pageIdx = req.body.pageIdx;
   		 let hashName = req.body.hashName;
         
         if(!pageIdx||!hashName){
         	res.status(400).send({
         		message:"Null Value"
         	});
         }else{
         	pageIdx = pageIdx*12;
		    let hashQuery = `SELECT Contents.contentsType, Contents.contentsIdx, Contents.contentsUrl, Contents.contentsTitle, Contents.contentsInfo, Contents.contentsDate, Contents.contentsCategory, 
          Contents.contentsLike, Contents.contentsHit, Contents.contentsRuntime, Contents.hashName1, Contents.hashName2, Contents.hashName3 
          FROM Contents,Hashtag WHERE ((Contents.hashName1=Hashtag.hashName) or (Contents.hashName2=Hashtag.hashName) or (Contents.hashName3=Hashtag.hashName) )and
           Hashtag.hashName = ? limit ?,12`     // 입력받은 s_idx DB에 존재하는지 확인
          let viewResult = await db.queryParam_Arr(hashQuery, [hashName, pageIdx]);
			if (!viewResult) {
				res.status(500).send({
					message : "Fail at Server"
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