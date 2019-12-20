const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function() {
  // this is to add Creative Tim licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Boost Tailwind - v1.0.0
=========================================================

* Product Page: https://demos.creative-tim.com/tailwindcss-starter-project/#/presentation
* Copyright 2019 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Boost Tailwind - v1.0.0
=========================================================

* Product Page: https://demos.creative-tim.com/tailwindcss-starter-project/#/presentation
* Copyright 2019 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Boost Tailwind - v1.0.0
=========================================================

* Product Page: https://demos.creative-tim.com/tailwindcss-starter-project/#/presentation
* Copyright 2019 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
