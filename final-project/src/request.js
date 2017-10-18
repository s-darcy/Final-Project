var request = require('superagent');
request
  .get('https://localhost:5000/products')
  .end(function(err, res){
    console.log(res);
  });

export default request;