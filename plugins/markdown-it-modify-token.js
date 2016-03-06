'use strict';

var polyfillDone = false;
function doPolyfill(token) {
  if (!polyfillDone) {
    var tokenPrototype = Object.getPrototypeOf(token);
    if (!!tokenPrototype) {
      polyfillPrototype(tokenPrototype, markdownIt6_tokenPrototype);
      polyfillDone = true;
    }
  }
}

function modifyToken(token, modifyFn, env) {
  // polyfill if necessary
  doPolyfill(token);

  // create attrObj for convenient get/set of attributes
  var attrObj = (token.attrs) ? token.attrs.reduce(function (acc, pair) {
    acc[pair[0]] = pair[1];
    return acc;
  }, {}) : {};
  token.attrObj = attrObj;
  modifyFn(token, env);
  // apply any overrides or new attributes from attrObj
  Object.keys(token.attrObj).forEach(function (k) {
    token.attrSet(k, token.attrObj[k]);
  });
}

function noop() { }

// module.exports = function (md) {
function modifyTokenPlugin(md) {
    md.core.ruler.push(
        'modify-token',
        function (state) {
          var modifyFn = md.options.modifyToken || noop;
          state.tokens.forEach(function (token) {
            if (token.children && token.children.length) {
              token.children.forEach(function (token) {
                modifyToken(token, modifyFn, state.env);
              });
            }
            modifyToken(token, modifyFn, state.env);
          });
          return false;
        }
    );
};


_MarkdownItPlugins['markdown-it-modify-token'] = {
  plugin: modifyTokenPlugin
};