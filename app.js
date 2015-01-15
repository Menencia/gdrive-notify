var App = function($rootScope, $http, $timeout, $location) {
  this.$rootScope = $rootScope;
  this.$http = $http;
  this.$timeout = $timeout;
  this.$location = $location;

  this.$rootScope.app = this;

  this.files = [];
  this.fileId = '';

  this.loadKey();
  this.loadFiles();
};

/**
 * Add a file
 */
App.prototype.add = function() {
  this.files.push(new File(this, this.fileId));
  this.$location.path('/home');
  this.saveFiles();
};

/**
 * Remove a file
 * @param {File} file
 */
App.prototype.remove = function(file) {
  _.remove(this.files, {
    id: file.id
  });
  this.saveFiles();
};

/**
 * Load key
 */
App.prototype.loadKey = function() {
  var key = localStorage.GDkey;
  if (key) {
    this.key = JSON.parse(key);
  }
};

/**
 * Remove a file
 * @param {File} file
 */
App.prototype.saveKey = function() {
  localStorage.GDkey = JSON.stringify(this.key);
};

/**
 * Load files
 */
App.prototype.loadFiles = function() {
  var files = localStorage.files;
  if (files) {
    files = JSON.parse(files);
    for (var i in files) {
      var data = files[i];
      var file = new File(this, data.fileId);
      _.assign(file, data);
      this.files.push(file);
    }
  }
};

/**
 * Save files
 */
App.prototype.saveFiles = function() {
  var files = [];
  for (var i in this.files) {
    var file = _.omit(this.files[i], 'app');
    files.push(file);
  }
  localStorage.files = JSON.stringify(files);
};