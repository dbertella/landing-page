// - - - - - - - - - - - - - - - - - - - - - - - - -
//  iScroll
// - - - - - - - - - - - - - - - - - - - - - - - - -

function initializeScroll(modalOuterBox) {
    if (Modernizr.mq("screen and (max-width:1024px)")) {
        myScroll = new IScroll(modalOuterBox[0], {
            scrollX: false,
            scrollY: true,
            mouseWheel: true
            , click: false
            , preventDefaultException: {tagName: /.*/}
            , keyBindings: true
            , scrollbars: true
            , useTransform: true
            , useTransition: false
            , probeType: 3
            , momentum: true
            , bounce: false
        });
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - -
//  No parent scroll
// - - - - - - - - - - - - - - - - - - - - - - - - -

$('.no-parent-scroll').on('DOMMouseScroll mousewheel', function (ev) {
    var $this = $(this),
            scrollTop = this.scrollTop,
            scrollHeight = this.scrollHeight,
            height = $this.height(),
            delta = ev.originalEvent.wheelDelta,
            up = delta > 0;

    var prevent = function () {
        ev.stopPropagation();
        ev.preventDefault();
        ev.returnValue = false;
        return false;
    }

    if (!up && -delta > scrollHeight - height - scrollTop) {
        // Scrolling down, but this will take us past the bottom.
        $this.scrollTop(scrollHeight);
        return prevent();
    } else if (up && delta > scrollTop) {
        // Scrolling up, but this will take us past the top.
        $this.scrollTop(0);
        return prevent();
    }
});

$('.no-parent-scroll-mobile').on('DOMMouseScroll mousewheel', function (ev) {

    if (Modernizr.mq("screen and (max-width:1024px)")) {

        var $this = $(this),
                scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = $this.height(),
                delta = ev.originalEvent.wheelDelta,
                up = delta > 0;

        var prevent = function () {
            ev.stopPropagation();
            ev.preventDefault();
            ev.returnValue = false;
            return false;
        }

        if (!up && -delta > scrollHeight - height - scrollTop) {
            // Scrolling down, but this will take us past the bottom.
            $this.scrollTop(scrollHeight);
            return prevent();
        } else if (up && delta > scrollTop) {
            // Scrolling up, but this will take us past the top.
            $this.scrollTop(0);
            return prevent();
        }

    }

});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Global
// - - - - - - - - - - - - - - - - - - - - - - - - -

function reflowDropdown() {
    $(document).foundation('dropdown', 'reflow');
    $(window).trigger('resize');
}

var ms_ie = false;
var ua = window.navigator.userAgent;
var old_ie = ua.indexOf('MSIE ');
var new_ie = ua.indexOf('Trident/');

if ((old_ie > -1) || (new_ie > -1)) {
    ms_ie = true;
}

$(".back_to_top").click(function () {
    if ($('.main-scroller').length) {
        $('.main-scroller').animate({scrollTop: 0}, '500', 'swing');
    } else {
        $('html,body').animate({scrollTop: 0}, '500', 'swing');
    }
});

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        }
    });
}

$('.ui-slider-handle').draggable();

$('textarea:not(.no-grow)').autogrow();

//$('#editor').trumbowyg({
//    fullscreenable: false,
//    autogrow: true,
//    btns: ['bold', 'italic', '|', 'link']
//});

// Show more

$('[data-show-class]').click(function (event) {
    event.preventDefault();
    var data = $(this).data('show-class');
    var boundary = $(this).data('boundary-class');
    $(this).closest('.' + boundary).find('.' + data).removeClass(data);
    $(this).hide();
});

// Action buttons

$('.btn--action').click(function (event) {
    event.preventDefault();
    $(this).toggleClass('btn--active');
});

// 	Croppic
if (typeof cropperOptions !== 'undefined') {
    var cropperHeader = new Croppic('profile-picture-uploader', cropperOptions);
}
//	Form choice
$('.clear-choice').click(function (event) {
    event.preventDefault();
    $(this).parents('.form_choice').addClass('hide');
    //$(this).siblings('.form_choice_inner').html('');
});

$('[data-show-target]').click(function (event) {
    if ($(this).is('a')) {
        event.preventDefault();
    }
    var target = $(this).data('show-target');
    $(target).removeClass('hide');
});

$('[data-hide-target]').click(function (event) {
    if ($(this).is('a')) {
        event.preventDefault();
    }
    var target = $(this).data('hide-target');
    $(target).addClass('hide');
});

//	Color picker
if ($('input.colorpicker').length > 0) {
    $('input.colorpicker').colorPicker();
}

// Date & time picker

$('.datetimepicker').datetimepicker({
    onGenerate: function (ct) {
        jQuery(this).find('.xdsoft_date,.xdsoft_time').toggleClass('xdsoft_disabled');
        jQuery('td[data-date="2"][data-month="1"][data-year="2015"]').removeClass('xdsoft_disabled');
        jQuery('div[data-hour="8"][data-minute="0"]').removeClass('xdsoft_disabled');
        jQuery('div[data-hour="15"][data-minute="0"]').removeClass('xdsoft_disabled');
    },
    lang: 'it',
    format: 'd/m/Y H:i'
});

$('#datepicker_filter_start').datetimepicker({
    timepicker: false,
    format: 'd/m/Y',
    lang: 'it',
    closeOnDateSelect: true,
    minDate: 0,
    scrollInput: false,
    scrollMonth: false,
    scrollTime: false,
    onSelectDate: function (ct, $i) {
        if ($("[name='date_from']").val() && $("[name='date_to']").val()) {
            doSearch($("#form_filters")[0], map.getBounds());
        }
    }
});

$('#datepicker_filter_end').datetimepicker({
    timepicker: false,
    format: 'd/m/Y',
    lang: 'it',
    closeOnDateSelect: true,
    minDate: 0,
    scrollInput: false,
    scrollMonth: false,
    scrollTime: false,
    onSelectDate: function (ct, $i) {
        if ($("[name='date_from']").val() && $("[name='date_to']").val()) {
            doSearch($("#form_filters")[0], map.getBounds());
        }
    }
});

$('.datepicker').datetimepicker({
    timepicker: false,
    format: 'd/m/Y',
    lang: 'it',
    scrollInput: false,
    scrollMonth: false,
    scrollTime: false,
    onSelectDate: function (ct, $i) {
        var toDate = new Date(ct);
        $('#bbCal').fullCalendar("gotoDate", toDate);
    },
    onGenerate: function () {
        $(".xdsoft_today_button").unbind("click").click(function () {
            var toDate = new Date();
            $('#bbCal').fullCalendar("gotoDate", toDate);
        });
    }
});

$('.timepicker').datetimepicker({
    lang: 'it',
    datepicker: false,
    format: 'H:i',
    step: 15,
    scrollInput: false,
    scrollMonth: false,
    scrollTime: false,
    onGenerate: function (ct) {
        if ($(this).find(".xdsoft_time[data-hour='23'][data-minute='59']").length == 0) {
            $(this).find('.xdsoft_time_variant').append('<div class="xdsoft_time " data-hour="23" data-minute="59">23:59</div>');
        }
    }
});

// Post tabs

$('[data-show-field-class]').click(function () {
    var data = $(this).data('show-field-class');
    $('.hideable-field').addClass('hide');
    $('.' + data).removeClass('hide');
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Mobile
// - - - - - - - - - - - - - - - - - - - - - - - - -

var scrollToBeforeMobile;

$('.mobile-menu-trigger').click(function () {
    if ($('body').hasClass('mobile-menu-open')) {
        $('body').removeClass('mobile-menu-open').animate({scrollTop: scrollToBeforeMobile}, 0);
    } else {
        scrollToBeforeMobile = $('body').scrollTop();
        $('body').addClass('mobile-menu-open');
    }
});

$('.toggle-module').click(function (e) {
    e.preventDefault();
    $(this).hide();
    var target = $(this).data('toggle-module');
    $('.toggle-module').not($(this)).show();
    if (!$(target).hasClass('module--open')) {
        $(target).css('display', 'none');
    }
    $(target).removeClass('hide-for-small').toggleClass('module--open').slideToggle();
});

$(window).resize(function () {
    if ($(window).width() > 1024 && $('#profile-modules').is(':hidden')) {
        $('#profile-modules').show();
    }
});

$('.mobile-menu-section_head--hasChild > a').click(function (e) {
    e.preventDefault();
    var mommy = $(this).closest('.mobile-menu-section_head');
    var granny = $(this).closest('.mobile-menu-section');
    granny.toggleClass('mobile-menu-section--open');
    mommy.siblings('.mobile-menu-section_pages').slideToggle();
});


$('#show-cal').click(function () {
    $(this).toggleClass('active');
    $('.bbCal-container').toggleClass('bbCal-container--inview');
    refreshHeightFix();
});

$('#show-filters').click(function () {
    $(this).toggleClass('active');
    $('.searchSidebar').toggleClass('searchSidebar--inview');
    $('#show-map').removeClass('active');
    $('.searchMap').removeClass('searchMap--inview');
});

$('#show-map').click(function () {
    $(this).toggleClass('active');
    $('.searchMap').toggleClass('searchMap--inview');
    $('#show-filters').removeClass('active');
    $('.searchSidebar').removeClass('searchSidebar--inview');
});

$('#show-chat').click(function () {
    $(this).toggleClass("active");
    $(this).toggleClass("hide");
    $('.inbox_head_mobile').toggleClass('inbox_head_mobile--inview');
    $('.colSidebar--messages').toggleClass('colSidebar--messages--inview');

});

$('html.touch .service-wrapper--hasActions').click(function (e) {
    e.stopPropagation();
    $('.service-wrapper--hasActions').not(this).removeClass('service-wrapper--hasActions--hover');
    $(this).toggleClass('service-wrapper--hasActions--hover');
});

$('html.touch').click(function () {
    if ($('.service-wrapper--hasActions--hover').length) {
        $('.service-wrapper--hasActions--hover').removeClass('service-wrapper--hasActions--hover');
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Modals
// - - - - - - - - - - - - - - - - - - - - - - - - -

var scrollToBeforeModal;

function triggerModal(target) {
    scrollToBeforeModal = $('body').scrollTop();
    $('body').addClass('haze modal-open');
    $('.modal--visible').removeClass('modal--visible')
    $(target).parents('.modal-outer-box').addClass('modal--visible');

    // Initialize scroll on modal
    var modalOuterBox = $(target).closest('.modal-outer-box');
    setTimeout(function () {
        initializeScroll(modalOuterBox);
    }, 500);
}

$('[data-trigger-modal]').click(function (event) {
    event.preventDefault();
    scrollToBeforeModal = $('body').scrollTop();
    var modal = $(this).data('trigger-modal');
    $('body').addClass('haze modal-open');
    $('.modal--visible').removeClass('modal--visible');
    $(modal).parents('.modal-outer-box').addClass('modal--visible');

    // Initialize scroll on modal
    var modalOuterBox = $(modal).closest('.modal-outer-box');
    setTimeout(function () {
        initializeScroll(modalOuterBox);
    }, 500);
});

$('[data-close-modal]').click(function (event) {
    event.preventDefault();
    $(this).parents('.modal-outer-box').removeClass('modal--visible')
    $('body').removeClass('haze modal-open').animate({scrollTop: scrollToBeforeModal}, 0);
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Select & Select2
// - - - - - - - - - - - - - - - - - - - - - - - - -

function formatShared(shared) {
    if (!shared.id) {
        return shared.text;
    }
    var $element = $(shared.element);
    if ($element.data("page_image") != "") {
        var $state = $('<div><a href="#" class="picWithText_pic pic-link"><img src="' + $element.data("page_image") + '" class="avatar avatar--circle avatar--medium"><div class="pic_related"><img src="' + $element.data("image") + '" class="avatar avatar--circle avatar--xsmall"></div></a><div class="picWithText_text"><a href="#" class="copy--h3 username color--body">' + shared.text + ' <span class="copy--h6 color--feature">Tramite ' + $element.data("page") + '</span></a><div><div class="color--meta copy--h4">' + $element.data("agenda") + '</div></div></div></div>');
    }
    else {
        var $state = $('<div><a href="#" class="picWithText_pic pic-link"><img src="' + $element.data("image") + '" class="avatar avatar--circle avatar--medium"></a><div class="picWithText_text"><a href="#" class="copy--h3 username color--body">' + shared.text + '</a><div><div class="color--meta copy--h4">' + $element.data("agenda") + '</div></div></div></div>');
    }
    return $state;
}
var select_previous_value;
var select_no_update = false;
$(document).ready(function (event) {
    $(".toRemove").remove();

    $(".agenda_shared").select2({
        templateResult: formatShared
    }).on("select2:select", function (e) {
        location.href = window.location.origin + window.location.pathname + "?ida=" + e.params.data.id;
    });
    if ($(".agenda_navigator").length == 1) {
        $(".agenda_navigator option").each(function () {
            var pre = $(this).parent("optgroup").length == 1 ? $(this).parent("optgroup").attr("label") : "";
            if (pre) {
                $(this).html(pre + " " + $(this).html().toString().toLowerCase());
            }
        });
        $(".agenda_navigator").each(function () {
            $(this).val($(this).find('option[selected]').val());
        });
        $(".agenda_navigator").select2().on("select2:select", function (e) {
            location.href = $(this).val();
        });
    }

    $(".select-skills").select2({
        ajax: {
            url: baseurl + "/api/skills/list",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, page) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        tags: true,
        tokenSeparators: [','],
        minimumInputLength: 2,
        maximumInputLength: 35
    });
    $(".select-languages").select2({
        ajax: {
            url: baseurl + "/api/skills/lang_list",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, page) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        tags: false,
        tokenSeparators: [','],
        minimumInputLength: 0,
        maximumInputLength: 35
    });

    $("#tag_ceditor").select2({
        ajax: {
            url: baseurl + "/api/community/tag_list",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, page) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        tags: true,
        tokenSeparators: [','],
        minimumInputLength: 2,
        maximumInputLength: 35
    });

    $('[data-clear-select]').click(function () {
        var target = $(this).data('clear-select');
        $(target).select2('val', '');
    });
    $(".privacy-selector").select2();
    select_previous_value = $(".privacy-selector").val();
    $(".privacy-selector").on("change", function (e) {
        $("#div_result_message").remove();
        var update = !select_no_update;
        select_no_update = false;
        if (update) {
            var _this = this;
            var value = this.value;
            $('#edit-list-trigger').addClass('hide');
            if (value == "new-list") {
                $("#new-list-select").val("").trigger("change");
                $("#create-list").prop("checked", false);
                $("#new-list-name").val("");
                triggerModal('#new-list-modal');
            }
            else if (/list/i.test(value)) {
                $('#edit-list-trigger').removeClass('hide');
                getModule(value, "users/groups/info", function (result) {
                    if (result.s) {
                        $(".list_name").html(result.group);
                        $("#edit-list-name").val(result.group);
                        $("#edit-list-id").val(result.id_group);
                        $("#contacts").html("");
                        $("#contacts_preview").html("");
                        var u = new Array();
                        $.each(result.users, function (i, user) {
                            $("#contacts").append("<input type='hidden' name='contacts[]' value='" + user.id + "' />");
                            u.push(user.id);
                        });
                        CF.mvc(tpurl + "/community/shared.tpl.html", "api/community/shared", {contacts: u}, function (tp) {
                            $("#contacts_preview").html(tp.get());
                        });
                        $("#edit-list-select").val(u).trigger("change");
                    }
                    else {
                        $(_this).select2("val", 0);
                    }
                });
            }
            else {
                $("#contacts").html('');
                $("#contacts_preview").html('');
            }
        }
    });
    function formatPeople(people) {
        if (!people.id)
            return people.text; // optgroup
        var result = "<img class='avatar avatar--circle avatar--small picWithText_pic' src='" + people.img + "' /><span class='picWithText_text'>" + people.name + " " + people.surname + "</span>";
        return result;
    }
    $('#new-list-select').select2({
        ajax: {
            url: baseurl + "/api/users/contacts/search",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, page) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        templateResult: formatPeople
    });
    $('#edit-list-select').select2({
        ajax: {
            url: baseurl + "/api/users/contacts/search",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, page) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        templateResult: formatPeople
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Home
// - - - - - - - - - - - - - - - - - - - - - - - - -

$(document).ready(function () {

    $('.modal-close-area').click(function () {
        $('.modal-outer-box').removeClass('modal--visible')
        $('body').removeClass('haze modal-open');
    });

    // Fancybox

    $(".fancybox").fancybox({
        width: "100%",
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    // ScrollTo

    $('[data-scroll-to]').click(function () {
        var target = $(this).data("scroll-to");
        $('body').scrollTo(target, {duration: 1500});
    });

    // Skrollr

    if (Modernizr.mq("screen and (min-width:1025px)")) {
        if ($('html').hasClass('no-touch')) {
            var s = skrollr.init({forceHeight: false, smoothScrolling: true});
        }
    }
    // Waypoints

    $('#sticky-menu').waypoint(function () {
        $('body').toggleClass('navFixed');
    }
    // , {
    //   offset: 70
    // }
  );

    if (Modernizr.mq("screen and (min-width:1025px)")) {
        if ($('html').hasClass('no-touch')) {
            $('#features').waypoint(function () {
                $('#features__inner').toggleClass('features--fixed');
            },
                    {
                        offset: 70
                    });

            $('#who').waypoint(function () {
                $('#features__inner').toggleClass('features--fixed');
                $('#features__inner').toggleClass('features--bottom');
            },
                    {
                        offset: "100%"
                    });
        }
    }

    // TheaterJS
    // if ($('body').hasClass('home')) {
    //     var theater = new TheaterJS();
    //
    //     theater
    //             .describe("User", .8, "#fakeSearch_text");
    //
    //     theater
    //             .write("User:professionisti e freelancer", 600)
    //             .write("User:estetista", 400)
    //             .write("User:social media marketing", 400)
    //             .write("User:colf", 400)
    //             .write("User:baby sitter", 400)
    //             .write("User:personal trainer", 400)
    //             .write("User:avvocato", 400)
    //             .write("User:web designer", 400)
    //             .write("User:fotografo", 400)
    //             .write("User:realizzazione siti web", 400)
    //             .write("User:dog sitter", 400)
    //             .write(function () {
    //                 theater.play(true);
    //             });
    //
    //     theater
    //             .on("say:start, erase:start", function (eventName) {
    //                 var self = this,
    //                         current = self.current.voice;
    //                 self.utils.addClass(current, "saying");
    //             })
    //             .on("say:end, erase:end", function (eventName) {
    //                 var self = this,
    //                         current = self.current.voice;
    //                 self.utils.removeClass(current, "saying");
    //             })
    //             .on("*", function () {
    //                 // do something
    //             });
    // }
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Header
// - - - - - - - - - - - - - - - - - - - - - - - - -

//  Autocomplete settori
$("#sector-autocomplete").autocomplete({
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    },
    minLength: 1,
    source: function (request, response) {
        $.ajax({
            url: "api/pages/sectors",
            dataType: "json",
            data: {
                q: request.term
            },
            success: function (data) {
                response(data);
            }
        });
    }
});

//  Autocomplete indirizzi
$("#address-autocomplete").autocomplete({
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    },
    minLength: 0,
    source: function (request, response) {
        $.ajax({
            url: "api/users/address/list",
            dataType: "json",
            data: {
                q: request.term
            },
            success: function (data) {
                response(data);
            }
        });
    },
    select: function (event, ui) {
        $("#address-autocomplete").val(ui.item.label);
        $("#address-address").val(ui.item.address);
        $("#address-id").val(ui.item.id);
        $("#address-lat").val(ui.item.lat);
        $("#address-lng").val(ui.item.lng);
        $(".range-map-autocomplete").geocomplete("find", $("#address-address").val());
        return false;
    }
}).autocomplete("instance")._renderItem = function (ul, item) {
    ul.addClass('drop_menu drop_menu--autocomplete');
    return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
            .append('<a><span class="copy--h4 drop_menu_item_left">' + item.label + '</span><span class="color--meta copy--label drop_menu_item_right">' + item.address + '</span></a>')
            .appendTo(ul);
};
$("#address-autocomplete").on('focus', function () {
    $(this).autocomplete("search");
});
//	Autocomplete prestazioni

$("#jobs-autocomplete").autocomplete({
    minLength: 3,
    source: function (request, response) {
        $.ajax({
            url: "api/search/list",
            dataType: "json",
            data: {
                q: request.term
            },
            success: function (data) {
                $("#jobs-type").val(-1);
                response(data);
            }
        });
    },
    select: function (event, ui) {
        $("#jobs-autocomplete").val(ui.item.label);
        $("#jobs-type").val(ui.item.type);
        return false;
    },
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
        $(".ui-autocomplete:visible").append('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap"><a style="color: #2ba1b3" href="#" onclick="$(\'#form_services\').submit();" ><span class="copy--h4 drop_menu_item_left">Vedi tutti</span></a></li>');
    }
}).autocomplete("instance")._renderItem = function (ul, item) {
    ul.addClass('drop_menu drop_menu--autocomplete');
    return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
            .append('<a><span class="copy--h4 drop_menu_item_left">' + item.label + '</span><span class="color--meta copy--label drop_menu_item_right">' + item.desc + '</span></a>')
            .appendTo(ul);
};

//	Autocomplete localitÃ
$("#location-autocomplete").keyup(function () {
    $(this).next(".geocode-search").find("input[name='lat']").val("");
    $(this).next(".geocode-search").find("input[name='lng']").val("");
});
$("#ext-location-autocomplete").keyup(function () {
    $(this).next(".search-geocode").find("input[name='locality']").val("");
});

$("#location-autocomplete").geocomplete({details: ".geocode-search"});
$("#ext-location-autocomplete").geocomplete({types: ["(cities)"], details: ".search-geocode"}).bind("geocode:result", function(event, result){
     $("#ext-location-autocomplete").next(".search-geocode").find("input[name='locality']").val(getCity(result));
  });
$(".address-autocomplete").geocomplete({details: ".geocode"}).bind("geocode:result", function(event, result){
     $(".address-autocomplete").next(".geocode").find("input[name='locality']").val(getCity(result));
  });;

var map;
var circle;
var address;
var searched;
var mapCenter = new google.maps.LatLng('45.4175068', '9.1544241');

$('#set-distance').click(function () {
    $(".range-map-autocomplete").trigger("geocode");
    if ($(this).is(':checked')) {
        $("#max-distance").val('2');
        $("#slider-distance").slider({value: 2});
        $("#max-distance-display").html('2km');
        $('#range-map-container,#slider-distance').removeClass('item--disabled');
    } else {
        $("#max-distance-display").html('Illimitata');
        $('#range-map-container,#slider-distance').addClass('item--disabled');
    }
});

$('#set-distance').trigger("click");

function makeCircle(map, mapCenter) {
    stroke_opacity = 0;
    fill_opacity = 0;
    radius = 300;
    if (circle) {
        circle.setMap(null);
    }
    var stroke_opacity = 0.6;
    var fill_opacity = 0.15;
    var radius = parseFloat($("#max-distance").val()) * 1000;
    var circleOptions = {
        strokeColor: '#008d84',
        strokeOpacity: stroke_opacity,
        strokeWeight: 1,
        fillColor: '#008d84',
        fillOpacity: fill_opacity,
        map: map,
        center: mapCenter,
        radius: radius
    };
    if ($("#no_limit").prop("checked")==false) {
        circle = new google.maps.Circle(circleOptions);
        map.fitBounds(circle.getBounds());
    }
}

$("#slider-distance").slider({
    range: 100,
    min: 1,
    max: 300,
    step: 1,
    value: 2,
    slide: function (event, ui) {
        $("#max-distance").val(ui.value);
        $("#max-distance-display").html(ui.value + "km");
    },
    stop: function (event, ui) {
        if ($("#address-lat").val() && $("#address-lng").val()) {
            var map = $(".range-map-autocomplete").geocomplete("map");
            var mapCenter = new google.maps.LatLng($("#address-lat").val(), $("#address-lng").val());
            makeCircle(map, mapCenter);
        }
        else {
            $('.show-for-domestic').addClass('show-for-domestic--disabled');
        }
    }
});

$(".range-map-autocomplete").geocomplete({map: "#range-map", details: ".range-geocode"}).bind("geocode:result", function (event, result) {
    $('.show-for-domestic').removeClass('show-for-domestic--disabled');
    $("#address-loc").val(getCity(result));
    var map = $(".range-map-autocomplete").geocomplete("map");
    var mapCenter = new google.maps.LatLng($("#address-lat").val(), $("#address-lng").val());
    makeCircle(map, mapCenter);
});

//	Apri barra di ricerca

$('.toggle-search').click(function () {
    $('body').removeClass('mobile-menu-open').addClass('search--open haze');
});
$('.toggle-search-services').click(function () {
    $('body').removeClass('mobile-menu-open').addClass('search--open haze');
    $('.searchbar').removeClass('view-searchbar_option--1 view-searchbar_option--2 view-searchbar_option--3').addClass('view-searchbar_option--1');
});
$('.toggle-search-people').click(function () {
    $('body').removeClass('mobile-menu-open').addClass('search--open haze');
    $('.searchbar').removeClass('view-searchbar_option--1 view-searchbar_option--2 view-searchbar_option--3').addClass('view-searchbar_option--2');
    setTimeout(function() { $('#input_search_user').focus() }, 1000);
});
$('.toggle-search-community').click(function () {
    $('body').removeClass('mobile-menu-open').addClass('search--open haze');
    $('.searchbar').removeClass('view-searchbar_option--1 view-searchbar_option--2 view-searchbar_option--3').addClass('view-searchbar_option--3');
    setTimeout(function() { $('#input_search_community').focus() }, 1000);
});
$('#search-trigger-1').click(function () {
    $('.searchbar').removeClass('view-searchbar_option--1 view-searchbar_option--2 view-searchbar_option--3').addClass('view-searchbar_option--1');
    setTimeout(function() { $('#jobs-autocomplete').focus() }, 1000);
});
$('#search-trigger-2').click(function () {
    $('.searchbar').removeClass('view-searchbar_option--1 view-searchbar_option--2 view-searchbar_option--3').addClass('view-searchbar_option--2');
    setTimeout(function() { $('#input_search_user').focus() }, 1000);
});
$('#search-trigger-3').click(function () {
    $('.searchbar').removeClass('view-searchbar_option--1 view-searchbar_option--2 view-searchbar_option--3').addClass('view-searchbar_option--3');
    setTimeout(function() { $('#input_search_community').focus() }, 1000);
});

//	Chiudi barra di ricerca

$('#searchbar_close').click(function () {
    $('body').removeClass('search--open haze');
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Ricerca
// - - - - - - - - - - - - - - - - - - - - - - - - -

//	---
//	Filtri di ricerca
//	---

//  Expandi/Contrai filtri

$('.fauxcheck-toggle').click(function (e) {
    e.stopPropagation();
});

//	Disabilita checkbox â€œTuttiâ€ quando un'altra Ã¨ selezionata

//$(".searchFilter_checkbox").click(function () {
//    if ($(this).hasClass('searchFilter_checkbox--selectAll')) {
//        $(this).prop("disabled", true);
//        $(this).parent().siblings(".searchFilter_option").find(".searchFilter_checkbox").prop("checked", false);
//    } else {
//        $(this).parent().siblings(".searchFilter_option").find(".searchFilter_checkbox--selectAll").prop({disabled: false, checked: false});
//    }
//});

//	Mostra in base a <option> selezionata

$(".show-option").change(function () {
    $(this).siblings('[data-element]').addClass('hide');
    $('[data-additional-element]').addClass('hide');
    var target = $(this).find(':selected').data('target');
    var additionaltarget = $(this).find(':selected').data('additional-target');
    $(this).siblings("[data-element='" + target + "']").removeClass('hide');
    $("[data-additional-element='" + additionaltarget + "']").removeClass('hide');
});

//	Range slider
var max_price_service = 500;
var max_price_hour = 500;
$(function () {
    $("#price-range-1 .range-slider").slider({
        range: true,
        min: 0,
        max: max_price_service,
        values: [0, max_price_service],
        slide: function (event, ui) {
            $("#price-range-1 .range_amount").val("â‚¬" + ui.values[ 0 ] + " - â‚¬" + ui.values[ 1 ]);
            $("#price-range-1 .range_amount--left").html("â‚¬" + ui.values[0]);
            $("#price-range-1 .range_amount--right").html("â‚¬" + ui.values[1]);
            $("[name='service_amount_input[0]']").val(ui.values[0]);
            $("[name='service_amount_input[1]']").val(ui.values[1]);
        },
        stop: function () {
            doSearch($("#form_filters")[0], map.getBounds());
        }
    });
    $("#price-range-1 .range_amount_input").val("â‚¬" + $("#price-range-1 .range-slider").slider("values", 0) + " - â‚¬" + $("#price-range-1 .range-slider").slider("values", 1));
    $("#price-range-1 .range_amount--left").append("â‚¬" + $("#price-range-1 .range-slider").slider("values", 0));
    $("#price-range-1 .range_amount--right").append("â‚¬" + $("#price-range-1 .range-slider").slider("values", 1));
});

$(function () {
    $("#price-range-2 .range-slider").slider({
        range: true,
        min: 0,
        max: max_price_hour,
        values: [0, max_price_hour],
        slide: function (event, ui) {
            $("#price-range-2 .range_amount").val("â‚¬" + ui.values[ 0 ] + " - â‚¬" + ui.values[ 1 ]);
            $("#price-range-2 .range_amount--left").html("â‚¬" + ui.values[ 0 ]);
            $("#price-range-2 .range_amount--right").html("â‚¬" + ui.values[ 1 ]);
            $("[name='hour_amount_input[0]']").val(ui.values[0]);
            $("[name='hour_amount_input[1]']").val(ui.values[1]);
        },
        stop: function () {
            doSearch($("#form_filters")[0], map.getBounds());
        }
    });
    $("#price-range-2 .range_amount_input").val("â‚¬" + $("#price-range-2 .range-slider").slider("values", 0) + " - â‚¬" + $("#price-range-2 .range-slider").slider("values", 1));
    $("#price-range-2 .range_amount--left").append("â‚¬" + $("#price-range-2 .range-slider").slider("values", 0));
    $("#price-range-2 .range_amount--right").append("â‚¬" + $("#price-range-2 .range-slider").slider("values", 1));
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Impostazioni
// - - - - - - - - - - - - - - - - - - - - - - - - -

// Lavoro qui

$("#workhere").change(function () {
    $('#to_year').toggleClass('hide');
    $('#to_month').toggleClass('hide');
    $('#today').toggleClass('hide');
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Nuova prestazione
// - - - - - - - - - - - - - - - - - - - - - - - - -


$("#existing-agenda-autocomplete").autocomplete({
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    },
    minLength: 0,
    source: function (request, response) {
        $.ajax({
            url: "api/agenda/list",
            dataType: "json",
            data: {
                q: request.term
            },
            success: function (data) {
                response(data);
            }
        });
    },
    select: function (event, ui) {
        var shared = "";
        if (ui.item.shared) {
            shared = '<div class="pic_related"><img src="' + ui.item.shared + '" class="avatar avatar--circle avatar--xsmall" /></div>';
        }
        $("#existing-agenda-autocomplete").val(ui.item.label).addClass('hide');
        $("#existing-agenda-autocomplete-id").val(ui.item.value);
        $("#existing-agenda-choice > .form_choice_inner").html(
                '<div class="picWithText_pic"><div style="background-color:' + ui.item.color + '" class="avatar avatar--agenda avatar--square avatar--medium"></div>' + shared + '</div>' +
                '<div class="picWithText_text">' +
                '<div class="copy--h3 copy--bold">' + ui.item.label + '</div>' +
                '<div class="copy--h4 color--meta">' + ui.item.job + '</div>' +
                '</div>' +
                '<div class="copy--h5 copy--italic color--meta">' + ui.item.remaining + '</div>' +
                '<div class="copy--h5 copy--italic color--meta"><a href="my-services.php?action=edit&id='+ui.item.value+'">Modifica qualifica</a></div>'
                );
        $("#existing-agenda-choice").removeClass('hide');
        return false;
    }
}).focus(function () {
    $("#existing-agenda-autocomplete").autocomplete('search');
}).autocomplete("instance")._renderItem = function (ul, item) {
    ul.addClass('drop_menu drop_menu--autocomplete');
    var shared = "";
    if (item.shared) {
        shared = '<div class="pic_related"><img src="' + item.shared + '" class="avatar avatar--circle avatar--xsmall" /></div>';
    }
    return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
            .append('<a><div class="picWithText_pic"><div style="background-color:' + item.color + '" class="avatar avatar--agenda avatar--small"></div>' + shared + '</div><span class="picWithText_text"><div class="copy--h4 copy--bold">' + item.label + '</div><div class="copy--h5 color--meta">' + item.job + '</div></span></a>')
            .appendTo(ul);
};

//	Autocomplete qualifica in modifica agenda
$("#agenda-job-autocomplete").autocomplete({
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    },
    minLength: 3,
    source: function (request, response) {
        $.ajax({
            url: "api/agenda/qualifications/list",
            dataType: "json",
            data: {
                q: request.term
            },
            success: function (data) {
                $("#agenda-job-autocomplete-id").val(0);
                response(data);
            }
        });
    },
    select: function (event, ui) {
        $("#agenda-job-autocomplete").val(ui.item.label);
        $("#agenda-job-autocomplete-id").val(ui.item.value);
        //$("[name='qualification_alias[]']").val(ui.item.alias).trigger("change");
        return false;
    }
}).autocomplete("instance")._renderItem = function (ul, item) {
    ul.addClass('drop_menu drop_menu--autocomplete');
    return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
            .append('<a><span class="copy--h4">' + item.label + '</span></a>')
            .appendTo(ul);
};

$("#school-autocomplete").autocomplete({
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    },
    minLength: 3,
    source: function (request, response) {
        $.ajax({
            url: "api/settings/study/list",
            dataType: "json",
            data: {
                q: request.term
            },
            success: function (data) {
                response(data);
            }
        });
    },
    select: function (event, ui) {
        $("#school-autocomplete").val(ui.item.label);
        return false;
    }
}).autocomplete("instance")._renderItem = function (ul, item) {
    ul.addClass('drop_menu drop_menu--autocomplete');
    return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
            .append('<a><span class="copy--h4">' + item.label + '</span></a>')
            .appendTo(ul);
};

//	Autocomplete qualifica in modifica agenda
$("#performance-job-autocomplete").autocomplete({
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    },
    minLength: 3,
    source: function (request, response) {
        $.ajax({
            url: "api/agenda/performances/list",
            dataType: "json",
            data: {
                q: request.term
            },
            success: function (data) {
                $("#performance-job-autocomplete-id").val(0);
                response(data);
            }
        });
    },
    select: function (event, ui) {
        $("#performance-job-autocomplete").val(ui.item.label);
        $("#performance-job-autocomplete-id").val(ui.item.value);
        //$("[name='performance_alias[]']").val(ui.item.alias).trigger("change");
        return false;
    }
}).autocomplete("instance")._renderItem = function (ul, item) {
    ul.addClass('drop_menu drop_menu--autocomplete');
    return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
            .append('<a><span class="copy--h4">' + item.label + '</span></a>')
            .appendTo(ul);
};

// Tipologia di prestazione

$('#service-location-type').change(function () {
    if ($(this).val() == 0 || $(this).val() == 3 || $(this).val() == null) {
        $('.show-for-domestic').addClass('show-for-domestic--hidden');
    } else {
        $('.show-for-domestic').removeClass('show-for-domestic--hidden');
    }
    if ($("#address-address").val()) {
        $(".range-map-autocomplete").geocomplete("find", $("#address-address").val());
    }
});

//	---
//	Agende
//	---
var current_ag_id = 0;

$(document).ready(function () {
//	Autocomplete agende condivise
    $("#agenda-shared-autocomplete").autocomplete({
        open: function (event, ui) {
            if ($('html').hasClass('touch')) {
                $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
            }
        },
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                url: "api/users/contacts/full_list",
                dataType: "json",
                data: {
                    p: 1,
                    q: request.term
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        select: function (event, ui) {
            $("#agenda-shared-autocomplete").val(ui.item.label).addClass('hide');
            $("#agenda-shared-autocomplete-id").val(ui.item.value);
            $("#agenda-shared-choice > .form_choice_inner").html(
                    '<div class="picWithText_pic"><img src="' + ui.item.icon + '" class="avatar avatar--circle avatar--xsmall"></div>' +
                    '<div class="picWithText_text">' +
                    '<div class="copy--h3 username">' + ui.item.label + '</div>' +
                    '</div>'
                    );
            if (ui.item.hidden) {
                $("#hide-owner-" + ui.item.value).prop("checked", true);
            }
            $("#agenda-shared-choice").removeClass('hide');
            return false;
        }
    }).focus(function () {
        $("#agenda-shared-autocomplete").autocomplete('search');
    }).autocomplete("instance")._renderItem = function (ul, item) {
        ul.addClass('drop_menu drop_menu--autocomplete');
        return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
                .append('<a><div class="picWithText_pic"><img src="' + item.icon + '" class="avatar avatar--circle avatar--xsmall"></div><span class="picWithText_text copy--h4">' + item.label + '</span></a>')
                .appendTo(ul);
    };
    $("#agenda-shared-autocomplete").change(function () {
        $("#agenda-shared-autocomplete-id").val("");
    });
    var ag_name;
    var ag_color;
    var ag_id;

    current_ag_id = $('#current_agenda').data("current-id");
    var current_ag_name = $('#current_agenda_name').data("current-name");
    var current_ag_color = $('#current_agenda_color').data("current-color");

    $(".switch-agenda-option").click(function (event) {
        event.preventDefault();
        ag_name = $(this).data('agenda-name');
        ag_color = $(this).data('agenda-color');
        ag_id = $(this).data('agenda-id');
        $('#switch-agenda').removeAttr("disabled");
        $('#edit-agenda').removeAttr("disabled");
        $('#agenda-menu .agenda_item--selected').removeClass('agenda_item--selected');
        $(this).addClass('agenda_item--selected');
        return false;
    });

    $("#switch-agenda").click(function (event) {
        event.preventDefault();
        if ($(this).is(":not(:disabled)")) {
            current_ag_id = ag_id;
            $('#current_agenda').data("current-id", ag_id);
            $('#current_agenda_color').css('background-color', ag_color);
            $('#current_agenda_name').text(ag_name);
            $('#scroll-main').animate({scrollTop: 0}, 500);
            $('body').removeClass('haze agenda-menu-open');
            $('#switch-agenda').attr("disabled", true);
            $('#edit-agenda').attr("disabled", true);
            $(".in_agenda").hide();
            $(".in_agenda").each(function () {
                if (ag_id == "000" || ag_id == $(this).data("id_agenda")) {
                    $(this).show();
                }
            });
            redrawCal(true);
            return false;
        }
    });

    $('#trigger-agenda-menu').click(function (event) {
        event.preventDefault();
        $('body').addClass('haze agenda-menu-open');
        $('#agenda-menu .agenda_item--selected').removeClass('agenda_item--selected');
        $('[data-agenda-id="' + current_ag_id + '"]').addClass('agenda_item--selected');
    });

    $('#close-agenda-menu').click(function (event) {
        event.preventDefault();
        $('body').removeClass('haze agenda-menu-open');
        $('#switch-agenda').attr("disabled", true);
        $('#edit-agenda').attr("disabled", true);
    });

    $('#edit-agenda').click(function (event) {
        event.preventDefault();
        if ($(this).is(":not(:disabled)")) {
            $('body').addClass('haze modal-open').removeClass('agenda-menu-open');
            $('#edit-agenda-modal').parents('.modal-outer-box').addClass('modal--visible z--max');
            $("#edit-agenda-modal .modal_side_agenda").removeClass("hide");
            $("#edit-agenda-modal .modal_side_info").addClass("hide");
            $('#switch-agenda').attr("disabled", true);
            $('#edit-agenda').attr("disabled", true);
            $(".agenda_selector").removeClass("agenda_item--selected");
            $(".agenda_selector").each(function () {
                if ($(this).data("agenda-id") == ag_id) {
                    $(this).addClass("agenda_item--selected");
                    getModule(ag_id, "agenda/get_info", function (result) {
                        $("[name='mod_agenda_id']").val(ag_id);
                        $("[name='agenda_name']").val(result.name);
                        $("[name='agenda_color']").val(result.color);
                        $("[name='agenda_color']").css("background-color", result.color);
                        $("[name='agenda_qualification']").val(result.qual);
                        $("[name='id_agenda_qualification']").val(result.id_qual);
                        $(".select-tags-agenda").val(result.alias).trigger("change");
                        if (result.shared) {
                            $("#agenda-shared-autocomplete").data('ui-autocomplete')._trigger('select', 'autocompleteselect', {item: {value: result.shared.id_user, label: result.shared.user_name, icon: result.shared.image, hidden: result.shared.hidden}});
                        }
                        else {
                            $("[data-show-target='#agenda-shared-autocomplete']").click();
                            $("#agenda-shared-autocomplete").val('');
                            $("#agenda-shared-autocomplete-id").val('');
                        }
                        $(".do_del").removeClass("hide");
                        $(".do_toggle").removeClass("hide");
                        $(".do_toggle").html(result.butt);
                        $("#edit-agenda-modal .modal_title").html("Modifica agenda");
                        $("#remaining").addClass("hide");
                        $("#mod_agenda").removeClass("hide");
                        $("#no_agenda").addClass("hide");
                    });
                }
            });
        }
    });

    $('#create-agenda').click(function (event) {
        event.preventDefault();
        $('body').addClass('haze modal-open').removeClass('agenda-menu-open');
        $('#edit-agenda-modal').parents('.modal-outer-box').addClass('modal--visible z--max');
        $('#switch-agenda').attr("disabled", true);
        $('#edit-agenda').attr("disabled", true);
        $(".agenda_selector").removeClass("agenda_item--selected");
        $("#edit-agenda-modal .modal_side_agenda").addClass("hide");
        $("#edit-agenda-modal .modal_side_info").removeClass("hide");
        $("[name='mod_agenda_id']").val(0);
        $("[name='agenda_name']").val("");
        $("[name='agenda_color']").val("#67D5BE");
        $("[name='agenda_color']").css("background-color", "#67D5BE");
        $("[name='agenda_qualification']").val("");
        $("[name='id_agenda_qualification']").val("");
        $(".select-tags-agenda").val("").trigger("change");
        $(".do_del").addClass("hide");
        $(".do_toggle").addClass("hide");
        $("#edit-agenda-modal .modal_title").html("Crea agenda");
        $("#remaining").removeClass("hide");
        if ($("#no_agenda").length > 0) {
            $("#mod_agenda").addClass("hide");
            $("#no_agenda").removeClass("hide");
        }
    });

    $('#close-edit-agenda-modal').click(function (event) {
        event.preventDefault();
        $('body').removeClass('haze modal-open');
        $('#edit-agenda-modal').parents('.modal-outer-box').removeClass('modal--visible z--max');
    });

});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Calendario
// - - - - - - - - - - - - - - - - - - - - - - - - -
var selected_event = 0;
$('.slot-trigger').each(function () {
    $(this).on({
        'mouseenter': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                var id = parseInt($(this).data('slot-target'));
                selected_event = id;
                $('[data-slot-service="' + id + '"]').addClass('bb_performance_availability--hover');
                $('.fc-agenda-slots').parents().eq(1).scrollTo('div[data-slot-service="' + id + '"]', {offset: {top: -50}});
            }
        },
        'mouseleave': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                selected_event = 0;
                var id = parseInt($(this).data('slot-target'));
                $('[data-slot-service="' + id + '"]').removeClass('bb_performance_availability--hover');
                if (req_event) {
                    redrawCal();
                }
            }
        }
    });
});

$('.offer-trigger').each(function () {
    $(this).on({
        'mouseenter': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                var id = parseInt($(this).data('offer-target'));
                selected_event = id;
                $('[data-offer="' + id + '"]').addClass('bb_offer--hover');
                $('.fc-agenda-slots').parents().eq(1).scrollTo('div[data-offer="' + id + '"]', {offset: {top: -50}});
            }
        },
        'mouseleave': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                selected_event = 0;
                var id = parseInt($(this).data('offer-target'));
                $('[data-offer="' + id + '"]').removeClass('bb_offer--hover');
                if (req_event) {
                    redrawCal();
                }
            }
        }
    });
});

$('.task-trigger').each(function () {
    $(this).on({
        'mouseenter': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                var id = $(this).data('task-target');
                selected_event = id;
                $('.fc-task-' + id).addClass('fc-task--selected');
                $('.fc-agenda-slots').parents().eq(1).scrollTo('.fc-task-' + id, {offset: {top: -50}});
            }
        },
        'mouseleave': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                selected_event = 0;
                var id = $(this).data('task-target');
                $('.fc-task-' + id + '').removeClass('fc-task--selected');
                if (req_event) {
                    redrawCal();
                }
            }
        }
    });
});

$('.request-trigger').each(function () {
    $(this).on({
        'mouseenter': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                var id = parseInt($(this).data('request-target'));
                selected_event = id;
                $('[data-request="' + id + '"]').addClass('bb_request--hover');
                $('.fc-agenda-slots').parents().eq(1).scrollTo('div[data-request="' + id + '"]', {offset: {top: -50}});
            }
        },
        'mouseleave': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                selected_event = 0;
                var id = parseInt($(this).data('request-target'));
                $('[data-request="' + id + '"]').removeClass('bb_request--hover');
                if (req_event) {
                    redrawCal();
                }
            }
        }
    });
});

$('.performance-trigger').each(function () {
    $(this).on({
        'mouseenter': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                var id = $(this).data('performance-target');
                $('.fc-performance-' + id + '').addClass('fc-performance--selected');
                $('.fc-agenda-slots').parents().eq(1).scrollTo('.fc-performance-' + id, {offset: {top: -50}});
            }
        },
        'mouseleave': function (event) {
            if (Modernizr.mq("screen and (min-width:1025px)")) {
                var id = $(this).data('performance-target');
                $('.fc-performance-' + id + '').removeClass('fc-performance--selected');
                if (req_event) {
                    redrawCal();
                }
            }
        }
    });
});

//	---
//	Calendario TODO
//	---

var time_view = parseInt('30');
var time_slots = [];
var tasks = [];
var offers = [];
var requests = [];
var performances = [];

function refreshTimeSlots(callback) {
    $("div.bb_availabilities").remove();
    var half_height = parseInt($("table.fc-agenda-slots tbody tr:first th:first").height()) + 1;
    var head_left = parseInt($("table.fc-agenda-slots tbody tr:first th:first").width()) + 10;
    var day_width = parseInt($("table.fc-agenda-days thead tr:first th.fc-mon").width());
    for (var day_of_the_week = 1; day_of_the_week < 8; day_of_the_week++) {
        $("table.fc-agenda-days").next("div").children("div").append(
                $("<div></div>")
                .addClass("bb_availabilities")
                .attr("style", "left:" + ((day_width * day_of_the_week) - day_width + head_left) + "px;width:" + day_width + "px")
                .append('<div class="bb_availabilities_inner"></div>')
                );
    }
    for (var s = 0; s < time_slots.length; s++) {
        var id = s + 1;
        var slot = time_slots[s];
        var zero = moment("00:00:00", "HH:mm");
        var start = moment(slot.start, "HH:mm");
        var end = moment(slot.end, "HH:mm");
        var diff = end.diff(start, 'minutes') / time_view;
        var min_start = start.diff(zero, 'minutes') / time_view;
        var days = slot.weekday - 1;

        var height = half_height * diff;
        var top = half_height * min_start;
        var left = head_left + parseInt(days * day_width);
        var color = slot.color;
        var service_id = slot.service;

        var div = '<div class="bb_performance_availability" data-day="' + slot.day + '" data-start="' + slot.start + '" data-end="' + slot.end + '" data-slot="' + id + '" data-slot-service="' + service_id + '" style="margin-top:' + top + 'px; height: ' + height + 'px"><div class="bb_availability_track" style="background-color:' + color + '"></div></div>';
        $(".bb_availabilities_inner:eq(" + days + ")").append(div);
    }
    if (callback) {
        $(".bb_performance_availability").click(function () {
            callback(this);
        });
    }
}

function refreshOffers() {
    $("div.bb_offers").remove();
    var half_height = parseInt($("table.fc-agenda-slots tbody tr:first th:first").height()) + 1;
    var head_left = parseInt($("table.fc-agenda-slots tbody tr:first th:first").width()) + 10;
    var day_width = parseInt($("table.fc-agenda-days thead tr:first th.fc-mon").width());
    for (var day_of_the_week = 1; day_of_the_week < 8; day_of_the_week++) {
        $("table.fc-agenda-days").next("div").children("div").append(
                $("<div></div>")
                .addClass("bb_offers")
                .attr("style", "left:" + ((day_width * day_of_the_week) - day_width + head_left) + "px;width:" + day_width + "px")
                .append('<div class="bb_offers_inner"></div>')
                );
    }
    for (var s = 0; s < offers.length; s++) {
        var id = s + 1;
        var slot = offers[s];
        var zero = moment("00:00:00", "HH:mm");
        var start = moment(slot.start, "HH:mm");
        var end = moment(slot.end, "HH:mm");
        var diff = end.diff(start, 'minutes') / time_view;
        var min_start = start.diff(zero, 'minutes') / time_view;
        var days = slot.weekday - 1;

        var height = half_height * diff;
        var top = half_height * min_start;
        var left = head_left + parseInt(days * day_width);
        var color = slot.color;
        var service_id = slot.service;
        var add_class = "";
        if (id == selected_event) {
            add_class = " bb_offer--hover";
        }
        var div = '<div class="bb_offer' + add_class + '" data-offer="' + id + '" data-offer-service="' + service_id + '" style="margin-top:' + top + 'px; height: ' + height + 'px;background-color:' + color + ';outline: 2px dashed ' + color + '"></div>';
        $(".bb_offers_inner:eq(" + days + ")").append(div);
        if (id == selected_event) {
            $('.fc-agenda-slots').parents().eq(1).scrollTo('div[data-offer="' + id + '"]', {offset: {top: -50}});
        }
    }
}

function refreshRequests() {
    $("div.bb_requests").remove();
    var half_height = parseInt($("table.fc-agenda-slots tbody tr:first th:first").height()) + 1;
    var head_left = parseInt($("table.fc-agenda-slots tbody tr:first th:first").width()) + 10;
    var day_width = parseInt($("table.fc-agenda-days thead tr:first th.fc-mon").width());
    for (var day_of_the_week = 1; day_of_the_week < 8; day_of_the_week++) {
        $("table.fc-agenda-days").next("div").children("div").append(
                $("<div></div>")
                .addClass("bb_requests")
                .attr("style", "left:" + ((day_width * day_of_the_week) - day_width + head_left) + "px;width:" + day_width + "px")
                .append('<div class="bb_requests_inner"></div>')
                );
    }
    for (var s = 0; s < requests.length; s++) {
        var id = s + 1;
        var slot = requests[s];
        var zero = moment("00:00:00", "HH:mm");
        var start = moment(slot.start, "HH:mm");
        var end = moment(slot.end, "HH:mm");
        var diff = end.diff(start, 'minutes') / time_view;
        var min_start = start.diff(zero, 'minutes') / time_view;
        var days = slot.weekday - 1;

        var height = half_height * diff;
        var top = half_height * min_start;
        var left = head_left + parseInt(days * day_width);
        var color = slot.color;
        var add_class = "";
        if (id == selected_event) {
            add_class = " bb_request--hover";
        }
        var div = '<div class="bb_request ' + add_class + '" data-request="' + id + '" style="margin-top:' + top + 'px; height: ' + height + 'px;background-color:' + color + ';outline: 2px dashed ' + color + '"></div>';
        $(".bb_requests_inner:eq(" + days + ")").append(div);
        if (id == selected_event) {
            $('.fc-agenda-slots').parents().eq(1).scrollTo('div[data-request="' + id + '"]', {offset: {top: -50}});
        }
    }
}

var edited_time_slots = false;
var req_event = false;
var add_event = false;
var actual_view = $.fullCalendar.formatDate(new Date(), "yyyy-MM-dd");
var id_shared_agenda = 0;
var longtouch;
var reservation_color = true;
var use_force = false;
function refreshHeightFix() {
    if ($(window).width() < 768) {
        $("td.fc-col0 > div").height($("th.fc-col0").outerHeight() * 49 + 48)
    }
}

function redrawCal(force) {
    if (force === undefined) {
        force = false;
    }
    use_force = force;
    var firstHour = 8;
    if (req_event) {
        var split = req_event.start.split(" ");
        var d = split[0].split("-");
        var h = split[1].split(":");

        firstHour = new Date(d[0], d[1], d[2], h[0], h[1], h[2]).getHours() - 1;
    }
    $('#bbCal').fullCalendar({
        slotMinutes: time_view,
        defaultView: 'agendaWeek',
        axisFormat: 'H:mm',
        timeFormat: 'H:mm{ - H:mm}',
        firstDay: 1,
        date: actual_view.split("-")[2],
        month: actual_view.split("-")[1] - 1,
        year: actual_view.split("-")[0],
        editable: false,
        allDaySlot: false,
        firstHour: firstHour,
        columnFormat: {
            week: 'ddd d'
        },
        eventRender: function (event, ui) {
            $(ui).bind("touchstart", function (e) {
                if (!$(ui).hasClass('fc-availability')) {
                    e.preventDefault();
                    longtouch = window.setTimeout(function () {
                        if ((parseInt(event.id) > 0 || parseInt(event.id.replace("EXT", ""))) && (req_event == false || event.id != req_event.id)) {
                            CF.mvc(tpurl + "/calendar/tooltip.tpl.html", "api/calendar/tooltip", {id: event.id, id_agenda: $(".agenda_shared").val()}, function (tp) {
                                if ($(e.target).is(":hover")) {
                                    if (tp.object().s == 1) {
                                        var content = tp.get();
                                        if (e.pageY > '350') {
                                            tooltip.set({
                                                'content.text': content,
                                                'position.my': 'top right',
                                                'position.at': 'top right',
                                                'position.adjust.x': -5,
                                                'position.adjust.y': 30
                                            }).show(e);
                                        } else {
                                            tooltip.set({
                                                'content.text': content,
                                                'position.my': 'bottom right',
                                                'position.at': 'bottom right',
                                                'position.adjust.x': -5,
                                                'position.adjust.y': -55
                                            }).show(e);
                                        }
                                    }
                                }
                            });
                        }
                    }, ajax_delay);
                }
            });
            $(ui).bind("touchend", function () {
                if (!$(ui).hasClass('fc-availability')) {
                    window.clearTimeout(longtouch);
                    tooltip.hide();
                }
            });

        },
        eventResize: function (event) {
            $("input[name='dayfrom']").val($.fullCalendar.formatDate(event.start, "dd/MM/yyyy"));
            $("input[name='dayto']").val($.fullCalendar.formatDate(event.end, "dd/MM/yyyy"));
            $("input[name='from']").val($.fullCalendar.formatDate(event.start, "HH:mm"));
            $("input[name='to']").val($.fullCalendar.formatDate(event.end, "HH:mm"));
            if (add_event) {
                $('.bb_performance_availability').hide();
                $("input[data-id='" + event.id + "']").val($.fullCalendar.formatDate(event.start, "dd/MM/yyyy") + " - " + $.fullCalendar.formatDate(event.start, "HH:mm") + " " + $.fullCalendar.formatDate(event.end, "HH:mm"));
            }
        },
        eventDrop: function (event) {
            $("input[name='dayfrom']").val($.fullCalendar.formatDate(event.start, "dd/MM/yyyy"));
            $("input[name='dayto']").val($.fullCalendar.formatDate(event.end, "dd/MM/yyyy"));
            $("input[name='from']").val($.fullCalendar.formatDate(event.start, "HH:mm"));
            $("input[name='to']").val($.fullCalendar.formatDate(event.end, "HH:mm"));
            if (add_event) {
                $('.bb_performance_availability').hide();
                $("input[data-id='" + event.id + "']").val($.fullCalendar.formatDate(event.start, "dd/MM/yyyy") + " - " + $.fullCalendar.formatDate(event.start, "HH:mm") + " " + $.fullCalendar.formatDate(event.end, "HH:mm"));
            }
        },
        eventMouseover: function (data, event, view) {
            if ((parseInt(data.id) > 0 || parseInt(data.id.replace("EXT", ""))) && typeof tooltip != "undefined" && (req_event == false || data.id != req_event.id)) {
                CF.mvc(tpurl + "/calendar/tooltip.tpl.html", "api/calendar/tooltip", {id: data.id, id_agenda: $(".agenda_shared").val()}, function (tp) {
                    if ($(event.target).is(":hover")) {
                        if (tp.object().s == 1) {
                            var content = tp.get();
                            if (event.pageY > '350') {
                                tooltip.set({
                                    'content.text': content,
                                    'position.my': 'top right',
                                    'position.at': 'top right',
                                    'position.adjust.x': -5,
                                    'position.adjust.y': 30
                                }).show(event);
                            } else {
                                tooltip.set({
                                    'content.text': content,
                                    'position.my': 'bottom right',
                                    'position.at': 'bottom right',
                                    'position.adjust.x': -5,
                                    'position.adjust.y': -55
                                }).show(event);
                            }
                        }
                    }
                });
            }
        },
        eventMouseout: function () {
            if (typeof tooltip != "undefined") {
                tooltip.hide();
            }
        },
        viewDisplay: function (view) {
            var h = $('#bbCal .fc-view > div > div').outerHeight() + 40;
            $('#bbCal .fc-agenda-days').attr('style', 'width:100%;height:' + h + 'px !important');
            $("#bbCal").fullCalendar("removeEvents");
            $(".fc-agenda-days thead tr.fc-first th.fc-agenda-axis.fc-first").html("<i class='icon-fa-clock-o icon--h4 color--feature'></i>");
            $("#fc_title").html(view.title);
            $("#weekly_container [data-week]").appendTo("#shadow_container");
            $("[data-week='" + $.fullCalendar.formatDate(view.start, "yyyy-MM-dd") + "']").appendTo("#weekly_container");
            if (actual_view != $.fullCalendar.formatDate(view.start, "yyyy-MM-dd") || use_force) {
                use_force = false;
                actual_view = $.fullCalendar.formatDate(view.start, "yyyy-MM-dd");
                if (req_event) {
                    $.get("api/agenda/actions/get_bucket", {
                        week_start: $.fullCalendar.formatDate($("#bbCal").fullCalendar('getView').start, "yyyy-MM-dd"),
                        id_performance: req_event.id_performance
                    }, function (result) {
                        time_slots = result;
                        refreshTimeSlots();
                    });
                }
                else {
                    $.get("api/agenda/actions/get_all_buckets", {
                        week_start: $.fullCalendar.formatDate(view.start, "yyyy-MM-dd"),
                        id_agenda: id_shared_agenda == 0 ? parseInt(current_ag_id) : id_shared_agenda
                    }, function (result) {
                        time_slots = result;
                        refreshTimeSlots();
                    });
                }
                $.get("api/agenda/actions/get_reservations_confirmed", {
                    week_start: $.fullCalendar.formatDate(view.start, "yyyy-MM-dd"),
                    id_agenda: id_shared_agenda,
                    color: reservation_color
                }, function (result) {
                    tasks = result;
                    for (var i = 0; i < tasks.length; i++) {
                        if (!reservation_color) {
                            tasks[i].color = "#35B9CE";
                        }
                        var start = tasks[i].start.split(" ");
                        var end = tasks[i].end.split(" ");
                        var ds = start[0].split("-");
                        var ts = start[1].split(":");
                        var de = end[0].split("-");
                        var te = end[1].split(":");
                        var classes = "fc-task fc-task-";
                        var e = {
                            id: tasks[i].id,
                            title: tasks[i].title,
                            start: new Date(ds[0], ds[1] - 1, ds[2], ts[0], ts[1], ts[2]),
                            end: new Date(de[0], de[1] - 1, de[2], te[0], te[1], te[2]),
                            allDay: false,
                            color: tasks[i].color,
                            editable: false,
                            className: classes + tasks[i].id
                        };
                        $('#bbCal').fullCalendar('removeEvents', e.id);
                        if (!req_event || req_event.id != tasks[i].id) {
                            $('#bbCal').fullCalendar('renderEvent', e);
                        }
                    }

                    if (selected_event) {
                        $('.fc-task-' + selected_event).addClass('fc-task--selected');
                        $('.fc-agenda-slots').parents().eq(1).scrollTo('.fc-task-' + selected_event, {offset: {top: -50}});
                    }
                });
                $.get("api/agenda/actions/get_requests", {
                    week_start: $.fullCalendar.formatDate(view.start, "yyyy-MM-dd"),
                    id_agenda: id_shared_agenda,
                    color: reservation_color
                }, function (result) {
                    performances = result;
                    for (var i = 0; i < performances.length; i++) {
                        if (!reservation_color) {
                            performances[i].color = "#35B9CE";
                        }
                        var start = performances[i].start.split(" ");
                        var end = performances[i].end.split(" ");
                        var ds = start[0].split("-");
                        var ts = start[1].split(":");
                        var de = end[0].split("-");
                        var te = end[1].split(":");
                        var e = {
                            id: performances[i].id,
                            title: performances[i].title,
                            start: new Date(ds[0], ds[1] - 1, ds[2], ts[0], ts[1], ts[2]),
                            end: new Date(de[0], de[1] - 1, de[2], te[0], te[1], te[2]),
                            allDay: false,
                            color: performances[i].color,
                            editable: false,
                            className: "fc-performance fc-performance-" + performances[i].id
                        };
                        if (!req_event || req_event.id != performances[i].id) {
                            $('#bbCal').fullCalendar('renderEvent', e);
                        }
                    }
                });
            }
            else {
                for (var i = 0; i < tasks.length; i++) {
                    var start = tasks[i].start.split(" ");
                    var end = tasks[i].end.split(" ");
                    var ds = start[0].split("-");
                    var ts = start[1].split(":");
                    var de = end[0].split("-");
                    var te = end[1].split(":");
                    var classes = "fc-task fc-task-";
                    var e = {
                        id: tasks[i].id,
                        title: tasks[i].title,
                        start: new Date(ds[0], ds[1] - 1, ds[2], ts[0], ts[1], ts[2]),
                        end: new Date(de[0], de[1] - 1, de[2], te[0], te[1], te[2]),
                        allDay: false,
                        color: tasks[i].color,
                        editable: false,
                        className: classes + tasks[i].id
                    };
                    $('#bbCal').fullCalendar('renderEvent', e);
                }
                for (var i = 0; i < performances.length; i++) {
                    var start = performances[i].start.split(" ");
                    var end = performances[i].end.split(" ");
                    var ds = start[0].split("-");
                    var ts = start[1].split(":");
                    var de = end[0].split("-");
                    var te = end[1].split(":");
                    var e = {
                        id: performances[i].id,
                        title: performances[i].title,
                        start: new Date(ds[0], ds[1] - 1, ds[2], ts[0], ts[1], ts[2]),
                        end: new Date(de[0], de[1] - 1, de[2], te[0], te[1], te[2]),
                        allDay: false,
                        color: performances[i].color,
                        editable: false,
                        className: "fc-performance fc-performance-" + performances[i].id
                    };
                    $('#bbCal').fullCalendar('renderEvent', e);
                }
                refreshTimeSlots();
                refreshOffers();
                refreshRequests();
                refreshHeightFix();
            }
            if (edited_time_slots) {
                for (var b = 0; b < edited_time_slots.length; b++) {
                    var day = edited_time_slots[b].day.split("-");
                    var start = edited_time_slots[b].start.split(":");
                    var end = edited_time_slots[b].end.split(":");
                    var color = edited_time_slots[b].color;
                    var e = {
                        id: b + 1,
                        title: '',
                        start: new Date(day[0], day[1] - 1, day[2], start[0], start[1]),
                        end: new Date(day[0], day[1] - 1, day[2], end[0], end[1]),
                        allDay: false,
                        color: color,
                        editable: true,
                        className: "fc-availability"
                    };
                    $("#bbCal").fullCalendar('renderEvent', e);
                }
            }
            if (req_event) {
                var start = req_event.start.split(" ");
                var end = req_event.end.split(" ");
                var ds = start[0].split("-");
                var ts = start[1].split(":");
                var de = end[0].split("-");
                var te = end[1].split(":");
                var classes = "fc-availability my-bb-offer my-bb-offer-";
                var e = {
                    id: req_event.id,
                    title: req_event.title,
                    start: new Date(ds[0], ds[1] - 1, ds[2], ts[0], ts[1], ts[2]),
                    end: new Date(de[0], de[1] - 1, de[2], te[0], te[1], te[2]),
                    allDay: false,
                    color: req_event.color,
                    editable: true,
                    className: classes + req_event.id
                };
                $('#bbCal').fullCalendar('removeEvents', req_event.id);
                $('#bbCal').fullCalendar('renderEvent', e);
            }
        },
        windowResize: function () {
            refreshTimeSlots();
            refreshOffers();
            refreshRequests();
            refreshHeightFix();
        },
        dayClick: function (date, event, view) {
            if (add_event) {
                var e = {
                    id: $("#bbCal").fullCalendar("clientEvents").length + 1,
                    title: "",
                    start: date,
                    end: new Date(date.getTime() + 60 * 60000),
                    allDay: false,
                    color: $(".modal_content .story_content_inner").css("border-color"),
                    editable: true,
                    className: "fc-availability"
                };
                $("#bbCal").fullCalendar("renderEvent", e);
                $(".week_availability:last").after('<div class="form_choice form_choice--vanilla"><div class="form_choice_inner fw"><div class="inputWithIcon inputWithIcon--fw inputWithIcon--numbered inputWithIcon--before inputWithIcon--big"><i class="icon-li-circle2 input_icon input_icon input_icon--before icon--h3 color--meta"></i><input type="text" class="input input--big" required readonly value="' + $.fullCalendar.formatDate(e.start, "dd/MM/yyyy") + ' - ' + $.fullCalendar.formatDate(e.start, "HH:mm") + ' ' + $.fullCalendar.formatDate(e.end, "HH:mm") + '" data-id="' + e.id + '" /></div></div><div class="form_choice_btn clear-choice"><i class="copy--link color--red icon--h2 icon-li-trash3 remove_event" data-id="' + e.id + '"></i></div></div>');
                $(".remove_event").unbind("click");
                $(".remove_event").click(function () {
                    $("#bbCal").fullCalendar("removeEvents", $(this).data("id"));
                    $(this).closest(".form_choice").remove();
                });
            }
        }
    });
    if (ms_ie) {
        $('.fc-agenda-days').attr('style', 'width:100%');
    }
}

$(document).ready(function () {
    $(".draggable").draggable({revert: true, helper: "clone", revertDuration: 0});

    redrawCal();
    refreshTimeSlots();
    refreshOffers();
    refreshRequests();
    $('.bb_performance_availability').each(function () {
        $(this).on({
            'mouseenter': function (event) {
                var id = parseInt($(this).data('slot'));
                $('[data-slot-target="' + id + '"]').addClass('service-wrapper--hasActions--hover');
                $('#scroll-main').scrollTo('div[data-slot-target="' + id + '"]');
            },
            'mouseleave': function (event) {
                var id = parseInt($(this).data('slot'));
                $('[data-slot-target="' + id + '"]').removeClass('service-wrapper--hasActions--hover');
            }
        });
    });
    $('.book-service').click(function () {
        $('body').addClass('haze edit-cal-open body-transition');
        $('body.body-transition').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            $('body').removeClass('body-transition');
        });
        $('[data-slot-service]:not([data-slot-service="' + '002' + '"])').addClass('bb_performance_availability--hide');
    });
    $('#close-edit-cal-menu').click(function () {
        $('body').addClass('edit-cal-closing').removeClass('haze edit-cal-open');
        $('.edit-cal-menu').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            $('body').removeClass('edit-cal-closing');
        });
        $("#bbCal").fullCalendar('removeEvents');
        $(".bbCal_head_left").removeClass("hide");
        $(".bbCal_head_right").removeClass("hide");
        $(".bbCal_head_center a").removeClass("hide");
        $('.bb_performance_availability').show();
        add_event = false;
        edited_time_slots = false;
    });

    $('#close-offer').click(function () {
        req_event = false;
        $(".bbCal_tutorial_content .add_text").addClass("hide");
        $('body').addClass('edit-cal-closing').removeClass('haze edit-cal-open');
        $('.edit-cal-menu').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            $('body').removeClass('edit-cal-closing');
        });
        redrawCal(true);
    });

    $('.edit-task').click(function () {
        $('body').addClass('haze edit-cal-open body-transition');
        $('body.body-transition').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            $('body').removeClass('body-transition');
        });
        var edited_task_id = $(this).closest('[data-task-target]').data('task-target');

        $("#bbCal").fullCalendar('removeEvents', edited_task_id);

        var i = edited_task_id - 1;

        var start = tasks[i].start.split(" ");
        var end = tasks[i].end.split(" ");
        var ds = start[0].split("-");
        var ts = start[1].split(":");
        var de = end[0].split("-");
        var te = end[1].split(":");
        var classes = "fc-task fc-task--selected fc-task-";
        var e = {
            id: tasks[i].id,
            title: tasks[i].title,
            start: new Date(ds[0], ds[1] - 1, ds[2], ts[0], ts[1], ts[2]),
            end: new Date(de[0], de[1] - 1, de[2], te[0], te[1], te[2]),
            allDay: false,
            color: tasks[i].color,
            editable: true,
            className: classes + tasks[i].id
        };
        $("#bbCal").fullCalendar('renderEvent', e);
    });

    $('input[name="fb-cat1"]').click(function () {
        var val = $(this).val();
        var score = $(this).parents('.score_rating');
        score.removeClass(function (index, css) {
            return (css.match(/(^|\s)score_rating--\S+/g) || []).join(' ');
        });
        score.addClass('score_rating--' + val);
    });

});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Nuova pagina
// - - - - - - - - - - - - - - - - - - - - - - - - -

//	Autocomplete membri
$("#new-member-autocomplete").autocomplete({
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    },
    minLength: 0,
    source: function (request, response) {
        $.ajax({
            url: "api/users/contacts/full_list",
            dataType: "json",
            data: {
                p: 0,
                q: request.term
            },
            success: function (data) {
                response(data);
            }
        });
    },
    select: function (event, ui) {
        $(this).val('');
        var display = true;
        $("[name='member[]']").each(function () {
            if ($(this).val() == ui.item.value) {
                display = false;
            }
        });
        if (display) {
            $("#page_members").append(
                    '<div class="form_choice">' +
                    '<div class="form_choice_inner">' +
                    '<div class="picWithText_pic"><img src="' + ui.item.icon + '" class="avatar avatar--circle avatar--medium"></div>' +
                    '<div class="picWithText_text">' +
                    '<div class="copy--h3 username">' + ui.item.label + '</div>' +
                    '<input type="hidden" name="member[]" value="' + ui.item.value + '" />' +
                    '<select name="role[]" class="select select--small select--vanilla" required>' +
                    '<option disabled>Seleziona</option>' +
                    '<option value="0" selected>Membro</option>' +
                    '<option value="1">Gestore agende</option>' +
                    '<option value="2">Co-amministratore</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '<div class="form_choice_btn clear-choice">' +
                    '<i class="copy--link icon--h2 icon-li-trash3 color--red del_member"></i>' +
                    '</div>' +
                    '</div>'
                    );
            $(".del_member").unbind("click");
            $(".del_member").click(function () {
                $(this).closest(".form_choice").remove();
            });
        }
        return false;
    }
}).autocomplete("instance")._renderItem = function (ul, item) {
    ul.addClass('drop_menu drop_menu--autocomplete');
    return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
            .append('<a><div class="picWithText_pic"><img src="' + item.icon + '" class="avatar avatar--circle avatar--xsmall"></div><span class="picWithText_text copy--h4">' + item.label + '</span></a>')
            .appendTo(ul);
};
$("#new-member-autocomplete").on('focus', function () {
    $(this).autocomplete("search");
});

$(".select-tags-agenda").select2({
    placeholder: "Sinonimi della tua qualifica?",
    ajax: {
        url: baseurl + "/api/agenda/qualifications/alias",
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                q: params.term, // search term
                page: params.page,
                id: $("#agenda-job-autocomplete-id").val()
            };
        },
        processResults: function (data, page) {
            return {
                results: data.items
            };
        },
        cache: true
    }, tags: !0, tokenSeparators: [","], minimumInputLength: 0, maximumSelectionLength: 7, maximumInputLength: 35});

$(".select-tags-performance").select2({
    placeholder: "Sinonimi della tua prestazione?",
    ajax: {
        url: baseurl + "/api/agenda/performances/alias",
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                q: params.term, // search term
                page: params.page,
                id: $("#performance-job-autocomplete-id").val()
            };
        },
        processResults: function (data, page) {
            return {
                results: data.items
            };
        },
        cache: true
    }, tags: !0, tokenSeparators: [","], minimumInputLength: 0, maximumSelectionLength: 7, maximumInputLength: 35});

$(".select-tags").select2({tags: !0, tokenSeparators: [","], minimumInputLength: 2, maximumSelectionLength: 7, maximumInputLength: 35});
$(".select-tags-fast").select2({tags: !0, tokenSeparators: [","], minimumInputLength: 0, maximumSelectionLength: 7, maximumInputLength: 35});
$(".select-tags-fast-blocked").select2();

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Invite friends
// - - - - - - - - - - - - - - - - - - - - - - - - -

var step;
var backstep;

$('[data-goto-step]').click(function (event) {
    event.stopPropagation();
    var step = $(this).attr('data-goto-step');
    $('[data-invite-step]').attr('data-invite-step', step);
    if (step == 1) {
        $('.invite_network--active').removeClass('invite_network--active');
    } else {
        $('.invite_network_back').attr('data-goto-step', '1');
    }
});

$('[data-goto-signup-step]').click(function (event) {
    event.stopPropagation();
    var step = $(this).attr('data-goto-signup-step');
    if (step == 2) {
        var _this = this
        loader(this, "white", "prepend");
        $(this).addClass("item--disabled");
        $.post("check.php", {item: {form: $("#form_registration").serialize()}}, function (result) {
            removeLoader(false, _this);
            $(_this).removeClass("item--disabled");
            if (result.s === 1) {
                $("#div_result_message").remove();
                $('[data-signup-step]').attr('data-signup-step', step);
                if (myScroll) {
                    myScroll.scrollTo(0, 0, 0);
                    myScroll.refresh();
                }
            } else if (result.s === 2) {
                $("#div_result_message").remove();
                notifyEmail();
            } else {
                getResultMessages(result, $("#form_registration")[0]);
            }
        });
    }
    else {
        $('[data-signup-step]').attr('data-signup-step', step);
        if (myScroll) {
            myScroll.scrollTo(0, 0, 0);
            myScroll.refresh();
        }
    }
});

$('.invite_network').click(function () {
    $(this).addClass('invite_network--active');
});

$('.add-new-contact').click(function () {
    $(this).toggleClass('add-new-contact--added');
});

// - - - - - - - - - - - - - - - - - - - - - - - - -
//	Messaggi
// - - - - - - - - - - - - - - - - - - - - - - - - -

//	Autocomplete contatti

$("#new-conversation-autocomplete").autocomplete({
    open: function (event, ui) {
        if ($('html').hasClass('touch')) {
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    },
    minLength: 3,
    source: function (request, response) {
        $.ajax({
            url: "api/users/friends",
            dataType: "json",
            data: {
                q: request.term
            },
            success: function (data) {
                response(data);
            }
        });
    },
    select: function (event, ui) {
        $("#new-conversation-autocomplete").val(ui.item.label);
        $("#new-conversation-id").val(ui.item.value);
        return false;
    },
    focus: function (event, ui) {
        event.preventDefault();
        $("#new-conversation-autocomplete").val(ui.item.label);
        $("#new-conversation-id").val(ui.item.value);
    }
}).autocomplete("instance")._renderItem = function (ul, item) {
    ul.addClass('drop_menu drop_menu--autocomplete');
    return $('<li class="drop_menu_item drop_menu_item--hoverBg drop_menu_item--hoverText anchorWrap">')
            .append('<a><div class="picWithText_pic"><img src="' + item.icon + '" class="avatar avatar--circle avatar--xsmall"></div><span class="picWithText_text copy--h4">' + item.label + '</span></a>')
            .appendTo(ul);
};
$("#new-conversation-autocomplete").change(function () {
    $("#new-conversation-id").val("");
});
