/*
  The Back to Top module defines a block that expands into a
  "back to top" button that, when clicked, scrolls the user back to the
  top of the page.
*/

// Registers the block handlers.
MODULE_LOAD_HANDLERS.add (
  function (done) {
    $.getCSS ('modules/back_to_top/css/style.css');
    block_HANDLERS.add ('back_to_top_block', back_to_top_block);
    done (null);
});

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
