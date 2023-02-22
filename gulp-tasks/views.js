"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";
import pictureHTML from "gulp-picture-html";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("views", () => {
    return gulp.src(paths.views.src)
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(pictureHTML(
            {
                extensions : ['.png','.jpg'], // image file extensions for which we create 'picture'
                source : ['.webp'], // create 'source' with these formats   
                noPicture : ['no-sourse'],  // if we find this class for the 'img' tag, then we don't create a 'picture' (multiple classes can be set)
                noPictureDel : false // if 'true' remove classes for 'img' tag given in 'noSource:[]'
            }
        ))
        .pipe(gulp.dest(paths.views.dist))
        .pipe(browsersync.stream());
});