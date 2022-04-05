Mustache Module
===============

The Mustache module allows you to insert mustache templates into pages and to fill in their variables using JSON files.

```javascript
/*
  The Mustache module allows you to insert mustache templates into
  pages and to fill in their variables using JSON files.
*/
```

Usage Notes
-----------

WARNING: Any blocks nested within a Mustache block must be wrapped within a <code>block_quote_block</code> block to work properly. The Mustache block completely replaces all elements within it. So any block elements that have event handlers attached will be replaced with new elements that do not. By wrapping these elements in Block Quote Blocks, you defer their expansion until after Mustache has had the opportunity to expand its template.

NOTE: Browsers such as Firefox will throw away (or randomly move) content within select and table elements that do not belong within them. For example, if you place a div element or a Mustache tag in one of these elements it will either remove or move it. Unfortunately, we often want to place Mustache blocks in table and select elements to generate table rows or select options. To work around this, wrap the Mustache block tags in HTML comments. For example:

```html
<table>
  <thead></thead>
  <tbody>
    <!-- {{#results}} -->
    <tr><td>...</td></tr>
    <!-- {{/results}} -->
  </tbody>
</table>
```

The Partials Store
------------------

Mustache allows users to nest templates within each other using a feature called "partials." The Partials store stores these partial templates and make them available for inclusion in other templates. Other modules can define and register partials by calling the add functions.

```javascript
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
```

The Load Event Handler
----------------------

The Mustache module defines a single block type: Mustache Blocks.

The module's load event handler registers the block handler for this block and loads the Mustache library.

```javascript
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
```

The Mustache Block Handler
--------------------------

The Mustache block accepts two arguments, a mustache template URL and a JSON variable file, and replaces the block element's body with the given template using the variable values stored in the JSON file.

```javascript
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
```

Generating Source Files
-----------------------

You can generate the Mustache module's source files using [Literate Programming](https://github.com/jostylr/literate-programming), simply execute:
`node node_modules/litpro/litpro.js Readme.md -b .`
from the command line.

Mustache.js
-----------
```
_"Mustache Module"

_"The Partials Store"

_"The Load Event Handler"

_"The Mustache Block Handler"
```
[mustache.js](#Mustache.js "save:")
