$(document).ready(function () {

  $('.humb').click(function () {
    $('.header_nav').toggleClass('header_nav_open');
    $('.humb').toggleClass('active');
    $('body').toggleClass('no_scroll');
    $('html').toggleClass('no_scroll');

    if ($('.js-nav-curtain').hasClass('curtain-up')) {
      $('.js-nav-curtain').removeClass('curtain-up');
      $('.site-nav__curtain').addClass('curtain-down');
    } else {
      $('.js-nav-curtain').addClass('curtain-up');
      $('.site-nav__curtain').removeClass('curtain-down');
    }

  });

  var banner_slider = new Swiper(".banner_slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 900,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
  });

  var reviews_slider = new Swiper(".reviews_slider", {
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 800,
    navigation: {
      nextEl: ".reviews_slider_wrapper .swiper-button-next",
      prevEl: ".reviews_slider_wrapper .swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 10,
      },
      767: {
        slidesPerView: 2.16,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3.3,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  var slider_nav = new Swiper(".excursion_slider_nav", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3.5,
    freeMode: true,
    watchSlidesProgress: true,
    speed: 700,
    breakpoints: {
      320: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      767: {
        slidesPerView: 4.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3.5,
      }
    },
  });
  var excursion_slider = new Swiper(".excursion_slider", {
    loop: true,
    spaceBetween: 20,
    speed: 700,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: slider_nav,
    },
  });



  $('.modal_open').magnificPopup({
    delegate: 'a',
    removalDelay: 500,
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
    midClick: true,
  });

  //  $("#phone, input[type='tel']").inputmask({
  //    "mask": "+9(999)999-99-99",
  //    "clearIncomplete": true,
  //    showMaskOnFocus: true,
  //    showMaskOnHover: false,
  //  });

  function setPhoneMask(mask, placeholder) {
    $("input[type='tel']").inputmask({
      mask: mask,
      clearIncomplete: true,
      showMaskOnFocus: true,
      showMaskOnHover: false,
      placeholder: "_", // символ-заполнитель в маске
      oncomplete: function () {
        let val = $(this).val().replace(/\D/g, "");
        console.log("Длина номера:", val.length);
      }
    });
    $("input[type='tel']").attr("placeholder", placeholder);
  }

  // При первой загрузке
  setPhoneMask(
    $(".country_select option:selected").data("mask"),
    $(".country_select option:selected").data("placeholder")
  );

  // При смене страны
  $(".country_select").on("change", function () {
    let newMask = $(this).find(":selected").data("mask");
    let newPlaceholder = $(this).find(":selected").data("placeholder");
    $("input[type='tel']").inputmask("remove");
    setPhoneMask(newMask, newPlaceholder);
  });



  $('#accordion').accordion({
    header: '> .accordion_item > .accordion_header',
    active: false,
    collapsible: true,
    heightStyle: "content",

    // дает возможность открыть каждый сблок
    beforeActivate: function (event, ui) {
      if (ui.newHeader[0]) {
        var currHeader = ui.newHeader;
        var currContent = currHeader.next('.ui-accordion-content');
      } else {
        var currHeader = ui.oldHeader;
        var currContent = currHeader.next('.ui-accordion-content');
      }
      var isPanelSelected = currHeader.attr('aria-selected') == 'true';

      currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', ((!isPanelSelected).toString()));

      currHeader.children('.ui-icon').toggleClass('ui-icon-plus', isPanelSelected).toggleClass('ui-icon-minus', !isPanelSelected);

      currContent.toggleClass('accordion-content-active', !isPanelSelected)
      if (isPanelSelected) {
        currContent.slideUp();
      } else {
        currContent.slideDown();
      }

      return false;
    },

    icons: {
      "header": "ui-icon-plus",
      "activeHeader": "ui-icon-minus"
    },

  });

  $("#tabs").tabs();

  function checkSticky() {
    var $block = $('.excursion_wrapper');
    var scrollTop = $(window).scrollTop();
    if ($block.length) {
      var blockOffset = $block.offset().top;
    }

    // Проверяем, достиг ли пользователь блока
    if (scrollTop >= blockOffset) {
      $('body').addClass('body_sticky');
    } else {
      $('body').removeClass('body_sticky');
    }
  }

  // Проверяем положение блока при прокрутке
  $(window).on('scroll', function () {
    checkSticky();
  });

  // Также проверяем положение блока при загрузке страницы
  checkSticky();


  Fancybox.bind("[data-fancybox]", {});
});

document.addEventListener('DOMContentLoaded', () => {
  // Проверка ширины экрана — только если меньше 768px
  if (window.innerWidth < 1200) {
    const trigger = document.getElementById('bannerTrigger');
    const items = Array.from(trigger.children);
    const targetCount = 50;

    const fragment = document.createDocumentFragment();

    while (trigger.children.length + fragment.childElementCount < targetCount) {
      items.forEach(item => {
        const clone = item.cloneNode(true);
        fragment.appendChild(clone);
      });
    }

    trigger.appendChild(fragment);
  }
});
