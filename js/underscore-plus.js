(function() {

var root = this;
var previousPlus = root.plus;

var plus;
if (typeof exports !== 'undefined') {
  plus = exports;
} else {
  // ���[�J���ϐ� plus �� root.plus �������I�u�W�F�N�g���Q��
  // ����ɂ��֐��Ȃ��ł̓��[�J���ϐ� plus �ɑ΂��鑀��� root.plus �ɔ��f�ł���
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

  // fqjn ������`�l���邢��null
  if (!fqjn)
    throw new Error('Specified namespace string is null value or undefined.');

  // fqjn ��������Ȃ������𗘗p
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
