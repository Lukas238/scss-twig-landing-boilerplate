# wt--gen-landing--nexgard

This is a base page generator for Nexgard client.

Clone this repository, and copy it to a new folder to be use as a starting point for a new developing.

If new components are created on your project, please upload them to this repository, to make them available for future developments.

Also remember to include any variable, mixin, global, or helper.

## How to use

- The generator supports [TWIG] template engine.
- For CSS/HTML naming conventions, please follow the [ABEM] system.
- Make any neccesary change on the `./src` folder.
    - For HTML:
        - New pages on `./src/markup/pages`.
        - New page templates on `./src/markup/layout`.
        - New html componens on `./src/markup/components`.
    - For SCSS:
        - New components on `./src/scss/components`.
            - Name new atoms with the prefix `_a-`.
            - Name new molecules with the prefix `_m-`.
            - Name new organisms with the prefix `_o-`.

## Gulp tasks

### Default - Developing, with live preview

For developing, run the command: `gulp`.

This will start a web server on the `./dev` folder, with a live reload on your default browser.

### Build

For compiling the sources, run the command: `gulp build`.

This will compile the sources in to the `./dist` folder.


## Technologies

- Gulp.js
- Node.js
- HTML5
- SCSS/CSS3
- Bootstrap4
- jQuery
- Twig.js


## Humans.txt
- **Tech Referent / Tech Lead** - Lucas Dasso <lucas.dasso@wundermanthompson.com>


[TWIG]: https://twig.symfony.com/
[ABEM]: https://css-tricks.com/abem-useful-adaptation-bem/
