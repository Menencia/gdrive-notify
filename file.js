var File = function(app, fileId) {

  this.app = app;
  this.id = _.uniqueId();
  this.fileId = fileId;
  this.title = null;
  this.lastModifyingUserName = null;
  this.modifiedDate = null;
  this.lastCheck = null;
  this.star = false;

}

/**
 * Update file infos
 * @param  {int} id
 */
File.prototype.update = function() {
  var $this = this;

  var fields = 'title%2C+lastModifyingUserName%2C+modifiedDate';

  var url = 'https://www.googleapis.com/drive/v2/files/' + this.fileId + '?updateViewedDate=false&key=' + this.app.key + '&fields=' + fields;

  this.app.$http.get(url).
  success(function(data, status, headers, config) {
    _.assign($this, data);
    $this.lastCheck = new Date();
    if ($this.star) {
      $this.notify();
    }
    $this.app.saveFiles();
  }).
  error(function(data, status, headers, config) {
    console.log('error');
  });
};

/**
 * Modif date from now
 * @return {string}
 */
File.prototype.modifFromNow = function() {
  var txt = '';
  var time = Math.floor(new Date(this.modifiedDate).getTime() / 1000);
  var now = Math.floor(_.now() / 1000);

  var ago = now - time;
  if (ago < 60) return Math.floor(ago) + 's'

  ago /= 60;
  if (ago < 60) return Math.floor(ago) + 'm';

  ago /= 60;
  if (ago < 24) return Math.floor(ago) + 'h';

  ago /= 24;
  if (ago < 30) return Math.floor(ago) + 'M';

  ago /= 365;
  return ago + 'y';
};

/**
 * Verif date from now
 * @return {string}
 */
File.prototype.verifFromNow = function() {
  var txt = '';
  var time = Math.floor(new Date(this.lastCheck).getTime() / 1000);
  var now = Math.floor(_.now() / 1000);

  var ago = now - time;
  if (ago < 60) return Math.floor(ago) + 's'

  ago /= 60;
  if (ago < 60) return Math.floor(ago) + 'm';

  ago /= 60;
  if (ago < 24) return Math.floor(ago) + 'h';

  ago /= 24;
  if (ago < 30) return Math.floor(ago) + 'M';

  ago /= 365;
  return ago + 'y';
};

/**
 * Notify
 * @return {string}
 */
File.prototype.notify = function() {
  var txt = this.modifFromNow();
  chrome.browserAction.setBadgeText({
    text: txt
  });
};