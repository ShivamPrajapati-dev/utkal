
const casper1=require('casper').create();
const fs = require('fs');
var Buffer = require('buffer/').Buffer;

const target = 'captcha.png';
var casper2done = false;
var casper3done = false;
var casper4done = false;

var username='';
var password='';
var code = '';

var data;

//PAGE 1
casper1.captcha = function(target){
  casper1.then(function(){
    this.captureSelector(target,'#ContentPlaceHolder1_imgCaptcha');
    this.capture('captcha_confirm.png');


 data = this.evaluate(function() {

  img = document.getElementById('ContentPlaceHolder1_imgCaptcha');

  canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
});

try
{
  buf = new Buffer(data, "base64").toString('binary');

  fs.write("x.png", buf, 'wb');
}
catch(err) {
  console.log(err);
}

  casper1.waitFor(function check(){
    return fs.exists("x.png");
  }, function then(){

            const casper2 = require('casper').create();

               casper2.start('https://www.google.com/').then(function(){

                            casper2.echo("uploading data")
                             casper2.thenOpen('https://smart-india-hackathon-24a7a.firebaseio.com/shivamprajapati/credentials.json?auth=l0hMqQsSQXvv3IgUhc1OPQ0BCSP641CEfZnJzpGv',{
                               method: "POST",
                               data: JSON.stringify({captcha:data,status:"uploaded"}),
                               headers: {
                                 auth : "xxxxxx",
                               },
                               contentType : 'application/json',
                               dataType: 'json',
                             },function(){
                                     casper2.echo("done");
                             });


               }).run(function(){
                 casper2done=true;
                });


   });


  }, function onTimeout(){
       this.echo(".....");
    },120000);

    casper1.waitFor(function check(){
      return casper2done;
    },function then(){


         casper1.wait(45000,function(){

           const casper3 = require('casper').create();

              casper3.start('https://www.google.com/').then(function(){
                casper3.echo("reading data");

                            casper3.thenOpen('https://smart-india-hackathon-24a7a.firebaseio.com/shivamprajapati/credentials.json?auth=l0hMqQsSQXvv3IgUhc1OPQ0BCSP641CEfZnJzpGv',function(){
                              this.then(function(){
                                this.echo(this.getPageContent())
                                var obj = JSON.parse(this.getPageContent());
                                 var key = Object.keys(obj);
                                  username=obj[key].username;
                                  password=obj[key].password;
                                  code = obj[key].code;
                                 this.echo(code);

                                  casper1.evaluate(function(username,password,code){
                                    document.querySelector('#ContentPlaceHolder1_txtUserName').value=username;
                                    document.querySelector('#ContentPlaceHolder1_txtPassword').value=password;
                                    document.querySelector('#ContentPlaceHolder1_txtCaptcha').value=code;
                                  },username,password,code);

                                  casper1.capture('credentials.png')

                               });


                            });


              }).run(function(){
                casper3done=true;
              });


         });


    },function onTimeout(){

    },120000);

    casper1.waitFor(function check(){
      return casper3done;
    },function then(){
        casper1.click('#ContentPlaceHolder1_btnLogin',1415,470);
    },function onTimeout(){
      casper1.echo('timeout');
    },120000)
    return this;
}

//PAGE 2
casper1.createComplaint = function(){
  casper1.then(function(){
    this.evaluate(function (){
         $("#popmenu1>li>a")[0].click();
   });

  });

  return this;
}

//PAGE 3

casper1.complaintDetails = function(){

casper1.then(function(){
  this.clickLabel("Complaint Detail");

});

casper1.then(function(){
  this.capture('before.png');

    const casper4 = require('casper').create();

    casper4.start('https://www.google.com/').then(function(){
      casper4.echo("reading FIR details");

                  casper4.thenOpen('https://smart-india-hackathon-24a7a.firebaseio.com/shivamprajapati.json?auth=l0hMqQsSQXvv3IgUhc1OPQ0BCSP641CEfZnJzpGv',function(){
                    this.then(function(){
                      this.echo(this.getPageContent())
                      var obj = JSON.parse(this.getPageContent());
                       var key = Object.keys(obj);
                        category=obj.category;

                        //if(category === "theft"){
                          var item_stolen=obj.item_stolen;
                          var time_of_theft = obj.time_of_theft;
                          var description = obj.description_of_theft;
                          var date = obj.date;

                          var details = item_stolen+"\n"+time_of_theft+"\n"+description+"\n"+date;
                          casper1.evaluate(function(details){
                            document.querySelector('#ctl00_ContentPlaceHolder1_tbcComplaint_tplComplaint_txtComplaintDescription').value=details;

                          },details);
                          casper1.capture('after.png');
                        //}

                     });


                  });


    }).run(function(){
      casper4done=true;
    });

});

casper1.waitFor(function check(){
  return casper4done;
}, function then(){
  this.echo('Ready to submit');
}, function onTimeout(){
    this.echo('timeout');
},50000);


return this;

}


casper1.start('https://citizenportal-op.gov.in/citizen/login.aspx').captcha(target).waitForUrl('https://citizenportal-op.gov.in/Citizen/Home.aspx',function() {
   this.echo('redirected');
  this.capture('after_login.png')
}).createComplaint().complaintDetails().run();
