<?php

$break = '<br/>';

function days_in_month($month, $year)
{
    // calculate number of days in a month
    return $month == 2 ? ($year % 4 ? 28 : ($year % 100 ? 29 : ($year % 400 ? 28 : 29))) : (($month - 1) % 7 % 2 ? 30 : 31);
}

function getDates($month, $year) {
    /*
    $month = date('m');
    $year = date('Y');
    */
    $days_in_month = days_in_month($month, $year);

    // build array of dates in month
    $dates = array();
    for($i = 0; $i < $days_in_month; $i++) {
        $date_string = $year . '-' . $month . '-' . ($i + 1);
        $dates[] = new DateTime($date_string);
    }

    return $dates;
}

function filterSunday($date) {
    return ($date->format('D') !== 'Sun');
}

function formatCalendar($dates) {
    $year = $dates[0]->format('Y');
    $month = $dates[0]->format('m');
    $month_before = $month - 1;
    $month_after = $month + 1;
    $year_after = $year;
    $year_before = $year;
    $first_day = $dates[0]->format('w');
    $last_day = end($dates)->format('w');

    // if current month == jan, prev = dec, year--
    if($month_before < 1) {
        $month_before = 12;
        $year_before = $year - 1;
    }

    // if current month == dec, next = jan, year++
    if($month_after > 12) {
        $month_after = 1;
        $year_after = $year + 1;
    }

    // prepend days as necessary to fill week
    $days_in_prev = days_in_month($month_before, $year_before);
    for($i = 0; $i < $first_day; $i++) {
        $date_string = "{$year_before}-{$month_before}-" . ($days_in_prev - $i);
        array_unshift($dates, new DateTime($date_string));
    }

    // append days as necessary to fill week
    for($i = 1; $i < (7 - $last_day); $i++) {
        $date_string = "{$year_after}-{$month_after}-{$i}";
        $dates[] = new DateTime($date_string);
    }

    // remove Sundays
    return array_filter($dates, 'filterSunday');
}

function printCalendarDates($dates) {
    global $break;

    $current_date = (new DateTime)->format('Y\-m\-d');

    for($i = 0; $i < count($dates); $i++) {
        if($dates[$i]->format('Y\-m\-d') == $current_date) {
            print '<b>' . $dates[$i]->format('j') . '</b>, ';
        }
        else {
            print $dates[$i]->format('j') . ', ';
        }
        if($dates[$i]->format('w') == 6) {
            print $break;
        }
    }
}

function displayCalendar($dates) {
    $current_date = (new DateTime)->format('Y\-m\-d');

    $default_classes = "uk-panel";
    $today_classes = "{$default_classes} today";
    $today_string = "\t\t<div class=\"box\"data-uk-filter=\"%s\"><div class=\"%s\"><span class=\"date\">%u</span> <span class=\"uk-hidden-small day\">%s</span></div></div>\n";
    $default_string = "\t\t<div class=\"box\"data-uk-filter=\"%s\"><div class=\"%s\"><span class=\"date\">%u</span> <span class=\"uk-hidden-small day\">%s</span></div></div>\n";
    foreach($dates as $date) {
        $date_int = $date->format('j');
        $date_str = $date->format('D');
        if($date->format('Y\-m\-d') == $current_date) {
            print sprintf($today_string, $date_str, $today_classes, $date_int, $date_str);
        }
        else {
            print sprintf($default_string, $date_str, $default_classes, $date_int, $date_str);
        }
    }
}

//$dates = formatCalendar(getDates(03, 2015));
//printCalendarDates($dates);

?>