/**
 * 修改成你的域名
 */
const YOUR_DOMIAN = 'api.91zuiai.com';

/**
 * 拼接url
 */
function URL(module, action) {
	return `http://${YOUR_DOMIAN}/client1/${module}/${action}`;
}

module.exports = {
	URL
};
