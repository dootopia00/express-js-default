const TEST_SQL =  require('./sql/test_sql');

module.exports = {

  getTestList: async function(req, res){
    
    consoleLog("test", "getTestList");
    let result = null;
    // let member = bearerToken(req);
    let dataRes = {};
    
    try{
      
      let whereSeq = req.body.where_seq ? req.body.where_seq : null;
      let orderField = req.body.order_field ? req.body.order_field : '';   
      let order = req.body.order ? req.body.order : 'DESC';                      
      let page  = req.body.page  ? req.body.page : 1;
      let limit = req.body.limit ? req.body.limit : 20;                            
      let orderStr = orderField + ' ' + order;
      let limitStr = ((page-1)*limit) + ', ' + limit;
      let sqlStr = ' ORDER BY '+ orderStr + ' LIMIT '+ limitStr;

      let sqlTestCount = TEST_SQL.GET_TEST_COUNT;
      let arrTestount = [ whereSeq ];
      let dataTestount = connection.query(sqlTestCount, arrTesarrTestount);

      if(dataTestount == 0){
        result = { success: false, msg: "조회되지 않는 정보입니다." };
        return res.json(result);
      }

      let sqlTest = TEST_SQL.GET_TEST;
      let arrTest = [ whereSeq ];
      let dataTest = connection.query(sqlTest, arrTest);

      result = { success: true, msg: "조회 성공", data: dataTest };
      
    } catch(e) {
        errorLog("test getTestList",e);
        result = {success: false, msg: '정보를 받아올 수 없습니다.'};
    }

    consoleLog("test", "getTestList End");
    res.json(result);
  
  },


  getTestListV2: async function(req, res){
    
    consoleLog("test", "getTestListV2");
    let result = null;
    // let member = bearerToken(req);
    let dataRes = {};
    const connPool = await pool.getConnection();
    
    try{
      
      let whereSeq = req.body.where_seq ? req.body.where_seq : null;
      let orderField = req.body.order_field ? req.body.order_field : '';   
      let order = req.body.order ? req.body.order : 'DESC';                      
      let page  = req.body.page  ? req.body.page : 1;
      let limit = req.body.limit ? req.body.limit : 20;                            
      let orderStr = orderField + ' ' + order;
      let limitStr = ((page-1)*limit) + ', ' + limit;
      let sqlStr = ' ORDER BY '+ orderStr + ' LIMIT '+ limitStr;

      let sqlTestCount = TEST_SQL.GET_TEST_COUNT;
      let arrTestount = [ whereSeq ];
      let [dataTestount] = await connPool.query(sqlTestCount, arrTestount);

      if(dataTestount == 0){
        result = { success: false, msg: "조회되지 않는 정보입니다." };
        return res.json(result);
      }

      let sqlTest = TEST_SQL.GET_TEST;
      let arrTest = [ whereSeq ];
      let dataTest = await connPool.query(sqlTest, arrTest);


      await connPool.beginTransaction(); // START TRANSACTION
      // after update, insert, delete...



      await connPool.commit(); // COMMIT


      result = { success: true, msg: "조회 성공", data: dataTest };
      
    } catch(e) {
        errorLog("test getTestListV2",e);
        await connPool.rollback(); // ROLLBACK
        result = {success: false, msg: '정보를 받아올 수 없습니다.'};
    }

    connPool.release();
    consoleLog("test", "getTestListV2 End");
    res.json(result);
  
  },

}