var fs = require("fs");

  var data = fs.readFileSync('../csvdata/India2011.csv','utf8');
  var data1 = fs.readFileSync('../csvdata/IndiaSC2011.csv','utf8');
  var data2 = fs.readFileSync('../csvdata/IndiaST2011.csv','utf8');

  var result1 = [];//contains array of objects
  var result2 = [];
  var result3 = [];


  var finalArr=[];

  var res = function(data,result)  {

      var linedata = data.trim().split('\n'); //extracting lines

      for(j=1;j<linedata.length;j = j+87){

         var word = linedata[j].trim().split(','); //contains words of line without commas
         var state = word[3].trim().split('-')[1].trim().split(' ')[0];
         var total = parseInt(word[39]);
         var male = parseInt(word[40]);
         var female = parseInt(word[41]);


         result.push({
           "state": state,
           "total": total,
           "male": male,
           "female": female
         });

      }//close for loop

   } //close func

  res(data,result1);
  res(data1,result2);
  res(data2,result3);

  //inserting values at specified index
  result3.splice( 2,0,{ "state": "State - PUNJAB","total":0,"male": 0,"female":0});
  result3.splice( 3,0,{"state": "State - CHANDIGARH","total":0,"male": 0,"female":0});
  result3.splice( 5,0,{ "state": "State - HARYANA","total":0,"male": 0,"female":0});
  result3.splice( 6,0,{ "state": "State - NCT OF DELHI","total":0,"male": 0,"female":0});
  result3.splice( 33,0,{ "state": "State - PUDUCHERRY","total":0,"male": 0,"female":0});

  result2.splice( 11,0,{ "state": "State - ARUNACHAL PRADESH","total":0,"male": 0,"female":0});
  result2.splice( 12,0,{ "state": "State - NAGALAND","total":0,"male": 0,"female":0});
  result2.splice( 30,0,{ "state": "State - LAKSHADWEEP","total":0,"male": 0,"female":0});
  result2.splice( 34,0,{ "state": "State - ANDAMAN & NICOBAR ISLANDS","total":0,"male": 0,"female":0});



  for(i=0;i<35;i++){

      var obj = {};

      obj["state"] = result1[i].state;
      obj["total"] = result1[i].total+ result2[i].total+result3[i].total;
      obj["male"] = result1[i].male+ result2[i].male+result3[i].male;
      obj["female"] = result1[i].female+ result2[i].female+result3[i].female;
      finalArr.push(obj);

  }

  var finalObj = {"grad_pop" : finalArr};
  var outFile = "plot2.json";

  fs.writeFile(outFile, JSON.stringify(finalObj, null, 4), function(err) {

      if(err) {
        console.log(err);
      }
      else {
        console.log("Successfully created " + outFile);
      }
  });
