(function() {

var root = this;
var previousPlus = root.plus;

var plus;
if (typeof exports !== 'undefined') {
  plus = exports;
} else {
  // ローカル変数 plus と root.plus が同じオブジェクトを参照
  // これにより関数ないではローカル変数 plus に対する操作を root.plus に反映できる
  plus = root.plus = {};
};

plus.VERSION = '0.0.1';

var _ = root._;

var $ = root.jQuery || root.Zepto || root.ender || root.$;

plus.noConflict = function () {
  root.plus = previousPlus;
  return this;
};

var NAMESPACE_REGEXP = new RegExp('^[a-zA-Z][a-zA-Z0-9_\.]*$');

plus.namespace = function (fqjn) {

  // fqjn が未定義値あるいはnull
  if (!fqjn)
    throw new Error('Specified namespace string is null value or undefined.');

  // fqjn が許可されない文字を利用
  if (fqjn.match(NAMESPACE_REGEXP))
    throw new Error('An invalid argument.');

  var parts = fqjn.split('.');
  var partsLength = parts.length;
  var ns;
  for (var i = 0; i < partsLength; i += 1) {
    if (typeof parts[i] === "undefined") {
      if (i === 0) {
        ns = parts[0];
      } else {
        ns = ns[parts[i]];
      };

      return ns;
  };
};


}).call(this);
