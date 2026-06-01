document.addEventListener('DOMContentLoaded', () => {

	const cookiesBox = document.getElementById('cookiesBox');
	const acceptCookiesButton = document.getElementById('acceptCookies');

	const cookiesAccepted = localStorage.getItem('cookiesAccepted');
	const acceptanceDate = localStorage.getItem('cookiesAcceptanceDate');

	if (!cookiesAccepted || (acceptanceDate && (new Date() - new Date(acceptanceDate)) > 24 * 24 * 60 * 60 * 1000)) {
		cookiesBox.classList.add('active');
	}

	acceptCookiesButton.addEventListener('click', () => {
		localStorage.setItem('cookiesAccepted', 'true');
		localStorage.setItem('cookiesAcceptanceDate', new Date().toISOString());
		cookiesBox.classList.remove('active');
	});
});
