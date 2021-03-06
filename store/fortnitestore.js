// Using new api; code for old api is below
// https://fnapi.me/
// https://documenter.getpostman.com/view/8271337/SVYjVNnm?version=latest

function getCurrentFortniteStore(){
  const url = "https://fnapi.me/api/shop/?lang={{en}}";
  const fortniteOptions = {
    headers: {
      Authorization: "40264d42d48eb9661c9b147d09cc8202d4e375ff00b8a51b94fbeeaea0bef1e0"
    }
  };

  fetch(url, fortniteOptions)
    .then( response => response.json() )
    .then( 
      function(data){
        
        var dataLength = data.data.length;
        
        // initalize thead and tbody
        thead = document.createElement("thead");
        tbody = document.createElement("tbody");
        
        // Creating table row for thead
        tr = document.createElement("tr");
        
        // Creating the table header data
        th = document.createElement("th");
        th.innerHTML = "Name";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Rarity";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "vBucks";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Image";
        tr.appendChild(th);
  
        // setting header with th data
        thead.appendChild(tr);
  
        for(var i = 0; i < dataLength; i++){
          var ob = data.data[i];
  
          // Create tr element
          tr = document.createElement("tr");
          
          // Name column Data
          td = document.createElement("td");
          p = document.createElement("p");
          p.innerHTML = ob.item.name;
          td.append(p)
          tr.appendChild(td);
  
          // Rarity column Data
          td = document.createElement("td");
          p = document.createElement("p");
          p.innerHTML = ob.item.rarity;
          td.append(p)
          tr.appendChild(td);
  
          // vBucks column Data
          td = document.createElement("td");
          p = document.createElement("p");
          p.innerHTML = ob.store.cost;
          td.append(p)
          tr.appendChild(td);
  
          // imageUrl column Data
          td = document.createElement("td");
          var img = document.createElement("img");
          img.src = ob.item.images.background;
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

// var fortniteOptions = {
//     method: "GET",
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin' : '*',
//       // Origin : 'https://api.fortnitetracker.com/v1/profile/pc/',
//       'TRN-Api-Key' :'dc7374d5-7813-4878-9614-ecbf08129396', 
//     }
// }




/*
function getCurrentFortniteStore(){
  var fortDataTable = document.querySelector("#fortDataTable");

  //Reset Table
  fortDataTable.innerHTML = "";

  fetch(encodeURI('https://cors-anywhere.herokuapp.com/'+'https://api.fortnitetracker.com/v1/store'), fortniteOptions)
  .then(response => response.json())
  .then(
    function(data){
      // console.log(data)
      
      var dataLength = data.length;
      
      // initalize thead and tbody
      thead = document.createElement("thead");
      tbody = document.createElement("tbody");
      
      // Creating table row for thead
      tr = document.createElement("tr");
      
      // Creating the table header data
      th = document.createElement("th");
      th.innerHTML = "Name";
      tr.appendChild(th);
      th = document.createElement("th");
      th.innerHTML = "Rarity";
      tr.appendChild(th);
      th = document.createElement("th");
      th.innerHTML = "vBucks";
      tr.appendChild(th);
      th = document.createElement("th");
      th.innerHTML = "Image";
      tr.appendChild(th);

      // setting header with th data
      thead.appendChild(tr);

      for(var i = 0; i < dataLength; i++){
        var ob = data[i];

        // Create tr element
        tr = document.createElement("tr");
        
        // Name column Data
        td = document.createElement("td");
        p = document.createElement("p");
        p.innerHTML = ob.name;
        td.append(p)
        tr.appendChild(td);

        // Rarity column Data
        td = document.createElement("td");
        p = document.createElement("p");
        p.innerHTML = ob.rarity;
        td.append(p)
        tr.appendChild(td);

        // vBucks column Data
        td = document.createElement("td");
        p = document.createElement("p");
        p.innerHTML = ob.vBucks;
        td.append(p)
        tr.appendChild(td);

        // imageUrl column Data
        td = document.createElement("td");
        var img = document.createElement("img");
        img.src = ob.imageUrl;
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
*/

