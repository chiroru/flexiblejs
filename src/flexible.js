/**
 * @fileOverview
 * flexibleの低レベルAPIを提供します。
 *
 */
var flexible = flexible || {};

/**
 * flexible のバージョンです。
 */
flexible.version = '0.0.1-dev';

/**
 * このメソッドは引数に指定された文字列の名前空間を定義します。
 * 
 * @param {String} ns 作成対象の名前空間の文字列表現
 * @exception {Error} 不正な書式の名前空間の文字列表現を指定した場合に例外をスローします。
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
