const gulp = require('gulp')
const fs = require('fs')
const del = require('del')
const runSequence = require('run-sequence')
const util = require('gulp-util')
const rollup = require('rollup').rollup
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const nodeResolve = require('rollup-plugin-node-resolve')
const stylus = require('gulp-stylus')
const connect = require('gulp-connect')
const bump = require('gulp-bump')
const git = require('gulp-git')
const conventionalGithubReleaser = require('conventional-github-releaser')


const port = process.env.PORT || 8080;

// Configs for all tasks
// Comments are just examples how to add posible configurations to the tasks
const rollupConf = {
  entry: 'src/index.js',
  external: [ 'react' ],
  plugins: [
    //nodeResolve({ jsnext: true }),
    babel(),
    commonjs({
      //include: 'node_modules/**'
    })
   ]
}

//A self-executing function, suitable for inclusion as a <script> tag format
const iifeBundleConf = {
  format: 'iife',
  moduleName: 'component',
  dest: 'dist/index.iife.js'
}

//CommonJS, suitable for Node and Browserify/Webpack format
const cjsBundleConf = {
  format: 'cjs',
  dest: 'dist/index.js'
}

//example server confin
const exampleServConf = {
  root: ['demo'],
  port: port,
  livereload: true
}

gulp.task('serv', () => connect.server(exampleServConf))
gulp.task('reload-js', () => gulp.src('dist/*.js').pipe(connect.reload()))

gulp.task('build:iife', () => rollup(rollupConf).then((bundle) => bundle.write(iifeBundleConf)))
gulp.task('build:cjs', () => rollup(rollupConf).then((bundle) => bundle.write(cjsBundleConf)))
gulp.task('style', () => gulp.src('style/*.styl').pipe(stylus()).pipe(gulp.dest('dist')))
gulp.task('style:min', () => gulp.src('style/*.styl').pipe(stylus({ compress: true })).pipe(gulp.dest('dist')))
gulp.task('build', ['build:cjs', 'build:iife', 'style:min'])

gulp.task('clean', () => del(['dist']) )

gulp.task('watch', () => {
  gulp.watch('src/*.js', ['build:iife', 'build:cjs', 'reload-js'])
  gulp.watch('style/*.styl', ['style'])
})


// Tasks for the github release
gulp.task('bump-ver', () => {
  const options = { type: util.env.type || 'patch' }
  gulp.src('./package.json')
    .pipe(bump(options)).on('error', util.log)
    .pipe(gulp.dest('./'))
})

//git commit task
gulp.task('commit-changes', () => gulp.src('.')
  .pipe(git.add())
  .pipe(git.commit('Bumped version number'))
)

//git push taks
gulp.task('push-changes', cb => git.push('origin', 'master', cb))

//git create new tag task
gulp.task('create-new-tag', cb => {
  const version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version
  git.tag(version, 'Created Tag for version: ' + version, error => {
    if (error) return cb(error)
    git.push('origin', 'master', { args: '--tags' }, cb)
  })
})

//github release task
gulp.task('github-release', done => {
  conventionalGithubReleaser({
    type: 'oauth',
    token: process.env.OAUTH // change this to your own GitHub token or use an environment variable
  }, {}, done)
})

gulp.task('release', callback => {
  runSequence(
    'bump-ver',
    'commit-changes',
    'push-changes',
    'create-new-tag',
    'github-release',
    error => {
      if (error) {
        console.log(error.message)
      } else {
        console.log('Release done')
      }
      callback(error)
    })
})

gulp.task('default', ['clean', 'watch'])
