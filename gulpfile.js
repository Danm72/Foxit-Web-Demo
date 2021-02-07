const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");

const autoprefixer = require("gulp-autoprefixer");

let pages = [
    {
        name: "homepage",
        scripts: [

        ],
    },
]

let scssBodyes = pages.map(({name}) => `./src/scss/${name}/${name}.scss`);

// Generate css
gulp.task("scss", function () {
    return gulp
        .src([...scssBodyes])
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
        .pipe(gulp.dest("./_site/src/css"));
});

gulp.task("fonts", function () {
    return gulp.src("./src/fonts/*/*.*").pipe(gulp.dest("./_site/src/fonts"));
});

gulp.task("icons", function () {
    return gulp
        .src("./src/image/**/**.*")
        .pipe(gulp.dest("./_site/src/image/"));
});

gulp.task("build", gulp.parallel("scss", "fonts", "icons"));
