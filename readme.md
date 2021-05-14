# scss-twig-landing-boilerplate

This is a base page generator for landings with [TWIG] tempalte and [Bootstrap 3 SCSS] support.

Clone this repository, and copy it to a new folder to be use as a starting point for a new developing.

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


[TWIG]: https://twig.symfony.com/
[ABEM]: https://css-tricks.com/abem-useful-adaptation-bem/
[Bootstrap 3 SCSS]: https://github.com/twbs/bootstrap-sass
