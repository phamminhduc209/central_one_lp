var app = app || {};
let scrollTop, scrollLeft = 0;
gsap.registerPlugin(ScrollTrigger);

app.init = function () {
	app.tab();
	app.anchorLink();
	app.runningStatus();
	app.homeGsap();
	app.homeSlider();
	app.headerFunc();
};

app.tab = function () {
	$(document).on("click", ".tab .tab-head li a", function (e) {
		e.preventDefault();
		let target = $(this).attr("href").split('#')[1];

		$(this).parent().addClass("active").siblings().removeClass("active");
		$('[data-id="' + target + '"]').fadeIn(0).siblings().fadeOut(0);
	});

	if (location.hash && $(".tab .tab-head li a[href='" + location.hash + "']").length) {
		$(".tab .tab-head li a[href='" + location.hash + "']").trigger("click");

		$('.pagination a.page-numbers').each(function (i, a) {
			$(a).attr('href', $(a).attr('href') + '#' + $(a).parents('.tab-box').attr('data-id'));
		});
	} else {
		$(".tab .tab-head li:first-child a").trigger("click");
	}
}

app.anchorLink = function () {
	$('.anchor-link').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				app.resumeScroll();
				$('.p-header').removeClass('menu-active');
				$('.p-header__nav').removeClass('is-active');
				$('.js-menu-toggle').removeClass('is-active');
				$('.header-backdrop').fadeOut(300, function () {
					$(this).remove();
				});

				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
}

app.runningStatus = function () {
	$('.js-running-status').on('click', function () {
		const t = $(this);
		const target = t.data('target');
		const txtEl = t.find('.txt');
		const currentText = txtEl.text().trim();

		// Change text
		if (currentText === '停止') {
			txtEl.text('再生'); // Play
		} else {
			txtEl.text('停止'); // Pause
		}

		// Toggle status class
		t.toggleClass('is-stop');
		$('#' + target).toggleClass('is-stop');
	});
};

app.homeGsap = function () {
	gsap.utils.toArray('.js-parallax').forEach(wrap => {
		const yPC = wrap.getAttribute('data-y-pc') || -100;
		const ySP = wrap.getAttribute('data-y-sp') || -30;
		const y = (window.innerWidth >= 768) ? yPC : ySP;

		gsap.to(wrap, {
			y: y,
			scrollTrigger: {
				trigger: wrap,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 1,
			}
		})
	});

	// ScrollTrigger.matchMedia({
	// 	"(min-width: 768px)": function () {
	// 		const cards = gsap.utils.toArray(".js-function-lap");
	// 		const endEl = document.querySelector(".function-item--04");

	// 		cards.forEach((card, index) => {
	// 			const startOffset = index === 0 ? 30 : 60;

	// 			ScrollTrigger.create({
	// 				trigger: card,
	// 				start: `top-=${index * 0} ${startOffset}`,
	// 				endTrigger: endEl,
	// 				end: `top-=${index * 0} ${60}`,
	// 				pin: true,
	// 				pinSpacing: false,
	// 				markers: false,
	// 				id: 'pin',
	// 				invalidateOnRefresh: true,
	// 			});
	// 		});
	// 	},
	// });
}

app.homeSlider = function () {
	//Case slider
	const caseSlider = document.querySelectorAll('.js-case-slider');
	caseSlider.forEach(gallery => {
		const pagination = gallery.querySelector('.swiper-pagi');
		const nextEl = gallery.querySelector('.swiper-next');
		const prevEl = gallery.querySelector('.swiper-prev');
		const progressBar = gallery.querySelector('.swiper-progress');
		const scrollBar = gallery.querySelector('.c-sliderNav__scrollbar');
		const swiper = new Swiper(gallery, {
			slidesPerView: 'auto',
			loop: false,
			speed: 500,
			centeredSlides: true,
			watchOverflow: true,
			pagination: {
				el: progressBar,
				type: "progressbar",
			},
			scrollbar: {
				el: scrollBar,
				draggable: true,
				dragSize: '20'
			},
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			on: {
				scrollbarDragMove(swiper) {
					updateScrollbarPosition(swiper);
				},
				scrollbarDragEnd(swiper) {
					const nearestIndex = Math.round(swiper.progress * (swiper.slides.length - 1));
					swiper.slideTo(nearestIndex);
					swiper.scrollbar.updateSize();
					updateScrollbarPosition(swiper);
				},
				init: function (swiper) {
					updatePagi(swiper.activeIndex, swiper.slides.length);

					updateScrollbarPosition(swiper);
				},
				slideChange: function () {
					updatePagi(swiper.activeIndex, swiper.slides.length);
					updateScrollbarPosition(swiper);
				},
				resize: function () {
					updatePagi(swiper.activeIndex, swiper.slides.length);
					updateScrollbarPosition(swiper);
				},
			},

		});
		function updateScrollbarPosition(swiper) {
			const dragEl = gallery.querySelector('.swiper-scrollbar-drag');
			if (!dragEl) {
				return;
			}
			const progress = swiper.progress * 100;
			dragEl.style.left = `${progress}%`;
			const totalSlides = swiper.slides.length;
			const scrollbarWidth = ((totalSlides - 1) / totalSlides) * 100;
			scrollBar.style.width = `${scrollbarWidth}%`;
		}
		function updatePagi(index, total) {
			const formattedIndex = formatNumber(index + 1);
			const formattedTotal = formatNumber(total);
			pagination.innerHTML = `${formattedIndex}<span></span>${formattedTotal}`;
		}

		function formatNumber(num) {
			return num < 10 ? `0${num}` : num;
		}
	});
}

app.headerFunc = function () {
	const header = document.querySelector('.p-header');
	let lastScrollY = window.scrollY;
	const headerHeight = header.offsetHeight;
	let isMenuClosing = false; // <== cờ tạm để bỏ qua 1 lần scroll

	window.addEventListener('scroll', () => {
		if ($('.js-menu-toggle').hasClass('is-active') || isMenuClosing) return;

		const currentScrollY = window.scrollY;

		if (currentScrollY > headerHeight) {
			if (currentScrollY < lastScrollY) {
				header.classList.add('show');
				header.classList.remove('hide');
			} else {
				header.classList.add('hide');
				header.classList.remove('show');
			}
		} else {
			header.classList.remove('hide');
			header.classList.remove('show');
		}

		lastScrollY = currentScrollY;
	});

	$('.js-menu-toggle').on('click', function (e) {
		e.preventDefault();

		if ($(this).hasClass('is-active')) {
			isMenuClosing = true;

			app.resumeScroll();
			$(this).removeClass('is-active');
			$('.p-header__nav').removeClass('is-active');
			$('.p-header').removeClass('menu-active');

			$('.header-backdrop').fadeOut(300, function () {
				$(this).remove();
			});

			// Reset cờ sau 200ms để tránh scroll nhỏ
			setTimeout(() => {
				isMenuClosing = false;
			}, 200);
		} else {
			app.stopScroll();
			$(this).addClass('is-active');
			$('.p-header__nav').addClass('is-active');
			$('.p-header').addClass('menu-active');
			$('<div class="header-backdrop"></div>').appendTo('body').addClass('show');
		}

		$('.header-backdrop').on('click', function () {
			isMenuClosing = true;

			app.resumeScroll();
			$('.js-menu-toggle').removeClass('is-active');
			$('.p-header__nav').removeClass('is-active');
			$('.p-header').removeClass('menu-active');
			$('.header-backdrop').fadeOut(300, function () {
				$(this).remove();
			});

			setTimeout(() => {
				isMenuClosing = false;
			}, 200);
		});
	});
};

app.stopScroll = function () {
	scrollTop = $(window).scrollTop();
	scrollLeft = $(window).scrollLeft();
	$("html")
		.addClass("noscroll")
		.css("top", -scrollTop + "px");
};

app.resumeScroll = function () {
	$("html").removeClass("noscroll");
	$(window).scrollTop(scrollTop);
	$(window).scrollLeft(scrollLeft);
};

$(document).ready(function () {
	$('.js-pagetop').click(function () {
		$('html, body').animate({ scrollTop: 0 });
		return false;
	});

	app.init();
});

// Run after DOM is ready (safe even if script does not defer)
document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (e) {
		const btn = e.target.closest('.media-btn');
		if (!btn) return; // If you don't click the button, skip it.

		const media = btn.closest('.media');
		if (!media) return;

		const link = media.querySelector('[data-fancybox]');
		if (!link) return;

		// Get src: data-src -> href -> src of <img>
		const src = link.getAttribute('data-src') || link.getAttribute('href') || link.querySelector('img')?.src;
		const caption = link.getAttribute('data-caption') || '';

		// Fancybox v4+
		if (window.Fancybox && typeof Fancybox.show === 'function') {
			Fancybox.show(
				[{
					src,
					type: 'image',
					caption
				}],
				{
					mainClass: 'fancybox__container--custom',
				}
			);
			return;
		}

		// Fallback: Try to click on the link (if there is an href)
		link.click();
	});
});

// $(function () {
// 	const observer = new IntersectionObserver((entries, observer) => {
// 		entries.forEach(entry => {
// 			if (entry.isIntersecting) {
// 				entry.target.classList.add('is-show');
// 				observer.unobserve(entry.target);
// 			}
// 		});
// 	}, {
// 		threshold: 0.3
// 	});

// 	document.querySelectorAll('.js-w-line').forEach(el => observer.observe(el));
// });

function toggleSingleCustomSelectActive(customSelectElement) {
	const select = customSelectElement.querySelector('select');

	if (!select) return; // There is no select in this custom-select

	// Check if value is empty or is the first option placeholder
	const firstOption = select.querySelector('option[value=""]');
	const isEmptyOrPlaceholder = select.value === '' || (firstOption && select.value === firstOption.textContent);

	if (isEmptyOrPlaceholder) {
		customSelectElement.classList.remove('is-active');
	} else {
		customSelectElement.classList.add('is-active');
	}
}

// Main function to handle all custom-selects
function toggleAllCustomSelectActive() {
	const customSelects = document.querySelectorAll('.custom-select');
	customSelects.forEach(customSelect => {
		toggleSingleCustomSelectActive(customSelect);
	});
}

// Run when page loads (including reload and back from confirm)
window.addEventListener('DOMContentLoaded', function () {
	toggleAllCustomSelectActive();

	// Attach event listener to all selects in custom-select
	const customSelects = document.querySelectorAll('.custom-select');
	customSelects.forEach(customSelect => {
		const select = customSelect.querySelector('select');
		if (select) {
			select.addEventListener('change', function () {
				toggleSingleCustomSelectActive(customSelect);
			});
		}
	});
});

// window.addEventListener('load', function() {
//     setTimeout(function() {
// 		document.body.style.opacity = '1';
//         document.body.classList.add('is-loaded');
//     }, 500); // delay 100ms
// });

// Fade page
// Ensure body has an initial class to avoid flashing
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', () => {
	document.body.classList.add('fade-ready');   // enable transition + opacity 0
	// Allow fade-in
	requestAnimationFrame(() => {
		document.body.classList.add('is-loaded');  // opacity 1
	});
});

// Catch every click on <a> and fade out before navigating
document.addEventListener('click', (e) => {
	const a = e.target.closest('a');
	if (!a) return;

	// Skip cases: open in new tab, Ctrl/⌘ click, file download, mailto, hash-only links, external links...
	const sameTab = !a.target || a.target === '_self';
	const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
	const href = a.getAttribute('href') || '';
	if (!sameTab || modified || a.hasAttribute('download') || href.startsWith('mailto:')) return;

	const url = new URL(a.href, location.href);
	const sameOrigin = url.origin === location.origin;
	const hashOnly = url.pathname === location.pathname && url.search === location.search && url.hash;

	if (!sameOrigin || hashOnly) return;

	// Prevent navigation, fade-out, then navigate
	e.preventDefault();
	document.body.classList.remove('is-loaded');
	document.body.classList.add('is-fading-out');

	// Duration must match --fade-duration in CSS (700ms)
	const DURATION = 700;
	setTimeout(() => {
		location.href = a.href;
	}, DURATION);
});

// Handle Back/Forward cache: always reset to correct state
window.addEventListener('pageshow', (evt) => {
	if (evt.persisted) {
		document.body.classList.add('fade-ready', 'is-loaded');
		document.body.classList.remove('is-fading-out');
	}
});