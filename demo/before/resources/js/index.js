/******** ViewMotion start ************************
 * ViewMotion 页面滚动载入动画
 * version：1.0
 * author： Devin Carl
 * Release Note 1.0 :
 * 支持页面滚动时，页面内容载入动画。动画支持Animate.css所有效果；
 * 修复重复调用时，已完成元素仍被执行的问题
 ********/
var AUI = AUI || {};;
(function (window, $, NS, undefined) {
    "use strict"
    var uniqueCntr = 0;

    //custom scroll replacement to allow for interval-based 'polling'
    //rathar than checking on every pixel
    $.fn.scrolled = function (waitTime, fn) {
        if (typeof waitTime === 'function') {
            fn = waitTime;
            waitTime = 200;
        }
        var tag = 'scrollTimer' + uniqueCntr++;
        this.scroll(function () {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    };

    NS.ViewMotion = function (options) {
        //some default settings. animateThreshold controls the trigger point
        //for animation and is subtracted from the bottom of the viewport.
        var settings = $.extend({
            animateThreshold: 0,
            scrollPollInterval: 20
        }, options);

        //keep the matched elements in a variable for easy reference
        var collection = "[vm-type=1]";
        if (!$(collection).length) {
            return
        };

        //cycle through each matched element and wrap it in a block/div
        //and then proceed to fade out the inner contents of each matched element
        $(collection).each(function (index, element) {
            $(element).wrap('<div class="vm-container"></div>');
            $(element).css('opacity', 0);
            var l = $(element).attr('vm-level');
            l && $(element).addClass('level' + l);
        });

        /**
         * returns boolean representing whether element's top is coming into bottom of viewport
         *
         * @param HTMLDOMElement element the current element to check
         */
        function EnteringViewport(element) {
            var elementOffset = $(element).offset();
            var elementTop = elementOffset.top + $(element).scrollTop();
            var elementBottom = elementOffset.top + $(element).scrollTop() + $(element).height();
            var viewportBottom = $(window).scrollTop() + $(window).height();
            return (elementTop < (viewportBottom - settings.animateThreshold)) ? true : false;
        }

        //cycle through each matched element to make sure any which should be animated into view,
        //are animated on page load rather than needing to wait for initial 'scrolled' event
        $(collection).each(function (index, element) {
            var elementParentContainer = $(element).parent('.vm-container');
            if ($(element).is('[vm-animation]') && !$(elementParentContainer).hasClass('vm-visible') && EnteringViewport(elementParentContainer)) {
                $(element).css('opacity', 1);
                $(elementParentContainer).addClass('vm-visible');
                $(element).addClass('animated ' + $(element).attr('vm-animation'));
                $(element).attr('vm-type', '0');
            }
        });

        //enable the scrolled event timer to watch for elements coming into the viewport
        //from the bottom. default polling time is 20 ms. This can be changed using
        //'scrollPollInterval' from the user visible options
        $(window).scrolled(settings.scrollPollInterval, function () {
            $(collection).each(function (index, element) {
                var elementParentContainer = $(element).parent('.vm-container');
                if ($(element).is('[vm-animation]') && !$(elementParentContainer).hasClass('vm-visible') && EnteringViewport(elementParentContainer)) {
                    $(element).css('opacity', 1);
                    $(elementParentContainer).addClass('vm-visible');
                    $(element).addClass('animated ' + $(element).attr('vm-animation'));
                    $(element).attr('vm-type', '0');
                }
            });
        });
    };
})(window, jQuery, AUI);
/*********** ViewMotion end *********************/
/******** Carousel start ************************
 * Carousel 
 * version：1.0
 * author： Devin Carl
 *
 ********/
var AUI = AUI || {};
(function (window, $, NS, undefined) {
    "use strict"

    NS.Carousel = function (params) {
        if ($(params.obj).length == 0) {
            return
        };
        this._settings = $.extend({
            obj: null,
            effect: "fade",
            autoPlay: true,
            start: 0,
            duration: 800,
            delay: 1000,
            onOneLoaded: null,
            onAllLoaded: null,
            onSwitch: null
        }, params || {});

        this.onSwitch = this._settings.onSwitch;
        var $carousel = $(this._settings.obj),
            self = this;

        // init the Carousel
        $carousel.addClass("aui-Carousel");
        $carousel.addClass(this._settings.effect);
        $carousel.children('ul').addClass('wrappers');
        var $wrappers = $carousel.find('.wrappers'),
            $wrapItem = $carousel.find('.wrappers li'),
            _imgtotal = $wrapItem.length,
            _start = this._settings.start % _imgtotal,
            _currIndex = _start,
            _isAutoPlay = this._settings.autoPlay,
            _timeInt = null,
            _effect = this._settings.effect,
            _nextIndex,
            loadcnt = 0,
            onOneLoaded = this._settings.onOneLoaded,
            onAllLoaded = this._settings.onAllLoaded;

        $wrapItem.removeClass('active').eq(_start).addClass('active');


        // 移动端检测
        this.mobile = false;
        var ua = navigator && navigator.userAgent;
        if (ua.toLowerCase().indexOf('android') > -1 || (/iPad/i).test(ua) || (/iPhone/i).test(ua)) {
            this.mobile = true;
        }
        // set wrapper style
        _setWrapper();
        //create controls layers
        _createControlsLayer();
        // bind the events
        _bindEvents();

        function _setWrapper() {
            // set wrapper style
            if (_effect == 'slide') {
                $wrappers.css('width', (_imgtotal * 100) + '%');
                $wrapItem.width((1 / _imgtotal * 100) + '%');
            };
        }

        function _createControlsLayer() {
            //create controls layers
            var controls = '<div class="car-controls"> <ul class="car-bullets"></ul> </div>',
                bullet = '<li class="car-bullet"></li>';
            $(controls).appendTo($carousel);

            for (var i = 0; i < _imgtotal; i++) {
                $(bullet).appendTo($carousel.find(".car-bullets"));
            };
            $carousel.find(".car-bullet").eq(_start).addClass('active');

            if (!self.mobile) {
                var hotarea = '<div class="car-hotarea prev"><span class="car-btn">&lt</span></div><div class="car-hotarea next"><span class="car-btn ">&gt</span></div>';
                $(hotarea).appendTo($carousel.find(".car-controls"));
            };
        }

        function _bindEvents() {
            // 图片加载后设置位置
            $carousel.find('img').one('load', function () {
                onOneLoaded && typeof onOneLoaded === 'function' && onOneLoaded(this);
                loadcnt++;
                if (loadcnt == _imgtotal && _isAutoPlay) {
                    autoPlay();
                    onAllLoaded && typeof onAllLoaded === 'function' && onAllLoaded();
                };
            }).each(function (index) {
                if (this.complete) {
                    $(this).load();
                };
            });
            //绑定事件
            $carousel.find('.car-bullets li').hover(function (event) {
                _nextIndex = $(this).index();
                self.onSwitch && self.onSwitch(_nextIndex, _currIndex);
                playEffect(_nextIndex); 
                if (loadcnt == _imgtotal && _isAutoPlay) {
                    autoPlay(true);
                }; 
            });
            // 移动端
            if (self.mobile) {
                var touch = new NS.Touch(self._settings.obj);
                var dlimit = 30,
                    s_ml = 0;
                touch.end = function (sx, sy, ex, ey, o) {
                    if (_effect == 'slide') {
                        dlimit = $carousel.width() / 6;
                    }

                    var dx = ex - sx;
                    if (Math.abs(dx) < dlimit) {
                        if (_effect == 'slide') {
                            playEffect(_currIndex);
                        }
                        return;
                    };

                    if (dx > dlimit) {
                        _nextIndex = _currIndex - 1 >= 0 ? _currIndex - 1 : _imgtotal - 1;
                    };
                    if (dx < -1 * dlimit) {
                        _nextIndex = _currIndex + 1 <= _imgtotal - 1 ? _currIndex + 1 : 0;
                    };
                    playEffect(_nextIndex);
                    if (loadcnt == _imgtotal && _isAutoPlay) {
                        autoPlay(true);
                    };

                };
                touch.start = function () {
                    $wrappers.css('transition-duration', '0s');
                    // console.log($wrappers.css('webkitTransform'));
                    s_ml = Number(parseFloat($wrappers.css('webkitTransform').split(',')[4])) || 0;
                    // console.log(s_ml);
                }
                touch.move = function (sx, sy, dx, dy, o) {
                    if (_effect == 'slide') {
                        $wrappers.css({
                            "-webkit-transform": 'translate3d(' + (s_ml + dx) + 'px' + ',0,0)',
                            transform: 'translate3d(' + (s_ml + dx) + 'px' + ',0,0)'
                        });
                        // console.log(s_ml + dx);
                    };
                }
            };
            // 非移动端
            if (!self.mobile) {
                $carousel.on('click', '.car-hotarea', function (event) {
                    if ($(this).hasClass('prev')) {
                        _nextIndex = _currIndex - 1 >= 0 ? _currIndex - 1 : _imgtotal - 1;
                    };
                    if ($(this).hasClass('next')) {
                        _nextIndex = _currIndex + 1 <= _imgtotal - 1 ? _currIndex + 1 : 0;
                    };
                    self.onSwitch && self.onSwitch(_nextIndex, _currIndex);
                    playEffect(_nextIndex); 
                    if (loadcnt == _imgtotal && _isAutoPlay) {
                        autoPlay(true);
                    };
                });  
                // $carousel.on("mouseenter", '.wrappers', function (event){
                //     autoPlay(true);
                //     console.log("true")
                // }).on("mouseleave", '.wrappers', function (event){
                //     autoPlay();
                //     console.log("false")
                // });
            };
        }

        function autoPlay(reboot) {
            if (reboot) {
                clearInterval(_timeInt);
            };
            _timeInt = setInterval(function () {
                var _nextIndex = _currIndex + 1 <= _imgtotal - 1 ? _currIndex + 1 : 0;
                playEffect(_nextIndex);
            }, 10000); 
        }

        function playEffect(nextId) {
            if (_effect == 'slide') {
                $wrappers.css('transition-duration', self._settings.duration / 1000 + 's');
                $wrappers.css({
                    "-webkit-transform": 'translate3d(' + (-1 * nextId * 100 / _imgtotal) + '%' + ',0,0)',
                    transform: 'translate3d(' + (-1 * nextId * 100 / _imgtotal) + '%' + ',0,0)'
                });
            } else if (_effect == 'fade') {
                $wrapItem.css('transition-duration', self._settings.duration / 1000 + 's');
            };
            $wrapItem.eq(_currIndex).removeClass('active');
            $wrapItem.eq(nextId).addClass('active');
            $carousel.find('.car-bullets li').removeClass('active').eq(nextId).addClass('active');
            _currIndex = nextId;
        }
        this.playEffect = playEffect;
    }
    NS.Carousel.prototype.play = function (idx) {
        this.playEffect(idx);
    }

    // handle touch event
    NS.Touch = function (container, start, move, end) {
        this.available = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

        if (!this.available || !container) {
            return
        };
        var obj = document.querySelectorAll(container),
            self = this;
        if (obj.length < 1) {
            return
        };
        self.start = start;
        self.move = move;
        self.end = end;
        var startX, startY, endX, endY;

        _bindEvents();

        function _bindEvents() {
            for (var i = 0; i < obj.length; i++) {
                obj[i].addEventListener('touchstart', _touchStartEvent, false);
            }
        }

        function _touchStartEvent(e) {
            var touch = e.touches[0],
                x = Number(touch.pageX),
                y = Number(touch.pageY);

            endX = startX = x;
            endY = startY = y;
            e.target.addEventListener('touchmove', _touchMoveEvent, false);
            e.target.addEventListener('touchend', _touchEndEvent, false);

            self.start && typeof self.start == 'function' && self.start(x, y, e.target);
        };

        function _touchMoveEvent(e) {
            var touch = e.touches[0],
                x = Number(touch.pageX),
                y = Number(touch.pageY);

            endX = x;
            endY = y;
            var dx = x - startX,
                dy = y - startY;
            if (Math.abs(dy) < Math.abs(dx)) {
                e.preventDefault();
            };
            self.move && typeof self.move == 'function' && self.move(x, y, dx, dy, e.target);
        };

        function _touchEndEvent(e) {
            e.target.removeEventListener('touchmove', this, false);
            e.target.removeEventListener('touchend', this, false);
            self.end && typeof self.end == 'function' && self.end(startX, startY, endX, endY, e.target);
        };
    };
})(window, jQuery, AUI);
/*********** Carousel end *********************/
/*********** region util: media query *************/
!function ($) {
    'use strict';

    var map = {
        '21px': 0,
        '22px': 768,
        '23px': 1024,
        '24px': 1280,
        '25px': 1366,
        '26px': 1680
    };

    // 查询设备尺寸类型
    // ==============
    var $title = $('title');
    var deviceSizeQuery = function () {
        var titleFontSize = $title.css('fontSize');
        return map[titleFontSize];
    };

    // 判断设备尺寸类型是否属于PC端
    // =========================

    deviceSizeQuery.isPcSize = function () {
        return this() >= 1024;
    };

    $.deviceSizeQuery = deviceSizeQuery;

}(jQuery);
/*********** endregion util: media query *************/

/*********** region util: function throttle *************/
!function ($) {
    'use strict';
    $.throttle = function ( fn, interval ) {
        var __self = fn, // 保存需要被延迟执行的函数引用
            timer, // 定时器
            firstTime = true; // 是否是第一次调用
        interval = interval || 150;
        return function () {
            var args = arguments,
                __me = this;
            if ( firstTime ) { // 如果是第一次调用，不需延迟执行
                __self.apply(__me, args);
                return firstTime = false;
            }
            if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
                return false;
            }
            timer = setTimeout(function () { // 延迟一段时间执行
                clearTimeout(timer);
                timer = null;
                __self.apply(__me, args);
            }, interval);
        };
    };
}(jQuery);
/*********** endregion util: function throttle *************/

/*********** region section: banner *************/
$(function () {
    var win_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (win_width >= 1024) {
        var $carousels = $(".aui-Carousel").find('img');
        $carousels.first().attr('src', $carousels.first().attr("pc-src"));
        setTimeout(function () {
            $carousels.each(function (index, el) {
                if (index > 0) {
                    $(this).attr('src', $(this).attr("pc-src"));
                }
                ;
            });
        }, 1000);

    } else {
        $(".aui-Carousel").find('.video-cover').show();
        $(".aui-Carousel").find('img').each(function (index, el) {
            $(this).attr('src', $(this).attr("mb-src"));
        });
    }

    /* 轮播图 */
    // 设置第一张轮播图
    $('.dc-SlideShow').find('>ul>li').first().find('.slide-content').addClass('slide-play')
        .parent().find('[slider-transition-enter-effect]').attr('slider-transition-state', 'enter');

    // 实例化轮播图
    var effect = win_width >= 1023 ? "fade" : "slide";
    var slideShow = new DcUI.dcSlideShow({
        obj: ".dc-SlideShow",
        effect: effect,
        autoPlay: true,
        duration: 800,
        holdTime: 5000,
        mouseDrag: false,
        PCMinSize: 1024,
        beforeSwitch: function (curr, prev) {
            // 退场动画
            prev.find('[slider-exit-effect]').each(function () {
                var $this = $(this);
                $this.addClass($this.attr('slider-exit-effect'))
                    .css({
                        'animation-duration': $this.attr('slider-exit-duration'),
                        'animation-delay': $this.attr('slider-exit-delay')
                    });
            });

            // 退场动画（transition实现）
            prev.find('[slider-transition-exit-effect]').each(function () {
                var $this = $(this);
                $this.attr('slider-transition-state', 'exit')
                    .css({
                        'transition-duration': $this.attr('slider-transition-exit-duration'),
                        'transition-delay': $this.attr('slider-transition-exit-delay')
                    });
            });
        },
        afterSwitch: function (curr, prev) {
            // 入场动画
            curr.find('.slide-content').addClass('slide-play');

            curr.find('[slider-play-effect]').each(function (i, el) {
                var $el = $(el);
                $el.addClass($el.attr('slider-play-effect'));
                $el.css({
                    'animation-duration': $el.attr('slider-play-duration'),
                    'animation-delay': $el.attr('slider-play-delay')
                });
            });
            curr.find('[slider-exit-effect]').each(function () {
                var $this = $(this);
                $this.removeClass($this.attr('slider-exit-effect'));
            });

            // 重置当前banner退场动画样式
            prev.find('.slide-content').removeClass('slide-play');

            prev.find('[slider-play-effect]').each(function (i, el) {
                var $el = $(el);
                $el.removeClass($el.attr('slider-play-effect'));
            });

            // 入场动画（transition实现）
            curr.find('[slider-transition-enter-effect]').each(function () {
                var $this = $(this);
                $this.attr('slider-transition-state', 'enter')
                    .css({
                        'transition-duration': $this.attr('slider-transition-enter-duration'),
                        'transition-delay': $this.attr('slider-transition-enter-delay')
                    });
            });
            // 重置当前banner退场动画（transition实现）样式
            prev.find('[slider-transition-exit-effect]').each(function () {
                var $this = $(this);
                $this.attr('slider-transition-state', '')
            });
        }
    });
});
/*********** endregion section: banner *************/

/****** region section: product *******/
$(document).on('click', '.product-nav-tabs>li>a', function (e) {
    e.preventDefault();

    var $this = $(this);
    var $parent = $this.parent();

    var $container = $parent.parent().parent();
    var $target_panel = $($this.attr('data-target'));
    var $tab_content = $container.find('.product-tab-content');
    var $target_content = $target_panel.parent();
    $tab_panel = $tab_content.children('.product-tab-panel');

    if($parent.hasClass('active')) {
        $parent.removeClass('active');
        $target_content.height(0);
        return;
    }

    $tab_content.each(function () {
        $(this).height($(this).outerHeight());
    });

    $container.find('.product-nav-tabs>li').removeClass('active');
    $parent.addClass('active');
    $tab_panel.removeClass('active');
    $target_panel.addClass('active');

    $target_content.height($target_panel.outerHeight());
    $tab_content.not($target_content[0]).height(0);
});
/****** endregion section: product *******/

/****** region section: solution *******/
!function ($) {
    /* PC端固定卡片宽高比 */
    var resizeItem = $.throttle(function () {
        if(!$.deviceSizeQuery.isPcSize()) return;
        var height_width_ratio = 450 / 288;
        var $item = $('.solution-item');
        var $inner = $item.children('.solution-inner');
        var itemWidth = $item.width();
        var height = itemWidth * height_width_ratio;
        $item.height(height);
        $inner.css('padding-top', (height - 110) / 2);
    });
    $(document).ready(function () {
        resizeItem();
    });
    $(window).resize(resizeItem);

    /* 移动端点击展开收起 */
    $(document).on('click', '.section-solution .section-more-wrap>a', function () {
        $(this).closest('.solution-wrapper').find('.solution-body').toggleClass('showmore');
    });
}(jQuery);
/****** endregion section: solution *******/
