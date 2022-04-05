/*
  This module contains custom site-specific
  javascript that is called after all of the other
  block handlers have been executed.

  This script is usually used to define page and
  block handlers.
*/

MODULE_LOAD_HANDLERS.add (function (done) {
  // I. control the mobile menu.
  $('#mobile-menu-header').click (function () {
    $('#mobile-menu-content').slideToggle ();
  })
  // II. continue.
  done (null);
});
