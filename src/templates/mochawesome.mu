<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mochawesome Report Card</title>
    <link rel="stylesheet" href="css/mochawesome.css">
  </head>
  <body>
    <!-- NAVBAR -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <h1 class="report-title">{{reportTitle}}</h1>
        <h3 class="report-date">{{dateFormat stats.end 'dddd, MMMM D YYYY, hh:mma'}}</h3>
      </div>
    </div>

    <!-- Report Summary -->
    <div class="summary">
      <div class="container">
        {{#stats}}
          {{> _summary}}
        {{/stats}}
      </div>
    </div>
    <div class="statusbar">
      <div class="container">
        {{#stats}}
          {{> _statusbar}}
        {{/stats}}
      </div>
    </div>

    <!-- Suites -->
    <div class="details container">
      {{#suites}}
        {{> _suite}}
      {{/suites}}
    </div>

    <footer>
      <div class="container">
        <p class="small">Report generated by <a href="https://github.dowjones.net/grubera/mochawesome" target="_blank">mochawesome</a>.<br>Designed and built by <a href="https://github.com/adamgruber" target="_blank">adamgruber</a> at <a href="http://github.com/dowjones" target="_blank">Dow Jones</a>. &copy;2015.</p>
      </div>
    </footer>

    <!-- Scripts -->
    <script src="js/mochawesome.js"></script>
  </body>
</html>