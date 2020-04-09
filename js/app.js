var apiKey = '45828062';
var sessionId = '1_MX40NTgyODA2Mn5-MTU4NjQyODQ4Njk0NX5HamVBb3FRcmE1bVllNWdRakxHa0Nkanp-UH4';
var token = 'T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9ZjI5YzRlZTc5YzMxNDFiZDhhZDVlZDg4MTZlYmY5NGVkZWU5YzRkMjpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UVTROalF5T0RRNE5qazBOWDVIYW1WQmIzRlJjbUUxYlZsbE5XZFJha3hIYTBOa2FucC1VSDQmY3JlYXRlX3RpbWU9MTU4NjQyODUwMyZub25jZT0wLjUyOTA2MDQzMTkzMzQ4ODgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU4NjUxNDkwMw==';

initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
