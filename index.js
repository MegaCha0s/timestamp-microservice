'use strict';
var express=require('express');
var app=express();
var moment=require('moment');
var fs=require('fs');
var path=require('path');

app.get('/',function(req,res){
  var fileName=path.join(__dirname,'index.html');
  res.sendFile(fileName,function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Sent: ',fileName);
    }
  });
});

app.get('/:query',function(req,res){
  var date = req.params.query;
       var unix = null;
       var natural = null;

       if (+date >= 0) {
           unix = +date;
           natural = unixToNat(unix);
       }

       if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
           unix = +natToUnix(date);
           natural = unixToNat(unix);
       }

       var dateObj = { "unix": unix, "natural": natural };
       res.send(dateObj);
});

function natToUnix(date) {
        // Conver from natural date to unix timestamp
        return moment(date, "MMMM D, YYYY").format("X");
    }

function unixToNat(unix) {
        // Convert unix timestamp to natural date
        return moment.unix(unix).format("MMMM D, YYYY");
}

var server=app.listen(8081,function(){
  var host=server.address().address
  var port=server.address().port
//  console.log("Hello World!")
})
