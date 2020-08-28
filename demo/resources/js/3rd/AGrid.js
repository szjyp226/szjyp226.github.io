

// AGrid 设置相同高度
/* 组件：弹性高度盒子
 * 依赖：$.throttle
 =================*/
!function ($) {
    'use strict';

    // FLEX CLASS DEFINITION
    // =====================

    function FlexHeight($items) {
        var that = this;
        this.autoEqual = true;
        this.$items = $items;
        this.equal();
        if ($.throttle) {
            $(window).resize($.throttle(function () {
                that.equal();
            }));
        } else {
            $(window).resize(function () {
                that.equal();
            });
        }
    }

    FlexHeight.prototype.equal = function () {
        if (!this.autoEqual) return;
        var maxHeight = 0;
        this.$items
            .height('')
            .each(function () {
                var height = $(this).height();
                if (maxHeight < height) {
                    maxHeight = height;
                }
            })
            .height(maxHeight);
    };

    FlexHeight.prototype.auto = function (param) {
        if (param === undefined || this.autoEqual == param) {
            return
        }

        this.autoEqual = !!param;

        if (this.autoEqual) {
            this.equal()
        } else {
            this.$items.height('');
        }

    };

    // FLEX_HEIGHT PLUGIN DEFINITION
    // =============================

    var old = $.fn.flexHeight;

    $.fn.flexHeight = function (option, param) {
        return this.each(function () {
            var $this = $(this);
            var $items;
            var data = $this.data('hw.flexHeight');

            if (!data) {
                if (option && option.items) {
                    $items = $this.find(option.items);
                } else {
                    $items = $this.children('.flex-item');
                }
                $this.data('hw.flexHeight', new FlexHeight($items));
            }

            if (typeof option == 'string') {
                data[option](param);
            }
        });
    };

    $.fn.flexHeight.Constructor = FlexHeight;


    // FLEX_HEIGHT NO CONFLICT
    // =======================

    $.fn.flexHeight.noConflict = function () {
        $.fn.flexHeight = old;
        return this
    };


    // FLEX_HEIGHT AUTO INIT
    // =====================

    $(document).ready(function () {
        $('[data-toggle="flexHeight"]').flexHeight();
    });

}(jQuery);


/* 工具：函数节流
 ==============*/
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