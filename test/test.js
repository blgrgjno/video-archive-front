'use strict';

var testpoint = 'http://localhost:9000/index.html';

describe('check error handling', function() {
/*  before(function() {
  });*/

  it('should show error', function() {
    casper.start(testpoint);
    casper.then(function() {
      '.error-message'.should.be.inDOM;
      '.error-message'.should.contain.text('watch');
    });
  });

  it('should validate watch', function() {
    casper.start(testpoint + '?watch=donalduck');
    casper.then(function() {
      '.error-message'.should.be.inDOM.and.be.visible;
      '.error-message'.should.contain.text(/watch.*illegal characters/);
    });

  });

  it('should not give error when video exists', function() {
    casper.start(testpoint +
                 '?watch=4a752381-1c08-4fd4-ae6c-60404c1e7f41');
    casper.then(function() {
      '.error-message'.should.not.be.visible;
    });
  });
});

describe('check example video 4a752381-1c08-4fd4-ae6c-60404c1e7f41', function() {
  before(function() {
    casper.start(testpoint +
                 '?watch=4a752381-1c08-4fd4-ae6c-60404c1e7f41');
  });
  it('should show slides', function() {
    casper.then(function() {
      'body.has-slides'.should.be.inDOM;
    });
  });
  it('should contain 1 slide', function() {
    'document.getElementById("slides").childNodes.length'.should.evaluate.to.equal(1);
  });
  it('should contain dl link to mp4 file', function() {
    '.download a'.should.be.inDOM.and.with.attr('href').that.match(/mp4$/);
  });
});
