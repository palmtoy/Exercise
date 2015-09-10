function funcStartPageScroll() {
	scrollDelay = setInterval('window.scrollBy(0, 100)', 500); // scrolls every x milliseconds
}

function funcStopPageScroll() {
	clearInterval(scrollDelay);
	scrollDelay = null;
	window.scrollBy(0, 0);
}

jQuery(document).ready(function() {
	var offset = 220;
	var duration = 500;

	jQuery('.go_to_bottom').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: $(document).height()}, duration);
		return false;
	})

	jQuery('.back_to_top').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, duration);
		return false;
	})

	jQuery('.start_scroll').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: $(document).height()}, duration);
		if(!scrollDelay) {
			funcStartPageScroll();
		}
		return false;
	})

	jQuery('.stop_scroll').click(function(event) {
		event.preventDefault();
		if(scrollDelay) {
			funcStopPageScroll();
		}
		return false;
	})

	// helper function: log message to screen
	function log(msg) {
		$('#tag4log').append(msg);
	}
	// setup websocket with callbacks
	var ws = new WebSocket('ws://localhost:8086/');
	ws.onopen = function() {
		log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n');
	};
	ws.onclose = function() {
		log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n\n');
	};
	ws.onmessage = function(event) {
		log(event.data);
	};
});

