const test = require('../lib/test.js');


module.exports = function (app) {

  app.get('/', (req, res) => {
    res.send('Hello World~!')
  })

  app.get('/test/list', test.getTestList);
  app.post('/test/list2', test.getTestListV2);
}