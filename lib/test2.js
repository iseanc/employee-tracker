let destArray = [];
function appendToDestArray(input) { destArray.push(input);}

new Promise(function(resolve, reject){ 
    mySqlConnection.query("SELECT rows FROM tbl WHERE cri = ?", cri, function(err, rows){
      if(!err) {
        result = rows;
        appendToDestArray(result);
      } else {
        return reject(err); 
      }
      resolve(result);
    })
})
.then(function(result){
  console.log(destArray); //now destArray shows up here
})
.catch(function(err){
  console.log(err);
});