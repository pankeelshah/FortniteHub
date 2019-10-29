var fortniteOptions = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      // Origin : 'https://api.fortnitetracker.com/v1/profile/pc/',
      'TRN-Api-Key' :'0ab68400-32f4-4574-950a-062153db0bff', 
    }
}
  
function compareStats(){
  // User1
  var username1 = document.querySelector("#user1").value;
  var gaming_console_dropdown1 = document.querySelector("#user1GameConsole");
  var gaming_console_value1 = gaming_console_dropdown1.options[gaming_console_dropdown1.selectedIndex].value;

    // User2
  var username2 = document.querySelector("#user2").value;
  var gaming_console_dropdown2 = document.querySelector("#user2GameConsole");
  var gaming_console_value2 = gaming_console_dropdown2.options[gaming_console_dropdown2.selectedIndex].value;

  // Check if usernames are not blank
  if (!username1.replace(/\s/g, '').length || !username2.replace(/\s/g, '').length) {
    alert("Player does not exist, or no data available.");
  }
  else if(username1 == username2){
    alert("Cannot compare same username.");
  }
  else{
    // Fetch for both users
    document.querySelector("#user1").disabled = true;
    document.querySelector("#user2").disabled = true;
    document.querySelector("#user1GameConsole").disabled = true;
    document.querySelector("#user2GameConsole").disabled = true;
    document.querySelector("#playerStatsBtn").disabled = true;
    document.querySelector("#playerStatsBtn").value = "Searching...";


    let promise1 = fetch(encodeURI('https://cors-anywhere.herokuapp.com/'+'https://api.fortnitetracker.com/v1/profile/'+ gaming_console_value1 +'/' + username1), fortniteOptions);
    let promise2 = fetch(encodeURI('https://cors-anywhere.herokuapp.com/'+'https://api.fortnitetracker.com/v1/profile/'+ gaming_console_value2 +'/' + username2), fortniteOptions);
    
    let data1 = promise1.then(function(resp){

      return resp.json();
    }).then(
        function(data){
            return data;
        }
    )

    let data2 = promise2.then(function(resp){

      return resp.json();
    }).then(
        function(data){
            return data;
        }
    )
    
    // Resolves promises for both users
    Promise.all([data1,data2]).then(
        function(values){
            createTableStats(values[0],values[1],username1, username2);
        }
    ).catch(function(e){
      document.querySelector("#user1").disabled = false;
      document.querySelector("#user2").disabled = false;
      document.querySelector("#user1GameConsole").disabled = false;
      document.querySelector("#user2GameConsole").disabled = false;
      document.querySelector("#playerStatsBtn").disabled = false;
      document.querySelector("#playerStatsBtn").value = "Search";
    })
  }
}


function createTableStats(user1, user2, username1, username2){
  var fortDataTable = document.querySelector("#fortDataTable");

  //Reset Table
  fortDataTable.innerHTML = "";

  if(user1.error == "Player Not Found" || user2.error == "Player Not Found"){
    // console.log("No data")
    alert("player does not exist or no data");
  }
  else{
    var user1Length = user1.lifeTimeStats.length;
    var user2Length = user2.lifeTimeStats.length;
    // initalize thead and tbody
    thead = document.createElement("thead");
    tbody = document.createElement("tbody");
    
    // Creating table row for thead
    tr = document.createElement("tr");
    
    // Creating the table header data
    th = document.createElement("th");
    th.innerHTML = "Stats";
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = username1;
    tr.appendChild(th);
    th = document.createElement("th");
    th.innerHTML = username2;
    tr.appendChild(th);

    // setting header with th data
    thead.appendChild(tr);

    for(var i = 0; i < user1Length; i++){
      var ob1 = user1.lifeTimeStats[i];
      var ob2 = user2.lifeTimeStats[i];

      // Create tr element
      tr = document.createElement("tr");
      
      // Key column Data
      var td = document.createElement("td");
      
      p = document.createElement("p");
      p.innerHTML = ob1.key;
      td.append(p)
      tr.appendChild(td);
      
      ob1Val = parseFloat(ob1.value.replace(/,/g, ''));
      ob2Val = parseFloat(ob2.value.replace(/,/g, ''));

      if(ob1Val > ob2Val){
          // Value column Data
          var td = document.createElement("td");
          td.id = "greater";
          p = document.createElement("p");
          p.innerHTML = ob1.value;
          td.append(p)
          tr.appendChild(td);

          // Value column Data
          var td = document.createElement("td");
          p = document.createElement("p");
          p.innerHTML = ob2.value;
          td.append(p)
          tr.appendChild(td);
      }else{
          // Value column Data
          var td = document.createElement("td");
          p = document.createElement("p");
          p.innerHTML = ob1.value;
          td.append(p)
          tr.appendChild(td);

          // Value column Data
          var td = document.createElement("td");
          td.id = "greater";
          p = document.createElement("p");
          p.innerHTML = ob2.value;
          td.append(p)
          tr.appendChild(td);
      }
      

      // Append each row to tbody
      tbody.appendChild(tr);
    }

    // Setting table head and body
    fortDataTable.appendChild(thead);
    fortDataTable.appendChild(tbody);
    // console.log(data.accountId);
  }
  document.querySelector("#user1").disabled = false;
  document.querySelector("#user2").disabled = false;
  document.querySelector("#user1GameConsole").disabled = false;
  document.querySelector("#user2GameConsole").disabled = false;
  document.querySelector("#playerStatsBtn").disabled = false;
  document.querySelector("#playerStatsBtn").value = "Search";

}

window.onload = function(){ 
  document.getElementById("user1").onkeypress=function(e){
    if(e.keyCode==13){
      document.getElementById('playerStatsBtn').click();
    }
  }
  document.getElementById("user2").onkeypress=function(e){
    if(e.keyCode==13){
      document.getElementById('playerStatsBtn').click();
    }
  }
};


