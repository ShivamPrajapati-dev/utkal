const image2base64 = require('image-to-base64');
var firebase = require("firebase/app");
require('firebase/database');
const casper = require('casper').create();
const fs = require('fs');
//var database = firebase.database();
const target='captcha.png';
var code='';
//var cap = consolecode();
 casper.captcha = function (target) {
  casper.then(function(){
    code='';
    this.captureSelector(target,'#ContentPlaceHolder1_imgCaptcha');
  });
  casper.waitFor(function check(){
    return fs.exists(target);
  }, function then(){


   var ref = firebase.database().ref('/shivamprajapati/credentials').once('value').then(function(snapshot) {
   var username =  snapshot.val().username;
   var password = snapshot.val().password;

   image2base64("./captcha.png").then(function(response){

               var ref = firebase.database().ref('/shivamprajapati/credentials').set({captcha:response}).then(function(response){

               }).catch(function(err){

               });

           }).catch(function(error) {
               console.log(error); //Exepection error....
           });


   });

                 this.evaluate(function(username,password,captcha){
                   document.querySelector('#ContentPlaceHolder1_txtUserName').value=username;
                   document.querySelector('#ContentPlaceHolder1_txtPassword').value=password;
                   document.querySelector('#ContentPlaceHolder1_txtCaptcha').value=captcha;
                 },username,password,snapshot.child("code").val());
                 fs.remove(target);
                 this.capture('x.png')

               this.click('#ContentPlaceHolder1_btnLogin',1415,470);



},function onTimeout(){
  this.echo(".....");
},5000);
return this;
};



casper.createComplaint = function(){
  casper.then(function(){
    this.evaluate(function (){
         $("#popmenu1>li>a")[0].click();
   });

  });

  return this;
}

 casper.complaintDetails = function(){

//
// });
// casper.then(function(){
//   this.clickLabel("Complaint Submission Details");
// });
//
// casper.then(function(){
//   this.capture('a.png');
// });
//
// casper.then(function(){
//   this.clickLabel("Accused Detail");
// });
//
// casper.then(function(){
//   this.capture('b.png');
// })
//
// casper.waitFor(function check(){
//   return fs.exists('a.png');
// }, function then(){
//   this.echo('tab clicked');
// }, function onTimeout(){
//     this.echo('timeout');
// },50000);

casper.then(function(){
//  this.click("#ctl00_ContentPlaceHolder1_tbcComplaint_tplComplainant_tbcComplaintMain_tplComplainantPersonal_ddlNatureOfComplaint");
  this.evaluate(function(){
    document.querySelector("#ctl00_ContentPlaceHolder1_tbcComplaint_tplComplainant_tbcComplaintMain_tplComplainantPersonal_ddlNatureOfComplaint").selectedIndex = 2;
  });
  this.capture('c.png');
})


return this;

 }

 casper.incidentDetails= function(){

   casper.then(function(){
     this.clickLabel("Incident Detail");
   });

   casper.then(function(){
     this.evaluate(function(){
       document.querySelector("#ctl00_ContentPlaceHolder1_tbcComplaint_tplIncident_txtIncidentFromDate").value="24/04/2000";
     });
     this.capture('d.png');
   });
     return this;
 }

casper.start('https://citizenportal-op.gov.in/citizen/login.aspx').captcha(target).waitForUrl('https://citizenportal-op.gov.in/Citizen/Home.aspx',function() {
  //this.echo('redirected');
  this.capture('y.png')
}).run();
