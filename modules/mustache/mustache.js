/*
  The Mustache module allows you to insert mustache templates into
  pages and to fill in their variables using JSON files.
*/

// Registers the block handlers and loads the Mustache library.
MODULE_LOAD_HANDLERS.add (
  function (done) {
    loadScripts ([
      'modules/mustache/lib/mustache.js-4.2.0/mustache.js'
    ],
    function (error) {
      if (error) { return done (error); }
      block_HANDLERS.addHandlers ({
        mustache_block: mustache_block
      });
      done (null);
    })
})

/*
  Accepts two arguments:

  * context, a Block Expansion Context * and done, a function that
  accepts two arguments: an Error object and a JQuery HTML Element

  replaces context.element with the mustache template referenced
  by the block element's nested arguments and calls done.
*/
function mustache_block (context, done) {
  getBlockArguments ([
      {'name': 'template',  'text': true, 'required': true},
      {'name': 'variables', 'text': true, 'required': true}
    ],
    context.element,
    function (error, blockArguments) {
      if (error) {
        strictError (error);
        return done (error);
      }
      getPlainText (blockArguments.template,
        function (error, template) {
          if (error) {
            strictError (error);
            return done (error);
          }
          getPlainText (blockArguments.variables,
            function (error, view) {
              if (error) {
                strictError (error);
                return done (error);
              }
              context.element.replaceWith (mustache.render (template, $.parseJSON(view)))
              done (null, context.element)
            })
      })
    });
}
