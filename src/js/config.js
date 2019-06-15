
require.config({
	paths : {
		'jq' : '../../lib/jquery-1.10.1.min',
//		'swiper' : '../../lib/swiper',
		'code' : '../../lib/jscode'
	},
	shim : {
		'main'   : ['jq'],
		'list' 	 : ['jq'],
		'detail' : ['jq'],
		'car'    : ['jq'],
		'login'  : ['jq','code'],
		'register' : ['jq','code'],
	}
});
