var fs = require("fs");

var data = fs.readFileSync('India2011.csv','utf8');
var data1 = fs.readFileSync('IndiaSC2011.csv','utf8');
var data2= fs.readFileSync('IndiaST2011.csv','utf8');

 p=0;

 var final1={
   agedist: []
 };

  var final={};   //obj creation
var res=function(data)  {

        var linedata= data.split('\n'); //extracting lines

        for(i=0;i<linedata.length;i++)
         {
            linedata[i]=linedata[i].trim(); //removing carriage from line

         }


         var c=0;
        for(j=2;j<linedata.length;j++){

             var word= linedata[j].split(','); //contains words of line without commas
             var total=word[4];
             var allages=word[5];

             if((total=="Total")&&(allages!="All ages"))
                {

                     if((c<=28)&&(p==0))

                     { var age=word[5];
                      var value=parseInt(word[12]);
                      final[age]=value;

                      final1.agedist.push({
                      "age": age,
                      "pop":final[age],
                      });

                    c++;

                    }//if

                    var myarr=final1.agedist;

                    if((c>=29)||(p==1))
                       { var age=word[5];
                         value1=parseInt(word[12]);
                        final[age]=final[age]+value1;
                      for(y=0;y<myarr.length;y++){

                        if(age==myarr[y].age)
                        {  myarr[y].pop=final[age];       }

                      }//inner for


                      }//if

                }//total

        }//for loop
     p=1;
   }; //function


    res(data);
    res(data1);
    res(data2);
   console.log(final1);

   fs.writeFile('plot1.json',JSON.stringify(final1,null,4),function(err){

        if(err)
          console.log(err);
        else {
          console.log("successfully created ");
        }

   });

          //console.log(JSON.stringify(final1,null,2));
