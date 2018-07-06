const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	let iboardIdx = req.body.iboardIdx; 
	let title = req.body.title;
	let content = req.body.content;
	if (!iboardIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
			if(title.length==0&&content.length!=0){// 제목 안바꿀때
				let updateQuery = 'UPDATE Interpretation SET iboardContent = ? WHERE iboardIdx=?';
				let updateResult = await db.queryParam_Arr(updateQuery, [content, iboardIdx]);

				let updateQuery1 = 'UPDATE Interpretation SET iboardDate = ? WHERE iboardIdx=?';
				let updateResult1 = await db.queryParam_Arr(updateQuery1, [currentTime, iboardIdx]);
				
				if(!updateResult||!updateResult1){
					res.status(500).send({
						message : "Fail at Server!"
					});
				}else{
					res.status(201).send({
						message : "ok"
					});
				}
			}else if(content.length==0&&title.length!=0){// 내용 안바꿀떄
				let updateQuery = 'UPDATE Interpretation SET iboardTitle = ? WHERE iboardIdx=?';
				let updateResult = await db.queryParam_Arr(updateQuery, [title, iboardIdx]);

				let updateQuery1 = 'UPDATE Interpretation SET iboardDate = ? WHERE iboardIdx=?';
				let updateResult1 = await db.queryParam_Arr(updateQuery1, [currentTime, iboardIdx]);
				if(!updateResult||!updateResult1){
					res.status(500).send({
						message : "Fail at Server!!"
					});
				}else{
					res.status(201).send({
						message : "ok"
					});
				}
			}else{// 둘다 바꿀때 
				let updateQuery = 'UPDATE Interpretation SET iboardContent = ? WHERE iboardIdx=?';
				let updateResult = await db.queryParam_Arr(updateQuery, [content, iboardIdx]);

				let updateQuery2 = 'UPDATE Interpretation SET iboardTitle = ? WHERE iboardIdx=?';
				let updateResult2 = await db.queryParam_Arr(updateQuery2, [title, iboardIdx]);

				let updateQuery1 = 'UPDATE Interpretation SET iboardDate = ? WHERE iboardIdx=?';
				let updateResult1 = await db.queryParam_Arr(updateQuery1, [currentTime, iboardIdx]);
				
				
				if(!updateResult||!updateResult1||!updateResult2){
					res.status(500).send({
						message : "Fail at Server"
					});
				}else{
					res.status(201).send({
						message : "ok"
					});
				}
			}
		   }
	
});

module.exports = router;