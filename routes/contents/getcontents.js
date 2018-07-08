const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

	let userIdx = req.body.userIdx;
	let contentsIdx = req.body.contentsIdx;
	let contentsType = req.body.contentsType;

	if(!userIdx || !contentsType || !contentsIdx) {
		res.status(400).send({
			message : "null Value"
		});
	} else {
		if(contentsType == 0){
			let selectImageQuery = `SELECT Contents.contentsTitle, Contents.contentsInfo, Contents.contentsCategory, Contents.contentsLike, Imerge.imgname FROM Contents,Imerge WHERE Contents.contentsIdx = ? and Contents.contentsIdx = Imerge.contentsIdx;`
			let selectImageResult = await db.queryParam_Arr(selectImageQuery, [contentsIdx]);

			if(!selectImageResult){
				res.status(500).send({
					message : "Server error"
				});
			} else {
				res.status(201).send({
					message : "ok",
					data : [{imageContent : selectImageResult}]
				});
			}
		} else if(contentsType == 1){
			let selectVideoQuery = `SELECT contentsTitle, contentsInfo, contentsURL, contentsLike, hashName1, hashName2, hashName3 From Contents WHERE contentsIdx = ?`
			let selectVideoResult = await db.queryParam_Arr(selectVideoQuery, [contentsIdx]);

			if(!selectVideoResult){
				res.status(500).send({
					message : "Server error"
					});
				} else {
					let insertRecentQuery = `INSERT INTO Recentview (userIdx, contentsIdx) VALUES (?, ?)`
					let insertRecentResult = await db.queryParam_Arr(insertRecentQuery,[userIdx, contentsIdx]);

					if(!insertRecentResult){
						res.status(500).send({
							message : "Server error"
						});
					} else {
						res.status(201).send({
							message : "ok",
							data : [{videoContents : selectVideoResult}]
						});
					}
					}
				} else {
				res.status(400).send({
					message : "Invalid Value"
				});
			}
		}
});

module.exports = router;