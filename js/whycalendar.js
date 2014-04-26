var arrDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var nextday = function(today) {
    return new Date(today.getTime() + 86400000);
}

var getweekday = function(day) {
    return arrDay[day.getDay()];
}

var add_cal = function(today, $cal) {
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var weekday = getweekday(today);
    var strfullday = today.getFullYear() + "-" + month + "-" + day;
    var isfirst = "";
    if (day == 1) {
        for (var i = 0; i < today.getDay(); i++) {
            $choose_month($cal, month)
                .append($('<div class="day none">'));
        }
        isfirst = " firstday";

    }
    $('<div class="day day-' + strfullday + ' week-' + weekday + isfirst + '">')
        .html('<p>' + day + '</p>')
        .attr('data-date', strfullday)
        .appendTo($choose_month($cal, month));
    // if (month == 1 && day == 1) {
    //     console.log($cal, $choose_month($cal, month))
    // }

}

//如果沒有月份，插入月份的div
$choose_month = function($cal, month) {
    if ($cal.children('.month-' + month).length == 0) {
        var $month = $('<div class="month month-' + month + '">').html('<h3>' + month + '月</h3>')
            .appendTo($cal);
        return $month;
    } else return $cal.children('.month-' + month)

}

whycalendar = function(date, targetname) {
    var today = new Date(date);
    //$('.' + targetname).empty();
    $cal = $('<div class="cal"></div>')
        .appendTo('.' + targetname)
        .append($('<h2>' + today.getFullYear() + '年</h2>'));
    var days_in_this_year = ((Number(today.getFullYear()) % 4 == 0) ? 366 : 365);
    // console.log(days_in_this_year);
    // console.log(choose_month($cal, 1).text('1234'));
    for (var i = 0; i < days_in_this_year; i++) {

        add_cal(today, $cal);
        today = nextday(today);
    };
    for (var i = 1; i <= 12; i++) {
        $('.month-' + i).children().last().addClass('lastday');

    }
}

var typetocolor = function(type) {
    switch (type) {
        case "死亡":
            return "#d3381c";
            break;
        case "傷病":
            return "#84a2d4";
            break;

        case "災害":
            return "#938b4b";
            break;
        case "敗運":
            return "#9f6f55";
            break;
        case "意外":
            return "#478384";
            break;
        case "離婚":
            return "#bc64a4";
            break;
    }
}

$(function() {

    whycalendar('2007-01-01', 'content');
    whycalendar('2008-01-01', 'content');
    whycalendar('2009-01-01', 'content');
    whycalendar('2010-01-01', 'content');
    whycalendar('2011-01-01', 'content');
    whycalendar('2012-01-01', 'content');
    whycalendar('2013-01-01', 'content');
    whycalendar('2014-01-01', 'content');
    //
    //    $('input').click(function () {
    //        whycalendar($(this).val(), 'content');
    //    });

    arr_events = [];

    d3.csv("data/ma.csv", function(d) {
            var today = new Date(d.date);
            var str_day = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            arr_events[str_day] = '<p style="color:' + typetocolor(d.type) + '">' + d.type + '</p><p>' + d.event + '</p>';
            // console.log(arr_events);
            return d
        },
        function(e, d) {


            //            console.log(d);
            for (var i = 0; i < d.length; i++) {
                var today = new Date(d[i].date);
                var str_day = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
                //                console.log(str_day);
                //                console.log($('.
                //                ' + str_day));
                $('.day-' + str_day).css('background-color', typetocolor(d[i].type))
                //                console.log(typetocolor(d[i].type), d[i].type)
                .hover(function(e) {
                        // console.log(e);
                        $('.info').html(arr_events[$(this).attr('data-date')])

                        .css('margin-left', e.pageX + 10)
                            .css('margin-top', e.pageY - 50)
                            .show();

                    },
                    function(e) {
                        $('.info').hide();
                    }
                )
                    .click(function(e) {
                            // console.log($('this'));
                            $('.info').html(arr_events[$(this).attr('data-date')])

                            .css('margin-left', $(this).offset().left + 30)
                                .css('margin-top', $(this).offset().top - 40)
                                .show();
                        }

                );

            }
        });
});