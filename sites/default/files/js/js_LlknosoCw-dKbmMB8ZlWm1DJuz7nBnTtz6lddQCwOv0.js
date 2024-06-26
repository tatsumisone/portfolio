"use strict";
! function (t) {
  var i, n;
  return i = function () {
    function i(i, n) {
      var o;
      this.options = n, this.element = t(i), this.didInit = !1, o = this, this.element.on("click.slickLightbox", this.options.itemSelector, function (i) {
        return i.preventDefault(), o.init(o.element.find(o.options.itemSelector).index(t(this)))
      })
    }
    return i.prototype.init = function (t) {
      return this.didInit = !0, this.detectIE(), this.createModal(t), this.bindEvents(), this.initSlick(), this.open()
    }, i.prototype.createModalItems = function (i) {
      var n, o, e;
      return this.options.images ? e = t.map(this.options.images, function (t) {
        return '<div class="slick-lightbox-slick-item"><div class="slick-lightbox-slick-item-inner"><img class="slick-lightbox-slick-img" src="' + t + '" /></div></div>'
      }) : (o = function (t) {
        return function (i) {
          var n, o;
          return n = t.getElementCaption(i), o = t.getElementSrc(i), '<div class="slick-lightbox-slick-item"><div class="slick-lightbox-slick-item-inner"><img class="slick-lightbox-slick-img" src="' + o + '" />' + n + "</div></div>"
        }
      }(this), n = this.element.find(this.options.itemSelector), 0 === i || -1 === i ? e = t.map(n, o) : (e = t.map(n.slice(i), o), t.each(n.slice(0, i), function (t, i) {
        return e.push(o(i))
      }))), e
    }, i.prototype.createModal = function (i) {
      var n, o;
      return o = this.createModalItems(i), n = '<div class="slick-lightbox slick-hide-init' + (this.isIE ? " slick-lightbox-ie" : "") + '" style="background: ' + this.options.background + ';">\n	<div class="slick-lightbox-inner">\n		<div class="slick-lightbox-slick slick-caption-' + this.options.captionPosition + '">' + o.join("") + '</div>\n		<button type="button" class="slick-lightbox-close"></button>\n	<div>\n<div>', this.modalElement = t(n), t("body").append(this.modalElement)
    }, i.prototype.initSlick = function (t) {
      return null != this.options.slick ? "function" == typeof this.options.slick ? this.options.slick(this.modalElement) : this.slick = this.modalElement.find(".slick-lightbox-slick").slick(this.options.slick) : this.slick = this.modalElement.find(".slick-lightbox-slick").slick(), this.modalElement.trigger("init.slickLightbox")
    }, i.prototype.open = function () {
      return "undefined" != typeof history && null !== history && "function" == typeof history.pushState && history.pushState(null, null, ""), this.element.trigger("show.slickLightbox"), setTimeout(function (t) {
        return function () {
          return t.element.trigger("shown.slickLightbox")
        }
      }(this), this.getTransitionDuration()), this.modalElement.removeClass("slick-hide-init")
    }, i.prototype.close = function () {
      return this.element.trigger("hide.slickLightbox"), setTimeout(function (t) {
        return function () {
          return t.element.trigger("hidden.slickLightbox")
        }
      }(this), this.getTransitionDuration()), this.modalElement.addClass("slick-hide"), this.destroy()
    }, i.prototype.bindEvents = function () {
      var i;
      return i = function (t) {
        return function () {
          var i;
          return i = t.modalElement.find(".slick-lightbox-inner").height(), t.modalElement.find(".slick-lightbox-slick-item").height(i), t.modalElement.find(".slick-lightbox-slick-img").css("max-height", Math.round(.95 * i))
        }
      }(this), t(window).on("orientationchange.slickLightbox resize.slickLightbox", i), t(window).on("popstate.slickLightbox", function (t) {
        return function () {
          return t.close()
        }
      }(this)), this.modalElement.on("init.slickLightbox", i), this.modalElement.on("destroy.slickLightbox", function (t) {
        return function () {
          return t.destroy()
        }
      }(this)), this.element.on("destroy.slickLightbox", function (t) {
        return function () {
          return t.destroy(!0)
        }
      }(this)), this.modalElement.on("click.slickLightbox touchstart.slickLightbox", ".slick-lightbox-close", function (t) {
        return function (i) {
          return i.preventDefault(), t.close()
        }
      }(this)), (this.options.closeOnEscape || this.options.navigateByKeyboard) && t(document).on("keydown.slickLightbox", function (t) {
        return function (i) {
          var n;
          return n = i.keyCode ? i.keyCode : i.which, t.options.navigateByKeyboard && (37 === n ? t.slideSlick("left") : 39 === n && t.slideSlick("right")), t.options.closeOnEscape && 27 === n ? t.close() : void 0
        }
      }(this)), this.options.closeOnBackdropClick ? (this.modalElement.on("click.slickLightbox touchstart.slickLightbox", ".slick-lightbox-slick-img", function (t) {
        return function (t) {
          return t.stopPropagation()
        }
      }(this)), this.modalElement.on("click.slickLightbox touchstart.slickLightbox", ".slick-lightbox-slick-item", function (t) {
        return function (i) {
          return i.preventDefault(), t.close()
        }
      }(this))) : void 0
    }, i.prototype.slideSlick = function (t) {
      return "left" === t ? this.slick.slick("slickPrev") : this.slick.slick("slickNext")
    }, i.prototype.detectIE = function () {
      var t;
      return this.isIE = !1, /MSIE (\d+\.\d+);/.test(navigator.userAgent) && (t = new Number(RegExp.$1), 9 > t) ? this.isIE = !0 : void 0
    }, i.prototype.getElementCaption = function (i) {
      var n;
      return this.options.caption ? (n = function () {
        switch (typeof this.options.caption) {
          case "function":
            return this.options.caption(i);
          case "string":
            return t(i).data(this.options.caption)
        }
      }.call(this), '<span class="slick-lightbox-slick-caption">' + n + "</span>") : ""
    }, i.prototype.getElementSrc = function (i) {
      switch (typeof this.options.src) {
        case "function":
          return this.options.src(i);
        case "string":
          return t(i).attr(this.options.src);
        default:
          return i.href
      }
    }, i.prototype.unbindEvents = function () {
      return t(window).off(".slickLightbox"), t(document).off(".slickLightbox"), this.modalElement.off(".slickLightbox")
    }, i.prototype.destroy = function (t) {
      return null == t && (t = !1), this.didInit && (this.unbindEvents(), setTimeout(function (t) {
        return function () {
          return t.modalElement.remove()
        }
      }(this), this.options.destroyTimeout)), t ? (this.element.off(".slickLightbox"), this.element.off(".slickLightbox", this.options.itemSelector)) : void 0
    }, i.prototype.destroyPrevious = function () {
      return t("body").children(".slick-lightbox").trigger("destroy.slickLightbox")
    }, i.prototype.getTransitionDuration = function () {
      var t;
      return this.transitionDuration ? this.transitionDuration : (t = this.modalElement.css("transition-duration"), "undefined" == typeof t ? this.transitionDuration = 500 : this.transitionDuration = t.indexOf("ms") > -1 ? parseFloat(t) : 1e3 * parseFloat(t))
    }, i
  }(), n = {
    background: "rgba(0,0,0,.8)",
    closeOnEscape: !0,
    closeOnBackdropClick: !0,
    destroyTimeout: 500,
    itemSelector: "a",
    navigateByKeyboard: !0,
    src: !1,
    caption: !1,
    captionPosition: "dynamic",
    images: !1,
    slick: {}
  }, t.fn.slickLightbox = function (o) {
    return o = t.extend({}, n, o), new i(this, o), this
  }, t.fn.unslickLightbox = function () {
    return t(this).trigger("destroy.slickLightbox")
  }
}(jQuery);

! function (t) {
  Drupal.behaviors.OB = {
    attach: function (e, i) {
      function s() {
        var e = t(window).height(),
          i = (e - t(".field--name-field-video .field__item").height()) / 2;
        t(".field--name-field-video .field__item").css({
          "margin-top": i + "px"
        });
        t(".field--name-field-img-vs-text").height(), t(".field--name-field-img-vs-text .field--name-field-text").height()
      }
      t("body").hasClass("path-frontpage") && t.each(t("article"), function () {
        var e = 0 + 200 * Math.random();
        t(this).css({
          "margin-left": e + "px"
        }), t(this).find(".field--name-field-project-images").css({
          top: 100 * Math.random() - 100,
          left: 60 * Math.random() + "%"
        })
      }), t(".videobtn").click(function () {
        !0 === t("body").hasClass("watchingvids") ? t("body").removeClass("watchingvids") : (t("body").addClass("watchingvids"), s())
      }), t(window).resize(function () {
        !0 === t("body").hasClass("watchingpics") && s()
      }), t(".field--name-field-video .field__item").fitVids(), t(".page-node-type-project .field--name-field-project-images, .page-node-type-project .field--name-field-images").slick({
        useTransform: !0,
        cssEase: "cubic-bezier(1.000, 0.150, 0.225, 0.940)",
        speed: 500,
        arrows: !1
      }), t(".page-node-type-project .field--name-field-project-images, .page-node-type-project .field--name-field-images").slickLightbox({
        src: "src",
        itemSelector: ".field__item img",
        background: "rgba(255,255,255,1)",
        caption: function (e) {
          return e.title
        },
        slick: {
          useTransform: !0,
          cssEase: "cubic-bezier(1.000, 0.150, 0.225, 0.940)",
          speed: 500
        }
      }), t(".page-node-type-project .field--name-field-project-images").click(function () {
        t(".page-node-type-project .field--name-field-project-images").slick("setPosition")
      }), t(".page-node-type-project .field--name-field-img-vs-text").slick({
        useTransform: !0,
        cssEase: "cubic-bezier(1.000, 0.150, 0.225, 0.940)",
        speed: 500,
        itemSelector: ".field"
      }), t(".page-node-type-project .field--name-field-img-vs-text").click(function () {
        t("body").addClass("watchingpics"), t(".page-node-type-project .field--name-field-img-vs-text").slick("setPosition"), s()
      }), t(".close").click(function (e) {
        !0 !== t("body").hasClass("watchingpics") && !0 !== t("body").hasClass("watchingvids") || (e.preventDefault(), t("body").removeClass("watchingvids watchingpics"), t(".field--name-field-img-vs-text").css({
          "margin-top": "50px"
        }), t(".page-node-type-project .field--name-field-img-vs-text").slick("slickGoTo", 0))
      }), t(".close").mouseover(function (e) {
        !0 === t("body").hasClass("watchingvids") ? t(".gohome").text("close video") : !0 === t("body").hasClass("watchingpics") ? t(".gohome").text("close pics") : t(".gohome").text("go home")
      }), t(".field--name-field-grid-images").slickLightbox({
        itemSelector: ".field__item > a",
        slick: {
          useTransform: !0,
          cssEase: "cubic-bezier(1.000, 0.150, 0.225, 0.940)",
          speed: 500,
          lazyLoad: "ondemand"
        },
        background: "rgba(255,255,255,1)"
      }), t(".slick-slide img").mouseover(function (e) {
        t(".cte").show()
      }).mouseout(function () {
        t(".cte").hide()
      })
    }
  }
}(jQuery);;
