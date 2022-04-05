Back to Top Module
==================

The Back to Top module defines a block that expands into a "back to top" button that, when clicked, scrolls the user back to the top of the page.

```javascript
/*
  The Back to Top module defines a block that expands into a
  "back to top" button that, when clicked, scrolls the user back to the
  top of the page.
*/
```

The Load Event Handler
----------------------

The Back to Top module defines a single block, the Back to Top block. The Load Event handler registers this block.

```javascript
// Registers the block handlers.
MODULES_LOAD_HANDLERS.add (
  function (done) {
    $.getCSS ('modules/back_to_top/css/style.css');
    block_HANDLERS.addHandler ('back_to_top_block', back_to_top_block);
    done (null);
});
```

The Block Handlers
------------------

```javascript
/*
  Accepts two arguments:

  * context, a Block Expansion Context
  * and done, a function that accepts two
    arguments: an Error object and a JQuery
    HTML Element

  attaches a click event handler to context.element
  and calls done. When triggered, this event
  handler scrolls the user back to the top of the
  page. It also registers a timer that hides
  context.element when the user is at the top of
  the page.
*/
function back_to_top_block (context, done) {
  var element = $('<div></div>')
    .addClass ('back_to_top')
    .append ($('<a></a>')
      .attr ('href', '#')
      .text ('Back To Top'))
    .click (function (event) {
      event.preventDefault ();
      $('html, body').animate ({
        scrollTop: $('#top').offset ().top
      });
    });

  context.element.replaceWith (element);

  setInterval (function () {
    if ($(window).scrollTop() > 200) {
      element.animate ({opacity: 1});
    } else {
      element.animate ({opacity: 0});
    }
  }, 1000);

  done (null);
}
```

Generating Source Files
-----------------------

You can generate the Mustache module's source files using [Literate Programming](https://github.com/jostylr/literate-programming), simply execute:
`node node_modules/litpro/litpro.js Readme.md -b .`
from the command line.

Back_to_top.js
--------------
```
_"Back to Top Module"

_"The Load Event Handler"

_"The Block Handlers"
```
[back_to_top.js](#Back_to_top.js "save:")
