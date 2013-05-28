/**
 * JavaScript の低レベルAPIを提供します。
 *
 * @module flexible
 */
var flexible = flexible || {};

flexible.version = '0.0.1-dev';

/**
 * このメソッドは引数に指定された文字列の名前空間を定義します。
 *
 * @namespace flexible
 * @module flexible
 * @type Function
 * @param {String} ns 名前空間文字列
 */
flexible.namespace = function(ns) {

  var NAMESPACE_REGEXP = new RegExp("^[a-zA-Z][a-zA-Z0-9_\.]*$");

  if (!ns || !ns.match(NAMESPACE_REGEXP)) throw new Error('An invalid argument \"' + ns + '\" was specified');

  var labels = ns.split('.');
  var root = flexible;

  // 冗長なグローバルを取り除く
  if (labels[0] === 'flexible') {
    labels = labels.slice(1);
  };

  for (i = 0; i < labels.length; i += 1) {
    if (typeof root[labels[i]] == 'undefined') {
      root[labels[i]] = {};
    }
    root = root[labels[i]];
  };

  return root;
};
