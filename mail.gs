function emailone() {
  var htmlBody = HtmlService.createTemplateFromFile('birthdaymail');  
  
  var uid = "------";
  var ss = SpreadsheetApp.openById(uid);
  var ws = ss.getSheetByName("Birthdays");
  var rng = ws.getActiveRange();
  var email = rng.getValues()[0];

  var sr = 2;
  var lr = ws.getLastRow();
  var dataRange = ws.getRange(sr, 5, lr, 5);
  var data = dataRange.getValue();
  var All = "";
  var Avals = ws.getRange("A1:A").getValues();
var Alast = Avals.filter(String).length;
   
  var Alldetails = "";
  
  
//var my_date = new Date();  
  var today = new Date();
    var yesterday = new Date(today);
    
    yesterday.setDate(today.getDate() - 1);
 var formatedmyDate = Utilities.formatDate(new Date(today),Session.getScriptTimeZone(), "dd-MM"); 
   var birthDate = Utilities.formatDate(new Date(today),Session.getScriptTimeZone(), "MMM dd"); 
  for (var i = 2; i <= Alast; i++){
    
    var Stdate = ws.getRange(i, 3).getValue();
    var formatedStDate = Utilities.formatDate(new Date(Stdate),Session.getScriptTimeZone(), "dd-MM");
    Logger.log(formatedStDate);
    Logger.log(formatedmyDate);
 
    if(formatedmyDate == formatedStDate){
      
        var name = ws.getRange(i, 2).getValue();
      var temail = ws.getRange(i, 1).getValue();
      var Address = ws.getRange(i, 4).getValue();
      var Phone = ws.getRange(i, 5).getValue();
      var PIC = ws.getRange(i, 6).getValue();
      
  // set the values for the placeholders
  htmlBody.name = name;
  htmlBody.temail = temail;
  htmlBody.Address = Address;
  htmlBody.phone = Phone;
  htmlBody.Date = birthDate;
  htmlBody.pic = PIC;

  // evaluate and get the html
  var email_html = htmlBody.evaluate().getContent();

  MailApp.sendEmail({
    to: "----",
    subject: 'Birthdays Today : ' + name,
    htmlBody: email_html
  });
}
  }
}
