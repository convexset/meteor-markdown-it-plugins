'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });

var _string = require('string');

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slugify = function slugify(s) {
  return (0, _string2.default)(s).slugify().toString();
};

var position = {
  false: 'push',
  true: 'unshift'
};

var renderPermalink = function renderPermalink(slug, opts, state, idx) {
  var _state$tokens$childre;

  var space = function space() {
    return _extends(new state.Token('text', '', 0), { content: ' ' });
  };

  var linkTokens = [_extends(new state.Token('link_open', 'a', 1), {
    attrs: [['class', opts.permalinkClass], ['href', '#' + slug], ['aria-hidden', 'true']]
  }), _extends(new state.Token('html_block', '', 0), { content: opts.permalinkSymbol }), new state.Token('link_close', 'a', -1)];

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  linkTokens[position[!opts.permalinkBefore]](space());
  (_state$tokens$childre = state.tokens[idx + 1].children)[position[opts.permalinkBefore]].apply(_state$tokens$childre, linkTokens);
};

var uniqueSlug = function uniqueSlug(slug, slugs) {
  // Mark this slug as used in the environment.
  slugs[slug] = (slugs[slug] || 0) + 1;

  // First slug, return as is.
  if (slugs[slug] === 1) {
    return slug;
  }

  // Duplicate slug, add a `-2`, `-3`, etc. to keep ID unique.
  return slug + '-' + slugs[slug];
};

var anchor = function anchor(md, opts) {
  opts = _extends({}, anchor.defaults, opts);

  md.core.ruler.push('anchor', function (state) {
    var slugs = {};
    var tokens = state.tokens;

    tokens.filter(function (token) {
      return token.type === 'heading_open';
    }).filter(function (token) {
      return token.tag.substr(1) >= opts.level;
    }).forEach(function (token) {
      // Aggregate the next token children text.
      var title = tokens[tokens.indexOf(token) + 1].children.reduce(function (acc, t) {
        return acc + t.content;
      }, '');

      var slug = uniqueSlug(opts.slugify(title), slugs);

      token.attrPush(['id', slug]);

      if (opts.permalink) {
        opts.renderPermalink(slug, opts, state, tokens.indexOf(token));
      }

      if (opts.callback) {
        opts.callback(token, { slug: slug, title: title });
      }
    });
  });
};

anchor.defaults = {
  level: 1,
  slugify: slugify,
  permalink: false,
  renderPermalink: renderPermalink,
  permalinkClass: 'header-anchor',
  permalinkSymbol: '¶',
  permalinkBefore: false
};

// exports.default = anchor;
// module.exports = exports['default'];


anchor.slugify = slugify;
anchor.renderPermalink = renderPermalink;

_MarkdownItPlugins['markdown-it-anchor'] = {
  plugin: anchor,
  defaultOptions: anchor.defaults
};