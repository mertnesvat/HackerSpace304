
/* Youtube Link Adresleri */
var YOUTUBE_EMBED = "<iframe sytle='margin :auto auto;' width=\"950\" height=\"500\" src=\"http://www.youtube.com/embed/{0}?autoplay=1\" frameborder=\"0\" allowfullscreen><\/iframe>";
/* === */

String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined'
			? args[number]
			: match
		;
	});
};

function parseQueryString(uri) {
	var queryString = {};
	uri.replace(
		new RegExp("([^?=&]+)(=([^&]*))?", "g"),
		function($0, $1, $2, $3) { queryString[$1] = $3; }
	);
	return queryString;
}




function createIframeYoutubeFromUrl(gelenUrl){
	var id = parseQueryString(gelenUrl).v ;
	var idIframe = YOUTUBE_EMBED.format(id);
	return idIframe;
}
