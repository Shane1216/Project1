// On click event for user query
  $("#event-search").on("click", function(event) {
    event.preventDefault();

    let eventName = $('#name-input').val().trim();
    let city = $('#city-input').val().trim();
    let state = $('#state-input').val().trim();
    let country = $('#state-input').val().trim();

    
    //Ticketmaster API call to get event name, event type(genre), date and time of event, and venue name
    let queryURL = 'https://app.ticketmaster.com/discovery/v2/events.response?size=20&city=' + city + '&state=' + state + '&keyword=' + eventName + '&country=' + country + '&apikey=o21rB514w7SKdPN63jRqUSSzt0UurSAa';
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response){
      console.log(response);

      //For loop to print out each of the responses
      for(let events = 0; events < response.page.size; events++){
        let image = $('<img>').attr('src', response._embedded.events[events].images[0].url);
        let eventName = $('<h1>').text('Event: ' + response._embedded.events[events].name);
        let genre = $('<h1>').text('Genre: ' + response._embedded.events[events].classifications[0].genre.name);
        let date = $('<h1>').text('Start date: ' + response._embedded.events[events].dates.start.localDate);
        let time = $('<h1>').text('Start time: ' + response._embedded.events[events].dates.start.localTime);
        let tickets = $("<a>").attr('href', response._embedded.events[events].url).text('Buy your tickets here!');
        let venue = $('<h1>').text('Venue: ' + response._embedded.events[events]._embedded.venues[0].name);

        $('#venue-div').append(image, eventName, genre, date, time, tickets, venue);
        
      }
      let lat = (response._embedded.events[0]._embedded.venues[0].location.latitude);
        let long = (response._embedded.events[0]._embedded.venues[0].location.longitude);
      console.log(lat);
        console.log(long);

        let pwQuery = 'http://api.parkwhiz.com/venue/search/?lat=' + lat + '&' + 'lng=' + long + '&key=25806fb1af4b9b6fe2518cce0470c0218664f834';
      console.log(pwQuery);
        $.ajax({
          url: pwQuery,
          method: 'GET'
        }).then(function(response){
          console.log(response);
    
          let pwUrl = $("<a target = _blank>").attr('href', response.parkwhiz_url).text('See parking near you')
    
          $('#pw-div').append(pwUrl);
        })

    })
    
    //Openweather API call to get city name, temperature, and weather condition
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=166a433c57516f51dfab1f7edaed8413',
      method: 'GET'
    }).then(function(response){
      console.log(response);

      let temp = 1.8*(response.main.temp - 273) + 32;

      let name = $('<h1>').text(response.name);
      let farenheit = $('<h1>').text(temp.toFixed(0) + 'F°');
      let condition = $('<h1>').text(response.weather[0].main);

      $('#weather-div').append(name, farenheit, condition);
    })

    //API call for nearby parking info

    

    clearFunction();

  });
  //Function to clear the divs of info so that new searches can be populated in their place
  let clearFunction = function(){
    $('#weather-div').empty();
    $('#pw-div').empty();
    $('#venue-div').empty();
  }
  


  
 