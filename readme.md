# Peer Challenge - jQuery - 3 
Challenge points:
- Front End Styling
- Bootstrap Grid System
- Working with data using a third party API
- Population of Content through jQuery
- Assigning `.on('click', function)` using jQuery
- jQuery functions

Welcome back!
-------------

You and your peer will be tackling a bit of jQuery and Front End using Bootstrap.

You are going to create an application that allows users to search for video games, and display the result's image and title inside of a `div` (one `div` per result). The display of results using Bootstrap allows you to create a grid system quickly. The `index.html` already has links to Bootstrap's style sheets and JavaScript files, so you shouldn't need to get them.

In addition to this functionality, clicking a result's `div` should expand the `div` it is inside of to show all useful information (at minimum include the description, release date & platform), using jQuery's `on` function.

Rather than manually creating a database with video game data, this project uses [Giantbomb's API](http://www.giantbomb.com/api/). Since you're unfamiliar with the API and Ajax in general, we have already created the JavaScript functions for searching and you just have to create the front-end and manipulate the data. To use the functions you have to [sign up](https://auth.giantbomb.com/signup/) at Giantbomb, then under "Grab an API key" click "Get one!" Take that API key and paste it into your JavaScript file so that `var apikey = 'YOUR-API-KEY'`.
