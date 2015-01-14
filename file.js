var File = function(app, fileId) {

  this.app = app;
  this.id = _.uniqueId();
  this.fileId = fileId;
  this.title = null;
  this.lastModifyingUserName = null;
  this.modifiedDate = null;
  this.lastCheck = null;

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
    $this.app.$rootScope.$apply();
    $this.app.saveFiles();
  }).
  error(function(data, status, headers, config) {
    console.log('error');
  });
};