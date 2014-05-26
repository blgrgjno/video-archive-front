# video-archive-front

> Video player based on popcorn.js

For playing video synchronized with image slides using the footnote
plugin. Requires a well-known file structure with a meta file located
in the ```data``` folder in the root of the installed app.

Supports two different modes. One with slides and one without.

Will hide chapter selector if there are no chapters in file

## Usage

Will load the video id given in the ```watch``` query parameter.

E.g.

```
http://video/index.html?watch=84db7c47-ee64-41b8-82e2-dcaf515d2cda
```

...should load the video in ```data/video/84db7c47-ee64-41b8-82e2-dcaf515d2cda```

## Build

Although it's possible to use another tool to convert sass -> css, it
will require some changes to the build system, or a separate build
process. The easiest is to get ruby and compass up and running
according to the [installation instructions](http://sass-lang.com/install).

Then you need to install gulp dependencies:

```sh
$ npm install
```

Then popcorn.js:

```sh
$ bower install
```

To build in the ```dist``` folder:

```sh
$ grunt build
```

## Develop

You can start a local developer version with watch/livereload:

```sh
grunt watch
```

## Filestructure

A list of directories placed in the ```data``` folder.

```
data
└── video
    ├── 84db7c47-ee64-41b8-82e2-dcaf515d2cda
    │   ├── 84db7c47-ee64-41b8-82e2-dcaf515d2cda_1.mp4
    │   ├── metadata.xml
    │   ├── meta.json
    │   └── timeline
    ├── 09ce8117-24d9-44f5-9b9c-44366553b541
    │   ├── 17214.mp4
    │   ├── metadata.xml
    │   ├── meta.json
    │   └── timeline
...and so on.
```

```timeline``` folder contains a png slides that is listed in meta.json as slides/slideURL

```metadata.xml``` the original metadata.xml from fluvi

## Example meta.json

A modified JSON file converted from metadata.xml with some
modifications.

```json
{
 "itemID": [
  "84db7c47-ee64-41b8-82e2-dcaf515d2cda"
 ],
 "category": [
  "Finansdepartementet"
 ],
 "diID": [
  "71555419"
 ],
 "created": [
  "Mon Oct 1 09:15:55 GMT+0200 2012"
 ],
 "published": [
  "Mon Oct 1 12:16:00 GMT+0200 2012"
 ],
 "timestamp": [
  "Thu Oct 4 09:57:07 GMT+0200 2012"
 ],
 "title": [
  "Nett-TV: Pressekonferanse om samfunnsøkonomiske analyser"
 ],
 "videoIn": [
  "243"
 ],
 "videoOut": [
  "2597"
 ],
 "videoFile": [
  "84db7c47-ee64-41b8-82e2-dcaf515d2cda_1.mp4"
 ],
 "webPageID": [
  "700698"
 ],
 "slideScreenPosition": [
  "right"
 ],
 "slides": [
  {
   "title": [
    "page1"
   ],
   "isChapter": [
    "false"
   ],
   "isCued": [
    "true"
   ],
   "startTime": [
    "0"
   ],
   "slideURL": [
    "36022_d60d412e-b483-4307-a7ce-a631a44a080b.swf"
   ]
  },
  {
   "title": [
    "page2"
   ],
   "isChapter": [
    "false"
   ],
   "isCued": [
    "true"
   ],
   "startTime": [
    "269"
   ],
   "slideURL": [
    "36022_dda6c74b-74e3-40ce-a616-12a4048ac687.swf"
   ]
  },
  .... and so on
 ]
}
```

## Testing

Nope :(
