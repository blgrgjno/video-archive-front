# video-archive-front

> Video player based on popcorn.js

For playing video synchronized with image slides using the footnote
plugin. Requires a well-known file structure with a meta file.

Will load the video id given in the ```watch``` query parameter.

E.g.

```
http://video/index.html?watch=84db7c47-ee64-41b8-82e2-dcaf515d2cda

```

Supports two different modes. One with slides and one without.

Will hide chapter selector if there are no chapters in file

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

```timeline``` folder contains a list of png slides that is listed in
meta.json

```metadata.xml``` the original metadata.xml from fluvi

## Example meta.json

A modified JSON file converted from metadata.xml with some
modifications.

```
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
