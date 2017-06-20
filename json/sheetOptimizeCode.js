	function onEdit(e){
	  // get active sheet
	  var GolfSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
	  
	  // get property of the changed cell
	  var range = e.range;
	  
	  // get changes cell coloumn and row
	  var coloumNum = range.getColumn();
	  var rowNum = range.getRow();
	  
	  //variable to locate date
	  var chckDate1 = 22; 
	  
	  //event trigger variable
	  var ActionVar = 0;
	  
	  //check which cell is changes if its guest name proceed
	if(coloumNum===3){ 

		//guest gust name
		var guestName=GolfSheet.getRange(rowNum, 3).getValue();

		// if gust name not blank continue..
		if(RoomName.length != 0){
		  
			// get a comman room name for diffrent room type
			var RoomType = getRoomCode(GolfSheet.getRange(rowNum, 2).getValue());

			// get the only date[1->31] for that guest entry
			var dateOn = GolfSheet.getRange(rowNum, 1).getValue().getDate(); 

			//date is under 0-15 range continue..
			if(dateOn <= 15)setPropertiesFor(RoomType)else setPropertiesFor(RoomType, 'above');


			function setPropertiesFor(rooTypeParm, DateCheck){
				Browser.msgBox(rooTypeParm + '------' + DateCheck );
			} 
		}		  
	}
}
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  


//var myvalue = PropertiesService.getScriptProperties().getProperty('starDate');

function getRoomCode(Rname){     
  //var myvalue = PropertiesService.getScriptProperties().getProperty('starDate');
  //Browser.msgBox(myvalue);
  var STERLING = ["102-STERLING", "202-STERLING", "301-STERLING STUDIO", "302-STERLING"];
  var EXECUTIVE = ["101-EXECUTIVE SUITE", "201-EXECUTIVE SUITE"];
  var WINSOME = ["103-WINSOME", "104-WINSOME", "203-WINSOME TWIN BED", "204-WINSOME", "303-WINSOME TWIN BED"];
  var roomCodeToRtrn;
   for(var x in STERLING){
     if(STERLING[x]===Rname){
       //Browser.msgBox('Sterling');
       roomCodeToRtrn = 'Sterling';  
     }
   }
     for(var y in EXECUTIVE){
       if(EXECUTIVE[y]===Rname){
       roomCodeToRtrn = 'Executive';  
       }
     }
       
     for(var z in WINSOME){
       if(WINSOME[z]===Rname){
       roomCodeToRtrn = 'Winsome';  
       }  
     }
  return roomCodeToRtrn;
    
   }
   


   

function createEvent() { 
  var GolfSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var calenderId = '';
  var eventIdDate = PropertiesService.getScriptProperties().getProperty('eventCell');
  var idcell;
  //Browser.msgBox(PropertiesService.getScriptProperties().getProperty('DeleteTriger'));
  if(PropertiesService.getScriptProperties().getProperty('Trigger')=='active'){
    
    if(PropertiesService.getScriptProperties().getProperty('RoomTyp')=='Sterling'){
     calenderId = 'theperch.in_4fi6h74g1ie8cfl7foplrgb6b8@group.calendar.google.com';
      if(PropertiesService.getScriptProperties().getProperty('dateStat')=='below'){
        idcell = GolfSheet.getRange(eventIdDate, 35);
      }else{
        idcell = GolfSheet.getRange(eventIdDate, 38);
      }
    }else if(PropertiesService.getScriptProperties().getProperty('RoomTyp')=='Executive'){
      calenderId = 'theperch.in_gi67t7jg558k8tksdidmmibh4k@group.calendar.google.com';
      if(PropertiesService.getScriptProperties().getProperty('dateStat')=='below'){
        idcell = GolfSheet.getRange(eventIdDate, 36);
      }else{
        idcell = GolfSheet.getRange(eventIdDate, 39);
      }
    }else if(PropertiesService.getScriptProperties().getProperty('RoomTyp')=='Winsome'){
      calenderId = 'theperch.in_7i0equ4vb2up9h1fof50sb8dsc@group.calendar.google.com';
      if(PropertiesService.getScriptProperties().getProperty('dateStat')=='below'){
        idcell = GolfSheet.getRange(eventIdDate, 34);
      }else{
        idcell = GolfSheet.getRange(eventIdDate, 37);
      }      
    }
    var eventDate = PropertiesService.getScriptProperties().getProperty('starDate');
    var dsrptn = PropertiesService.getScriptProperties().getProperty('Discrptn');
    var calendar = CalendarApp.getCalendarById(calenderId);
    if(idcell.getValue()==''){
    var event = calendar.createAllDayEvent('Booked',
                                            new Date(eventDate),
                                            {location: 'GolfCrs',
                                             description: dsrptn
                                            });
    //var putId = PropertiesService.getScriptProperties().getProperty('eventCell').getValue(event.getId());
    idcell.setValue(event.getId());
    Browser.msgBox('Calendar Updated Successfully !!!');
    }else{
      Browser.msgBox('Event on this date is already created !!!');
    }
    
    PropertiesService.getScriptProperties().setProperty('starDate', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('Discrptn', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('RoomTyp', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('Trigger', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('eventCell', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('DeleteTriger', 'no');
     
  }else if(PropertiesService.getScriptProperties().getProperty('DeleteTriger')=='yes'){
    

   
    var datestatus = PropertiesService.getScriptProperties().getProperty('dateStat');
    var getEventId = PropertiesService.getScriptProperties().getProperty('eventCell');
    var deleteIdcell = '';
    //Browser.msgBox(GolfSheet.getRange(getEventId, 34).getValue());
    if(PropertiesService.getScriptProperties().getProperty('RoomTyp')=='Sterling'){
      calenderId = 'theperch.in_4fi6h74g1ie8cfl7foplrgb6b8@group.calendar.google.com';
      if(datestatus=='below'){
        deleteIdcell = GolfSheet.getRange(getEventId, 35);
      }else{
        deleteIdcell = GolfSheet.getRange(getEventId, 38);
      }
    }
    
    if(PropertiesService.getScriptProperties().getProperty('RoomTyp')=='Executive'){
      calenderId = 'theperch.in_gi67t7jg558k8tksdidmmibh4k@group.calendar.google.com';
      if(datestatus=='below'){
        deleteIdcell = GolfSheet.getRange(getEventId, 36);
      }else{
        deleteIdcell = GolfSheet.getRange(getEventId, 39);
      }
    }
    
    if(PropertiesService.getScriptProperties().getProperty('RoomTyp')=='Winsome'){
      calenderId = 'theperch.in_7i0equ4vb2up9h1fof50sb8dsc@group.calendar.google.com';
      if(datestatus=='below'){
        deleteIdcell = GolfSheet.getRange(getEventId, 34);
      }else{
        deleteIdcell = GolfSheet.getRange(getEventId, 37);
      }
    }    
    var calendar = CalendarApp.getCalendarById(calenderId);
    var eventsList=calendar.getEventSeriesById(deleteIdcell.getValue());
    eventsList.deleteEventSeries();
    deleteIdcell.setValue('');
    Browser.msgBox('Calendar Updated Successfully !!!');  
    PropertiesService.getScriptProperties().setProperty('starDate', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('Discrptn', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('RoomTyp', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('Trigger', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('eventCell', 'deactivate');
    PropertiesService.getScriptProperties().setProperty('DeleteTriger', 'no');   
  }
  
}


function resetAll(){
  PropertiesService.getScriptProperties().setProperty('starDate', 'deactivate');
  PropertiesService.getScriptProperties().setProperty('Discrptn', 'deactivate');
  PropertiesService.getScriptProperties().setProperty('RoomTyp', 'deactivate');
  PropertiesService.getScriptProperties().setProperty('Trigger', 'deactivate');
  PropertiesService.getScriptProperties().setProperty('eventCell', 'deactivate');
  PropertiesService.getScriptProperties().setProperty('DeleteTriger', 'no'); 
}
