var fs = require("fs");

var data = fs.readFileSync('India2011.csv','utf8');
var data1 = fs.readFileSync('IndiaSC2011.csv','utf8');
var data2= fs.readFileSync('IndiaST2011.csv','utf8');

var result1=[];//contains array of objects
var result2=[];
var result3=[];

var final = { edudist:[] };

var res = function(data,result)  {

        var linedata= data.trim().split('\n'); //extracting lines
          var word1=linedata[1].trim().split(',');
          var word= linedata[0].trim().split(','); //contains headings of the 1st line without commas

      for(k=15;k<word.length;k=k+3){

            var category=word[k];
            var total=parseInt(word1[k]);
            console.log(category+word1[k]);


            for(j=88;j<linedata.length;j = j+87){  // summing for same category

                var word2= linedata[j].trim().split(','); //contains words of line without commas
                 total= total + parseInt(word2[k]);
            }//for
                 result.push({
                   "category":category,
                   "india_total": total
                 })

           }//outer for

}//function

res(data,result1);
res(data1,result2);
res(data2,result3);

var arr= final.edudist;

for(i=0;i<10;i++)
{   var a={};

      a["category"]= result1[i].category,
      a["india_total"] = result1[i].india_total + result2[i].india_total + result3[i].india_total

    arr.push(a);

}

fs.writeFile('plot3.json', JSON.stringify(final, null, 4), function(err) {
        if(err) {
          console.log(err);
        }
        else {
          console.log("Successfully created ");
        }
});

//console.log(final);
