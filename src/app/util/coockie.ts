export function setCookie(name, value, days, path, domain) {
	let date, expires;
	if (days) {
		date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = ";expires=" + date.toGMTString();
	}
	if (path === null) {
		path = '/';
	}
	path = path ? ";path=" + path : '';
	domain = domain === null ? '' : ";domain=" + domain;
	return document.cookie = name + "=" + encodeURIComponent(value) + expires + path + domain;
}


export function getCookie(name) {
	let c, ca, j, len, nameEQ;
	nameEQ = name + "=";
	ca = document.cookie.split(';');
	for (j = 0, len = ca.length; j < len; j++) {
		c = ca[j];
		while (c.charAt(0) === ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) === 0) {
			return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
	}
	return null;
}