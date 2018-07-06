const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');


router.get('/:lastcontentsIdx/:userIdx/:groupIdx', async (req, res) => {
		 let lastcontentsIdx = req.params.lastcontentsIdx;
   		 let userIdx = req.params.userIdx;
   		 let groupIdx = req.params.groupIdx;
         let maxindex = Number.MAX_VALUE;

         if(lastcontentsIdx == 0){
             lastcontentsIdx = maxindex+1;
         }// 컨탠츠제목, 컨탠츠길이, 해시태그 , 컨텐츠인덱스 
		    let viewQuery = 'SELECT groupTitle FROM Bridge.group WHERE groupIdx = ? and userIdx=? ';
			let viewResult = await db.queryParam_Arr(viewQuery, [groupIdx, userIdx]);// 그룹 타이틀
			
			let contentsQuery = `SELECT Contents.contentsTitle, Contents.contentsRuntime, Contents.contentsIdx, 
			Contents.hashName1, Contents.hashName2, Contents.hashName3 FROM Contents, GroupContent 
			WHERE GroupContent.contentsIdx = Contents.contentsIdx and GroupContent.groupIdx=? and gcIdx<? limit 6`
			let contentResult = await db.queryParam_Arr(contentsQuery, [groupIdx, lastcontentsIdx]);

			if (!viewResult||!contentResult) {
				res.status(500).send({
					message : "Fail at Server"
				});	
			} else {
				res.status(201).send({
					message : "ok",
					data : [{group_title : viewResult}, {group_contentslist:contentResult}]
				});
			}
		
});

module.exports = router;