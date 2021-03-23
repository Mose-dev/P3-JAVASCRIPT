class Carte {
  constructor(){
    let token = "pk.eyJ1IjoidGhvdG1vc2lzIiwiYSI6ImNrN2dpamJ2cTAwMjgzbnBsMGEydnRvcWsifQ.A_YzdXtcOylJcSldYgXzBw";
    let mapId = "map";
    let mapGenerated = this.initMap(token,mapId); 
    this.showMarkers(mapGenerated); 
  }
  // Génère la carte
  initMap(token,mapId){
    mapboxgl.accessToken = token; // Jeton d'acces API
    let map = new mapboxgl.Map({ 
      container: mapId, // container id
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [1.44, 43.60], // position [lng, lat]
      zoom: 12 // zoom
    });
    return map; 
  }
  // Lance la requete AJAX
  showMarkers(map){
    let url = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=300d862f4bddca72ed88f1e3f839fe77544b6573";
    let requete = new XMLHttpRequest();
    requete.onload = function() {
      let datas = JSON.parse(this.responseText);
      
      // Exploitation des données
      datas.forEach( (marker) => {
        
        //Données relatives à l'encart résevation
        let encart = document.getElementById("info_station");
        let avis = document.getElementById("lack_name");
        let info_carte = document.getElementById("notice");
        let notice_icone = document.getElementById("notice_icone");
        let reserver = document.getElementById("reserver");
        let confirmation = document.getElementById('confirmation');
        
        // Création dans le DOM d'un marqueur dans un élément HTML et sa classe
        let marqueur = document.createElement("div");
        marqueur.className = "marker";
        if (marker.available_bikes == 0) {
          marqueur.className = "marker2";
        }else if (marker.available_bikes < 4) {
          marqueur.className = "marker3";
        } 
        // Attribution des informations de la station sur le marqueur
        marqueur.setAttribute("stationName", marker.name);
        marqueur.setAttribute("stationAddress", marker.address);
        marqueur.setAttribute("bike_stands", marker.bike_stands);
        marqueur.setAttribute("available_bikes", marker.available_bikes);
        
        // Attribution des informations de la station au click 
        // sur un marqueur dans l'encart "Votre station"
        marqueur.addEventListener("click", (e) => {
          encart.style.display = "block";
          avis.style.display = "block";
          info_carte.innerHTML = "veuillez remplir le formulaire";
          info_carte.style.color = "#000000";
          info_carte.style.backgroundColor = "#15ff00";
          notice_icone.style.display = "none";
          confirmation.style.display = "none";
          document.getElementById("nom_station").textContent = e.target.getAttribute("stationName");
          document.getElementById("adresse_station").textContent = e.target.getAttribute("stationAddress");
          document.getElementById("nb_velos").textContent = " " + e.target.getAttribute("bike_stands");
          document.getElementById("velo_dispo").textContent = " " + e.target.getAttribute("available_bikes");
          
          //Avis de fermeture d'une station et élimination du bouton "Réserver"
          sessionStorage.setItem("stationName", marker.address);
          if (marker.available_bikes == 0) {
            avis.innerHTML = "Station fermée";
            avis.style.backgroundColor = "#FF0000";
            avis.style.color = "#ffffff";
            reserver.style.display = "none";
          } else { 
            reserver.style.display = "block";
            avis.style.display = "none";
          }
        });
        //Affiche les marqueurs sur la carte
        new mapboxgl.Marker(marqueur)
        .setLngLat([marker.position.lng, marker.position.lat])
        
        // Ajoute les popups sur les marqueurs
        .setPopup(new mapboxgl.Popup({ offset: 25 }) 
        .setHTML("<h3>"+ marker.address + "<br/>" + "<br/>" + marker.available_bikes + "</h3><p>Cycles disponibles</p>"))
        .addTo(map);
      });
      //Affiche les données dans la console
      console.log("retour : ", datas);
    };
    requete.onerror = () => {
      console.log("Erreur ...");
    };
    //Récupère les données
    requete.open("GET", url, true);
    requete.send();
  }
  
}























