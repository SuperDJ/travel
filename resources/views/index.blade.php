<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

        <title>Laravel</title>
    </head>
    <body>
        <div id="app"></div>

        <script src="{{asset('/js/main.js')}}"></script>
    </body>
</html>
