(() => {
  // <stdin>
  /*! Wowchemy v5.1.0 | https://wowchemy.com/ */
  /*! Copyright 2016-present George Cushen (https://georgecushen.com/) */
  /*! License: https://github.com/wowchemy/wowchemy-hugo-modules/blob/main/LICENSE.md */
  (() => {
    /*! medium-zoom 1.0.6 | MIT License | https://github.com/francoischalifour/medium-zoom */
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var isSupported = function isSupported2(node) {
      return node.tagName === "IMG";
    };
    var isNodeList = function isNodeList2(selector) {
      return NodeList.prototype.isPrototypeOf(selector);
    };
    var isNode = function isNode2(selector) {
      return selector && selector.nodeType === 1;
    };
    var isSvg = function isSvg2(image) {
      var source = image.currentSrc || image.src;
      return source.substr(-4).toLowerCase() === ".svg";
    };
    var getImagesFromSelector = function getImagesFromSelector2(selector) {
      try {
        if (Array.isArray(selector)) {
          return selector.filter(isSupported);
        }
        if (isNodeList(selector)) {
          return [].slice.call(selector).filter(isSupported);
        }
        if (isNode(selector)) {
          return [selector].filter(isSupported);
        }
        if (typeof selector === "string") {
          return [].slice.call(document.querySelectorAll(selector)).filter(isSupported);
        }
        return [];
      } catch (err) {
        throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
      }
    };
    var createOverlay = function createOverlay2(background) {
      var overlay = document.createElement("div");
      overlay.classList.add("medium-zoom-overlay");
      overlay.style.background = background;
      return overlay;
    };
    var cloneTarget = function cloneTarget2(template) {
      var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height;
      var clone = template.cloneNode();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      clone.removeAttribute("id");
      clone.style.position = "absolute";
      clone.style.top = top + scrollTop + "px";
      clone.style.left = left + scrollLeft + "px";
      clone.style.width = width + "px";
      clone.style.height = height + "px";
      clone.style.transform = "";
      return clone;
    };
    var createCustomEvent = function createCustomEvent2(type, params) {
      var eventParams = _extends({
        bubbles: false,
        cancelable: false,
        detail: void 0
      }, params);
      if (typeof window.CustomEvent === "function") {
        return new CustomEvent(type, eventParams);
      }
      var customEvent = document.createEvent("CustomEvent");
      customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
      return customEvent;
    };
    var mediumZoomEsm = function mediumZoom(selector) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var Promise2 = window.Promise || function Promise3(fn) {
        function noop() {
        }
        fn(noop, noop);
      };
      var _handleClick = function _handleClick2(event) {
        var target = event.target;
        if (target === overlay) {
          close();
          return;
        }
        if (images.indexOf(target) === -1) {
          return;
        }
        toggle({target});
      };
      var _handleScroll = function _handleScroll2() {
        if (isAnimating || !active.original) {
          return;
        }
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset) {
          setTimeout(close, 150);
        }
      };
      var _handleKeyUp = function _handleKeyUp2(event) {
        var key = event.key || event.keyCode;
        if (key === "Escape" || key === "Esc" || key === 27) {
          close();
        }
      };
      var update = function update2() {
        var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var newOptions = options2;
        if (options2.background) {
          overlay.style.background = options2.background;
        }
        if (options2.container && options2.container instanceof Object) {
          newOptions.container = _extends({}, zoomOptions.container, options2.container);
        }
        if (options2.template) {
          var template = isNode(options2.template) ? options2.template : document.querySelector(options2.template);
          newOptions.template = template;
        }
        zoomOptions = _extends({}, zoomOptions, newOptions);
        images.forEach(function(image) {
          image.dispatchEvent(createCustomEvent("medium-zoom:update", {
            detail: {zoom}
          }));
        });
        return zoom;
      };
      var clone = function clone2() {
        var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return mediumZoomEsm(_extends({}, zoomOptions, options2));
      };
      var attach = function attach2() {
        for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
          selectors[_key] = arguments[_key];
        }
        var newImages = selectors.reduce(function(imagesAccumulator, currentSelector) {
          return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
        }, []);
        newImages.filter(function(newImage) {
          return images.indexOf(newImage) === -1;
        }).forEach(function(newImage) {
          images.push(newImage);
          newImage.classList.add("medium-zoom-image");
        });
        eventListeners.forEach(function(_ref) {
          var type = _ref.type, listener = _ref.listener, options2 = _ref.options;
          newImages.forEach(function(image) {
            image.addEventListener(type, listener, options2);
          });
        });
        return zoom;
      };
      var detach = function detach2() {
        for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          selectors[_key2] = arguments[_key2];
        }
        if (active.zoomed) {
          close();
        }
        var imagesToDetach = selectors.length > 0 ? selectors.reduce(function(imagesAccumulator, currentSelector) {
          return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
        }, []) : images;
        imagesToDetach.forEach(function(image) {
          image.classList.remove("medium-zoom-image");
          image.dispatchEvent(createCustomEvent("medium-zoom:detach", {
            detail: {zoom}
          }));
        });
        images = images.filter(function(image) {
          return imagesToDetach.indexOf(image) === -1;
        });
        return zoom;
      };
      var on = function on2(type, listener) {
        var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        images.forEach(function(image) {
          image.addEventListener("medium-zoom:" + type, listener, options2);
        });
        eventListeners.push({type: "medium-zoom:" + type, listener, options: options2});
        return zoom;
      };
      var off = function off2(type, listener) {
        var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        images.forEach(function(image) {
          image.removeEventListener("medium-zoom:" + type, listener, options2);
        });
        eventListeners = eventListeners.filter(function(eventListener) {
          return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
        });
        return zoom;
      };
      var open = function open2() {
        var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref2.target;
        var _animate = function _animate2() {
          var container = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          };
          var viewportWidth = void 0;
          var viewportHeight = void 0;
          if (zoomOptions.container) {
            if (zoomOptions.container instanceof Object) {
              container = _extends({}, container, zoomOptions.container);
              viewportWidth = container.width - container.left - container.right - zoomOptions.margin * 2;
              viewportHeight = container.height - container.top - container.bottom - zoomOptions.margin * 2;
            } else {
              var zoomContainer = isNode(zoomOptions.container) ? zoomOptions.container : document.querySelector(zoomOptions.container);
              var _zoomContainer$getBou = zoomContainer.getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
              container = _extends({}, container, {
                width: _width,
                height: _height,
                left: _left,
                top: _top
              });
            }
          }
          viewportWidth = viewportWidth || container.width - zoomOptions.margin * 2;
          viewportHeight = viewportHeight || container.height - zoomOptions.margin * 2;
          var zoomTarget = active.zoomedHd || active.original;
          var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
          var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;
          var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height;
          var scaleX = Math.min(naturalWidth, viewportWidth) / width;
          var scaleY = Math.min(naturalHeight, viewportHeight) / height;
          var scale = Math.min(scaleX, scaleY);
          var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions.margin + container.left) / scale;
          var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions.margin + container.top) / scale;
          var transform = "scale(" + scale + ") translate3d(" + translateX + "px, " + translateY + "px, 0)";
          active.zoomed.style.transform = transform;
          if (active.zoomedHd) {
            active.zoomedHd.style.transform = transform;
          }
        };
        return new Promise2(function(resolve) {
          if (target && images.indexOf(target) === -1) {
            resolve(zoom);
            return;
          }
          var _handleOpenEnd = function _handleOpenEnd2() {
            isAnimating = false;
            active.zoomed.removeEventListener("transitionend", _handleOpenEnd2);
            active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", {
              detail: {zoom}
            }));
            resolve(zoom);
          };
          if (active.zoomed) {
            resolve(zoom);
            return;
          }
          if (target) {
            active.original = target;
          } else if (images.length > 0) {
            var _images = images;
            active.original = _images[0];
          } else {
            resolve(zoom);
            return;
          }
          active.original.dispatchEvent(createCustomEvent("medium-zoom:open", {
            detail: {zoom}
          }));
          scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          isAnimating = true;
          active.zoomed = cloneTarget(active.original);
          document.body.appendChild(overlay);
          if (zoomOptions.template) {
            var template = isNode(zoomOptions.template) ? zoomOptions.template : document.querySelector(zoomOptions.template);
            active.template = document.createElement("div");
            active.template.appendChild(template.content.cloneNode(true));
            document.body.appendChild(active.template);
          }
          document.body.appendChild(active.zoomed);
          window.requestAnimationFrame(function() {
            document.body.classList.add("medium-zoom--opened");
          });
          active.original.classList.add("medium-zoom-image--hidden");
          active.zoomed.classList.add("medium-zoom-image--opened");
          active.zoomed.addEventListener("click", close);
          active.zoomed.addEventListener("transitionend", _handleOpenEnd);
          if (active.original.getAttribute("data-zoom-src")) {
            active.zoomedHd = active.zoomed.cloneNode();
            active.zoomedHd.removeAttribute("srcset");
            active.zoomedHd.removeAttribute("sizes");
            active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src");
            active.zoomedHd.onerror = function() {
              clearInterval(getZoomTargetSize);
              console.warn("Unable to reach the zoom image target " + active.zoomedHd.src);
              active.zoomedHd = null;
              _animate();
            };
            var getZoomTargetSize = setInterval(function() {
              if (active.zoomedHd.complete) {
                clearInterval(getZoomTargetSize);
                active.zoomedHd.classList.add("medium-zoom-image--opened");
                active.zoomedHd.addEventListener("click", close);
                document.body.appendChild(active.zoomedHd);
                _animate();
              }
            }, 10);
          } else if (active.original.hasAttribute("srcset")) {
            active.zoomedHd = active.zoomed.cloneNode();
            active.zoomedHd.removeAttribute("sizes");
            active.zoomedHd.removeAttribute("loading");
            var loadEventListener = active.zoomedHd.addEventListener("load", function() {
              active.zoomedHd.removeEventListener("load", loadEventListener);
              active.zoomedHd.classList.add("medium-zoom-image--opened");
              active.zoomedHd.addEventListener("click", close);
              document.body.appendChild(active.zoomedHd);
              _animate();
            });
          } else {
            _animate();
          }
        });
      };
      var close = function close2() {
        return new Promise2(function(resolve) {
          if (isAnimating || !active.original) {
            resolve(zoom);
            return;
          }
          var _handleCloseEnd = function _handleCloseEnd2() {
            active.original.classList.remove("medium-zoom-image--hidden");
            document.body.removeChild(active.zoomed);
            if (active.zoomedHd) {
              document.body.removeChild(active.zoomedHd);
            }
            document.body.removeChild(overlay);
            active.zoomed.classList.remove("medium-zoom-image--opened");
            if (active.template) {
              document.body.removeChild(active.template);
            }
            isAnimating = false;
            active.zoomed.removeEventListener("transitionend", _handleCloseEnd2);
            active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", {
              detail: {zoom}
            }));
            active.original = null;
            active.zoomed = null;
            active.zoomedHd = null;
            active.template = null;
            resolve(zoom);
          };
          isAnimating = true;
          document.body.classList.remove("medium-zoom--opened");
          active.zoomed.style.transform = "";
          if (active.zoomedHd) {
            active.zoomedHd.style.transform = "";
          }
          if (active.template) {
            active.template.style.transition = "opacity 150ms";
            active.template.style.opacity = 0;
          }
          active.original.dispatchEvent(createCustomEvent("medium-zoom:close", {
            detail: {zoom}
          }));
          active.zoomed.addEventListener("transitionend", _handleCloseEnd);
        });
      };
      var toggle = function toggle2() {
        var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref3.target;
        if (active.original) {
          return close();
        }
        return open({target});
      };
      var getOptions = function getOptions2() {
        return zoomOptions;
      };
      var getImages = function getImages2() {
        return images;
      };
      var getZoomedImage = function getZoomedImage2() {
        return active.original;
      };
      var images = [];
      var eventListeners = [];
      var isAnimating = false;
      var scrollTop = 0;
      var zoomOptions = options;
      var active = {
        original: null,
        zoomed: null,
        zoomedHd: null,
        template: null
      };
      if (Object.prototype.toString.call(selector) === "[object Object]") {
        zoomOptions = selector;
      } else if (selector || typeof selector === "string") {
        attach(selector);
      }
      zoomOptions = _extends({
        margin: 0,
        background: "#fff",
        scrollOffset: 40,
        container: null,
        template: null
      }, zoomOptions);
      var overlay = createOverlay(zoomOptions.background);
      document.addEventListener("click", _handleClick);
      document.addEventListener("keyup", _handleKeyUp);
      document.addEventListener("scroll", _handleScroll);
      window.addEventListener("resize", close);
      var zoom = {
        open,
        close,
        toggle,
        update,
        clone,
        attach,
        detach,
        on,
        off,
        getOptions,
        getImages,
        getZoomedImage
      };
      return zoom;
    };
    function styleInject(css2, ref) {
      if (ref === void 0)
        ref = {};
      var insertAt = ref.insertAt;
      if (!css2 || typeof document === "undefined") {
        return;
      }
      var head = document.head || document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      style.type = "text/css";
      if (insertAt === "top") {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }
      if (style.styleSheet) {
        style.styleSheet.cssText = css2;
      } else {
        style.appendChild(document.createTextNode(css2));
      }
    }
    var css = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
    styleInject(css);
    var medium_zoom_esm_default = mediumZoomEsm;
    var codeHighlighting = true;
    var hugoEnvironment = "development";
    var searchEnabled = true;
    function fixMermaid(render = false) {
      let mermaids = [];
      [].push.apply(mermaids, document.getElementsByClassName("language-mermaid"));
      for (let i = 0; i < mermaids.length; i++) {
        let mermaidCodeElement = mermaids[i];
        let newElement = document.createElement("div");
        newElement.innerHTML = mermaidCodeElement.innerHTML;
        newElement.classList.add("mermaid");
        if (render) {
          window.mermaid.mermaidAPI.render(`mermaid-${i}`, newElement.textContent, function(svgCode) {
            newElement.innerHTML = svgCode;
          });
        }
        mermaidCodeElement.parentNode.replaceWith(newElement);
      }
      console.debug(`Processed ${mermaids.length} Mermaid code blocks`);
    }
    function scrollParentToChild(parent, child) {
      const parentRect = parent.getBoundingClientRect();
      const parentViewableArea = {
        height: parent.clientHeight,
        width: parent.clientWidth
      };
      const childRect = child.getBoundingClientRect();
      const isChildInView = childRect.top >= parentRect.top && childRect.bottom <= parentRect.top + parentViewableArea.height;
      if (!isChildInView) {
        parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
      }
    }
    function fadeIn(element, duration = 600) {
      element.style.display = "";
      element.style.opacity = "0";
      let last = +new Date();
      let tick = function() {
        element.style.opacity = (+element.style.opacity + (new Date() - last) / duration).toString();
        last = +new Date();
        if (+element.style.opacity < 1) {
          window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
        }
      };
      tick();
    }
    var body = document.body;
    function getThemeMode() {
      return parseInt(localStorage.getItem("wcTheme") || 2);
    }
    function canChangeTheme() {
      return Boolean(window.wc.darkLightEnabled);
    }
    function initThemeVariation() {
      if (!canChangeTheme()) {
        console.debug("User theming disabled.");
        return {
          isDarkTheme: window.wc.isSiteThemeDark,
          themeMode: window.wc.isSiteThemeDark ? 1 : 0
        };
      }
      console.debug("User theming enabled.");
      let isDarkTheme;
      let currentThemeMode = getThemeMode();
      console.debug(`User's theme variation: ${currentThemeMode}`);
      switch (currentThemeMode) {
        case 0:
          isDarkTheme = false;
          break;
        case 1:
          isDarkTheme = true;
          break;
        default:
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            isDarkTheme = true;
          } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            isDarkTheme = false;
          } else {
            isDarkTheme = window.wc.isSiteThemeDark;
          }
          break;
      }
      if (isDarkTheme && !body.classList.contains("dark")) {
        console.debug("Applying Wowchemy dark theme");
        document.body.classList.add("dark");
      } else if (!isDarkTheme && body.classList.contains("dark")) {
        console.debug("Applying Wowchemy light theme");
        document.body.classList.remove("dark");
      }
      return {
        isDarkTheme,
        themeMode: currentThemeMode
      };
    }
    function changeThemeModeClick(newMode) {
      if (!canChangeTheme()) {
        console.debug("Cannot change theme - user theming disabled.");
        return;
      }
      let isDarkTheme;
      switch (newMode) {
        case 0:
          localStorage.setItem("wcTheme", "0");
          isDarkTheme = false;
          console.debug("User changed theme variation to Light.");
          break;
        case 1:
          localStorage.setItem("wcTheme", "1");
          isDarkTheme = true;
          console.debug("User changed theme variation to Dark.");
          break;
        default:
          localStorage.setItem("wcTheme", "2");
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            isDarkTheme = true;
          } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            isDarkTheme = false;
          } else {
            isDarkTheme = window.wc.isSiteThemeDark;
          }
          console.debug("User changed theme variation to Auto.");
          break;
      }
      renderThemeVariation(isDarkTheme, newMode);
    }
    function showActiveTheme(mode) {
      let linkLight2 = document.querySelector(".js-set-theme-light");
      let linkDark2 = document.querySelector(".js-set-theme-dark");
      let linkAuto2 = document.querySelector(".js-set-theme-auto");
      if (linkLight2 === null) {
        return;
      }
      switch (mode) {
        case 0:
          linkLight2.classList.add("dropdown-item-active");
          linkDark2.classList.remove("dropdown-item-active");
          linkAuto2.classList.remove("dropdown-item-active");
          break;
        case 1:
          linkLight2.classList.remove("dropdown-item-active");
          linkDark2.classList.add("dropdown-item-active");
          linkAuto2.classList.remove("dropdown-item-active");
          break;
        default:
          linkLight2.classList.remove("dropdown-item-active");
          linkDark2.classList.remove("dropdown-item-active");
          linkAuto2.classList.add("dropdown-item-active");
          break;
      }
    }
    function renderThemeVariation(isDarkTheme, themeMode = 2, init = false) {
      const codeHlLight = document.querySelector("link[title=hl-light]");
      const codeHlDark = document.querySelector("link[title=hl-dark]");
      const codeHlEnabled = codeHlLight !== null || codeHlDark !== null;
      const diagramEnabled = document.querySelector("script[title=mermaid]") !== null;
      showActiveTheme(themeMode);
      const themeChangeEvent = new CustomEvent("wcThemeChange", {detail: {isDarkTheme: () => isDarkTheme}});
      document.dispatchEvent(themeChangeEvent);
      if (!init) {
        if (isDarkTheme === false && !body.classList.contains("dark") || isDarkTheme === true && body.classList.contains("dark")) {
          return;
        }
      }
      if (isDarkTheme === false) {
        if (!init) {
          Object.assign(document.body.style, {opacity: 0, visibility: "visible"});
          fadeIn(document.body, 600);
        }
        body.classList.remove("dark");
        if (codeHlEnabled) {
          console.debug("Setting HLJS theme to light");
          if (codeHlLight) {
            codeHlLight.disabled = false;
          }
          if (codeHlDark) {
            codeHlDark.disabled = true;
          }
        }
        if (diagramEnabled) {
          console.debug("Initializing Mermaid with light theme");
          if (init) {
            window.mermaid.initialize({startOnLoad: false, theme: "default", securityLevel: "loose"});
            fixMermaid(true);
          } else {
            location.reload();
          }
        }
      } else if (isDarkTheme === true) {
        if (!init) {
          Object.assign(document.body.style, {opacity: 0, visibility: "visible"});
          fadeIn(document.body, 600);
        }
        body.classList.add("dark");
        if (codeHlEnabled) {
          console.debug("Setting HLJS theme to dark");
          if (codeHlLight) {
            codeHlLight.disabled = true;
          }
          if (codeHlDark) {
            codeHlDark.disabled = false;
          }
        }
        if (diagramEnabled) {
          console.debug("Initializing Mermaid with dark theme");
          if (init) {
            window.mermaid.initialize({startOnLoad: false, theme: "dark", securityLevel: "loose"});
            fixMermaid(true);
          } else {
            location.reload();
          }
        }
      }
    }
    function onMediaQueryListEvent(event) {
      if (!canChangeTheme()) {
        return;
      }
      const darkModeOn = event.matches;
      console.debug(`OS dark mode preference changed to ${darkModeOn ? "\u{1F312} on" : "\u2600\uFE0F off"}.`);
      let currentThemeVariation = getThemeMode();
      let isDarkTheme;
      if (currentThemeVariation === 2) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          isDarkTheme = true;
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          isDarkTheme = false;
        } else {
          isDarkTheme = window.wc.isSiteThemeDark;
        }
        renderThemeVariation(isDarkTheme, currentThemeVariation);
      }
    }
    console.debug(`Environment: ${hugoEnvironment}`);
    function getNavBarHeight() {
      let $navbar = $("#navbar-main");
      let navbar_offset = $navbar.outerHeight();
      console.debug("Navbar height: " + navbar_offset);
      return navbar_offset;
    }
    function scrollToAnchor(target, duration = 0) {
      target = typeof target === "undefined" || typeof target === "object" ? decodeURIComponent(window.location.hash) : target;
      if ($(target).length) {
        target = "#" + $.escapeSelector(target.substring(1));
        let elementOffset = Math.ceil($(target).offset().top - getNavBarHeight());
        $("body").addClass("scrolling");
        $("html, body").animate({
          scrollTop: elementOffset
        }, duration, function() {
          $("body").removeClass("scrolling");
        });
      } else {
        console.debug("Cannot scroll to target `#" + target + "`. ID not found!");
      }
    }
    function fixScrollspy() {
      let $body = $("body");
      let data = $body.data("bs.scrollspy");
      if (data) {
        data._config.offset = getNavBarHeight();
        $body.data("bs.scrollspy", data);
        $body.scrollspy("refresh");
      }
    }
    function removeQueryParamsFromUrl() {
      if (window.history.replaceState) {
        let urlWithoutSearchParams = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
        window.history.replaceState({path: urlWithoutSearchParams}, "", urlWithoutSearchParams);
      }
    }
    window.addEventListener("hashchange", scrollToAnchor);
    $("#navbar-main li.nav-item a.nav-link, .js-scroll").on("click", function(event) {
      let hash = this.hash;
      if (this.pathname === window.location.pathname && hash && $(hash).length && $(".js-widget-page").length > 0) {
        event.preventDefault();
        let elementOffset = Math.ceil($(hash).offset().top - getNavBarHeight());
        $("html, body").animate({
          scrollTop: elementOffset
        }, 800);
      }
    });
    $(document).on("click", ".navbar-collapse.show", function(e) {
      let targetElement = $(e.target).is("a") ? $(e.target) : $(e.target).parent();
      if (targetElement.is("a") && targetElement.attr("class") != "dropdown-toggle") {
        $(this).collapse("hide");
      }
    });
    var pubFilters = {};
    var searchRegex;
    var filterValues;
    var $grid_pubs = $("#container-publications");
    if ($grid_pubs.length) {
      $grid_pubs.isotope({
        itemSelector: ".isotope-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-sizer"
        },
        filter: function() {
          let $this = $(this);
          let searchResults = searchRegex ? $this.text().match(searchRegex) : true;
          let filterResults = filterValues ? $this.is(filterValues) : true;
          return searchResults && filterResults;
        }
      });
      let $quickSearch = $(".filter-search").keyup(debounce(function() {
        searchRegex = new RegExp($quickSearch.val(), "gi");
        $grid_pubs.isotope();
      }));
      $(".pub-filters").on("change", function() {
        let $this = $(this);
        let filterGroup = $this[0].getAttribute("data-filter-group");
        pubFilters[filterGroup] = this.value;
        filterValues = concatValues(pubFilters);
        $grid_pubs.isotope();
        if (filterGroup === "pubtype") {
          let url = $(this).val();
          if (url.substr(0, 9) === ".pubtype-") {
            window.location.hash = url.substr(9);
          } else {
            window.location.hash = "";
          }
        }
      });
    }
    function debounce(fn, threshold) {
      let timeout;
      threshold = threshold || 100;
      return function debounced() {
        clearTimeout(timeout);
        let args = arguments;
        let _this = this;
        function delayed() {
          fn.apply(_this, args);
        }
        timeout = setTimeout(delayed, threshold);
      };
    }
    function concatValues(obj) {
      let value = "";
      for (let prop in obj) {
        value += obj[prop];
      }
      return value;
    }
    function filter_publications() {
      if (!$grid_pubs.length)
        return;
      let urlHash = window.location.hash.replace("#", "");
      let filterValue = "*";
      if (urlHash != "" && !isNaN(urlHash)) {
        filterValue = ".pubtype-" + urlHash;
      }
      let filterGroup = "pubtype";
      pubFilters[filterGroup] = filterValue;
      filterValues = concatValues(pubFilters);
      $grid_pubs.isotope();
      $(".pubtype-select").val(filterValue);
    }
    function initMap() {
      if ($("#map").length) {
        let map_provider = $("#map-provider").val();
        let lat = $("#map-lat").val();
        let lng = $("#map-lng").val();
        let zoom = parseInt($("#map-zoom").val());
        let address = $("#map-dir").val();
        let api_key = $("#map-api-key").val();
        if (map_provider === "google") {
          let map = new GMaps({
            div: "#map",
            lat,
            lng,
            zoom,
            zoomControl: true,
            zoomControlOpt: {
              style: "SMALL",
              position: "TOP_LEFT"
            },
            streetViewControl: false,
            mapTypeControl: false,
            gestureHandling: "cooperative"
          });
          map.addMarker({
            lat,
            lng,
            click: function() {
              let url = "https://www.google.com/maps/place/" + encodeURIComponent(address) + "/@" + lat + "," + lng + "/";
              window.open(url, "_blank");
            },
            title: address
          });
        } else {
          let map = new L.map("map").setView([lat, lng], zoom);
          if (map_provider === "mapbox" && api_key.length) {
            L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery \xA9 <a href="http://mapbox.com">Mapbox</a>',
              tileSize: 512,
              maxZoom: 18,
              zoomOffset: -1,
              id: "mapbox/streets-v11",
              accessToken: api_key
            }).addTo(map);
          } else {
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              maxZoom: 19,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
          }
          let marker = L.marker([lat, lng]).addTo(map);
          let url = lat + "," + lng + "#map=" + zoom + "/" + lat + "/" + lng + "&layers=N";
          marker.bindPopup(address + '<p><a href="https://www.openstreetmap.org/directions?engine=osrm_car&route=' + url + '">Routing via OpenStreetMap</a></p>');
        }
      }
    }
    function printLatestRelease(selector, repo) {
      if (hugoEnvironment === "production") {
        $.getJSON("https://api.github.com/repos/" + repo + "/tags").done(function(json) {
          let release = json[0];
          $(selector).append(" " + release.name);
        }).fail(function(jqxhr, textStatus, error) {
          let err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
        });
      }
    }
    function toggleSearchDialog() {
      if ($("body").hasClass("searching")) {
        $("[id=search-query]").blur();
        $("body").removeClass("searching compensate-for-scrollbar");
        removeQueryParamsFromUrl();
        $("#fancybox-style-noscroll").remove();
      } else {
        if (!$("#fancybox-style-noscroll").length && document.body.scrollHeight > window.innerHeight) {
          $("head").append('<style id="fancybox-style-noscroll">.compensate-for-scrollbar{margin-right:' + (window.innerWidth - document.documentElement.clientWidth) + "px;}</style>");
          $("body").addClass("compensate-for-scrollbar");
        }
        $("body").addClass("searching");
        $(".search-results").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 200);
        $("#search-query").focus();
      }
    }
    function normalizeCarouselSlideHeights() {
      $(".carousel").each(function() {
        let items = $(".carousel-item", this);
        items.css("min-height", 0);
        let maxHeight = Math.max.apply(null, items.map(function() {
          return $(this).outerHeight();
        }).get());
        items.css("min-height", maxHeight + "px");
      });
    }
    function fixHugoOutput() {
      $("#TableOfContents").addClass("nav flex-column");
      $("#TableOfContents li").addClass("nav-item");
      $("#TableOfContents li a").addClass("nav-link");
      $("input[type='checkbox'][disabled]").parents("ul").addClass("task-list");
    }
    function getSiblings(elem) {
      return Array.prototype.filter.call(elem.parentNode.children, function(sibling) {
        return sibling !== elem;
      });
    }
    $(document).ready(function() {
      fixHugoOutput();
      let {isDarkTheme, themeMode} = initThemeVariation();
      renderThemeVariation(isDarkTheme, themeMode, true);
      if (codeHighlighting) {
        hljs.initHighlighting();
      }
      let child = document.querySelector(".docs-links .active");
      let parent = document.querySelector(".docs-links");
      if (child && parent) {
        scrollParentToChild(parent, child);
      }
    });
    $(window).on("load", function() {
      fixScrollspy();
      let isotopeInstances = document.querySelectorAll(".projects-container");
      let isotopeInstancesCount = isotopeInstances.length;
      if (window.location.hash && isotopeInstancesCount === 0) {
        scrollToAnchor(decodeURIComponent(window.location.hash), 0);
      }
      let child = document.querySelector(".docs-toc .nav-link.active");
      let parent = document.querySelector(".docs-toc");
      if (child && parent) {
        scrollParentToChild(parent, child);
      }
      let zoomOptions = {};
      if (document.body.classList.contains("dark")) {
        zoomOptions.background = "rgba(0,0,0,0.9)";
      } else {
        zoomOptions.background = "rgba(255,255,255,0.9)";
      }
      medium_zoom_esm_default("[data-zoomable]", zoomOptions);
      let isotopeCounter = 0;
      isotopeInstances.forEach(function(isotopeInstance, index) {
        console.debug(`Loading Isotope instance ${index}`);
        let iso;
        let isoSection = isotopeInstance.closest("section");
        let layout = "";
        if (isoSection.querySelector(".isotope").classList.contains("js-layout-row")) {
          layout = "fitRows";
        } else {
          layout = "masonry";
        }
        let defaultFilter = isoSection.querySelector(".default-project-filter");
        let filterText = "*";
        if (defaultFilter !== null) {
          filterText = defaultFilter.textContent;
        }
        console.debug(`Default Isotope filter: ${filterText}`);
        imagesLoaded(isotopeInstance, function() {
          iso = new Isotope(isotopeInstance, {
            itemSelector: ".isotope-item",
            layoutMode: layout,
            masonry: {
              gutter: 20
            },
            filter: filterText
          });
          let isoFilterButtons = isoSection.querySelectorAll(".project-filters a");
          isoFilterButtons.forEach((button) => button.addEventListener("click", (e) => {
            e.preventDefault();
            let selector = button.getAttribute("data-filter");
            console.debug(`Updating Isotope filter to ${selector}`);
            iso.arrange({filter: selector});
            button.classList.remove("active");
            button.classList.add("active");
            let buttonSiblings = getSiblings(button);
            buttonSiblings.forEach((buttonSibling) => {
              buttonSibling.classList.remove("active");
              buttonSibling.classList.remove("all");
            });
          }));
          incrementIsotopeCounter();
        });
      });
      function incrementIsotopeCounter() {
        isotopeCounter++;
        if (isotopeCounter === isotopeInstancesCount) {
          console.debug(`All Portfolio Isotope instances loaded.`);
          if (window.location.hash) {
            scrollToAnchor(decodeURIComponent(window.location.hash), 0);
          }
        }
      }
      if ($(".pub-filters-select")) {
        filter_publications();
      }
      $(".js-cite-modal").click(function(e) {
        e.preventDefault();
        let filename = $(this).attr("data-filename");
        let modal = $("#modal");
        modal.find(".modal-body code").load(filename, function(response, status, xhr) {
          if (status == "error") {
            let msg = "Error: ";
            $("#modal-error").html(msg + xhr.status + " " + xhr.statusText);
          } else {
            $(".js-download-cite").attr("href", filename);
          }
        });
        modal.modal("show");
      });
      $(".js-copy-cite").click(function(e) {
        e.preventDefault();
        let range = document.createRange();
        let code_node = document.querySelector("#modal .modal-body");
        range.selectNode(code_node);
        window.getSelection().addRange(range);
        try {
          document.execCommand("copy");
        } catch (e2) {
          console.log("Error: citation copy failed.");
        }
        window.getSelection().removeRange(range);
      });
      initMap();
      let githubReleaseSelector = ".js-github-release";
      if ($(githubReleaseSelector).length > 0) {
        printLatestRelease(githubReleaseSelector, $(githubReleaseSelector).data("repo"));
      }
      document.addEventListener("keyup", (event) => {
        if (event.code === "Escape") {
          const body2 = document.body;
          if (body2.classList.contains("searching")) {
            toggleSearchDialog();
          }
        }
        if (event.key === "/") {
          let focusedElement = document.hasFocus() && document.activeElement !== document.body && document.activeElement !== document.documentElement && document.activeElement || null;
          let isInputFocused = focusedElement instanceof HTMLInputElement || focusedElement instanceof HTMLTextAreaElement;
          if (searchEnabled && !isInputFocused) {
            event.preventDefault();
            toggleSearchDialog();
          }
        }
      });
      if (searchEnabled) {
        $(".js-search").click(function(e) {
          e.preventDefault();
          toggleSearchDialog();
        });
      }
      $('[data-toggle="tooltip"]').tooltip();
    });
    var linkLight = document.querySelector(".js-set-theme-light");
    var linkDark = document.querySelector(".js-set-theme-dark");
    var linkAuto = document.querySelector(".js-set-theme-auto");
    if (linkLight && linkDark && linkAuto) {
      linkLight.addEventListener("click", (event) => {
        event.preventDefault();
        changeThemeModeClick(0);
      });
      linkDark.addEventListener("click", (event) => {
        event.preventDefault();
        changeThemeModeClick(1);
      });
      linkAuto.addEventListener("click", (event) => {
        event.preventDefault();
        changeThemeModeClick(2);
      });
    }
    var darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeMediaQuery.addEventListener("change", (event) => {
      onMediaQueryListEvent(event);
    });
    window.addEventListener("load", normalizeCarouselSlideHeights);
    window.addEventListener("resize", normalizeCarouselSlideHeights);
    window.addEventListener("orientationchange", normalizeCarouselSlideHeights);
    $("body").on("mouseenter mouseleave", ".dropdown", function(e) {
      var dropdown = $(e.target).closest(".dropdown");
      var menu = $(".dropdown-menu", dropdown);
      dropdown.addClass("show");
      menu.addClass("show");
      setTimeout(function() {
        dropdown[dropdown.is(":hover") ? "addClass" : "removeClass"]("show");
        menu[dropdown.is(":hover") ? "addClass" : "removeClass"]("show");
      }, 300);
    });
    var resizeTimer;
    $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fixScrollspy, 200);
    });
  })();
  (() => {
    var content_type = {authors: "Authors", event: "Events", post: "Posts", project: "Projects", publication: "Publications", slides: "Slides"};
    var i18n = {no_results: "No results found", placeholder: "Search...", results: "results found"};
    var search_config = {indexURI: "/index.json", minLength: 1, threshold: 0.3};
    var fuseOptions = {
      shouldSort: true,
      includeMatches: true,
      tokenize: true,
      threshold: search_config.threshold,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: search_config.minLength,
      keys: [
        {name: "title", weight: 0.99},
        {name: "summary", weight: 0.6},
        {name: "authors", weight: 0.5},
        {name: "content", weight: 0.2},
        {name: "tags", weight: 0.5},
        {name: "categories", weight: 0.5}
      ]
    };
    var summaryLength = 60;
    function getSearchQuery(name) {
      return decodeURIComponent((location.search.split(name + "=")[1] || "").split("&")[0]).replace(/\+/g, " ");
    }
    function updateURL(url) {
      if (history.replaceState) {
        window.history.replaceState({path: url}, "", url);
      }
    }
    function initSearch(force, fuse) {
      let query = $("#search-query").val();
      if (query.length < 1) {
        $("#search-hits").empty();
        $("#search-common-queries").show();
      }
      if (!force && query.length < fuseOptions.minMatchCharLength)
        return;
      $("#search-hits").empty();
      $("#search-common-queries").hide();
      searchAcademic(query, fuse);
      let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + "?q=" + encodeURIComponent(query) + window.location.hash;
      updateURL(newURL);
    }
    function searchAcademic(query, fuse) {
      let results = fuse.search(query);
      if (results.length > 0) {
        $("#search-hits").append('<h3 class="mt-0">' + results.length + " " + i18n.results + "</h3>");
        parseResults(query, results);
      } else {
        $("#search-hits").append('<div class="search-no-results">' + i18n.no_results + "</div>");
      }
    }
    function parseResults(query, results) {
      $.each(results, function(key, value) {
        let content_key = value.item.section;
        let content = "";
        let snippet = "";
        let snippetHighlights = [];
        if (["publication", "event"].includes(content_key)) {
          content = value.item.summary;
        } else {
          content = value.item.content;
        }
        if (fuseOptions.tokenize) {
          snippetHighlights.push(query);
        } else {
          $.each(value.matches, function(matchKey, matchValue) {
            if (matchValue.key == "content") {
              let start = matchValue.indices[0][0] - summaryLength > 0 ? matchValue.indices[0][0] - summaryLength : 0;
              let end = matchValue.indices[0][1] + summaryLength < content.length ? matchValue.indices[0][1] + summaryLength : content.length;
              snippet += content.substring(start, end);
              snippetHighlights.push(matchValue.value.substring(matchValue.indices[0][0], matchValue.indices[0][1] - matchValue.indices[0][0] + 1));
            }
          });
        }
        if (snippet.length < 1) {
          snippet += value.item.summary;
        }
        let template = $("#search-hit-fuse-template").html();
        if (content_key in content_type) {
          content_key = content_type[content_key];
        }
        let templateData = {
          key,
          title: value.item.title,
          type: content_key,
          relpermalink: value.item.relpermalink,
          snippet
        };
        let output = render(template, templateData);
        $("#search-hits").append(output);
        $.each(snippetHighlights, function(hlKey, hlValue) {
          $("#summary-" + key).mark(hlValue);
        });
      });
    }
    function render(template, data) {
      let key, find, re;
      for (key in data) {
        find = "\\{\\{\\s*" + key + "\\s*\\}\\}";
        re = new RegExp(find, "g");
        template = template.replace(re, data[key]);
      }
      return template;
    }
    if (typeof Fuse === "function") {
      $.getJSON(search_config.indexURI, function(search_index) {
        let fuse = new Fuse(search_index, fuseOptions);
        let query = getSearchQuery("q");
        if (query) {
          $("body").addClass("searching");
          $(".search-results").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 200);
          $("#search-query").val(query);
          $("#search-query").focus();
          initSearch(true, fuse);
        }
        $("#search-query").keyup(function(e) {
          clearTimeout($.data(this, "searchTimer"));
          if (e.keyCode == 13) {
            initSearch(true, fuse);
          } else {
            $(this).data("searchTimer", setTimeout(function() {
              initSearch(false, fuse);
            }, 250));
          }
        });
      });
    }
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyohIFdvd2NoZW15IHY1LjEuMCB8IGh0dHBzOi8vd293Y2hlbXkuY29tLyAqL1xuLyohIENvcHlyaWdodCAyMDE2LXByZXNlbnQgR2VvcmdlIEN1c2hlbiAoaHR0cHM6Ly9nZW9yZ2VjdXNoZW4uY29tLykgKi9cbi8qISBMaWNlbnNlOiBodHRwczovL2dpdGh1Yi5jb20vd293Y2hlbXkvd293Y2hlbXktaHVnby1tb2R1bGVzL2Jsb2IvbWFpbi9MSUNFTlNFLm1kICovXG5cbjtcbigoKSA9PiB7XG4gIC8vIG5zLWh1Z286L3RtcC9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL3dvd2NoZW15L3dvd2NoZW15LWh1Z28tbW9kdWxlcy93b3djaGVteUB2MC4wLjAtMjAyMTAzMjQxOTQyMDAtZmRhOWYzOWQ4NzJlL2Fzc2V0cy9qcy9fdmVuZG9yL21lZGl1bS16b29tLmVzbS5qc1xuICAvKiEgbWVkaXVtLXpvb20gMS4wLjYgfCBNSVQgTGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmFuY29pc2NoYWxpZm91ci9tZWRpdW0tem9vbSAqL1xuICB2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgdmFyIGlzU3VwcG9ydGVkID0gZnVuY3Rpb24gaXNTdXBwb3J0ZWQyKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50YWdOYW1lID09PSBcIklNR1wiO1xuICB9O1xuICB2YXIgaXNOb2RlTGlzdCA9IGZ1bmN0aW9uIGlzTm9kZUxpc3QyKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIE5vZGVMaXN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHNlbGVjdG9yKTtcbiAgfTtcbiAgdmFyIGlzTm9kZSA9IGZ1bmN0aW9uIGlzTm9kZTIoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gc2VsZWN0b3IgJiYgc2VsZWN0b3Iubm9kZVR5cGUgPT09IDE7XG4gIH07XG4gIHZhciBpc1N2ZyA9IGZ1bmN0aW9uIGlzU3ZnMihpbWFnZSkge1xuICAgIHZhciBzb3VyY2UgPSBpbWFnZS5jdXJyZW50U3JjIHx8IGltYWdlLnNyYztcbiAgICByZXR1cm4gc291cmNlLnN1YnN0cigtNCkudG9Mb3dlckNhc2UoKSA9PT0gXCIuc3ZnXCI7XG4gIH07XG4gIHZhciBnZXRJbWFnZXNGcm9tU2VsZWN0b3IgPSBmdW5jdGlvbiBnZXRJbWFnZXNGcm9tU2VsZWN0b3IyKHNlbGVjdG9yKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0b3IuZmlsdGVyKGlzU3VwcG9ydGVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc05vZGVMaXN0KHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gW10uc2xpY2UuY2FsbChzZWxlY3RvcikuZmlsdGVyKGlzU3VwcG9ydGVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc05vZGUoc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBbc2VsZWN0b3JdLmZpbHRlcihpc1N1cHBvcnRlZCk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5maWx0ZXIoaXNTdXBwb3J0ZWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBwcm92aWRlZCBzZWxlY3RvciBpcyBpbnZhbGlkLlxcbkV4cGVjdHMgYSBDU1Mgc2VsZWN0b3IsIGEgTm9kZSBlbGVtZW50LCBhIE5vZGVMaXN0IG9yIGFuIGFycmF5LlxcblNlZTogaHR0cHM6Ly9naXRodWIuY29tL2ZyYW5jb2lzY2hhbGlmb3VyL21lZGl1bS16b29tXCIpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGNyZWF0ZU92ZXJsYXkgPSBmdW5jdGlvbiBjcmVhdGVPdmVybGF5MihiYWNrZ3JvdW5kKSB7XG4gICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLW92ZXJsYXlcIik7XG4gICAgb3ZlcmxheS5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICByZXR1cm4gb3ZlcmxheTtcbiAgfTtcbiAgdmFyIGNsb25lVGFyZ2V0ID0gZnVuY3Rpb24gY2xvbmVUYXJnZXQyKHRlbXBsYXRlKSB7XG4gICAgdmFyIF90ZW1wbGF0ZSRnZXRCb3VuZGluZyA9IHRlbXBsYXRlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCB0b3AgPSBfdGVtcGxhdGUkZ2V0Qm91bmRpbmcudG9wLCBsZWZ0ID0gX3RlbXBsYXRlJGdldEJvdW5kaW5nLmxlZnQsIHdpZHRoID0gX3RlbXBsYXRlJGdldEJvdW5kaW5nLndpZHRoLCBoZWlnaHQgPSBfdGVtcGxhdGUkZ2V0Qm91bmRpbmcuaGVpZ2h0O1xuICAgIHZhciBjbG9uZSA9IHRlbXBsYXRlLmNsb25lTm9kZSgpO1xuICAgIHZhciBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwO1xuICAgIGNsb25lLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICAgIGNsb25lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGNsb25lLnN0eWxlLnRvcCA9IHRvcCArIHNjcm9sbFRvcCArIFwicHhcIjtcbiAgICBjbG9uZS5zdHlsZS5sZWZ0ID0gbGVmdCArIHNjcm9sbExlZnQgKyBcInB4XCI7XG4gICAgY2xvbmUuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcbiAgICBjbG9uZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgY2xvbmUuc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH07XG4gIHZhciBjcmVhdGVDdXN0b21FdmVudCA9IGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUV2ZW50Mih0eXBlLCBwYXJhbXMpIHtcbiAgICB2YXIgZXZlbnRQYXJhbXMgPSBfZXh0ZW5kcyh7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiB2b2lkIDBcbiAgICB9LCBwYXJhbXMpO1xuICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBuZXcgQ3VzdG9tRXZlbnQodHlwZSwgZXZlbnRQYXJhbXMpO1xuICAgIH1cbiAgICB2YXIgY3VzdG9tRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgIGN1c3RvbUV2ZW50LmluaXRDdXN0b21FdmVudCh0eXBlLCBldmVudFBhcmFtcy5idWJibGVzLCBldmVudFBhcmFtcy5jYW5jZWxhYmxlLCBldmVudFBhcmFtcy5kZXRhaWwpO1xuICAgIHJldHVybiBjdXN0b21FdmVudDtcbiAgfTtcbiAgdmFyIG1lZGl1bVpvb21Fc20gPSBmdW5jdGlvbiBtZWRpdW1ab29tKHNlbGVjdG9yKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHZvaWQgMCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHZhciBQcm9taXNlMiA9IHdpbmRvdy5Qcm9taXNlIHx8IGZ1bmN0aW9uIFByb21pc2UzKGZuKSB7XG4gICAgICBmdW5jdGlvbiBub29wKCkge1xuICAgICAgfVxuICAgICAgZm4obm9vcCwgbm9vcCk7XG4gICAgfTtcbiAgICB2YXIgX2hhbmRsZUNsaWNrID0gZnVuY3Rpb24gX2hhbmRsZUNsaWNrMihldmVudCkge1xuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGlmICh0YXJnZXQgPT09IG92ZXJsYXkpIHtcbiAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGltYWdlcy5pbmRleE9mKHRhcmdldCkgPT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRvZ2dsZSh7dGFyZ2V0fSk7XG4gICAgfTtcbiAgICB2YXIgX2hhbmRsZVNjcm9sbCA9IGZ1bmN0aW9uIF9oYW5kbGVTY3JvbGwyKCkge1xuICAgICAgaWYgKGlzQW5pbWF0aW5nIHx8ICFhY3RpdmUub3JpZ2luYWwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGN1cnJlbnRTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xuICAgICAgaWYgKE1hdGguYWJzKHNjcm9sbFRvcCAtIGN1cnJlbnRTY3JvbGwpID4gem9vbU9wdGlvbnMuc2Nyb2xsT2Zmc2V0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2xvc2UsIDE1MCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgX2hhbmRsZUtleVVwID0gZnVuY3Rpb24gX2hhbmRsZUtleVVwMihldmVudCkge1xuICAgICAgdmFyIGtleSA9IGV2ZW50LmtleSB8fCBldmVudC5rZXlDb2RlO1xuICAgICAgaWYgKGtleSA9PT0gXCJFc2NhcGVcIiB8fCBrZXkgPT09IFwiRXNjXCIgfHwga2V5ID09PSAyNykge1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZTIoKSB7XG4gICAgICB2YXIgb3B0aW9uczIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHZvaWQgMCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgICAgdmFyIG5ld09wdGlvbnMgPSBvcHRpb25zMjtcbiAgICAgIGlmIChvcHRpb25zMi5iYWNrZ3JvdW5kKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuYmFja2dyb3VuZCA9IG9wdGlvbnMyLmJhY2tncm91bmQ7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uczIuY29udGFpbmVyICYmIG9wdGlvbnMyLmNvbnRhaW5lciBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBuZXdPcHRpb25zLmNvbnRhaW5lciA9IF9leHRlbmRzKHt9LCB6b29tT3B0aW9ucy5jb250YWluZXIsIG9wdGlvbnMyLmNvbnRhaW5lcik7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uczIudGVtcGxhdGUpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gaXNOb2RlKG9wdGlvbnMyLnRlbXBsYXRlKSA/IG9wdGlvbnMyLnRlbXBsYXRlIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zMi50ZW1wbGF0ZSk7XG4gICAgICAgIG5ld09wdGlvbnMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICAgIHpvb21PcHRpb25zID0gX2V4dGVuZHMoe30sIHpvb21PcHRpb25zLCBuZXdPcHRpb25zKTtcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIGltYWdlLmRpc3BhdGNoRXZlbnQoY3JlYXRlQ3VzdG9tRXZlbnQoXCJtZWRpdW0tem9vbTp1cGRhdGVcIiwge1xuICAgICAgICAgIGRldGFpbDoge3pvb219XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHpvb207XG4gICAgfTtcbiAgICB2YXIgY2xvbmUgPSBmdW5jdGlvbiBjbG9uZTIoKSB7XG4gICAgICB2YXIgb3B0aW9uczIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHZvaWQgMCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgICAgcmV0dXJuIG1lZGl1bVpvb21Fc20oX2V4dGVuZHMoe30sIHpvb21PcHRpb25zLCBvcHRpb25zMikpO1xuICAgIH07XG4gICAgdmFyIGF0dGFjaCA9IGZ1bmN0aW9uIGF0dGFjaDIoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc2VsZWN0b3JzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHNlbGVjdG9yc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cbiAgICAgIHZhciBuZXdJbWFnZXMgPSBzZWxlY3RvcnMucmVkdWNlKGZ1bmN0aW9uKGltYWdlc0FjY3VtdWxhdG9yLCBjdXJyZW50U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChpbWFnZXNBY2N1bXVsYXRvciwgZ2V0SW1hZ2VzRnJvbVNlbGVjdG9yKGN1cnJlbnRTZWxlY3RvcikpO1xuICAgICAgfSwgW10pO1xuICAgICAgbmV3SW1hZ2VzLmZpbHRlcihmdW5jdGlvbihuZXdJbWFnZSkge1xuICAgICAgICByZXR1cm4gaW1hZ2VzLmluZGV4T2YobmV3SW1hZ2UpID09PSAtMTtcbiAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24obmV3SW1hZ2UpIHtcbiAgICAgICAgaW1hZ2VzLnB1c2gobmV3SW1hZ2UpO1xuICAgICAgICBuZXdJbWFnZS5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2VcIik7XG4gICAgICB9KTtcbiAgICAgIGV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24oX3JlZikge1xuICAgICAgICB2YXIgdHlwZSA9IF9yZWYudHlwZSwgbGlzdGVuZXIgPSBfcmVmLmxpc3RlbmVyLCBvcHRpb25zMiA9IF9yZWYub3B0aW9ucztcbiAgICAgICAgbmV3SW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zMik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gem9vbTtcbiAgICB9O1xuICAgIHZhciBkZXRhY2ggPSBmdW5jdGlvbiBkZXRhY2gyKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBzZWxlY3RvcnMgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBzZWxlY3RvcnNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3RpdmUuem9vbWVkKSB7XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICB9XG4gICAgICB2YXIgaW1hZ2VzVG9EZXRhY2ggPSBzZWxlY3RvcnMubGVuZ3RoID4gMCA/IHNlbGVjdG9ycy5yZWR1Y2UoZnVuY3Rpb24oaW1hZ2VzQWNjdW11bGF0b3IsIGN1cnJlbnRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KGltYWdlc0FjY3VtdWxhdG9yLCBnZXRJbWFnZXNGcm9tU2VsZWN0b3IoY3VycmVudFNlbGVjdG9yKSk7XG4gICAgICB9LCBbXSkgOiBpbWFnZXM7XG4gICAgICBpbWFnZXNUb0RldGFjaC5mb3JFYWNoKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJtZWRpdW0tem9vbS1pbWFnZVwiKTtcbiAgICAgICAgaW1hZ2UuZGlzcGF0Y2hFdmVudChjcmVhdGVDdXN0b21FdmVudChcIm1lZGl1bS16b29tOmRldGFjaFwiLCB7XG4gICAgICAgICAgZGV0YWlsOiB7em9vbX1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgICBpbWFnZXMgPSBpbWFnZXMuZmlsdGVyKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIHJldHVybiBpbWFnZXNUb0RldGFjaC5pbmRleE9mKGltYWdlKSA9PT0gLTE7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB6b29tO1xuICAgIH07XG4gICAgdmFyIG9uID0gZnVuY3Rpb24gb24yKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgb3B0aW9uczIgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHZvaWQgMCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1lZGl1bS16b29tOlwiICsgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMyKTtcbiAgICAgIH0pO1xuICAgICAgZXZlbnRMaXN0ZW5lcnMucHVzaCh7dHlwZTogXCJtZWRpdW0tem9vbTpcIiArIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zOiBvcHRpb25zMn0pO1xuICAgICAgcmV0dXJuIHpvb207XG4gICAgfTtcbiAgICB2YXIgb2ZmID0gZnVuY3Rpb24gb2ZmMih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIG9wdGlvbnMyID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB2b2lkIDAgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIGltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZWRpdW0tem9vbTpcIiArIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zMik7XG4gICAgICB9KTtcbiAgICAgIGV2ZW50TGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuICEoZXZlbnRMaXN0ZW5lci50eXBlID09PSBcIm1lZGl1bS16b29tOlwiICsgdHlwZSAmJiBldmVudExpc3RlbmVyLmxpc3RlbmVyLnRvU3RyaW5nKCkgPT09IGxpc3RlbmVyLnRvU3RyaW5nKCkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gem9vbTtcbiAgICB9O1xuICAgIHZhciBvcGVuID0gZnVuY3Rpb24gb3BlbjIoKSB7XG4gICAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHZvaWQgMCA/IGFyZ3VtZW50c1swXSA6IHt9LCB0YXJnZXQgPSBfcmVmMi50YXJnZXQ7XG4gICAgICB2YXIgX2FuaW1hdGUgPSBmdW5jdGlvbiBfYW5pbWF0ZTIoKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB7XG4gICAgICAgICAgd2lkdGg6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgYm90dG9tOiAwXG4gICAgICAgIH07XG4gICAgICAgIHZhciB2aWV3cG9ydFdpZHRoID0gdm9pZCAwO1xuICAgICAgICB2YXIgdmlld3BvcnRIZWlnaHQgPSB2b2lkIDA7XG4gICAgICAgIGlmICh6b29tT3B0aW9ucy5jb250YWluZXIpIHtcbiAgICAgICAgICBpZiAoem9vbU9wdGlvbnMuY29udGFpbmVyIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBfZXh0ZW5kcyh7fSwgY29udGFpbmVyLCB6b29tT3B0aW9ucy5jb250YWluZXIpO1xuICAgICAgICAgICAgdmlld3BvcnRXaWR0aCA9IGNvbnRhaW5lci53aWR0aCAtIGNvbnRhaW5lci5sZWZ0IC0gY29udGFpbmVyLnJpZ2h0IC0gem9vbU9wdGlvbnMubWFyZ2luICogMjtcbiAgICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gY29udGFpbmVyLmhlaWdodCAtIGNvbnRhaW5lci50b3AgLSBjb250YWluZXIuYm90dG9tIC0gem9vbU9wdGlvbnMubWFyZ2luICogMjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHpvb21Db250YWluZXIgPSBpc05vZGUoem9vbU9wdGlvbnMuY29udGFpbmVyKSA/IHpvb21PcHRpb25zLmNvbnRhaW5lciA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioem9vbU9wdGlvbnMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIHZhciBfem9vbUNvbnRhaW5lciRnZXRCb3UgPSB6b29tQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBfd2lkdGggPSBfem9vbUNvbnRhaW5lciRnZXRCb3Uud2lkdGgsIF9oZWlnaHQgPSBfem9vbUNvbnRhaW5lciRnZXRCb3UuaGVpZ2h0LCBfbGVmdCA9IF96b29tQ29udGFpbmVyJGdldEJvdS5sZWZ0LCBfdG9wID0gX3pvb21Db250YWluZXIkZ2V0Qm91LnRvcDtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IF9leHRlbmRzKHt9LCBjb250YWluZXIsIHtcbiAgICAgICAgICAgICAgd2lkdGg6IF93aWR0aCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBfaGVpZ2h0LFxuICAgICAgICAgICAgICBsZWZ0OiBfbGVmdCxcbiAgICAgICAgICAgICAgdG9wOiBfdG9wXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmlld3BvcnRXaWR0aCA9IHZpZXdwb3J0V2lkdGggfHwgY29udGFpbmVyLndpZHRoIC0gem9vbU9wdGlvbnMubWFyZ2luICogMjtcbiAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodCB8fCBjb250YWluZXIuaGVpZ2h0IC0gem9vbU9wdGlvbnMubWFyZ2luICogMjtcbiAgICAgICAgdmFyIHpvb21UYXJnZXQgPSBhY3RpdmUuem9vbWVkSGQgfHwgYWN0aXZlLm9yaWdpbmFsO1xuICAgICAgICB2YXIgbmF0dXJhbFdpZHRoID0gaXNTdmcoem9vbVRhcmdldCkgPyB2aWV3cG9ydFdpZHRoIDogem9vbVRhcmdldC5uYXR1cmFsV2lkdGggfHwgdmlld3BvcnRXaWR0aDtcbiAgICAgICAgdmFyIG5hdHVyYWxIZWlnaHQgPSBpc1N2Zyh6b29tVGFyZ2V0KSA/IHZpZXdwb3J0SGVpZ2h0IDogem9vbVRhcmdldC5uYXR1cmFsSGVpZ2h0IHx8IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICB2YXIgX3pvb21UYXJnZXQkZ2V0Qm91bmRpID0gem9vbVRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgdG9wID0gX3pvb21UYXJnZXQkZ2V0Qm91bmRpLnRvcCwgbGVmdCA9IF96b29tVGFyZ2V0JGdldEJvdW5kaS5sZWZ0LCB3aWR0aCA9IF96b29tVGFyZ2V0JGdldEJvdW5kaS53aWR0aCwgaGVpZ2h0ID0gX3pvb21UYXJnZXQkZ2V0Qm91bmRpLmhlaWdodDtcbiAgICAgICAgdmFyIHNjYWxlWCA9IE1hdGgubWluKG5hdHVyYWxXaWR0aCwgdmlld3BvcnRXaWR0aCkgLyB3aWR0aDtcbiAgICAgICAgdmFyIHNjYWxlWSA9IE1hdGgubWluKG5hdHVyYWxIZWlnaHQsIHZpZXdwb3J0SGVpZ2h0KSAvIGhlaWdodDtcbiAgICAgICAgdmFyIHNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpO1xuICAgICAgICB2YXIgdHJhbnNsYXRlWCA9ICgtbGVmdCArICh2aWV3cG9ydFdpZHRoIC0gd2lkdGgpIC8gMiArIHpvb21PcHRpb25zLm1hcmdpbiArIGNvbnRhaW5lci5sZWZ0KSAvIHNjYWxlO1xuICAgICAgICB2YXIgdHJhbnNsYXRlWSA9ICgtdG9wICsgKHZpZXdwb3J0SGVpZ2h0IC0gaGVpZ2h0KSAvIDIgKyB6b29tT3B0aW9ucy5tYXJnaW4gKyBjb250YWluZXIudG9wKSAvIHNjYWxlO1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gXCJzY2FsZShcIiArIHNjYWxlICsgXCIpIHRyYW5zbGF0ZTNkKFwiICsgdHJhbnNsYXRlWCArIFwicHgsIFwiICsgdHJhbnNsYXRlWSArIFwicHgsIDApXCI7XG4gICAgICAgIGFjdGl2ZS56b29tZWQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICBpZiAoYWN0aXZlLnpvb21lZEhkKSB7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZEhkLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTIoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICBpZiAodGFyZ2V0ICYmIGltYWdlcy5pbmRleE9mKHRhcmdldCkgPT09IC0xKSB7XG4gICAgICAgICAgcmVzb2x2ZSh6b29tKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9oYW5kbGVPcGVuRW5kID0gZnVuY3Rpb24gX2hhbmRsZU9wZW5FbmQyKCkge1xuICAgICAgICAgIGlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBfaGFuZGxlT3BlbkVuZDIpO1xuICAgICAgICAgIGFjdGl2ZS5vcmlnaW5hbC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUN1c3RvbUV2ZW50KFwibWVkaXVtLXpvb206b3BlbmVkXCIsIHtcbiAgICAgICAgICAgIGRldGFpbDoge3pvb219XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHJlc29sdmUoem9vbSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChhY3RpdmUuem9vbWVkKSB7XG4gICAgICAgICAgcmVzb2x2ZSh6b29tKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIGFjdGl2ZS5vcmlnaW5hbCA9IHRhcmdldDtcbiAgICAgICAgfSBlbHNlIGlmIChpbWFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBfaW1hZ2VzID0gaW1hZ2VzO1xuICAgICAgICAgIGFjdGl2ZS5vcmlnaW5hbCA9IF9pbWFnZXNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSh6b29tKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYWN0aXZlLm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQoY3JlYXRlQ3VzdG9tRXZlbnQoXCJtZWRpdW0tem9vbTpvcGVuXCIsIHtcbiAgICAgICAgICBkZXRhaWw6IHt6b29tfVxuICAgICAgICB9KSk7XG4gICAgICAgIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDA7XG4gICAgICAgIGlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgYWN0aXZlLnpvb21lZCA9IGNsb25lVGFyZ2V0KGFjdGl2ZS5vcmlnaW5hbCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gICAgICAgIGlmICh6b29tT3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGlzTm9kZSh6b29tT3B0aW9ucy50ZW1wbGF0ZSkgPyB6b29tT3B0aW9ucy50ZW1wbGF0ZSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioem9vbU9wdGlvbnMudGVtcGxhdGUpO1xuICAgICAgICAgIGFjdGl2ZS50ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgYWN0aXZlLnRlbXBsYXRlLmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFjdGl2ZS50ZW1wbGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhY3RpdmUuem9vbWVkKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS0tb3BlbmVkXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWN0aXZlLm9yaWdpbmFsLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZS0taGlkZGVuXCIpO1xuICAgICAgICBhY3RpdmUuem9vbWVkLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZS0tb3BlbmVkXCIpO1xuICAgICAgICBhY3RpdmUuem9vbWVkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZSk7XG4gICAgICAgIGFjdGl2ZS56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgX2hhbmRsZU9wZW5FbmQpO1xuICAgICAgICBpZiAoYWN0aXZlLm9yaWdpbmFsLmdldEF0dHJpYnV0ZShcImRhdGEtem9vbS1zcmNcIikpIHtcbiAgICAgICAgICBhY3RpdmUuem9vbWVkSGQgPSBhY3RpdmUuem9vbWVkLmNsb25lTm9kZSgpO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNzZXRcIik7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcInNpemVzXCIpO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5zcmMgPSBhY3RpdmUuem9vbWVkLmdldEF0dHJpYnV0ZShcImRhdGEtem9vbS1zcmNcIik7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZEhkLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZ2V0Wm9vbVRhcmdldFNpemUpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHJlYWNoIHRoZSB6b29tIGltYWdlIHRhcmdldCBcIiArIGFjdGl2ZS56b29tZWRIZC5zcmMpO1xuICAgICAgICAgICAgYWN0aXZlLnpvb21lZEhkID0gbnVsbDtcbiAgICAgICAgICAgIF9hbmltYXRlKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgZ2V0Wm9vbVRhcmdldFNpemUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChhY3RpdmUuem9vbWVkSGQuY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChnZXRab29tVGFyZ2V0U2l6ZSk7XG4gICAgICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZFwiKTtcbiAgICAgICAgICAgICAgYWN0aXZlLnpvb21lZEhkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZSk7XG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYWN0aXZlLnpvb21lZEhkKTtcbiAgICAgICAgICAgICAgX2FuaW1hdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlLm9yaWdpbmFsLmhhc0F0dHJpYnV0ZShcInNyY3NldFwiKSkge1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZCA9IGFjdGl2ZS56b29tZWQuY2xvbmVOb2RlKCk7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcInNpemVzXCIpO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgIHZhciBsb2FkRXZlbnRMaXN0ZW5lciA9IGFjdGl2ZS56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkRXZlbnRMaXN0ZW5lcik7XG4gICAgICAgICAgICBhY3RpdmUuem9vbWVkSGQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIik7XG4gICAgICAgICAgICBhY3RpdmUuem9vbWVkSGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYWN0aXZlLnpvb21lZEhkKTtcbiAgICAgICAgICAgIF9hbmltYXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2FuaW1hdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbiBjbG9zZTIoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UyKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgaWYgKGlzQW5pbWF0aW5nIHx8ICFhY3RpdmUub3JpZ2luYWwpIHtcbiAgICAgICAgICByZXNvbHZlKHpvb20pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2hhbmRsZUNsb3NlRW5kID0gZnVuY3Rpb24gX2hhbmRsZUNsb3NlRW5kMigpIHtcbiAgICAgICAgICBhY3RpdmUub3JpZ2luYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLWltYWdlLS1oaWRkZW5cIik7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhY3RpdmUuem9vbWVkKTtcbiAgICAgICAgICBpZiAoYWN0aXZlLnpvb21lZEhkKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGFjdGl2ZS56b29tZWRIZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQob3ZlcmxheSk7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZC5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZFwiKTtcbiAgICAgICAgICBpZiAoYWN0aXZlLnRlbXBsYXRlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGFjdGl2ZS50ZW1wbGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBfaGFuZGxlQ2xvc2VFbmQyKTtcbiAgICAgICAgICBhY3RpdmUub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChjcmVhdGVDdXN0b21FdmVudChcIm1lZGl1bS16b29tOmNsb3NlZFwiLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHt6b29tfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgICBhY3RpdmUub3JpZ2luYWwgPSBudWxsO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWQgPSBudWxsO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZCA9IG51bGw7XG4gICAgICAgICAgYWN0aXZlLnRlbXBsYXRlID0gbnVsbDtcbiAgICAgICAgICByZXNvbHZlKHpvb20pO1xuICAgICAgICB9O1xuICAgICAgICBpc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLS1vcGVuZWRcIik7XG4gICAgICAgIGFjdGl2ZS56b29tZWQuc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgaWYgKGFjdGl2ZS56b29tZWRIZCkge1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3RpdmUudGVtcGxhdGUpIHtcbiAgICAgICAgICBhY3RpdmUudGVtcGxhdGUuc3R5bGUudHJhbnNpdGlvbiA9IFwib3BhY2l0eSAxNTBtc1wiO1xuICAgICAgICAgIGFjdGl2ZS50ZW1wbGF0ZS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBhY3RpdmUub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChjcmVhdGVDdXN0b21FdmVudChcIm1lZGl1bS16b29tOmNsb3NlXCIsIHtcbiAgICAgICAgICBkZXRhaWw6IHt6b29tfVxuICAgICAgICB9KSk7XG4gICAgICAgIGFjdGl2ZS56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgX2hhbmRsZUNsb3NlRW5kKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZTIoKSB7XG4gICAgICB2YXIgX3JlZjMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHZvaWQgMCA/IGFyZ3VtZW50c1swXSA6IHt9LCB0YXJnZXQgPSBfcmVmMy50YXJnZXQ7XG4gICAgICBpZiAoYWN0aXZlLm9yaWdpbmFsKSB7XG4gICAgICAgIHJldHVybiBjbG9zZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9wZW4oe3RhcmdldH0pO1xuICAgIH07XG4gICAgdmFyIGdldE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPcHRpb25zMigpIHtcbiAgICAgIHJldHVybiB6b29tT3B0aW9ucztcbiAgICB9O1xuICAgIHZhciBnZXRJbWFnZXMgPSBmdW5jdGlvbiBnZXRJbWFnZXMyKCkge1xuICAgICAgcmV0dXJuIGltYWdlcztcbiAgICB9O1xuICAgIHZhciBnZXRab29tZWRJbWFnZSA9IGZ1bmN0aW9uIGdldFpvb21lZEltYWdlMigpIHtcbiAgICAgIHJldHVybiBhY3RpdmUub3JpZ2luYWw7XG4gICAgfTtcbiAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgdmFyIGV2ZW50TGlzdGVuZXJzID0gW107XG4gICAgdmFyIGlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdmFyIHNjcm9sbFRvcCA9IDA7XG4gICAgdmFyIHpvb21PcHRpb25zID0gb3B0aW9ucztcbiAgICB2YXIgYWN0aXZlID0ge1xuICAgICAgb3JpZ2luYWw6IG51bGwsXG4gICAgICB6b29tZWQ6IG51bGwsXG4gICAgICB6b29tZWRIZDogbnVsbCxcbiAgICAgIHRlbXBsYXRlOiBudWxsXG4gICAgfTtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNlbGVjdG9yKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xuICAgICAgem9vbU9wdGlvbnMgPSBzZWxlY3RvcjtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgYXR0YWNoKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgem9vbU9wdGlvbnMgPSBfZXh0ZW5kcyh7XG4gICAgICBtYXJnaW46IDAsXG4gICAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcbiAgICAgIHNjcm9sbE9mZnNldDogNDAsXG4gICAgICBjb250YWluZXI6IG51bGwsXG4gICAgICB0ZW1wbGF0ZTogbnVsbFxuICAgIH0sIHpvb21PcHRpb25zKTtcbiAgICB2YXIgb3ZlcmxheSA9IGNyZWF0ZU92ZXJsYXkoem9vbU9wdGlvbnMuYmFja2dyb3VuZCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIF9oYW5kbGVDbGljayk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIF9oYW5kbGVLZXlVcCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBfaGFuZGxlU2Nyb2xsKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBjbG9zZSk7XG4gICAgdmFyIHpvb20gPSB7XG4gICAgICBvcGVuLFxuICAgICAgY2xvc2UsXG4gICAgICB0b2dnbGUsXG4gICAgICB1cGRhdGUsXG4gICAgICBjbG9uZSxcbiAgICAgIGF0dGFjaCxcbiAgICAgIGRldGFjaCxcbiAgICAgIG9uLFxuICAgICAgb2ZmLFxuICAgICAgZ2V0T3B0aW9ucyxcbiAgICAgIGdldEltYWdlcyxcbiAgICAgIGdldFpvb21lZEltYWdlXG4gICAgfTtcbiAgICByZXR1cm4gem9vbTtcbiAgfTtcbiAgZnVuY3Rpb24gc3R5bGVJbmplY3QoY3NzMiwgcmVmKSB7XG4gICAgaWYgKHJlZiA9PT0gdm9pZCAwKVxuICAgICAgcmVmID0ge307XG4gICAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuICAgIGlmICghY3NzMiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgc3R5bGUudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgICBpZiAoaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcbiAgICAgIGlmIChoZWFkLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGUsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3MyO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MyKSk7XG4gICAgfVxuICB9XG4gIHZhciBjc3MgPSBcIi5tZWRpdW0tem9vbS1vdmVybGF5e3Bvc2l0aW9uOmZpeGVkO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzO3dpbGwtY2hhbmdlOm9wYWNpdHl9Lm1lZGl1bS16b29tLS1vcGVuZWQgLm1lZGl1bS16b29tLW92ZXJsYXl7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20tb3V0O29wYWNpdHk6MX0ubWVkaXVtLXpvb20taW1hZ2V7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20taW47dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzIGN1YmljLWJlemllciguMiwwLC4yLDEpIWltcG9ydGFudH0ubWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlbnt2aXNpYmlsaXR5OmhpZGRlbn0ubWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZHtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjtjdXJzb3I6em9vbS1vdXQ7d2lsbC1jaGFuZ2U6dHJhbnNmb3JtfVwiO1xuICBzdHlsZUluamVjdChjc3MpO1xuICB2YXIgbWVkaXVtX3pvb21fZXNtX2RlZmF1bHQgPSBtZWRpdW1ab29tRXNtO1xuXG4gIC8vIG5zLXBhcmFtczpAcGFyYW1zXG4gIHZhciBjb2RlSGlnaGxpZ2h0aW5nID0gdHJ1ZTtcbiAgdmFyIGh1Z29FbnZpcm9ubWVudCA9IFwiZGV2ZWxvcG1lbnRcIjtcbiAgdmFyIHNlYXJjaEVuYWJsZWQgPSB0cnVlO1xuXG4gIC8vIG5zLWh1Z286L3RtcC9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL3dvd2NoZW15L3dvd2NoZW15LWh1Z28tbW9kdWxlcy93b3djaGVteUB2MC4wLjAtMjAyMTAzMjQxOTQyMDAtZmRhOWYzOWQ4NzJlL2Fzc2V0cy9qcy93b3djaGVteS11dGlscy5qc1xuICBmdW5jdGlvbiBmaXhNZXJtYWlkKHJlbmRlciA9IGZhbHNlKSB7XG4gICAgbGV0IG1lcm1haWRzID0gW107XG4gICAgW10ucHVzaC5hcHBseShtZXJtYWlkcywgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxhbmd1YWdlLW1lcm1haWRcIikpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVybWFpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBtZXJtYWlkQ29kZUVsZW1lbnQgPSBtZXJtYWlkc1tpXTtcbiAgICAgIGxldCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG5ld0VsZW1lbnQuaW5uZXJIVE1MID0gbWVybWFpZENvZGVFbGVtZW50LmlubmVySFRNTDtcbiAgICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1lcm1haWRcIik7XG4gICAgICBpZiAocmVuZGVyKSB7XG4gICAgICAgIHdpbmRvdy5tZXJtYWlkLm1lcm1haWRBUEkucmVuZGVyKGBtZXJtYWlkLSR7aX1gLCBuZXdFbGVtZW50LnRleHRDb250ZW50LCBmdW5jdGlvbihzdmdDb2RlKSB7XG4gICAgICAgICAgbmV3RWxlbWVudC5pbm5lckhUTUwgPSBzdmdDb2RlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIG1lcm1haWRDb2RlRWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VXaXRoKG5ld0VsZW1lbnQpO1xuICAgIH1cbiAgICBjb25zb2xlLmRlYnVnKGBQcm9jZXNzZWQgJHttZXJtYWlkcy5sZW5ndGh9IE1lcm1haWQgY29kZSBibG9ja3NgKTtcbiAgfVxuICBmdW5jdGlvbiBzY3JvbGxQYXJlbnRUb0NoaWxkKHBhcmVudCwgY2hpbGQpIHtcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBhcmVudFZpZXdhYmxlQXJlYSA9IHtcbiAgICAgIGhlaWdodDogcGFyZW50LmNsaWVudEhlaWdodCxcbiAgICAgIHdpZHRoOiBwYXJlbnQuY2xpZW50V2lkdGhcbiAgICB9O1xuICAgIGNvbnN0IGNoaWxkUmVjdCA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGlzQ2hpbGRJblZpZXcgPSBjaGlsZFJlY3QudG9wID49IHBhcmVudFJlY3QudG9wICYmIGNoaWxkUmVjdC5ib3R0b20gPD0gcGFyZW50UmVjdC50b3AgKyBwYXJlbnRWaWV3YWJsZUFyZWEuaGVpZ2h0O1xuICAgIGlmICghaXNDaGlsZEluVmlldykge1xuICAgICAgcGFyZW50LnNjcm9sbFRvcCA9IGNoaWxkUmVjdC50b3AgKyBwYXJlbnQuc2Nyb2xsVG9wIC0gcGFyZW50UmVjdC50b3A7XG4gICAgfVxuICB9XG5cbiAgLy8gbnMtaHVnbzovdG1wL2h1Z29fY2FjaGUvbW9kdWxlcy9maWxlY2FjaGUvbW9kdWxlcy9wa2cvbW9kL2dpdGh1Yi5jb20vd293Y2hlbXkvd293Y2hlbXktaHVnby1tb2R1bGVzL3dvd2NoZW15QHYwLjAuMC0yMDIxMDMyNDE5NDIwMC1mZGE5ZjM5ZDg3MmUvYXNzZXRzL2pzL3dvd2NoZW15LWFuaW1hdGlvbi5qc1xuICBmdW5jdGlvbiBmYWRlSW4oZWxlbWVudCwgZHVyYXRpb24gPSA2MDApIHtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgIGxldCBsYXN0ID0gK25ldyBEYXRlKCk7XG4gICAgbGV0IHRpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICgrZWxlbWVudC5zdHlsZS5vcGFjaXR5ICsgKG5ldyBEYXRlKCkgLSBsYXN0KSAvIGR1cmF0aW9uKS50b1N0cmluZygpO1xuICAgICAgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICAgICAgaWYgKCtlbGVtZW50LnN0eWxlLm9wYWNpdHkgPCAxKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spIHx8IHNldFRpbWVvdXQodGljaywgMTYpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGljaygpO1xuICB9XG5cbiAgLy8gbnMtaHVnbzovdG1wL2h1Z29fY2FjaGUvbW9kdWxlcy9maWxlY2FjaGUvbW9kdWxlcy9wa2cvbW9kL2dpdGh1Yi5jb20vd293Y2hlbXkvd293Y2hlbXktaHVnby1tb2R1bGVzL3dvd2NoZW15QHYwLjAuMC0yMDIxMDMyNDE5NDIwMC1mZGE5ZjM5ZDg3MmUvYXNzZXRzL2pzL3dvd2NoZW15LXRoZW1pbmcuanNcbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICBmdW5jdGlvbiBnZXRUaGVtZU1vZGUoKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2NUaGVtZVwiKSB8fCAyKTtcbiAgfVxuICBmdW5jdGlvbiBjYW5DaGFuZ2VUaGVtZSgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih3aW5kb3cud2MuZGFya0xpZ2h0RW5hYmxlZCk7XG4gIH1cbiAgZnVuY3Rpb24gaW5pdFRoZW1lVmFyaWF0aW9uKCkge1xuICAgIGlmICghY2FuQ2hhbmdlVGhlbWUoKSkge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIlVzZXIgdGhlbWluZyBkaXNhYmxlZC5cIik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc0RhcmtUaGVtZTogd2luZG93LndjLmlzU2l0ZVRoZW1lRGFyayxcbiAgICAgICAgdGhlbWVNb2RlOiB3aW5kb3cud2MuaXNTaXRlVGhlbWVEYXJrID8gMSA6IDBcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnNvbGUuZGVidWcoXCJVc2VyIHRoZW1pbmcgZW5hYmxlZC5cIik7XG4gICAgbGV0IGlzRGFya1RoZW1lO1xuICAgIGxldCBjdXJyZW50VGhlbWVNb2RlID0gZ2V0VGhlbWVNb2RlKCk7XG4gICAgY29uc29sZS5kZWJ1ZyhgVXNlcidzIHRoZW1lIHZhcmlhdGlvbjogJHtjdXJyZW50VGhlbWVNb2RlfWApO1xuICAgIHN3aXRjaCAoY3VycmVudFRoZW1lTW9kZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBpc0RhcmtUaGVtZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaXNEYXJrVGhlbWUgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIikubWF0Y2hlcykge1xuICAgICAgICAgIGlzRGFya1RoZW1lID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICBpc0RhcmtUaGVtZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzRGFya1RoZW1lID0gd2luZG93LndjLmlzU2l0ZVRoZW1lRGFyaztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGlzRGFya1RoZW1lICYmICFib2R5LmNsYXNzTGlzdC5jb250YWlucyhcImRhcmtcIikpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJBcHBseWluZyBXb3djaGVteSBkYXJrIHRoZW1lXCIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiZGFya1wiKTtcbiAgICB9IGVsc2UgaWYgKCFpc0RhcmtUaGVtZSAmJiBib2R5LmNsYXNzTGlzdC5jb250YWlucyhcImRhcmtcIikpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJBcHBseWluZyBXb3djaGVteSBsaWdodCB0aGVtZVwiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImRhcmtcIik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0RhcmtUaGVtZSxcbiAgICAgIHRoZW1lTW9kZTogY3VycmVudFRoZW1lTW9kZVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gY2hhbmdlVGhlbWVNb2RlQ2xpY2sobmV3TW9kZSkge1xuICAgIGlmICghY2FuQ2hhbmdlVGhlbWUoKSkge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIkNhbm5vdCBjaGFuZ2UgdGhlbWUgLSB1c2VyIHRoZW1pbmcgZGlzYWJsZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaXNEYXJrVGhlbWU7XG4gICAgc3dpdGNoIChuZXdNb2RlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2NUaGVtZVwiLCBcIjBcIik7XG4gICAgICAgIGlzRGFya1RoZW1lID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJVc2VyIGNoYW5nZWQgdGhlbWUgdmFyaWF0aW9uIHRvIExpZ2h0LlwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2NUaGVtZVwiLCBcIjFcIik7XG4gICAgICAgIGlzRGFya1RoZW1lID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlVzZXIgY2hhbmdlZCB0aGVtZSB2YXJpYXRpb24gdG8gRGFyay5cIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3Y1RoZW1lXCIsIFwiMlwiKTtcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgaXNEYXJrVGhlbWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodClcIikubWF0Y2hlcykge1xuICAgICAgICAgIGlzRGFya1RoZW1lID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNEYXJrVGhlbWUgPSB3aW5kb3cud2MuaXNTaXRlVGhlbWVEYXJrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJVc2VyIGNoYW5nZWQgdGhlbWUgdmFyaWF0aW9uIHRvIEF1dG8uXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmVuZGVyVGhlbWVWYXJpYXRpb24oaXNEYXJrVGhlbWUsIG5ld01vZGUpO1xuICB9XG4gIGZ1bmN0aW9uIHNob3dBY3RpdmVUaGVtZShtb2RlKSB7XG4gICAgbGV0IGxpbmtMaWdodDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNldC10aGVtZS1saWdodFwiKTtcbiAgICBsZXQgbGlua0RhcmsyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1zZXQtdGhlbWUtZGFya1wiKTtcbiAgICBsZXQgbGlua0F1dG8yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1zZXQtdGhlbWUtYXV0b1wiKTtcbiAgICBpZiAobGlua0xpZ2h0MiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbGlua0xpZ2h0Mi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGxpbmtEYXJrMi5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGxpbmtBdXRvMi5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBsaW5rTGlnaHQyLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgbGlua0RhcmsyLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgbGlua0F1dG8yLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsaW5rTGlnaHQyLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgbGlua0RhcmsyLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgbGlua0F1dG8yLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHJlbmRlclRoZW1lVmFyaWF0aW9uKGlzRGFya1RoZW1lLCB0aGVtZU1vZGUgPSAyLCBpbml0ID0gZmFsc2UpIHtcbiAgICBjb25zdCBjb2RlSGxMaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3RpdGxlPWhsLWxpZ2h0XVwiKTtcbiAgICBjb25zdCBjb2RlSGxEYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpbmtbdGl0bGU9aGwtZGFya11cIik7XG4gICAgY29uc3QgY29kZUhsRW5hYmxlZCA9IGNvZGVIbExpZ2h0ICE9PSBudWxsIHx8IGNvZGVIbERhcmsgIT09IG51bGw7XG4gICAgY29uc3QgZGlhZ3JhbUVuYWJsZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2NyaXB0W3RpdGxlPW1lcm1haWRdXCIpICE9PSBudWxsO1xuICAgIHNob3dBY3RpdmVUaGVtZSh0aGVtZU1vZGUpO1xuICAgIGNvbnN0IHRoZW1lQ2hhbmdlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJ3Y1RoZW1lQ2hhbmdlXCIsIHtkZXRhaWw6IHtpc0RhcmtUaGVtZTogKCkgPT4gaXNEYXJrVGhlbWV9fSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh0aGVtZUNoYW5nZUV2ZW50KTtcbiAgICBpZiAoIWluaXQpIHtcbiAgICAgIGlmIChpc0RhcmtUaGVtZSA9PT0gZmFsc2UgJiYgIWJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGFya1wiKSB8fCBpc0RhcmtUaGVtZSA9PT0gdHJ1ZSAmJiBib2R5LmNsYXNzTGlzdC5jb250YWlucyhcImRhcmtcIikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNEYXJrVGhlbWUgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoIWluaXQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkb2N1bWVudC5ib2R5LnN0eWxlLCB7b3BhY2l0eTogMCwgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCJ9KTtcbiAgICAgICAgZmFkZUluKGRvY3VtZW50LmJvZHksIDYwMCk7XG4gICAgICB9XG4gICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJkYXJrXCIpO1xuICAgICAgaWYgKGNvZGVIbEVuYWJsZWQpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlNldHRpbmcgSExKUyB0aGVtZSB0byBsaWdodFwiKTtcbiAgICAgICAgaWYgKGNvZGVIbExpZ2h0KSB7XG4gICAgICAgICAgY29kZUhsTGlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29kZUhsRGFyaykge1xuICAgICAgICAgIGNvZGVIbERhcmsuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGlhZ3JhbUVuYWJsZWQpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkluaXRpYWxpemluZyBNZXJtYWlkIHdpdGggbGlnaHQgdGhlbWVcIik7XG4gICAgICAgIGlmIChpbml0KSB7XG4gICAgICAgICAgd2luZG93Lm1lcm1haWQuaW5pdGlhbGl6ZSh7c3RhcnRPbkxvYWQ6IGZhbHNlLCB0aGVtZTogXCJkZWZhdWx0XCIsIHNlY3VyaXR5TGV2ZWw6IFwibG9vc2VcIn0pO1xuICAgICAgICAgIGZpeE1lcm1haWQodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRGFya1RoZW1lID09PSB0cnVlKSB7XG4gICAgICBpZiAoIWluaXQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkb2N1bWVudC5ib2R5LnN0eWxlLCB7b3BhY2l0eTogMCwgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCJ9KTtcbiAgICAgICAgZmFkZUluKGRvY3VtZW50LmJvZHksIDYwMCk7XG4gICAgICB9XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJkYXJrXCIpO1xuICAgICAgaWYgKGNvZGVIbEVuYWJsZWQpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlNldHRpbmcgSExKUyB0aGVtZSB0byBkYXJrXCIpO1xuICAgICAgICBpZiAoY29kZUhsTGlnaHQpIHtcbiAgICAgICAgICBjb2RlSGxMaWdodC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGVIbERhcmspIHtcbiAgICAgICAgICBjb2RlSGxEYXJrLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkaWFncmFtRW5hYmxlZCkge1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiSW5pdGlhbGl6aW5nIE1lcm1haWQgd2l0aCBkYXJrIHRoZW1lXCIpO1xuICAgICAgICBpZiAoaW5pdCkge1xuICAgICAgICAgIHdpbmRvdy5tZXJtYWlkLmluaXRpYWxpemUoe3N0YXJ0T25Mb2FkOiBmYWxzZSwgdGhlbWU6IFwiZGFya1wiLCBzZWN1cml0eUxldmVsOiBcImxvb3NlXCJ9KTtcbiAgICAgICAgICBmaXhNZXJtYWlkKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uTWVkaWFRdWVyeUxpc3RFdmVudChldmVudCkge1xuICAgIGlmICghY2FuQ2hhbmdlVGhlbWUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkYXJrTW9kZU9uID0gZXZlbnQubWF0Y2hlcztcbiAgICBjb25zb2xlLmRlYnVnKGBPUyBkYXJrIG1vZGUgcHJlZmVyZW5jZSBjaGFuZ2VkIHRvICR7ZGFya01vZGVPbiA/IFwiXFx1ezFGMzEyfSBvblwiIDogXCJcXHUyNjAwXFx1RkUwRiBvZmZcIn0uYCk7XG4gICAgbGV0IGN1cnJlbnRUaGVtZVZhcmlhdGlvbiA9IGdldFRoZW1lTW9kZSgpO1xuICAgIGxldCBpc0RhcmtUaGVtZTtcbiAgICBpZiAoY3VycmVudFRoZW1lVmFyaWF0aW9uID09PSAyKSB7XG4gICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgaXNEYXJrVGhlbWUgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgaXNEYXJrVGhlbWUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzRGFya1RoZW1lID0gd2luZG93LndjLmlzU2l0ZVRoZW1lRGFyaztcbiAgICAgIH1cbiAgICAgIHJlbmRlclRoZW1lVmFyaWF0aW9uKGlzRGFya1RoZW1lLCBjdXJyZW50VGhlbWVWYXJpYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8vIDxzdGRpbj5cbiAgY29uc29sZS5kZWJ1ZyhgRW52aXJvbm1lbnQ6ICR7aHVnb0Vudmlyb25tZW50fWApO1xuICBmdW5jdGlvbiBnZXROYXZCYXJIZWlnaHQoKSB7XG4gICAgbGV0ICRuYXZiYXIgPSAkKFwiI25hdmJhci1tYWluXCIpO1xuICAgIGxldCBuYXZiYXJfb2Zmc2V0ID0gJG5hdmJhci5vdXRlckhlaWdodCgpO1xuICAgIGNvbnNvbGUuZGVidWcoXCJOYXZiYXIgaGVpZ2h0OiBcIiArIG5hdmJhcl9vZmZzZXQpO1xuICAgIHJldHVybiBuYXZiYXJfb2Zmc2V0O1xuICB9XG4gIGZ1bmN0aW9uIHNjcm9sbFRvQW5jaG9yKHRhcmdldCwgZHVyYXRpb24gPSAwKSB7XG4gICAgdGFyZ2V0ID0gdHlwZW9mIHRhcmdldCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiID8gZGVjb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5oYXNoKSA6IHRhcmdldDtcbiAgICBpZiAoJCh0YXJnZXQpLmxlbmd0aCkge1xuICAgICAgdGFyZ2V0ID0gXCIjXCIgKyAkLmVzY2FwZVNlbGVjdG9yKHRhcmdldC5zdWJzdHJpbmcoMSkpO1xuICAgICAgbGV0IGVsZW1lbnRPZmZzZXQgPSBNYXRoLmNlaWwoJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtIGdldE5hdkJhckhlaWdodCgpKTtcbiAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwic2Nyb2xsaW5nXCIpO1xuICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogZWxlbWVudE9mZnNldFxuICAgICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNjcm9sbGluZ1wiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwiQ2Fubm90IHNjcm9sbCB0byB0YXJnZXQgYCNcIiArIHRhcmdldCArIFwiYC4gSUQgbm90IGZvdW5kIVwiKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZml4U2Nyb2xsc3B5KCkge1xuICAgIGxldCAkYm9keSA9ICQoXCJib2R5XCIpO1xuICAgIGxldCBkYXRhID0gJGJvZHkuZGF0YShcImJzLnNjcm9sbHNweVwiKTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgZGF0YS5fY29uZmlnLm9mZnNldCA9IGdldE5hdkJhckhlaWdodCgpO1xuICAgICAgJGJvZHkuZGF0YShcImJzLnNjcm9sbHNweVwiLCBkYXRhKTtcbiAgICAgICRib2R5LnNjcm9sbHNweShcInJlZnJlc2hcIik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZVF1ZXJ5UGFyYW1zRnJvbVVybCgpIHtcbiAgICBpZiAod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICBsZXQgdXJsV2l0aG91dFNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe3BhdGg6IHVybFdpdGhvdXRTZWFyY2hQYXJhbXN9LCBcIlwiLCB1cmxXaXRob3V0U2VhcmNoUGFyYW1zKTtcbiAgICB9XG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIHNjcm9sbFRvQW5jaG9yKTtcbiAgJChcIiNuYXZiYXItbWFpbiBsaS5uYXYtaXRlbSBhLm5hdi1saW5rLCAuanMtc2Nyb2xsXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBsZXQgaGFzaCA9IHRoaXMuaGFzaDtcbiAgICBpZiAodGhpcy5wYXRobmFtZSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICYmIGhhc2ggJiYgJChoYXNoKS5sZW5ndGggJiYgJChcIi5qcy13aWRnZXQtcGFnZVwiKS5sZW5ndGggPiAwKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGVsZW1lbnRPZmZzZXQgPSBNYXRoLmNlaWwoJChoYXNoKS5vZmZzZXQoKS50b3AgLSBnZXROYXZCYXJIZWlnaHQoKSk7XG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiBlbGVtZW50T2Zmc2V0XG4gICAgICB9LCA4MDApO1xuICAgIH1cbiAgfSk7XG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIubmF2YmFyLWNvbGxhcHNlLnNob3dcIiwgZnVuY3Rpb24oZSkge1xuICAgIGxldCB0YXJnZXRFbGVtZW50ID0gJChlLnRhcmdldCkuaXMoXCJhXCIpID8gJChlLnRhcmdldCkgOiAkKGUudGFyZ2V0KS5wYXJlbnQoKTtcbiAgICBpZiAodGFyZ2V0RWxlbWVudC5pcyhcImFcIikgJiYgdGFyZ2V0RWxlbWVudC5hdHRyKFwiY2xhc3NcIikgIT0gXCJkcm9wZG93bi10b2dnbGVcIikge1xuICAgICAgJCh0aGlzKS5jb2xsYXBzZShcImhpZGVcIik7XG4gICAgfVxuICB9KTtcbiAgdmFyIHB1YkZpbHRlcnMgPSB7fTtcbiAgdmFyIHNlYXJjaFJlZ2V4O1xuICB2YXIgZmlsdGVyVmFsdWVzO1xuICB2YXIgJGdyaWRfcHVicyA9ICQoXCIjY29udGFpbmVyLXB1YmxpY2F0aW9uc1wiKTtcbiAgaWYgKCRncmlkX3B1YnMubGVuZ3RoKSB7XG4gICAgJGdyaWRfcHVicy5pc290b3BlKHtcbiAgICAgIGl0ZW1TZWxlY3RvcjogXCIuaXNvdG9wZS1pdGVtXCIsXG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICBtYXNvbnJ5OiB7XG4gICAgICAgIGNvbHVtbldpZHRoOiBcIi5ncmlkLXNpemVyXCJcbiAgICAgIH0sXG4gICAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBsZXQgc2VhcmNoUmVzdWx0cyA9IHNlYXJjaFJlZ2V4ID8gJHRoaXMudGV4dCgpLm1hdGNoKHNlYXJjaFJlZ2V4KSA6IHRydWU7XG4gICAgICAgIGxldCBmaWx0ZXJSZXN1bHRzID0gZmlsdGVyVmFsdWVzID8gJHRoaXMuaXMoZmlsdGVyVmFsdWVzKSA6IHRydWU7XG4gICAgICAgIHJldHVybiBzZWFyY2hSZXN1bHRzICYmIGZpbHRlclJlc3VsdHM7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGV0ICRxdWlja1NlYXJjaCA9ICQoXCIuZmlsdGVyLXNlYXJjaFwiKS5rZXl1cChkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgICAgIHNlYXJjaFJlZ2V4ID0gbmV3IFJlZ0V4cCgkcXVpY2tTZWFyY2gudmFsKCksIFwiZ2lcIik7XG4gICAgICAkZ3JpZF9wdWJzLmlzb3RvcGUoKTtcbiAgICB9KSk7XG4gICAgJChcIi5wdWItZmlsdGVyc1wiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICBsZXQgZmlsdGVyR3JvdXAgPSAkdGhpc1swXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpbHRlci1ncm91cFwiKTtcbiAgICAgIHB1YkZpbHRlcnNbZmlsdGVyR3JvdXBdID0gdGhpcy52YWx1ZTtcbiAgICAgIGZpbHRlclZhbHVlcyA9IGNvbmNhdFZhbHVlcyhwdWJGaWx0ZXJzKTtcbiAgICAgICRncmlkX3B1YnMuaXNvdG9wZSgpO1xuICAgICAgaWYgKGZpbHRlckdyb3VwID09PSBcInB1YnR5cGVcIikge1xuICAgICAgICBsZXQgdXJsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYgKHVybC5zdWJzdHIoMCwgOSkgPT09IFwiLnB1YnR5cGUtXCIpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHVybC5zdWJzdHIoOSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gZGVib3VuY2UoZm4sIHRocmVzaG9sZCkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCAxMDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGRlbGF5ZWQoKSB7XG4gICAgICAgIGZuLmFwcGx5KF90aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHRocmVzaG9sZCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBjb25jYXRWYWx1ZXMob2JqKSB7XG4gICAgbGV0IHZhbHVlID0gXCJcIjtcbiAgICBmb3IgKGxldCBwcm9wIGluIG9iaikge1xuICAgICAgdmFsdWUgKz0gb2JqW3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gZmlsdGVyX3B1YmxpY2F0aW9ucygpIHtcbiAgICBpZiAoISRncmlkX3B1YnMubGVuZ3RoKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCB1cmxIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIiwgXCJcIik7XG4gICAgbGV0IGZpbHRlclZhbHVlID0gXCIqXCI7XG4gICAgaWYgKHVybEhhc2ggIT0gXCJcIiAmJiAhaXNOYU4odXJsSGFzaCkpIHtcbiAgICAgIGZpbHRlclZhbHVlID0gXCIucHVidHlwZS1cIiArIHVybEhhc2g7XG4gICAgfVxuICAgIGxldCBmaWx0ZXJHcm91cCA9IFwicHVidHlwZVwiO1xuICAgIHB1YkZpbHRlcnNbZmlsdGVyR3JvdXBdID0gZmlsdGVyVmFsdWU7XG4gICAgZmlsdGVyVmFsdWVzID0gY29uY2F0VmFsdWVzKHB1YkZpbHRlcnMpO1xuICAgICRncmlkX3B1YnMuaXNvdG9wZSgpO1xuICAgICQoXCIucHVidHlwZS1zZWxlY3RcIikudmFsKGZpbHRlclZhbHVlKTtcbiAgfVxuICBmdW5jdGlvbiBpbml0TWFwKCkge1xuICAgIGlmICgkKFwiI21hcFwiKS5sZW5ndGgpIHtcbiAgICAgIGxldCBtYXBfcHJvdmlkZXIgPSAkKFwiI21hcC1wcm92aWRlclwiKS52YWwoKTtcbiAgICAgIGxldCBsYXQgPSAkKFwiI21hcC1sYXRcIikudmFsKCk7XG4gICAgICBsZXQgbG5nID0gJChcIiNtYXAtbG5nXCIpLnZhbCgpO1xuICAgICAgbGV0IHpvb20gPSBwYXJzZUludCgkKFwiI21hcC16b29tXCIpLnZhbCgpKTtcbiAgICAgIGxldCBhZGRyZXNzID0gJChcIiNtYXAtZGlyXCIpLnZhbCgpO1xuICAgICAgbGV0IGFwaV9rZXkgPSAkKFwiI21hcC1hcGkta2V5XCIpLnZhbCgpO1xuICAgICAgaWYgKG1hcF9wcm92aWRlciA9PT0gXCJnb29nbGVcIikge1xuICAgICAgICBsZXQgbWFwID0gbmV3IEdNYXBzKHtcbiAgICAgICAgICBkaXY6IFwiI21hcFwiLFxuICAgICAgICAgIGxhdCxcbiAgICAgICAgICBsbmcsXG4gICAgICAgICAgem9vbSxcbiAgICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgICB6b29tQ29udHJvbE9wdDoge1xuICAgICAgICAgICAgc3R5bGU6IFwiU01BTExcIixcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcIlRPUF9MRUZUXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiBcImNvb3BlcmF0aXZlXCJcbiAgICAgICAgfSk7XG4gICAgICAgIG1hcC5hZGRNYXJrZXIoe1xuICAgICAgICAgIGxhdCxcbiAgICAgICAgICBsbmcsXG4gICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHVybCA9IFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3BsYWNlL1wiICsgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpICsgXCIvQFwiICsgbGF0ICsgXCIsXCIgKyBsbmcgKyBcIi9cIjtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZTogYWRkcmVzc1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTC5tYXAoXCJtYXBcIikuc2V0VmlldyhbbGF0LCBsbmddLCB6b29tKTtcbiAgICAgICAgaWYgKG1hcF9wcm92aWRlciA9PT0gXCJtYXBib3hcIiAmJiBhcGlfa2V5Lmxlbmd0aCkge1xuICAgICAgICAgIEwudGlsZUxheWVyKFwiaHR0cHM6Ly9hcGkubWFwYm94LmNvbS9zdHlsZXMvdjEve2lkfS90aWxlcy97en0ve3h9L3t5fT9hY2Nlc3NfdG9rZW49e2FjY2Vzc1Rva2VufVwiLCB7XG4gICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29wZW5zdHJlZXRtYXAub3JnXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzLCA8YSBocmVmPVwiaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPiwgSW1hZ2VyeSBcXHhBOSA8YSBocmVmPVwiaHR0cDovL21hcGJveC5jb21cIj5NYXBib3g8L2E+JyxcbiAgICAgICAgICAgIHRpbGVTaXplOiA1MTIsXG4gICAgICAgICAgICBtYXhab29tOiAxOCxcbiAgICAgICAgICAgIHpvb21PZmZzZXQ6IC0xLFxuICAgICAgICAgICAgaWQ6IFwibWFwYm94L3N0cmVldHMtdjExXCIsXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbjogYXBpX2tleVxuICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgTC50aWxlTGF5ZXIoXCJodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZ1wiLCB7XG4gICAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+J1xuICAgICAgICAgIH0pLmFkZFRvKG1hcCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hcmtlciA9IEwubWFya2VyKFtsYXQsIGxuZ10pLmFkZFRvKG1hcCk7XG4gICAgICAgIGxldCB1cmwgPSBsYXQgKyBcIixcIiArIGxuZyArIFwiI21hcD1cIiArIHpvb20gKyBcIi9cIiArIGxhdCArIFwiL1wiICsgbG5nICsgXCImbGF5ZXJzPU5cIjtcbiAgICAgICAgbWFya2VyLmJpbmRQb3B1cChhZGRyZXNzICsgJzxwPjxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9kaXJlY3Rpb25zP2VuZ2luZT1vc3JtX2NhciZyb3V0ZT0nICsgdXJsICsgJ1wiPlJvdXRpbmcgdmlhIE9wZW5TdHJlZXRNYXA8L2E+PC9wPicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwcmludExhdGVzdFJlbGVhc2Uoc2VsZWN0b3IsIHJlcG8pIHtcbiAgICBpZiAoaHVnb0Vudmlyb25tZW50ID09PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgJC5nZXRKU09OKFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9cIiArIHJlcG8gKyBcIi90YWdzXCIpLmRvbmUoZnVuY3Rpb24oanNvbikge1xuICAgICAgICBsZXQgcmVsZWFzZSA9IGpzb25bMF07XG4gICAgICAgICQoc2VsZWN0b3IpLmFwcGVuZChcIiBcIiArIHJlbGVhc2UubmFtZSk7XG4gICAgICB9KS5mYWlsKGZ1bmN0aW9uKGpxeGhyLCB0ZXh0U3RhdHVzLCBlcnJvcikge1xuICAgICAgICBsZXQgZXJyID0gdGV4dFN0YXR1cyArIFwiLCBcIiArIGVycm9yO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlcXVlc3QgRmFpbGVkOiBcIiArIGVycik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdG9nZ2xlU2VhcmNoRGlhbG9nKCkge1xuICAgIGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNlYXJjaGluZ1wiKSkge1xuICAgICAgJChcIltpZD1zZWFyY2gtcXVlcnldXCIpLmJsdXIoKTtcbiAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2VhcmNoaW5nIGNvbXBlbnNhdGUtZm9yLXNjcm9sbGJhclwiKTtcbiAgICAgIHJlbW92ZVF1ZXJ5UGFyYW1zRnJvbVVybCgpO1xuICAgICAgJChcIiNmYW5jeWJveC1zdHlsZS1ub3Njcm9sbFwiKS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCEkKFwiI2ZhbmN5Ym94LXN0eWxlLW5vc2Nyb2xsXCIpLmxlbmd0aCAmJiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAkKFwiaGVhZFwiKS5hcHBlbmQoJzxzdHlsZSBpZD1cImZhbmN5Ym94LXN0eWxlLW5vc2Nyb2xsXCI+LmNvbXBlbnNhdGUtZm9yLXNjcm9sbGJhcnttYXJnaW4tcmlnaHQ6JyArICh3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgKyBcInB4O308L3N0eWxlPlwiKTtcbiAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJjb21wZW5zYXRlLWZvci1zY3JvbGxiYXJcIik7XG4gICAgICB9XG4gICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInNlYXJjaGluZ1wiKTtcbiAgICAgICQoXCIuc2VhcmNoLXJlc3VsdHNcIikuY3NzKHtvcGFjaXR5OiAwLCB2aXNpYmlsaXR5OiBcInZpc2libGVcIn0pLmFuaW1hdGUoe29wYWNpdHk6IDF9LCAyMDApO1xuICAgICAgJChcIiNzZWFyY2gtcXVlcnlcIikuZm9jdXMoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbm9ybWFsaXplQ2Fyb3VzZWxTbGlkZUhlaWdodHMoKSB7XG4gICAgJChcIi5jYXJvdXNlbFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGl0ZW1zID0gJChcIi5jYXJvdXNlbC1pdGVtXCIsIHRoaXMpO1xuICAgICAgaXRlbXMuY3NzKFwibWluLWhlaWdodFwiLCAwKTtcbiAgICAgIGxldCBtYXhIZWlnaHQgPSBNYXRoLm1heC5hcHBseShudWxsLCBpdGVtcy5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVySGVpZ2h0KCk7XG4gICAgICB9KS5nZXQoKSk7XG4gICAgICBpdGVtcy5jc3MoXCJtaW4taGVpZ2h0XCIsIG1heEhlaWdodCArIFwicHhcIik7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gZml4SHVnb091dHB1dCgpIHtcbiAgICAkKFwiI1RhYmxlT2ZDb250ZW50c1wiKS5hZGRDbGFzcyhcIm5hdiBmbGV4LWNvbHVtblwiKTtcbiAgICAkKFwiI1RhYmxlT2ZDb250ZW50cyBsaVwiKS5hZGRDbGFzcyhcIm5hdi1pdGVtXCIpO1xuICAgICQoXCIjVGFibGVPZkNvbnRlbnRzIGxpIGFcIikuYWRkQ2xhc3MoXCJuYXYtbGlua1wiKTtcbiAgICAkKFwiaW5wdXRbdHlwZT0nY2hlY2tib3gnXVtkaXNhYmxlZF1cIikucGFyZW50cyhcInVsXCIpLmFkZENsYXNzKFwidGFzay1saXN0XCIpO1xuICB9XG4gIGZ1bmN0aW9uIGdldFNpYmxpbmdzKGVsZW0pIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsZW0ucGFyZW50Tm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24oc2libGluZykge1xuICAgICAgcmV0dXJuIHNpYmxpbmcgIT09IGVsZW07XG4gICAgfSk7XG4gIH1cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgZml4SHVnb091dHB1dCgpO1xuICAgIGxldCB7aXNEYXJrVGhlbWUsIHRoZW1lTW9kZX0gPSBpbml0VGhlbWVWYXJpYXRpb24oKTtcbiAgICByZW5kZXJUaGVtZVZhcmlhdGlvbihpc0RhcmtUaGVtZSwgdGhlbWVNb2RlLCB0cnVlKTtcbiAgICBpZiAoY29kZUhpZ2hsaWdodGluZykge1xuICAgICAgaGxqcy5pbml0SGlnaGxpZ2h0aW5nKCk7XG4gICAgfVxuICAgIGxldCBjaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9jcy1saW5rcyAuYWN0aXZlXCIpO1xuICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvY3MtbGlua3NcIik7XG4gICAgaWYgKGNoaWxkICYmIHBhcmVudCkge1xuICAgICAgc2Nyb2xsUGFyZW50VG9DaGlsZChwYXJlbnQsIGNoaWxkKTtcbiAgICB9XG4gIH0pO1xuICAkKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgIGZpeFNjcm9sbHNweSgpO1xuICAgIGxldCBpc290b3BlSW5zdGFuY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0cy1jb250YWluZXJcIik7XG4gICAgbGV0IGlzb3RvcGVJbnN0YW5jZXNDb3VudCA9IGlzb3RvcGVJbnN0YW5jZXMubGVuZ3RoO1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiBpc290b3BlSW5zdGFuY2VzQ291bnQgPT09IDApIHtcbiAgICAgIHNjcm9sbFRvQW5jaG9yKGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uaGFzaCksIDApO1xuICAgIH1cbiAgICBsZXQgY2hpbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvY3MtdG9jIC5uYXYtbGluay5hY3RpdmVcIik7XG4gICAgbGV0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG9jcy10b2NcIik7XG4gICAgaWYgKGNoaWxkICYmIHBhcmVudCkge1xuICAgICAgc2Nyb2xsUGFyZW50VG9DaGlsZChwYXJlbnQsIGNoaWxkKTtcbiAgICB9XG4gICAgbGV0IHpvb21PcHRpb25zID0ge307XG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGFya1wiKSkge1xuICAgICAgem9vbU9wdGlvbnMuYmFja2dyb3VuZCA9IFwicmdiYSgwLDAsMCwwLjkpXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHpvb21PcHRpb25zLmJhY2tncm91bmQgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC45KVwiO1xuICAgIH1cbiAgICBtZWRpdW1fem9vbV9lc21fZGVmYXVsdChcIltkYXRhLXpvb21hYmxlXVwiLCB6b29tT3B0aW9ucyk7XG4gICAgbGV0IGlzb3RvcGVDb3VudGVyID0gMDtcbiAgICBpc290b3BlSW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24oaXNvdG9wZUluc3RhbmNlLCBpbmRleCkge1xuICAgICAgY29uc29sZS5kZWJ1ZyhgTG9hZGluZyBJc290b3BlIGluc3RhbmNlICR7aW5kZXh9YCk7XG4gICAgICBsZXQgaXNvO1xuICAgICAgbGV0IGlzb1NlY3Rpb24gPSBpc290b3BlSW5zdGFuY2UuY2xvc2VzdChcInNlY3Rpb25cIik7XG4gICAgICBsZXQgbGF5b3V0ID0gXCJcIjtcbiAgICAgIGlmIChpc29TZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuaXNvdG9wZVwiKS5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1sYXlvdXQtcm93XCIpKSB7XG4gICAgICAgIGxheW91dCA9IFwiZml0Um93c1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGF5b3V0ID0gXCJtYXNvbnJ5XCI7XG4gICAgICB9XG4gICAgICBsZXQgZGVmYXVsdEZpbHRlciA9IGlzb1NlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5kZWZhdWx0LXByb2plY3QtZmlsdGVyXCIpO1xuICAgICAgbGV0IGZpbHRlclRleHQgPSBcIipcIjtcbiAgICAgIGlmIChkZWZhdWx0RmlsdGVyICE9PSBudWxsKSB7XG4gICAgICAgIGZpbHRlclRleHQgPSBkZWZhdWx0RmlsdGVyLnRleHRDb250ZW50O1xuICAgICAgfVxuICAgICAgY29uc29sZS5kZWJ1ZyhgRGVmYXVsdCBJc290b3BlIGZpbHRlcjogJHtmaWx0ZXJUZXh0fWApO1xuICAgICAgaW1hZ2VzTG9hZGVkKGlzb3RvcGVJbnN0YW5jZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlzbyA9IG5ldyBJc290b3BlKGlzb3RvcGVJbnN0YW5jZSwge1xuICAgICAgICAgIGl0ZW1TZWxlY3RvcjogXCIuaXNvdG9wZS1pdGVtXCIsXG4gICAgICAgICAgbGF5b3V0TW9kZTogbGF5b3V0LFxuICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgIGd1dHRlcjogMjBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZpbHRlcjogZmlsdGVyVGV4dFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGlzb0ZpbHRlckJ1dHRvbnMgPSBpc29TZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1maWx0ZXJzIGFcIik7XG4gICAgICAgIGlzb0ZpbHRlckJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGxldCBzZWxlY3RvciA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpbHRlclwiKTtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKGBVcGRhdGluZyBJc290b3BlIGZpbHRlciB0byAke3NlbGVjdG9yfWApO1xuICAgICAgICAgIGlzby5hcnJhbmdlKHtmaWx0ZXI6IHNlbGVjdG9yfSk7XG4gICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgbGV0IGJ1dHRvblNpYmxpbmdzID0gZ2V0U2libGluZ3MoYnV0dG9uKTtcbiAgICAgICAgICBidXR0b25TaWJsaW5ncy5mb3JFYWNoKChidXR0b25TaWJsaW5nKSA9PiB7XG4gICAgICAgICAgICBidXR0b25TaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBidXR0b25TaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJhbGxcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5jcmVtZW50SXNvdG9wZUNvdW50ZXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGluY3JlbWVudElzb3RvcGVDb3VudGVyKCkge1xuICAgICAgaXNvdG9wZUNvdW50ZXIrKztcbiAgICAgIGlmIChpc290b3BlQ291bnRlciA9PT0gaXNvdG9wZUluc3RhbmNlc0NvdW50KSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoYEFsbCBQb3J0Zm9saW8gSXNvdG9wZSBpbnN0YW5jZXMgbG9hZGVkLmApO1xuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICBzY3JvbGxUb0FuY2hvcihkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhhc2gpLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoJChcIi5wdWItZmlsdGVycy1zZWxlY3RcIikpIHtcbiAgICAgIGZpbHRlcl9wdWJsaWNhdGlvbnMoKTtcbiAgICB9XG4gICAgJChcIi5qcy1jaXRlLW1vZGFsXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBmaWxlbmFtZSA9ICQodGhpcykuYXR0cihcImRhdGEtZmlsZW5hbWVcIik7XG4gICAgICBsZXQgbW9kYWwgPSAkKFwiI21vZGFsXCIpO1xuICAgICAgbW9kYWwuZmluZChcIi5tb2RhbC1ib2R5IGNvZGVcIikubG9hZChmaWxlbmFtZSwgZnVuY3Rpb24ocmVzcG9uc2UsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgbGV0IG1zZyA9IFwiRXJyb3I6IFwiO1xuICAgICAgICAgICQoXCIjbW9kYWwtZXJyb3JcIikuaHRtbChtc2cgKyB4aHIuc3RhdHVzICsgXCIgXCIgKyB4aHIuc3RhdHVzVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChcIi5qcy1kb3dubG9hZC1jaXRlXCIpLmF0dHIoXCJocmVmXCIsIGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtb2RhbC5tb2RhbChcInNob3dcIik7XG4gICAgfSk7XG4gICAgJChcIi5qcy1jb3B5LWNpdGVcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIGxldCBjb2RlX25vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsIC5tb2RhbC1ib2R5XCIpO1xuICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShjb2RlX25vZGUpO1xuICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcbiAgICAgIH0gY2F0Y2ggKGUyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IGNpdGF0aW9uIGNvcHkgZmFpbGVkLlwiKTtcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVSYW5nZShyYW5nZSk7XG4gICAgfSk7XG4gICAgaW5pdE1hcCgpO1xuICAgIGxldCBnaXRodWJSZWxlYXNlU2VsZWN0b3IgPSBcIi5qcy1naXRodWItcmVsZWFzZVwiO1xuICAgIGlmICgkKGdpdGh1YlJlbGVhc2VTZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgcHJpbnRMYXRlc3RSZWxlYXNlKGdpdGh1YlJlbGVhc2VTZWxlY3RvciwgJChnaXRodWJSZWxlYXNlU2VsZWN0b3IpLmRhdGEoXCJyZXBvXCIpKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgY29uc3QgYm9keTIgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICBpZiAoYm9keTIuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VhcmNoaW5nXCIpKSB7XG4gICAgICAgICAgdG9nZ2xlU2VhcmNoRGlhbG9nKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiL1wiKSB7XG4gICAgICAgIGxldCBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50Lmhhc0ZvY3VzKCkgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCBudWxsO1xuICAgICAgICBsZXQgaXNJbnB1dEZvY3VzZWQgPSBmb2N1c2VkRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHwgZm9jdXNlZEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgICAgICBpZiAoc2VhcmNoRW5hYmxlZCAmJiAhaXNJbnB1dEZvY3VzZWQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRvZ2dsZVNlYXJjaERpYWxvZygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHNlYXJjaEVuYWJsZWQpIHtcbiAgICAgICQoXCIuanMtc2VhcmNoXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0b2dnbGVTZWFyY2hEaWFsb2coKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuICB9KTtcbiAgdmFyIGxpbmtMaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2V0LXRoZW1lLWxpZ2h0XCIpO1xuICB2YXIgbGlua0RhcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNldC10aGVtZS1kYXJrXCIpO1xuICB2YXIgbGlua0F1dG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNldC10aGVtZS1hdXRvXCIpO1xuICBpZiAobGlua0xpZ2h0ICYmIGxpbmtEYXJrICYmIGxpbmtBdXRvKSB7XG4gICAgbGlua0xpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjaGFuZ2VUaGVtZU1vZGVDbGljaygwKTtcbiAgICB9KTtcbiAgICBsaW5rRGFyay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2hhbmdlVGhlbWVNb2RlQ2xpY2soMSk7XG4gICAgfSk7XG4gICAgbGlua0F1dG8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNoYW5nZVRoZW1lTW9kZUNsaWNrKDIpO1xuICAgIH0pO1xuICB9XG4gIHZhciBkYXJrTW9kZU1lZGlhUXVlcnkgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIik7XG4gIGRhcmtNb2RlTWVkaWFRdWVyeS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgIG9uTWVkaWFRdWVyeUxpc3RFdmVudChldmVudCk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbm9ybWFsaXplQ2Fyb3VzZWxTbGlkZUhlaWdodHMpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBub3JtYWxpemVDYXJvdXNlbFNsaWRlSGVpZ2h0cyk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgbm9ybWFsaXplQ2Fyb3VzZWxTbGlkZUhlaWdodHMpO1xuICAkKFwiYm9keVwiKS5vbihcIm1vdXNlZW50ZXIgbW91c2VsZWF2ZVwiLCBcIi5kcm9wZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGRyb3Bkb3duID0gJChlLnRhcmdldCkuY2xvc2VzdChcIi5kcm9wZG93blwiKTtcbiAgICB2YXIgbWVudSA9ICQoXCIuZHJvcGRvd24tbWVudVwiLCBkcm9wZG93bik7XG4gICAgZHJvcGRvd24uYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgIG1lbnUuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBkcm9wZG93bltkcm9wZG93bi5pcyhcIjpob3ZlclwiKSA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIl0oXCJzaG93XCIpO1xuICAgICAgbWVudVtkcm9wZG93bi5pcyhcIjpob3ZlclwiKSA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIl0oXCJzaG93XCIpO1xuICAgIH0sIDMwMCk7XG4gIH0pO1xuICB2YXIgcmVzaXplVGltZXI7XG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZml4U2Nyb2xsc3B5LCAyMDApO1xuICB9KTtcbn0pKCk7XG5cbjtcbigoKSA9PiB7XG4gIC8vIG5zLXBhcmFtczpAcGFyYW1zXG4gIHZhciBjb250ZW50X3R5cGUgPSB7YXV0aG9yczogXCJBdXRob3JzXCIsIGV2ZW50OiBcIkV2ZW50c1wiLCBwb3N0OiBcIlBvc3RzXCIsIHByb2plY3Q6IFwiUHJvamVjdHNcIiwgcHVibGljYXRpb246IFwiUHVibGljYXRpb25zXCIsIHNsaWRlczogXCJTbGlkZXNcIn07XG4gIHZhciBpMThuID0ge25vX3Jlc3VsdHM6IFwiTm8gcmVzdWx0cyBmb3VuZFwiLCBwbGFjZWhvbGRlcjogXCJTZWFyY2guLi5cIiwgcmVzdWx0czogXCJyZXN1bHRzIGZvdW5kXCJ9O1xuICB2YXIgc2VhcmNoX2NvbmZpZyA9IHtpbmRleFVSSTogXCIvaW5kZXguanNvblwiLCBtaW5MZW5ndGg6IDEsIHRocmVzaG9sZDogMC4zfTtcblxuICAvLyA8c3RkaW4+XG4gIHZhciBmdXNlT3B0aW9ucyA9IHtcbiAgICBzaG91bGRTb3J0OiB0cnVlLFxuICAgIGluY2x1ZGVNYXRjaGVzOiB0cnVlLFxuICAgIHRva2VuaXplOiB0cnVlLFxuICAgIHRocmVzaG9sZDogc2VhcmNoX2NvbmZpZy50aHJlc2hvbGQsXG4gICAgbG9jYXRpb246IDAsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICBtYXhQYXR0ZXJuTGVuZ3RoOiAzMixcbiAgICBtaW5NYXRjaENoYXJMZW5ndGg6IHNlYXJjaF9jb25maWcubWluTGVuZ3RoLFxuICAgIGtleXM6IFtcbiAgICAgIHtuYW1lOiBcInRpdGxlXCIsIHdlaWdodDogMC45OX0sXG4gICAgICB7bmFtZTogXCJzdW1tYXJ5XCIsIHdlaWdodDogMC42fSxcbiAgICAgIHtuYW1lOiBcImF1dGhvcnNcIiwgd2VpZ2h0OiAwLjV9LFxuICAgICAge25hbWU6IFwiY29udGVudFwiLCB3ZWlnaHQ6IDAuMn0sXG4gICAgICB7bmFtZTogXCJ0YWdzXCIsIHdlaWdodDogMC41fSxcbiAgICAgIHtuYW1lOiBcImNhdGVnb3JpZXNcIiwgd2VpZ2h0OiAwLjV9XG4gICAgXVxuICB9O1xuICB2YXIgc3VtbWFyeUxlbmd0aCA9IDYwO1xuICBmdW5jdGlvbiBnZXRTZWFyY2hRdWVyeShuYW1lKSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCgobG9jYXRpb24uc2VhcmNoLnNwbGl0KG5hbWUgKyBcIj1cIilbMV0gfHwgXCJcIikuc3BsaXQoXCImXCIpWzBdKS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpO1xuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZVVSTCh1cmwpIHtcbiAgICBpZiAoaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7cGF0aDogdXJsfSwgXCJcIiwgdXJsKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gaW5pdFNlYXJjaChmb3JjZSwgZnVzZSkge1xuICAgIGxldCBxdWVyeSA9ICQoXCIjc2VhcmNoLXF1ZXJ5XCIpLnZhbCgpO1xuICAgIGlmIChxdWVyeS5sZW5ndGggPCAxKSB7XG4gICAgICAkKFwiI3NlYXJjaC1oaXRzXCIpLmVtcHR5KCk7XG4gICAgICAkKFwiI3NlYXJjaC1jb21tb24tcXVlcmllc1wiKS5zaG93KCk7XG4gICAgfVxuICAgIGlmICghZm9yY2UgJiYgcXVlcnkubGVuZ3RoIDwgZnVzZU9wdGlvbnMubWluTWF0Y2hDaGFyTGVuZ3RoKVxuICAgICAgcmV0dXJuO1xuICAgICQoXCIjc2VhcmNoLWhpdHNcIikuZW1wdHkoKTtcbiAgICAkKFwiI3NlYXJjaC1jb21tb24tcXVlcmllc1wiKS5oaWRlKCk7XG4gICAgc2VhcmNoQWNhZGVtaWMocXVlcnksIGZ1c2UpO1xuICAgIGxldCBuZXdVUkwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIFwiP3E9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgdXBkYXRlVVJMKG5ld1VSTCk7XG4gIH1cbiAgZnVuY3Rpb24gc2VhcmNoQWNhZGVtaWMocXVlcnksIGZ1c2UpIHtcbiAgICBsZXQgcmVzdWx0cyA9IGZ1c2Uuc2VhcmNoKHF1ZXJ5KTtcbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAkKFwiI3NlYXJjaC1oaXRzXCIpLmFwcGVuZCgnPGgzIGNsYXNzPVwibXQtMFwiPicgKyByZXN1bHRzLmxlbmd0aCArIFwiIFwiICsgaTE4bi5yZXN1bHRzICsgXCI8L2gzPlwiKTtcbiAgICAgIHBhcnNlUmVzdWx0cyhxdWVyeSwgcmVzdWx0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2VhcmNoLWhpdHNcIikuYXBwZW5kKCc8ZGl2IGNsYXNzPVwic2VhcmNoLW5vLXJlc3VsdHNcIj4nICsgaTE4bi5ub19yZXN1bHRzICsgXCI8L2Rpdj5cIik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHBhcnNlUmVzdWx0cyhxdWVyeSwgcmVzdWx0cykge1xuICAgICQuZWFjaChyZXN1bHRzLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICBsZXQgY29udGVudF9rZXkgPSB2YWx1ZS5pdGVtLnNlY3Rpb247XG4gICAgICBsZXQgY29udGVudCA9IFwiXCI7XG4gICAgICBsZXQgc25pcHBldCA9IFwiXCI7XG4gICAgICBsZXQgc25pcHBldEhpZ2hsaWdodHMgPSBbXTtcbiAgICAgIGlmIChbXCJwdWJsaWNhdGlvblwiLCBcImV2ZW50XCJdLmluY2x1ZGVzKGNvbnRlbnRfa2V5KSkge1xuICAgICAgICBjb250ZW50ID0gdmFsdWUuaXRlbS5zdW1tYXJ5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IHZhbHVlLml0ZW0uY29udGVudDtcbiAgICAgIH1cbiAgICAgIGlmIChmdXNlT3B0aW9ucy50b2tlbml6ZSkge1xuICAgICAgICBzbmlwcGV0SGlnaGxpZ2h0cy5wdXNoKHF1ZXJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQuZWFjaCh2YWx1ZS5tYXRjaGVzLCBmdW5jdGlvbihtYXRjaEtleSwgbWF0Y2hWYWx1ZSkge1xuICAgICAgICAgIGlmIChtYXRjaFZhbHVlLmtleSA9PSBcImNvbnRlbnRcIikge1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbWF0Y2hWYWx1ZS5pbmRpY2VzWzBdWzBdIC0gc3VtbWFyeUxlbmd0aCA+IDAgPyBtYXRjaFZhbHVlLmluZGljZXNbMF1bMF0gLSBzdW1tYXJ5TGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGxldCBlbmQgPSBtYXRjaFZhbHVlLmluZGljZXNbMF1bMV0gKyBzdW1tYXJ5TGVuZ3RoIDwgY29udGVudC5sZW5ndGggPyBtYXRjaFZhbHVlLmluZGljZXNbMF1bMV0gKyBzdW1tYXJ5TGVuZ3RoIDogY29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICBzbmlwcGV0ICs9IGNvbnRlbnQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgc25pcHBldEhpZ2hsaWdodHMucHVzaChtYXRjaFZhbHVlLnZhbHVlLnN1YnN0cmluZyhtYXRjaFZhbHVlLmluZGljZXNbMF1bMF0sIG1hdGNoVmFsdWUuaW5kaWNlc1swXVsxXSAtIG1hdGNoVmFsdWUuaW5kaWNlc1swXVswXSArIDEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHNuaXBwZXQubGVuZ3RoIDwgMSkge1xuICAgICAgICBzbmlwcGV0ICs9IHZhbHVlLml0ZW0uc3VtbWFyeTtcbiAgICAgIH1cbiAgICAgIGxldCB0ZW1wbGF0ZSA9ICQoXCIjc2VhcmNoLWhpdC1mdXNlLXRlbXBsYXRlXCIpLmh0bWwoKTtcbiAgICAgIGlmIChjb250ZW50X2tleSBpbiBjb250ZW50X3R5cGUpIHtcbiAgICAgICAgY29udGVudF9rZXkgPSBjb250ZW50X3R5cGVbY29udGVudF9rZXldO1xuICAgICAgfVxuICAgICAgbGV0IHRlbXBsYXRlRGF0YSA9IHtcbiAgICAgICAga2V5LFxuICAgICAgICB0aXRsZTogdmFsdWUuaXRlbS50aXRsZSxcbiAgICAgICAgdHlwZTogY29udGVudF9rZXksXG4gICAgICAgIHJlbHBlcm1hbGluazogdmFsdWUuaXRlbS5yZWxwZXJtYWxpbmssXG4gICAgICAgIHNuaXBwZXRcbiAgICAgIH07XG4gICAgICBsZXQgb3V0cHV0ID0gcmVuZGVyKHRlbXBsYXRlLCB0ZW1wbGF0ZURhdGEpO1xuICAgICAgJChcIiNzZWFyY2gtaGl0c1wiKS5hcHBlbmQob3V0cHV0KTtcbiAgICAgICQuZWFjaChzbmlwcGV0SGlnaGxpZ2h0cywgZnVuY3Rpb24oaGxLZXksIGhsVmFsdWUpIHtcbiAgICAgICAgJChcIiNzdW1tYXJ5LVwiICsga2V5KS5tYXJrKGhsVmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCBkYXRhKSB7XG4gICAgbGV0IGtleSwgZmluZCwgcmU7XG4gICAgZm9yIChrZXkgaW4gZGF0YSkge1xuICAgICAgZmluZCA9IFwiXFxcXHtcXFxce1xcXFxzKlwiICsga2V5ICsgXCJcXFxccypcXFxcfVxcXFx9XCI7XG4gICAgICByZSA9IG5ldyBSZWdFeHAoZmluZCwgXCJnXCIpO1xuICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHJlLCBkYXRhW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cbiAgaWYgKHR5cGVvZiBGdXNlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAkLmdldEpTT04oc2VhcmNoX2NvbmZpZy5pbmRleFVSSSwgZnVuY3Rpb24oc2VhcmNoX2luZGV4KSB7XG4gICAgICBsZXQgZnVzZSA9IG5ldyBGdXNlKHNlYXJjaF9pbmRleCwgZnVzZU9wdGlvbnMpO1xuICAgICAgbGV0IHF1ZXJ5ID0gZ2V0U2VhcmNoUXVlcnkoXCJxXCIpO1xuICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwic2VhcmNoaW5nXCIpO1xuICAgICAgICAkKFwiLnNlYXJjaC1yZXN1bHRzXCIpLmNzcyh7b3BhY2l0eTogMCwgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCJ9KS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgMjAwKTtcbiAgICAgICAgJChcIiNzZWFyY2gtcXVlcnlcIikudmFsKHF1ZXJ5KTtcbiAgICAgICAgJChcIiNzZWFyY2gtcXVlcnlcIikuZm9jdXMoKTtcbiAgICAgICAgaW5pdFNlYXJjaCh0cnVlLCBmdXNlKTtcbiAgICAgIH1cbiAgICAgICQoXCIjc2VhcmNoLXF1ZXJ5XCIpLmtleXVwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KCQuZGF0YSh0aGlzLCBcInNlYXJjaFRpbWVyXCIpKTtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgIGluaXRTZWFyY2godHJ1ZSwgZnVzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzKS5kYXRhKFwic2VhcmNoVGltZXJcIiwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGluaXRTZWFyY2goZmFsc2UsIGZ1c2UpO1xuICAgICAgICAgIH0sIDI1MCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufSkoKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUE7QUFDQTtBQUNBO0FBR0EsRUFBQyxPQUFNO0FBRUw7QUFDQSxRQUFJLFdBQVcsT0FBTyxVQUFVLFNBQVMsUUFBUTtBQUMvQyxlQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFB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
