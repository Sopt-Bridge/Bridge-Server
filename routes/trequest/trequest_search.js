const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/:searchname', async (req, res) => {
   let searchname = req.params.searchname;
   if (!searchname) {
      res.status(400).send({
       message : "Null searchname Value"
      });
   } else {
     
      let searchQuery = 'SELECT iboardTitle,iboardDate, userIdx FROM Interpretation WHERE iboardTitle = ?';      // 입력받은 s_idx DB에 존재하는지 확인
      let searchResult = await db.queryParam_Arr(searchQuery,[searchname]);
      
      
      if (!searchResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
            message : "Fail from server"
          });
      } else {     
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