'use strict';

import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import { File, PluginError } from 'gulp-util';
import rename from 'gulp-rename';
import through from 'through2';
import cheerio from 'cheerio';

// nodeppt 还没有 javascript Api, 这里直接使用内部库
import nodeppt from 'nodeppt/lib/nodePPT';

const nodepptPublish = (dest,isAll=true) => {
    return through.obj(function(file, encoding, callback) {
        let filepath = path.relative(file.cwd, file.path);
        // generate 函数会在每次结尾直接输出 `生成结束 ` 等字样
        // 这样会导致这里得到多个输出，这里直接 hack 掉 console
        let _console = global.console.log;
        global.console.log = function(){};
        nodeppt.generate(filepath, dest, !!isAll);
        // 只有第一个文件需要 release-all 剩下的复用即可
        isAll = false;
        global.console.log = _console;
        return callback();
    });
};

const remarkjsPublish = () => {
    let tmpl = fs.readFileSync('templates/remarkjs-template.html').toString();
    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new PluginError('remarkjsPublish', 'Streams not supported!'));
        } else if (file.isBuffer()) {
            let markdown = file.contents.toString();
            let filepath = path.relative(file.base,file.path);
            let title = filepath.replace(/\.remark\.md/g,'').split(path.sep).join(' ');
            file.contents = new Buffer(
                tmpl
                    .replace(/\{\{TITLE\}\}/,title)
                    .replace(/\{\{SOURCE\}\}/,markdown)
            );
            return callback(null, file);
        }
    });
};

const indexGenerator = (output='index.html') => {
    let tmpl = fs.readFileSync('templates/index.html').toString();
    let files = [];
    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new PluginError('remarkjsPublish', 'Streams not supported!'));
        } else if (file.isBuffer()) {
            let filepath = path.relative(file.base, file.path);
            let content = file.contents.toString();
            let $ = cheerio.load(content);
            files.push({
                filepath: filepath,
                title: $('title').text() || $('h1').text()
            });
            return callback(null, file);
        }
    }, function (callback) {
        let $ = cheerio.load(tmpl);
        $('#list').html(
            files.map(f => `<li><a href=${f.filepath}>${f.title}</a></li>`).join('\n')
        );
        this.push(new File({
            path: path.join(__dirname,output),
            contents: new Buffer($.html())
        }));
        callback();
    })
}

gulp.task('publish:nodeppt', () => {
    // nodeppt 生成的文件引用路径是固定的
    // 因此这里只支持导入 src 一级目录下的文件
    return gulp.src('src/*.nodeppt.md')
        .pipe(nodepptPublish('publish/nodeppt'));
});

gulp.task('publish:remarkjs', () => {
    return gulp.src('src/**/*.remark.md')
        .pipe(remarkjsPublish())
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest('publish/remark/'))
});

gulp.task('publish:html', () => {
    return gulp.src('src/**/*.@(htm|html)')
        .pipe(gulp.dest('publish'))
});

gulp.task('publish',['publish:nodeppt','publish:remarkjs','publish:html'], () => {
    gulp.src([
        'publish/**/*.@(htm|html)',
        // 排除 nodeppt 自己生成的目录
        '!publish/nodeppt/js/**',
        '!publish/nodeppt/css/**',
        '!publish/nodeppt/img/**',
        '!publish/nodeppt/fonts/**',
        // 排除自己
        '!publish/index.html'
    ])
        .pipe(indexGenerator())
        .pipe(gulp.dest('publish'));
});

gulp.task('default',['publish']);
