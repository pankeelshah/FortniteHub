var fortniteOptions = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      // Origin : 'https://api.fortnitetracker.com/v1/profile/pc/',
      'TRN-Api-Key' :'1fff15f4-314d-4b9f-9042-b11a044bf25e', 
    }
  
}

function getFortniteActiveChallenges(){
    var fortDataTable = document.querySelector("#fortDataTable");

    //Reset Table
    fortDataTable.innerHTML = "";

    fetch(encodeURI('https://cors-anywhere.herokuapp.com/'+'https://api.fortnitetracker.com/v1/challenges'), fortniteOptions)
    .then(response => response.json())
    .then(
      function(data){
        // console.log(data)
        var dataLength = data.items.length;
        
        // initalize thead and tbody
        thead = document.createElement("thead");
        tbody = document.createElement("tbody");
        
        // Creating table row for thead
        tr = document.createElement("tr");
        
        // Creating the table header data
        th = document.createElement("th");
        th.innerHTML = "Challenge";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Reward";
        tr.appendChild(th);

        // setting header with th data
        thead.appendChild(tr);
        
        for(var i = 0; i < dataLength; i++){
          var ob = data.items[i].metadata;
          // console.log(ob);

          // Create tr element
          tr = document.createElement("tr");
          
          // Name column Data
          td = document.createElement("td");
          p = document.createElement("p");
          p.innerHTML = ob[1].value;
          td.append(p)
          tr.appendChild(td);

          // imageUrl column Data
          td = document.createElement("td");
          var img = document.createElement("img");
          img.src = ob[4].value;
          img.id = "itemPictures";
          td.append(img)
          tr.appendChild(td);

          // Append each row to tbody
          tbody.appendChild(tr);
        }

        // Setting table head and body
        fortDataTable.appendChild(thead);
        fortDataTable.appendChild(tbody);
      }
    ).catch(function(e){
      // console.log(e);
    })
  }