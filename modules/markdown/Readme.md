Markdown Module
===============

The Markdown module allows you to load markdown text and insert it into your pages.

```javascript
/*
  The Markdown module allows you to load markdown text and insert
  it into your pages.
*/
```

The Load Event Handler
----------------------

The Markdown module defines a single block type named Markdown Block.

The module's load event handler registers the block handler for this block and loads the Marked library that it depends on.

```javascript
// Registers the block handlers and loads the Marked library.
MODULE_LOAD_HANDLERS.add (
  function (done) {
    loadScripts ([
      'modules/markdown/lib/marked-4.0.12/marked.min.js'
    ],
    function (error) {
      if (error) { return done (error); }
      block_HANDLERS.addHandlers ({
        markdown_block: markdown_block
      });
      done (null);
    })
})
```

The Markdown Block Handler
--------------------------

The Markdown block accepts one argument, a URL; loads the markdown file at the given URL; renders the file as HTML; and replaces the block element with the generated content.

```javascript
/*
  Accepts two arguments:

  * context, a Block Expansion Context
  * and done, a function that accepts two arguments: an Error
    object and a JQuery HTML Element

  renders the markdown text stored in context.element and calls done.
*/
function markdown_block (context, done) {
  // prevent Marked from treating indented text as code - dumbest idea ever...
  marked
    .parse (context.element.html ().replace(/^\s+/gm, ''),
      function (error, rendered) {
        if (error) {
          strictError (error)
          return done (error)
        }
        context.element.replaceWith (rendered)
        done (null, context.element)
  })
}
```

Generating Source Files
-----------------------

You can generate the Markdown module's source files using [Literate Programming](https://github.com/jostylr/literate-programming), simply execute:
`node node_modules/litpro/litpro.js Readme.md -b .`
from the command line.

Markdown.js
-----------
```
_"Markdown Module"

_"The Load Event Handler"

_"The Markdown Block Handler"
```
[markdown.js](#Markdown.js "save:")
