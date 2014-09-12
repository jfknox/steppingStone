console.log('client')

//find all destory links

//for every destory link
  //on click:
     //ajax call to delete the user
     //(Make sure to pass in the user id




//Get all destroy links using jquery
//We can do this without document.ready() because this js is loaded at the bottom
var destoryLinks = $('.destroyLink')

//Using jquery, setup an event handler
destoryLinks.on('click', function() {
	var answer = confirm('Are you sure?')
	if(answer) {
		//If they answered yes, make an ajax call
		var $this = $(this);
		var userId = this.getAttribute('data-id');
		var $request = $.ajax({
			url: '/users/delete/' + userId,
			type: 'POST'
		});
		//Callback if call to nodejs server was successful
		$request.done(function(data) {
			//Its possible that mongodb failed, so check for that
			if(data.err) {
				console.log(data.err);
			} else {
				$this.parent().parent().remove();
			}
		});
		//Callback if call to nodejs server failed (ex, nodejs server not running)
		$request.fail(function() {
			console.log('fail')
		});
	} else {
		console.log('user clicked no')
	}
});