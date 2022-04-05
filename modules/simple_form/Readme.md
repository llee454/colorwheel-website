Simple Form Module
==================

The Simple Form module provides a way to create simple AJAX forms that send JSON POST requests.

The module defines a set of input element blocks that are connected to a single form block. When the submit button registered with the form is clicked, this module generates a JSON object with all of the input values and sends it to the specified URL.

```javascript
/*
  The Simple Form module provides a way to create simple AJAX forms
  that send JSON POST requests.
*/
```

The Load Event Handler
----------------------

The load event handler registers the block elements.

```javascript
/*
  Registers the block handlers.
*/
MODULE_LOAD_HANDLERS.add (
  function (done) {
    block_HANDLERS.addHandlers ({
      'simple_form_block': simple_form_block
    });
    done (null);
});
```

Block Handlers
--------------

```javascript
/*
  Accepts two arguments:

  * context, a Block Expansion Context
  * and done, a function that accepts two
    arguments: an Error object and a JQuery
    HTML Element

  treats context.element as the submit button for a form. When
  clicked, this module will find all of the other form elements
  that have the same form ID and create a JSON object that contains
  their values. It will then send the resulting JSON object to the
  specified URL.

  Once this function adds this click callback it calls done.
*/
function simple_form_block (context, done) {
  var formId   = context.element.data ('simple-form-id');
  var url      = context.element.data ('simple-form-url');
  var reload   = context.element.data ('simple-form-reload');
  var redirect = context.element.data ('simple-form-redirect');
  var escapeNewlines = context.element.data ('simple-form-escape');

  context.element
    .click (function () {
       var request = {}
       $('[data-simple-form-id="' + formId + '"]').each (function (index, element) {
         var name  = $(element).data ('simple-form-name');
         var value = $(element).val ();
         if (escapeNewlines) {
           value = value
             .replace (/\n/g, '\\n')
             .replace (/\"/g, '\\"');
         }
         if (name) {
           request [name] = value
         }
       });

       $.post (url, JSON.stringify (request) + "\n",
         function (content) {
           if (reload) {
             location.reload();
           } else if (redirect) {
             loadPage (redirect);
           } else {
             alert ('success: ' + content)
           }
         }, 'text').fail (function () {
           alert ('failed')
         });
     });

  done (null);
}
```

Generating Source Files
-----------------------

You can generate the Mustache module's source files using [Literate Programming](https://github.com/jostylr/literate-programming), simply execute:
`node node_modules/litpro/litpro.js Readme.md -b .`
from the command line.

Simple_form.js
--------------
```
_"Simple Form Module"

_"The Load Event Handler"

_"Block Handlers"
```
[simple_form.js](#Simple_form.js "save:")
