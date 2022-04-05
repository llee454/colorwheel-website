/*
  The Mustache module allows you to insert mustache templates into
  pages and to fill in their variables using JSON files.
*/

function mustache_PartialStore () {
  var self = this

  this._partials = {}

  /*
    Accepts two arguments:

    * name, the partial name
    * and template, the template string

    and adds the partial to the store.
  */
  this.add = function (name, template) {
    self._partials [name] = template
  }

  /*
    Accepts one argument:

    * partials, an associative array of partials keyed by name

    and adds the partials to this store.
  */
  this.addPartials = function (partials) {
    for (var name in partials) {
      self.add (name, partials [name])
    }
  }
}

var mustache_PARTIALS = new mustache_PartialStore ()

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

  * context, a Block Expansion Context
  * and done, a function that accepts two arguments: an Error
    object and a JQuery HTML Element

  replaces context.element with the mustache template referenced
  by the block element's nested arguments and calls done.
*/
function mustache_block (context, done) {
  var template  = $(context.element).html ();
  var variables = $(context.element).data('variables').replace ('PAGE_ID', context.getId ());
  getPlainText (variables,
    function (error, view) {
      if (error) {
        strictError (error);
        return done (error);
      }
      context.element.html (mustache.render (template, $.parseJSON(view)))
      done (null, context.element)
    },
    mustache_PARTIALS._partials
  )
}
