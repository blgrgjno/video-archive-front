/* global escape: true, purl: true, Popcorn: true */
(function() {
  'use strict';
  // main popcorn
  var popcorn = null;

  // Array that stores the chapters
  var chapters = [];

  /**
   * Loads a slide
   */
  function loadSlide(slide, end, slideURL) {
    var title = slide.title[0];

    function getHTML() {
      var tmpSlide = slide.slideURL[0];
      var html = '<h2> * Error: no slide available * </h2>';

      if (tmpSlide) {
        html = '<img src="' + escape(slideURL) + '">';
      } else if (title) {
        html = '<h2>' + escape(title) + '</h2>';
      }

      return html;
    }

    if (popcorn) {
      popcorn.footnote({
        start: slide.startTime[0],
        end: end,
        target: '#slides',
        text: getHTML()
      });
    }
  }

  /**
   * Loads a chapter
   */
  function loadChapter(chapter/*, end*/) {
    var start = chapter.startTime[0];
    var title = chapter.title[0];

    var hours = parseInt(start / 3600) % 24;
    var minutes = parseInt(start / 60) % 60;
    var seconds = start % 60;

    var startTimeStr = (hours < 10 ? '0' + hours : hours) + '-' + (minutes < 10 ? '0' + minutes : minutes) + '-' + (seconds < 10 ? '0' + seconds : seconds);

    var el = document.querySelector('.selectpicker');

    if (el) {
      var optionEl = document.createElement('option');
      optionEl.textContent = startTimeStr + ' - ' + title;
      el.appendChild(optionEl);
    }

    chapters.push(start);
  }

  /**
   * Load video
   * @param {string} videoId - the GUID of the video to load
   * @param {function} err - the error callback
   * @param {function ok - the ok callback
   */
  function loadVideo(videoId, err, ok) {
    var request;

    if (! /^[-a-f0-9]+$/.test(videoId) ) {
      return err('internal error');
    }

    request = new XMLHttpRequest();
    request.open('GET', 'data/video/' + videoId + '/meta.json', true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          return ok(JSON.parse(this.responseText));
        } else {
          // Error :(
        }
      }
      return null;
    };

    request.send();
    request = null;

    return null;
  }

  /**
   * Loads all slides and chapters
   * @param {string} videoId - the GUID of the video
   * data from
   */
  function loadSlidesAndChapters(videoId) {
    loadVideo(videoId,
              function(msg) {
                throw 'Error while loading video `' + msg + '`';
              },
              function(data) {
                var scriptEl, videoFile;
                var slides = data.slides;
                var numSlidesOrChapters = slides.length;

                forEach(slides, function(slide, index) {
                  var isChapter = ('true' === slide.isChapter[0]);
                  var i, slideURL;

                  if (isChapter) {
                    // make footnote timeline for chapters
                    for (i = index; i < numSlidesOrChapters; i++) {

                      if ('true' === slides[i].isChapter[0]) {
                        loadChapter(slide, slides[i].startTime[0]);
                        break;
                      }
                    }
                  } else {
                    // make footnote timeline for slides
                    for (i = index+1; i < numSlidesOrChapters; i++) {
                      if ('false' === slides[i].isChapter[0]) {
                        slideURL = 'data/video/' +
                          escape(data.itemID) + '/timeline/' + slide.slideURL[0];
                        loadSlide(slide, slides[i].startTime[0], slideURL);
                        break;
                      }
                    }
                  }
                });

                // add video to media object
                videoFile = 'data/video/' + escape(data.itemID) + '/' +
                  escape(data.videoFile);

                scriptEl = document.createElement('source');
                scriptEl.setAttribute('src', videoFile);
                document.getElementById('ourvideo').appendChild(scriptEl);
              });
  }

  // --
  // some helpers
  // --
  function ready(fn) {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'interactive') {
          fn();
        }
      });
    }
  }

  function forEach(array, fn) {
    var i;
    for (i = 0; i < array.length; i++) {
      fn(array[i], i);
    }
  }
  /*jshint unused:false*/
  function addEventListener(el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function(){
        handler.call(el);
      });
    }
  }

  ready(function() {
    var url = purl();
    var videoId = escape(url.param('watch'));
    popcorn = Popcorn('#ourvideo');
    loadSlidesAndChapters(videoId);
    addEventListener(document.getElementsByTagName('select')[0],
                     'change',
                     function() {
                        popcorn.currentTime(chapters[this.selectedIndex]);
                      });
  });



})();
