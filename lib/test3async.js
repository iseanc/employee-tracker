(async function() {
  let destArray = [];

  function appendToDestArray(input) {
    destArray.push(input);
  }


  await new Promise(function(resolve, reject){

    let e;

    for (let i=0;i<medName.length;i++){

      let medDescription = medName[i];

      mySqlConnection.query("SELECT medID FROM medTable WHERE Description = ?", medDescription, function(err, rows, fields){

        if(e) return; 

        if(!err) {
          result = rows[0].medID;
          appendToDestArray(result);
        } else {
          return reject(err);
          }
        if(i == medName.length-1) resolve(result);
      })
    }
  }
  );

  console.log(destArray);//now destArray shows up here
})
().catch(function(err){console.log(err)});