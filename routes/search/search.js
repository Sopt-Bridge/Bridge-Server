const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');


router.get('/:lastcontentsIdx/:searchname/:searchType', async (req, res) => {
   let lastcontentsIdx = req.params.lastcontentsIdx;
   let maxindex = Number.MAX_VALUE;

   if(lastcontentsIdx == 0){
        lastcontentsIdx = maxindex+1;
    }
   let searchname = req.params.searchname;
   let searchType = req.params.searchType;
   let searchParams = ['%'+req.params.searchname+'%'];
   if (!searchname) {
      res.status(400).send({
         message : "Null searchname Value"
      });
   } else {
      let searchResult;
      if(searchType==0){// 해시 검색 
          let hashQuery = `SELECT Contents.contentsType, Contents.contentsIdx, Contents.contentsUrl, Contents.contentsTitle, Contents.contentsInfo, Contents.contentsDate, Contents.contentsCategory, 
          Contents.contentsLike, Contents.contentsHit, Contents.contentsRuntime, Contents.hashName1, Contents.hashName2, Contents.hashName3 
          FROM Contents,Hashtag WHERE ((Contents.hashName1=Hashtag.hashName) or (Contents.hashName2=Hashtag.hashName) or (Contents.hashName3=Hashtag.hashName) )and
           Hashtag.hashName = ? and contentsIdx < ? ORDER BY contentsIdx DESC limit 12`     // 입력받은 s_idx DB에 존재하는지 확인
         let name =  ['#'+req.params.searchname];
         console.log(name);
          searchResult = await db.queryParam_Arr(hashQuery, [name, lastcontentsIdx]);
      }else{
          let searchQuery = "SELECT * FROM Contents WHERE contentsTitle LIKE ? and contentsIdx < ? limit 12";      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(searchQuery,[searchParams, lastcontentsIdx]);
      }
      
      if (!searchResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
            message : "server error"
          });
      } else {      // 배열의 길이 === 1 => DB에 s_idx가 존재
          res.status(201).send(
          {
              message : "ok",
              data : [{contents_list:searchResult}]
          }
       );
      
      }
   }
});

module.exports = router;