<!DOCTYPE html>
<html>
  <head>
    <!-- meta
    ----------------------------------------------------->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- css
    ----------------------------------------------------->
    <link rel="stylesheet" href="assets/css/uikit.min.css" />
    <link rel="stylesheet" href="assets/css/calendar.css" />
    <link rel="stylesheet" href="assets/css/fonts.css" />

    <!-- javascript
    ----------------------------------------------------->
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/uikit.min.js"></script>
    <script src="assets/js/components/grid.min.js"></script>
    <script src="assets/js/calendar.js"></script>

    <!-- title/ favicon
    ----------------------------------------------------->
    <title>Calendar</title>
  </head>
  <body>
    <div class="calendar uk-border-rounded">
      <div class="uk-button-dropdown" data-uk-dropdown="{mode: 'click'}">
        <button class="uk-button">Filter <i class="uk-icon-caret-down"></i></button>
        <div class="uk-dropdown uk-dropdown-small">
          <ul id="filter" class="uk-nav uk-nav-dropdown">
            <li class="uk-active" data-uk-filter=""><a href="#">All</a></li>
            <li data-uk-filter="Mon"><a href="#">Mon</a></li>
            <li data-uk-filter="Tue"><a href="#">Tue</a></li>
            <li data-uk-filter="Wed"><a href="#">Wed</a></li>
            <li data-uk-filter="Thu"><a href="#">Thu</a></li>
            <li data-uk-filter="Fri"><a href="#">Fri</a></li>
            <li data-uk-filter="Sat"><a href="#">Sat</a></li>
          </ul>
        </div>
      </div>
      <div class="uk-grid uk-grid-width-1-5 uk-grid-width-small-1-5 uk-grid-width-large-1-6" data-uk-grid="{gutter: 10, controls: '#filter', filter: '', animation: true}">
        <?php
        include 'cal.php';
        $dates = formatCalendar(getDates(04,2015));
        displayCalendar($dates);
        // Example: <div data-uk-filter="Mon"><div class="uk-panel today">30 Mon</div></div>;
        ?>
      </div> <!-- grid -->
    </div> <!-- calendar -->
  </body>
</html>
