app.factory('linkedinFactory', function() {
	return {
		refreshLinkedin: function() {
			setTimeout(function() {
				if(IN.parse) {
					console.log('in parse')
					IN.parse();
				} else {
					console.log('in event')
					IN.Event.on('systemReady', IN.parse);
				}
			}, 500);
		}
	}
});