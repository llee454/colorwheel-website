/*
  The Markdown module allows you to load markdown text and insert
  it into your pages.
*/

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

/*
  Accepts two arguments:

  * context, a Block Expansion Context
  * and done, a function that accepts two arguments: an Error
    object and a JQuery HTML Element

  renders the markdown text stored in context.element and calls done.
*/
function markdown_block (context, done) {
  marked.parse (context.element.text (),
    function (error, rendered) {
      if (error) {
        strictError (error)
        return done (error)
      }
      context.element.replaceWith (rendered)
      done (null, context.element)
  })
}
