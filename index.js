

var fortniteOptions = {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    // Origin : 'https://api.fortnitetracker.com/v1/profile/pc/',
    'TRN-Api-Key' :'7ba5927b-c7d8-474f-bdd0-08352ea23221', 
  }
}

function getFortnitePlayerStats(){

  var username = document.querySelector("#username").value;
  var gaming_console_dropdown = document.querySelector("#gaming_console");
  var gaming_console_value = gaming_console_dropdown.options[gaming_console_dropdown.selectedIndex].value;

  if (!username.replace(/\s/g, '').length) {
    alert("Player does not exist, or no data available.");
  }
  else{
    document.querySelector("#username").disabled = true;
    document.querySelector("#gaming_console").disabled = true;
    document.querySelector("#playerStatsBtn").disabled = true;
    document.querySelector("#playerStatsBtn").value = "Searching...";
    
    let promise = fetch(encodeURI('https://cors-anywhere.herokuapp.com/'+'https://api.fortnitetracker.com/v1/profile/'+ gaming_console_value +'/' + username), fortniteOptions);
  
    let jr = promise.then(function(resp){
      return resp.json();
    })
  
    jr.then(
      function(data){
        createTableStats(data)
        
      }
    ).catch(function(e){
      document.querySelector("#username").disabled = false;
      document.querySelector("#gaming_console").disabled = false;
      document.querySelector("#playerStatsBtn").disabled = false;
      document.querySelector("#playerStatsBtn").value = "Search";
    })
  }
}

function createTableStats(data){
  
  var fortDataTable = document.querySelector("#fortDataTable");

  //Reset Table
  fortDataTable.innerHTML = "";

  //Initialize table headers
  if(data.error == "Player Not Found"){
    // console.log("Player does not exist, or no data available.")
    alert("Player does not exist, or no data available.");
  }else{

    var dataLength = data.lifeTimeStats.length;
    
    // initalize thead and tbody
    thead = document.createElement("thead");
    tbody = document.createElement("tbody");
    
    // Creating table row for thead
    tr = document.createElement("tr");
    
    // Creating the table header data
    // th = document.createElement("th");
    // th.innerHTML = "index";
    // tr.appendChild(th);
    // th = document.createElement("th");
    // th.innerHTML = "key";
    // tr.appendChild(th);
    // th = document.createElement("th");
    // th.innerHTML = "value";
    // tr.appendChild(th);

    // setting header with th data
    // thead.appendChild(tr);

    for(var i = 0; i < dataLength; i++){
      var ob = data.lifeTimeStats[i];

      // Create tr element
      tr = document.createElement("tr");
      
      // Index column Data
      // td = document.createElement("td");
      // p = document.createElement("p");
      // p.innerHTML = i+1;
      // td.append(p)
      // tr.appendChild(td);

      // Key column Data
      td = document.createElement("td");
      p = document.createElement("p");
      p.id = "tableText";
      p.innerHTML = ob.key;
      td.append(p);
      tr.appendChild(td);

      // Value column Data
      td = document.createElement("td");
      p = document.createElement("p");
      p.id = "tableText";
      p.innerHTML = ob.value;
      td.append(p);
      tr.appendChild(td);

      // Append each row to tbody
      tbody.appendChild(tr);
    }

    // Setting table head and body
    fortDataTable.appendChild(thead);
    fortDataTable.appendChild(tbody);
    // console.log(data.accountId);
  }
  document.querySelector("#username").disabled = false;
  document.querySelector("#gaming_console").disabled = false;
  document.querySelector("#playerStatsBtn").disabled = false;
  document.querySelector("#playerStatsBtn").value = "Search";
}

window.onload = function(){ 
  document.getElementById("username").onkeypress=function(e){
    if(e.keyCode==13){
      document.getElementById('playerStatsBtn').click();
    }
  }
};

//https://fnapi.me/
//https://documenter.getpostman.com/view/8271337/SVYjVNnm?version=latest
// function test(){
//   const url = "https://fnapi.me/api/stats1v/userid/?id={{ninja}}&time={{weekly}}";

//   const options = {
//     headers: {
//       Authorization: "40264d42d48eb9661c9b147d09cc8202d4e375ff00b8a51b94fbeeaea0bef1e0"
//     }
//   };

//   fetch(url, options)
//     .then( res => res.json() )
//     .then( data => console.log(data) );
// }