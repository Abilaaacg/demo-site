const videos = document.querySelectorAll('video');
const posters = document.querySelectorAll('.video-poster');

// Обработка клика по постеру
posters.forEach(poster => {
	poster.addEventListener('click', () => {
		const videoId = poster.getAttribute('data-video-id');
		const video = document.getElementById(videoId);

		// Остановить все остальные видео и показать их постеры
		videos.forEach(v => {
			if (v !== video) v.pause();
		});

		posters.forEach(p => {
			if (p !== poster) p.style.display = '';
		});

		// Скрыть текущий постер и запустить видео
		poster.style.display = 'none';
		video.play();
	});
});

// Автоматическое поведение при воспроизведении (если пользователь нажал прямо на видео)
videos.forEach(video => {
	video.addEventListener('play', () => {
		videos.forEach(v => {
			if (v !== video) v.pause();
		});

		posters.forEach(p => {
			const vid = document.getElementById(p.getAttribute('data-video-id'));
			if (vid === video) {
				p.style.display = 'none';
			} else {
				p.style.display = '';
			}
		});
	});
});
