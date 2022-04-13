/*
  Loads the Simple MDE interface.
*/

MODULE_LOAD_HANDLERS.add (
  function (done) {
    loadScript ('modules/simple_mde/lib/simple_mde_1.11.2/dist/simplemde.min.js',
      function (error) {
        if (error) { return done (error); }

        $.getCSS ('modules/simple_mde/lib/simple_mde_1.11.2/dist/simplemde.min.css');

        block_HANDLERS.add ('simple_mde_block', simple_mde_block);

        done (null);
    });
  }
);

function simple_mde_block (context, done) {
  var simplemde = new SimpleMDE({
    element: $(context.element)[0],
    forceSync: true
  }); 

  setInterval(function() {
    simplemde.codemirror.refresh();
  }.bind(simplemde), 1000);

  done (null);
}
