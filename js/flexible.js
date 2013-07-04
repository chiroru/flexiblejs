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
 * このメソッドは引数に指定された文字列に基づいての名前空間を定義します。
 * 名前空間の定義に利用可能な文字は半角英数、またはアンダースコア(_)です。
 * また名前空間の区切りはドット(.)により指定します。
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

flexible.restrict = function () {
  var func = arguments[0];
  var self = arguments[1];
  var args = Array.prototype.slice.call(arguments, 2);
  return func.apply(self, Array.prototype.concat.apply(args, arguments));
};

flexible.objectType = function (suspect) {
  if (typeof suspect == "number") {
    return flexible.objectType.number;
  } else if (typeof suspect == "string") {
    return flexible.objectType.string;
  } else if (typeof suspect == "function") {
    return flexible.objectType.func;
  } else {
    return flexible.objectType.obj;
  }
};

flexible.objectType.number = 0;
flexible.objectType.string = 1;
flexible.objectType.func = 2;
flexible.objectType.obj = 3;

flexible.to_s = function (suspect, indent, level) {
  var delimiter = ",\n";
  var indent = indent || " ";
  var level = level || 0;
  var buffer = "{\n";

  var tmp = "";

  for (var i = 0; i < (2 + level); i++) {
    tmp += indent;
  };

  for (var key in suspect) {
    buffer += tmp;
    buffer += key + ":" + suspect[key] + delimiter;
  };

  buffer += "}\n";

  console.log("\n" + buffer);

  return "{}";
};

flexible._number_to_s = function (suspect) {
  return "" + suspect;
};

flexible._string_to_s = function (suspect) {
  return "\"" + suspect + "\"";
};

flexible._function_to_s= function (suspect) {
  return "" + suspect;
};

