# MarkdownItPlugins

A bunch of plugins for markdown-it wrapped for Meteor.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [The Plugins](#the-plugins)
  - [markdown-it-abbr](#markdown-it-abbr)
  - [markdown-it-anchor](#markdown-it-anchor)
  - [markdown-it-attrs](#markdown-it-attrs)
  - [markdown-it-center-text](#markdown-it-center-text)
  - [markdown-it-checkbox](#markdown-it-checkbox)
  - [markdown-it-container](#markdown-it-container)
  - [markdown-it-emoji](#markdown-it-emoji)
  - [markdown-it-expand-tabs](#markdown-it-expand-tabs)
  - [markdown-it-footnote](#markdown-it-footnote)
  - [markdown-it-implicit-figures](#markdown-it-implicit-figures)
  - [markdown-it-imsize-no-autofill](#markdown-it-imsize-no-autofill)
  - [markdown-it-ins-del](#markdown-it-ins-del)
  - [markdown-it-mark](#markdown-it-mark)
  - [markdown-it-modify-token](#markdown-it-modify-token)
  - [markdown-it-modify-token-modified](#markdown-it-modify-token-modified)
  - [markdown-it-regexp](#markdown-it-regexp)
  - [markdown-it-regexp-enhanced](#markdown-it-regexp-enhanced)
  - [markdown-it-sanitizer](#markdown-it-sanitizer)
  - [markdown-it-smartarrows](#markdown-it-smartarrows)
  - [markdown-it-sub](#markdown-it-sub)
  - [markdown-it-sup](#markdown-it-sup)
  - [markdown-it-table-of-contents](#markdown-it-table-of-contents)
  - [markdown-it-video](#markdown-it-video)
  - [mdvariables](#mdvariables)
  - [mdvariables-enhanced](#mdvariables-enhanced)
- [My Big Usage Example](#my-bit-usage-example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

This is available as [`convexset:markdown-it-plugins`](https://atmospherejs.com/convexset/markdown-it-plugins) on [Atmosphere](https://atmospherejs.com/). (Install with `meteor add convexset:markdown-it-plugins`.)

## Usage

Suppose one already has [markdown-it](https://github.com/markdown-it/markdown-it) installed, e.g. via [`smoiz:markdown-it`](https://atmospherejs.com/smoiz/markdown-it). First, instantiate a renderer...

```javascript
var markdownRenderer = markdownit({
    // Enable HTML tags in source
    html: true,
    // Use '/' to close single tags (<br />).
    xhtmlOut: true,

    // This is only for full CommonMark compatibility.
    // Convert '\n' in paragraphs into <br>
    breaks: true,
    // CSS language prefix for fenced blocks. Can be useful for external highlighters.
    langPrefix: '',
    // Autoconvert URL-like text to links
    linkify: true,

    // Enable some language-neutral replacement + quotes beautification
    typographer: true,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
});
```

Then to load plugins, do the following:
```javascript
var markdownItSubPlugin = MarkdownItPlugins.getPlugin('markdown-it-sub');
var markdownItSupPlugin = MarkdownItPlugins.getPlugin('markdown-it-sup');

markdownRenderer
    .use(markdownItSubPlugin)
    .use(markdownItSupPlugin);

// or add them one by one
```

Some plugins admit options and may be loaded as outlined in the [documentation of markdown-it](https://github.com/markdown-it/markdown-it#plugins-load):
```javascript
markdownRenderer
    .use(somePlugin1)
    .use(somePlugin2, opts);
```

Default options can be loaded as follows:
```javascript
var opts = MarkdownItPlugins.getDefaultOptions('pluginName');
var plugin = MarkdownItPlugins.getPlugin('pluginName');

markdownRenderer
    .use(plugin, opts)
```

Here's an alternative way to load both:
```javascript
var thing = MarkdownItPlugins.get('pluginName');
var opts = thing.defaultOptions;
var plugin = thing.plugin;

markdownRenderer
    .use(plugin, opts)
```

## The Plugins


### markdown-it-abbr

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-abbr)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownItAbbrPlugin = MarkdownItPlugins.getPlugin('markdown-it-abbr');
markdownRenderer.use(markdownItAbbrPlugin);
```

The following
```
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
```
generates
```html
<p>The <abbr title="Hyper Text Markup Language">HTML</abbr> specification
is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.</p>
```


### markdown-it-anchor

Header anchors for [markdown-it].

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-anchor)
 - **Defaults**: Yes
 - **Is Modified Package**: No

```javascript
var markdownItAnchorPlugin = MarkdownItPlugins.getPlugin('markdown-it-abbr');
var markdownItAnchorOptions = MarkdownItPlugins.getDefaultOptions('markdown-it-abbr');
markdownRenderer.use(markdownItAnchorPlugin, markdownItAnchorOptions);

// or...
// markdownRenderer.use(markdownItAnchorPlugin, opts);
```

The `opts` object can contain:

Name              | Description                                 | Default
------------------|---------------------------------------------|------------------------------------
`level`           | Minimum level to apply anchors on.          | 1
`slugify`         | A custom slugification function.            | [string.js' `slugify`][slugify]
`permalink`       | Whether to add permalinks next to titles.   | `false`
`renderPermalink` | A custom permalink rendering function.      | See [`index.es6.js`](https://github.com/valeriangalliat/markdown-it-anchor/blob/master/index.es6.js)
`permalinkClass`  | The class of the permalink anchor.          | `header-anchor`
`permalinkSymbol` | The symbol in the permalink anchor.         | `¶`
`permalinkBefore` | Place the permalink before the title.       | `false`
`callback`        | Called with token and info after rendering. | `undefined`

[slugify]: http://stringjs.com/#methods/slugify

The `renderPermalink` function takes the slug, an options object with
the above options, and then all the usual markdown-it rendering
arguments.

All headers above `level` will then have an `id` attribute with a slug
of their content, and if `permalink` is `true`, a `¶` symbol linking to
the header itself.

You may want to use the [link symbol](http://graphemica.com/🔗) as
`permalinkSymbol`, or a symbol from your favorite web font.

The `callback` option is a function that will be called at the end of
rendering with the `token` and an `info` object.  The `info` object has
`title` and `slug` properties with the token content and the slug used
for the identifier.


### markdown-it-attrs

Add classes, identifiers and attributes to your markdown with `{.class #identifier attr=value attr2="spaced value"}` curly brackets, similar to [pandoc's header attributes](http://pandoc.org/README.html#extension-header_attributes).

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-attrs)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownItAttrsPlugin = MarkdownItPlugins.getPlugin('markdown-it-attrs');
markdownRenderer.use(markdownItAbbrPlugin);
```

Example input:
```md
paragraph {data-toggle=modal}
```

Output:
```html
<p data-toggle="modal">paragraph</p>
```

Works with inline elements too:
```md
paragraph *style me*{.red} more text
```

Output:
```html
<p>paragraph <em class="red">style me</em> more text</p>
```

**Note:** Plugin does not validate any input, so you should validate the attributes in your html output if security is a concern.

_** Ambiguity**_

When class can be applied to both inline or block element, inline element will take precedence:
```md
- list item **bold**{.red}
```

Output:
```html
<ul>
<li>list item <strong class="red">bold</strong></li>
<ul>
```

If you need the class to apply to the list item instead:
```md
- list item **bold**
{.red}
```

Output:
```html
<ul>
<li class="red">list item <strong>bold</strong>
</li>
</ul>
```

If you need finer control, look into [decorate](https://github.com/rstacruz/markdown-it-decorate).


### markdown-it-center-text

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-center-text)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownItCenterTextPlugin = MarkdownItPlugins.getPlugin('markdown-it-center-text');
markdownRenderer
    .use(markdownItCenterTextPlugin);

markdownRenderer.render('->Centered Text<-') // =>
// <div style="text-align: center;">Centered Text</div>
```


### markdown-it-checkbox

This plugin allows to create checkboxes for tasklists as discussed [here](http://talk.commonmark.org/t/task-lists-in-standard-markdown/41).

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-checkbox)
 - **Defaults**: Yes
 - **Is Modified Package**: No

```javascript
var markdownItCheckboxPlugin = MarkdownItPlugins.getPlugin('markdown-it-checkbox');
markdownRenderer
    .use(markdownItCheckboxPlugin);

markdownRenderer.render('[ ] unchecked') // =>
// <p>
//  <input type="checkbox" id="checkbox0">
//  <label for="checkbox0">unchecked</label>
// </p>

markdownRenderer.render('[x] checked') // =>
// <p>
//  <input type="checkbox" id="checkbox0" checked="true">
//  <label for="checkbox0">checked</label>
// </p>
```

A number of options may be passed in:
 - `divWrap`: wrap div arround checkbox. this makes it possible to use it for example with [Awesome Bootstrap Checkbox](https://github.com/flatlogic/awesome-bootstrap-checkbox/)
   * **Type:** `Boolean`
   * **Default:** `false`
 - `divClass`: classname of div wrapper. will only be used if `divWrap` is enanbled.
   * **Type:** `String`
   * **Default:** `"checkbox"`
 - `idPrefix`: the id of the checkboxs input contains the prefix and an incremental number starting with `0`. i.e. `checkbox1` for the 2nd checkbox.
   * **Type:** `String`
   * **Default:** `"checkbox"`


```javascript
var markdownItCheckboxPlugin = MarkdownItPlugins.getPlugin('markdown-it-checkbox');
markdownRenderer
    .use(markdownItCheckboxPlugin, {
        divWrap: true,
        divClass: 'cb',
        idPrefix: 'cbx_'
    });

markdownRenderer.render('[ ] unchecked') // =>
// <p>
//  <div classname="cb">
//    <input type="checkbox" id="cbx_0">
//    <label for="cbx_0">unchecked</label>
//  </div>
// </p>
```


### markdown-it-container

With this plugin you can create block containers like:

```
::: warning
*here be dragons*
:::
```

.... and specify how they should be rendered. If no renderer defined, `<div>` with
container name class will be created:

```html
<div class="warning">
<em>here be dragons</em>
</div>
```

Markup is the same as for [fenced code blocks](http://spec.commonmark.org/0.18/#fenced-code-blocks).
Difference is, that marker use another character and content is rendered as markdown markup.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-container)
 - **Defaults**: No
 - **Is Modified Package**: No

```javascript
var markdownItContainerPlugin = MarkdownItPlugins.getPlugin('markdown-it-container');
markdownRenderer
    .use(markdownItContainerPlugin, name, [, options]);
```

**Params**:
- __name__ - container name (mandatory)
- __options:__
   - __validate__ - optional, function to validate tail after opening marker, should
     return `true` on success.
   - __render__ - optional, renderer function for opening/closing tokens.
   - __marker__ - optional (`:`), character to use in delimiter.

**Example**:
```js
var markdownItContainerPlugin = MarkdownItPlugins.getPlugin('markdown-it-container');

markdownRenderer.use(markdownItContainerPlugin, 'spoiler', {

  validate: function(params) {
    return params.trim().match(/^spoiler\s+(.*)$/);
  },

  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + m[1] + '</summary>\n';

    } else {
      // closing tag
      return '</details>\n';
    }
  }
});

console.log(md.render('::: spoiler click me\n*content*\n:::\n'));

// Output:
//
// <details><summary>click me</summary>
// <p><em>content</em></p>
// </details>
```


### markdown-it-emoji

Two versions:

- __Full__ (default), with all github supported emojies.
- [Light](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/light.json), with only well supported unicode emojies and reduced size.

Also supports emoticons [shortcuts](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/shortcuts.js) like `:)`, `:-(`, and other. See full list in link above.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-emoji)
 - **Defaults**: Yes
 - **Is Modified Package**: No

```javascript
var markdownItEmojiPlugin = MarkdownItPlugins.getPlugin('markdown-it-emoji');
markdownRenderer
    .use(markdownItEmojiPlugin);

// or...
// markdownRenderer
//    .use(markdownItEmojiPlugin, options);

markdownRenderer.render('H~2~0') // => '<p>H<sub>2</sub>O</p>'
```

**Options:**
- __defs__ (Object) - rewrite available emojies definitions
  - example: `{ name1: char1, name2: char2, ... }`
- __enabled__ (Array) - disable all emojies except whitelisted
- __shortcuts__ (Object) - rewrite default shortcuts
  - example: `{ "smile": [ ":)", ":-)" ], "laughing": ":D" }`

By default, emojies are rendered as appropriate unicode chars. But you can change
renderer function as you wish.

Render as span blocks (for example, to use custom iconic font):

```js
// ...
// initialize

markdownRenderer.renderer.rules.emoji = function(token, idx) {
  return '<span class="emoji emoji_' + token[idx].markup + '"></span>';
};
```

Or use [twemoji](https://github.com/twitter/twemoji):

```js
// ...
// initialize

var twemoji = require('twemoji')

markdownRenderer.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content);
};
```

__NB 1__. Read [twemoji docs](https://github.com/twitter/twemoji#string-parsing)!
May be you need more options to change image size & type.

__NB 2__. For twemoji you can like to fit image height to line height with this
style:

```css
.emoji {
  height: 1.2em;
}
```

### markdown-it-expand-tabs

**What it does**
- Replaces leading tabs with spaces in fenced code blocks
- Nothing else

**Why is this useful?**

Say you have tab-indented code in a markdown file and you want the rendered code to
take up less visual space horizontally. This plugin will help. If you're not in that
situation, then this plugin probably isn't for you.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-expand-tabs)
 - **Defaults**: Yes
 - **Is Modified Package**: No

```javascript
var markdownItExpandTabsPlugin = MarkdownItPlugins.getPlugin('markdown-it-expand-tabs');
markdownRenderer
    .use(markdownItExpandTabsPlugin);

markdownRenderer.render('\tsomething\n\t\tsmtg') // => '    something\n        smtg'
```

The default behavior is to convert leading tabs into two spaces each. You can choose
an alternate tab width thusly:

```js
markdownRenderer
    .use(markdownItExpandTabsPlugin, {tabWidth: 4});
```


### markdown-it-footnote

Footnotes plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-footnote)
 - **Defaults**: No
 - **Is Modified Package**: No

```javascript
var markdownItFootnotePlugin = MarkdownItPlugins.getPlugin('markdown-it-footnote');
markdownRenderer
    .use(markdownItFootnotePlugin);
```

__Normal footnote__:

```
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.
```

html:

```html
<p>Here is a footnote reference,<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup> and another.<sup class="footnote-ref"><a href="#fn2" id="fnref2">[2]</a></sup></p>
<p>This paragraph won’t be part of the note, because it
isn’t indented.</p>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1"  class="footnote-item"><p>Here is the footnote. <a href="#fnref1" class="footnote-backref">↩</a></p>
</li>
<li id="fn2"  class="footnote-item"><p>Here’s one with multiple blocks.</p>
<p>Subsequent paragraphs are indented to show that they
belong to the previous footnote. <a href="#fnref2" class="footnote-backref">↩</a></p>
</li>
</ol>
</section>
```

__Inline footnote__:

```
Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]
```

html:

```html
<p>Here is an inline note.<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup></p>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1"  class="footnote-item"><p>Inlines notes are easier to write, since
you don’t have to pick an identifier and move down to type the
note. <a href="#fnref1" class="footnote-backref">↩</a></p>
</li>
</ol>
</section>
```


### markdown-it-implicit-figures

Render images occurring by itself in a paragraph as `<figure><img ...></figure>`, similar to [pandoc's implicit figures](http://pandoc.org/README.html#images).

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-implicit-figures)
 - **Defaults**: Yes
 - **Is Modified Package**: No

```javascript
var markdownItImplicitFiguresPlugin = MarkdownItPlugins.getPlugin('markdown-it-implicit-figures');
markdownRenderer
    .use(markdownItImplicitFiguresPlugin, {
        dataType: false,  // declares data-type like <figure data-type="image">, default: false
        figcaption: false  // adds <figcaption>alternative text</figcaption>, default: false
    });
```

Example input:
```md
text with ![](img.png)

![](fig.png)

another paragraph
```

Output:
```html
<p>text with <img src="img.png" alt=""></p>
<figure><img src="fig.png" alt=""></figure>
<p>another paragraph</p>
```

**Options**:
- `dataType`: Set `dataType` to `true` to declare the data-type being wrapped,
  e.g.: `<figure data-type="image">`. This can be useful for applying special
  styling for different kind of figures.
- `figcaption`: Set `figcaption` to `true` to put the alternative text in a
  `<figcaption>`-block after the image. E.g.: `![text](img.png)` renders to

  ```html
  <figure>
    <img src="img.png" alt="text">
    <figcaption>text</figcaption>
  </figure>
  ```


### markdown-it-imsize-no-autofill

Modified to remove the autofill option which requires `fs` and other things.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-imsize)
 - **Defaults**: None
 - **Is Modified Package**: Yes

```javascript
var markdownImsizeMinusPlugin = MarkdownItPlugins.getPlugin('markdown-it-imsize-no-autofill');
markdownRenderer
    .use(markdownImsizeMinusPlugin);

markdownRenderer.render('![test](image.png =100x200)')
// => '<p><img src="image.png" alt="test" width="100" height="200"></p>' 
```


### markdown-it-ins-del

`<ins>` and `<s>` tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser with editor attributions.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-ins-del)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownItInsDelPlugin = MarkdownItPlugins.getPlugin('markdown-it-ins-del');
markdownRenderer
    .use(markdownItInsDelPlugin)
    .disable('strikethrough');

markdownRenderer.render('++insert++[WZ]') // => '<p><ins>insert</ins><sup>WZ</sup></p>' 
markdownRenderer.render('~~delete~~[WZ]') // => '<p><s>delete</s><sup>WZ</sup></p>' 
```


### markdown-it-mark

`<mark>` tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-mark)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownItMarkPlugin = MarkdownItPlugins.getPlugin('markdown-it-mark');
markdownRenderer
    .use(markdownItMarkPlugin);

markdownRenderer.render('==marked==') // => '<p><mark>marked</mark></p>'
```


### markdown-it-modify-token

**Note: May not work perfectly for MarkdownIt 5.0. (A polyfill of the [Token prototype](https://github.com/markdown-it/markdown-it/blob/master/lib/token.js) was necessary.)**

[markdown-it](https://github.com/markdown-it/markdown-it) plugin for modifying tokens including content or element attributes in the markdown document. For example it can modify image or link attributes.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-modify-token)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownRenderer = markdownit({
    /*
     * other options
     */

    // modify token parameters
    modifyToken: function (token, env) {
        switch (token.type) {
          case 'image':
              token.attrObj['width'] = '640px';
              break;
        }
    }
});
var markdownItModifyTokenPlugin = MarkdownItPlugins.getPlugin('markdown-it-modify-token');
markdownRenderer
    .use(markdownItModifyTokenPlugin);
```


### markdown-it-modify-token-modified

**Note: May not work perfectly for MarkdownIt 5.0. (A polyfill of the [Token prototype](https://github.com/markdown-it/markdown-it/blob/master/lib/token.js) was necessary.)**

[markdown-it](https://github.com/markdown-it/markdown-it) plugin for modifying tokens including content or element attributes in the markdown document. For example it can modify image or link attributes. Modified to move options off from renderer creation.

 - **Original Source**:  See [markdown-it-modify-token](#markdown-it-modify-token)
 - **Defaults**: None
 - **Is Modified Package**: Yes

```javascript
var markdownItModifyTokenModPlugin = MarkdownItPlugins.getPlugin('markdown-it-modify-token-modified');
markdownRenderer
    .use(markdownItModifyTokenModPlugin, function (token, env) {
        switch (token.type) {
          case 'image':
              token.attrObj['width'] = '640px';
              break;
        }
    });
```


### markdown-it-regexp

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-regexp)
 - **Defaults**: None
 - **Is Modified Package**: No. Modified version at [markdown-it-regexp-enhanced](#markdown-it-regexp-enhanced)

```javascript
var MarkdownItRegExp = MarkdownItPlugins.getPlugin('markdown-it-regexp-enhanced');
markdownRenderer.use(MarkdownItRegExp(/@(\w+)/,
    function(match, utils) {
        var url = 'http://example.org/u/' + match[1];
        return '<a href="' + utils.escape(url) + '">' + utils.escape(match[1]) + '</a>';
    }
));
```

Note that `utils` here only contains the `escape` method.

### markdown-it-regexp-enhanced

 - **Original Source**: See [markdown-it-regexp](#markdown-it-regexp)
 - **Defaults**: None
 - **Is Modified Package**: Yes

```javascript
var MarkdownItRegExp = MarkdownItPlugins.getPlugin('markdown-it-regexp-enhanced');
markdownRenderer.use(MarkdownItRegExp(/@(\w+)/,
    function(match, utils) {
        var url = 'http://example.org/u/' + match[1];
        return '<a href="' + utils.escapeHTML(url) + '">' + utils.escapeHTML(match[1]) + '</a>';
    }
));
```

In this version, `utils` is populated with methods from [`string`](https://www.npmjs.com/package/string). For example,
```javascript
S('<a>foo</a>').between('<a>', '</a>').s // => 'foo'
```
can be achieved with `utils`
```javascript
utils.between('<a>foo</a>, '<a>', '</a>') // => 'foo'
```


### markdown-it-sanitizer

sanitizer plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

** Accepted tags

All tags are parsed case insensitive.

** Balanced **

`<b>`, `<blockquote>`, `<code>`, `<em>`, `<h1>`, ..., `<h6>`, `<li>`, `<ol>`, `<ol start="42">`, `<p>`, `<pre>`, `<sub>`, `<sup>`, `<strong>`, `<strike>`, `<ul>`

** Standalone **

`<br>`, `<hr>`

**Links**

`<a href="http://example.com" title="link">text</a>`

The `title` attribute is optional.

**Images**

`<img src="http://example.com" alt="cat" title="image">`

The `alt` and `title` attributes are optional.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-sanitizer)
 - **Defaults**: Yes
 - **Is Modified Package**: No

```javascript
var markdownItSanitizerPlugin = MarkdownItPlugins.getPlugin('markdown-it-sanitizer');
markdownRenderer
    .use(markdownItSanitizerPlugin);

markdownRenderer.render('<b>test<p></b>'); // => '<p><b>test</b></p>'
```

**Advanced**

For not whitelisted tags and tags that don't have a matching opening/closing tag you can define whether you would like to remove or escape them. You can also define a class attribute that will be added to image tags. Here is an example with default values:

```javascript
var markdownItSanitizerPlugin = MarkdownItPlugins.getPlugin('markdown-it-sanitizer');
markdownRenderer
    .use(markdownItSanitizerPlugin, {
        imageClass: '',          // default: ''
        removeUnbalanced: false, // default: false
        removeUnknown: false     // default: false
    });

// unknown tag
markdownRenderer.render('<u>test</u>'); // => '<p>&lt;u&gt;test&lt;/u&gt;</p>'
// unknown tag with removeUnknown: true
markdownRenderer.render('<u>test</u>'); // => '<p>test</p>'

// unbalanced tags
markdownRenderer.render('<b>test</em>'); // => '<p>&lt;b&gt;test&lt;/em&gt;</p>'
// unbalanced tags with removeUnbalanced: true
markdownRenderer.render('<b>test</em>'); // => '<p>test</p>'

// imageClass: 'img-responsive'
markdownRenderer.render('<img src="http://example.com/image.png" alt="image" title="example">'); // => '<p><img src="http://example.com/image.png" alt="image" title="example" class="img-responsive"></p>'
```

### markdown-it-smartarrows

This is a [markdown-it](https://github.com/markdown-it/markdown-it) plugin that adds "smart arrows" to markdown-it's typographic enhancements.

```
--> →
<-- ←
<--> ↔
==> ⇒
<== ⇐
<==> ⇔
```

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-smartarrows)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownItSmartArrowsPlugin = MarkdownItPlugins.getPlugin('markdown-it-smartarrows');
markdownRenderer
    .use(markdownItSmartArrowsPlugin);
```

Note that using this plugin will interfere with using HTML comments in your Markdown. 


### markdown-it-sub

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-sub)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownItSubPlugin = MarkdownItPlugins.getPlugin('markdown-it-sub');
markdownRenderer
    .use(markdownItSubPlugin);

markdownRenderer.render('H~2~0') // => '<p>H<sub>2</sub>O</p>'
```


### markdown-it-sup

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-sup)
 - **Defaults**: None
 - **Is Modified Package**: No

```javascript
var markdownItSupPlugin = MarkdownItPlugins.getPlugin('markdown-it-sup');
markdownRenderer
    .use(markdownItSupPlugin);

markdownRenderer.render('29^th^') // => '<p>29<sup>th</sup></p>'
```


### markdown-it-table-of-contents

A table of contents plugin for Markdown-it. Based on https://github.com/samchrisinger/markdown-it-toc but 
simpler, a bit more customizable and with a default slugifier that matches that of https://www.npmjs.com/package/markdown-it-anchor.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-table-of-contents)
 - **Defaults**: Yes
 - **Is Modified Package**: No

```javascript
var markdownItTableOfContentsPlugin = MarkdownItPlugins.getPlugin('markdown-it-table-of-contents');
var markdownItAnchorPlugin = MarkdownItPlugins.getPlugin('markdown-it-abbr');
markdownRenderer
    .use(markdownItAnchorPlugin, markdownItAnchorOptions)  // for links
    .use(markdownItTableOfContentsPlugin);
```

Then add `[[toc]]` where you want the table of contents to be added in your markdown.

For example, this markdown:
``` markdown
# Heading

[[toc]]

## Sub heading 1
Some nice text

## Sub heading 2
Some even nicer text
```

... would render this HTML using the default options specified in "usage" above:
``` html
<h1 id="heading">Heading</h1>

<div class="table-of-contents">
  <ul>
    <li><a href="#heading">Heading</a>
      <ul>
        <li><a href="#sub-heading-1">Sub heading 1</a></li>
        <li><a href="#sub-heading-2">Sub heading 2</a></li>
      </ul>
    </li>
  </ul>
</div>

<h2 id="sub-heading-1">Sub heading 1</h2>
<p>Some nice text</p>

<h2 id="sub-heading-2">Sub heading 2</h2>
<p>Some even nicer text</p>
```

** Options **

You may specify options when `use`ing the plugin. like so:
``` javascript
markdownRenderer
    .use(markdownItTableOfContentsPlugin, options);
```

These options are available:

Name              | Description                               | Default
------------------|-------------------------------------------|------------------------------------
"includeLevel"    | Headings levels to use (2 for h2:s etc)   | [1, 2]
"containerClass"  | The class for the container DIV           | "table-of-contents"
"slugify"         | A custom slugification function           | [string.js' `slugify`][slugify]

[slugify]: http://stringjs.com/#methods/slugify


### markdown-it-video

markdown-it plugin for embedding hosted videos.

 - **Original Source**: [npm](https://www.npmjs.com/package/markdown-it-video)
 - **Defaults**: No
 - **Is Modified Package**: No

```javascript
var markdownItVideoPlugin = MarkdownItPlugins.getPlugin('markdown-it-video');
markdownRenderer
    .use(markdownItVideoPlugin);
```

```md
@[youtube](dQw4w9WgXcQ)
```

is interpreted as

```html
<p><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" id="ytplayer" type="text/html" width="640" height="390"
  src="http://www.youtube.com/embed/dQw4w9WgXcQ"
  frameborder="0"/></div></p>
```

Alternately, you could use a number of different YouTube URL formats rather than just the video id.

```md
@[youtube](http://www.youtube.com/embed/dQw4w9WgXcQ)
@[youtube](https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=feedrec_centerforopenscience_index)
@[youtube](http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o)
@[youtube](http://www.youtube.com/v/dQw4w9WgXcQ?fs=1&amp;hl=en_US&amp;rel=0)
@[youtube](http://www.youtube.com/watch?v=dQw4w9WgXcQ#t=0m10s)
@[youtube](http://www.youtube.com/embed/dQw4w9WgXcQ?rel=0)
@[youtube](http://www.youtube.com/watch?v=dQw4w9WgXcQ)
@[youtube](http://youtu.be/dQw4w9WgXcQ)
```

Currently supported services
 * YouTube
 * Vimeo

### mdvariables

 - **Original Source**: [npm](https://www.npmjs.com/package/mdvariables)
 - **Defaults**: None
 - **Is Modified Package**: No. Modified version at [mdvariables-enhanced](#mdvariables-enhanced)

```javascript
var MdVariables = MarkdownItPlugins.getPlugin('mdvariables');
markdownRenderer.use(MdVariables(function() {
    return {
        title: $('title').val()
    };
});

//In your mark up add "@title" to replicate what is in your title input. 
```


### mdvariables-enhanced

 - **Original Source**: See [mdvariables](#mdvariables)
 - **Defaults**: None
 - **Is Modified Package**: Yes

```javascript
var MdVariablesEnhanced = MarkdownItPlugins.getPlugin('mdvariables-enhanced');
```
which takes a few arguments in the following order:
 - `dataFunction`: a function that takes an argument (a key) and returns the replacement text
 - `regex`: a regular expression with one or more match blocks (see example below)
 - `matchMapper`: a maps the outcome of `s.match(regex)` for `s` to a key (arguments for ); defaults to `match => match[1]`

```javascript
markdownRenderer.use(
    MdVariablesEnhanced(
        function mdVariablesDataDirectory(name) {
            switch(name) {
                case 'title':
                    return $('title').text();
                    break;
                case "random-number":
                    return Math.random();
                    break;
                default:
            }
        },
        /\[\[\[([a-zA-Z\-_0-9]+)\]\]\]/,  // defaults to /@(\w+)/ if nothing is
                                          // passed in
        match => match[1],                // which the argument defaults to if
                                          // nothing is passed in
    )
);

// In your mark up add "[[[title]]]" to replicate what is in your title input. 
// In your mark up add "[[[random-number]]]" to generate a random number 

markdownRenderer.use(
    MdVariablesEnhanced(
        function(name) {
            var split = name.split('|').map(x => x.trim());
            var tag = split[0];
            var thing = split[1];
            return "<" + tag + ">" + thing + "</" + tag + ">";
        },
        /\[\[\[([a-zA-Z\-_0-9]+)\|([a-zA-Z\-_0-9\s]+)\]\]\]/,
        match => match[1].toLowerCase() + "|" + match[2]
    )
);

// "[[[strong|something something]]]" => "<strong>something something</strong>" 
```


## My Big Usage Example

This is how one might use all of these together. Here, I already have `markdown-it` installed thorugh `smoiz:markdown-it`.

```javascript
//
// Some stuff for accessing the next three items globally...
//

var markdownRendererCommonmark;
var markdownRendererPlain;
var markdownRenderer;

if (Meteor.isClient) {
  Template.registerHelper('markdownIt', function markdownIt(s) {
    return markdownRenderer.render(s);
  });
  Template.registerHelper('markdownItInline', function markdownItInline(s) {
    return markdownRenderer.renderInline(s);
  });
  Template.registerHelper('markdownItCommonmark', function markdownItCommonmark(s) {
    return markdownRendererCommonmark.render(s);
  });
  Template.registerHelper('markdownItCommonmarkInline', function markdownItCommonmarkInline(s) {
    return markdownRendererCommonmark.renderInline(s);
  });
  Template.registerHelper('markdownItPlain', function markdownRendererPlain(s) {
    return markdownRendererPlain.render(s);
  });
  Template.registerHelper('markdownItPlainInline', function markdownItPlainInline(s) {
    return markdownRendererPlain.renderInline(s);
  });
} else {
  initMarkdown();
}

function initMarkdown() {
  console.info("Initializing Markdown renderer...");

  markdownRendererCommonmark = markdownit('commonmark');
  markdownRendererPlain = markdownit();
  markdownRenderer = markdownit({
    // Enable HTML tags in source
    html: true,
    // Use '/' to close single tags (<br />).
    xhtmlOut: true,

    // This is only for full CommonMark compatibility.
    // Convert '\n' in paragraphs into <br>
    breaks: true,
    // CSS language prefix for fenced blocks. Can be useful for external highlighters.
    langPrefix: '',
    // Autoconvert URL-like text to links
    linkify: true,

    // Enable some language-neutral replacement + quotes beautification
    typographer: true,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
  });

  // markdown-it-imsize
  var markdownImsizeMinusPlugin = MarkdownItPlugins.getPlugin('markdown-it-imsize-no-autofill');
  markdownRenderer
    .use(markdownImsizeMinusPlugin);

  // markdown-it-sub and markdown-it-sup
  // 'H~2~0' => '<p>H<sub>2</sub>O</p>' 
  // '29^th^' => '<p>29<sup>th</sup></p>' 
  markdownRenderer.use(MarkdownItPlugins.getPlugin('markdown-it-sub'));
  markdownRenderer.use(MarkdownItPlugins.getPlugin('markdown-it-sup'));

  // markdown-it-regexp
  var MarkdownItRegExp = MarkdownItPlugins.getPlugin('markdown-it-regexp-enhanced');
  markdownRenderer.use(MarkdownItRegExp(/@@([\w\s]+)@@/,
    function(match, utils) {
      return '<i class="icon ' + match[1] + '"></i>';
    }
  ));

  // MdVariables Enhanced
  var MdVariablesEnhanced = MarkdownItPlugins.getPlugin('mdvariables-enhanced');
  // '[[[title]]]' => '<p>The Title of this Page</p>' 
  function mdVariablesDataDirectory(name) {
    switch (name) {
      case "title":
        return $("title").text();
        break;
      case "random-number":
        return Math.random();
        break;
      case "notes-id":
        return FlowRouter.getParam('notesId');
        break;
      case "notes-title":
        return CourseNotes.getItemProperty(FlowRouter.getParam('notesId'), 'name');
        break;
      case "course-id":
        return FlowRouter.getParam('courseId');
        break;
      case "course-title":
        return Course.getItemProperty(FlowRouter.getParam('courseId'), 'name');
        break;
      case "course-session-id":
        return FlowRouter.getParam('sessionId');
        break;
      case "course-session-title":
        return CourseSession.getItemProperty(FlowRouter.getParam('sessionId'), 'name');
        break;
      default:
    }
  }
  markdownRenderer.use(
    MdVariablesEnhanced(
      mdVariablesDataDirectory,
      /\[\[\[([a-zA-Z\-_0-9]+)\]\]\]/
    )
  );

  markdownRenderer.use(
    MdVariablesEnhanced(
      function(name) {
        var split = name.split('|').map(x => x.trim());
        var tag = split[0];
        var thing = split[1];
        return "<" + tag + ">" + thing + "</" + tag + ">";
      },
      /\[\[\[([a-zA-Z\-_0-9]+)\|([a-zA-Z\-_0-9\s]+)\]\]\]/,
      match => match[1].toLowerCase() + "|" + match[2]
    )
  );

  // markdown-it-abbr
  var markdownItAbbrPlugin = MarkdownItPlugins.getPlugin('markdown-it-abbr');
  markdownRenderer.use(markdownItAbbrPlugin);

  // markdown-it-anchor
  markdownRenderer.use(
    MarkdownItPlugins.getPlugin('markdown-it-anchor'),
    _.extend(MarkdownItPlugins.getDefaultOptions('markdown-it-anchor'), {
      level: 1,
      // permalink: true,
      // permalinkSymbol: "🔗",
    })
  );

  // markdown-it-attrs
  var markdownItAttrsPlugin = MarkdownItPlugins.getPlugin('markdown-it-attrs');
  markdownRenderer.use(markdownItAttrsPlugin);

  // markdown-it-center-text
  var markdownItCenterTextPlugin = MarkdownItPlugins.getPlugin('markdown-it-center-text');
  markdownRenderer
    .use(markdownItCenterTextPlugin);

  // markdown-it-checkbox
  var markdownItCheckboxPlugin = MarkdownItPlugins.getPlugin('markdown-it-checkbox');
  markdownRenderer.use(markdownItCheckboxPlugin, {
    divWrap: true,
    divClass: 'ui checkbox',
    idPrefix: 'markdown_checkbox_'
  });

  // markdown-it-container
  var markdownItContainerPlugin = MarkdownItPlugins.getPlugin('markdown-it-container');
  markdownRenderer.use(markdownItContainerPlugin, 'spoiler', {
    validate: function(params) {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },
    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + m[1] + '</summary>\n';
      } else {
        // closing tag
        return '</details>\n';
      }
    }
  });

  // markdown-it-emoji
  var markdownItEmojiPlugin = MarkdownItPlugins.getPlugin('markdown-it-emoji');
  markdownRenderer.use(markdownItEmojiPlugin);

  // markdown-it-expand-tabs
  var markdownItExpandTabsPlugin = MarkdownItPlugins.getPlugin('markdown-it-expand-tabs');
  markdownRenderer.use(markdownItExpandTabsPlugin, {
    tabWidth: 4
  });

  // markdown-it-footnote
  markdownRenderer.use(MarkdownItPlugins.getPlugin('markdown-it-footnote'));

  // markdown-it-sanitizer
  markdownRenderer.use(MarkdownItPlugins.getPlugin('markdown-it-sanitizer'));

  // markdown-it-expand-tabs
  var markdownItImplicitFiguresPlugin = MarkdownItPlugins.getPlugin('markdown-it-implicit-figures');
  markdownRenderer
    .use(markdownItImplicitFiguresPlugin, {
      dataType: true,
      figcaption: true
    });

  // markdown-it-table-of-contents
  // the anchors have already been added...
  var markdownItTableOfContentsPlugin = MarkdownItPlugins.getPlugin('markdown-it-table-of-contents');
  markdownRenderer
    .use(markdownItTableOfContentsPlugin,
      _.extend(MarkdownItPlugins.getDefaultOptions('markdown-it-table-of-contents'), {
        includeLevel: [1, 2, 3]
      }));

  // markdown-it-video
  var markdownItVideoPlugin = MarkdownItPlugins.getPlugin('markdown-it-video');
  markdownRenderer
    .use(markdownItVideoPlugin);

  // markdown-it-mark
  var markdownItMarkPlugin = MarkdownItPlugins.getPlugin('markdown-it-mark');
  markdownRenderer
    .use(markdownItMarkPlugin);

  // markdown-it-smartarrows
  // markdownRenderer.use(MarkdownItPlugins.getPlugin('markdown-it-smartarrows'));

  // markdown-it-ins-del
  // var markdownItInsDelPlugin = MarkdownItPlugins.getPlugin('markdown-it-ins-del');
  // markdownRenderer
  //  .use(markdownItInsDelPlugin)
  //  .disable('strikethrough');

  // markdown-it-modify-token
  // do this last!
  var markdownItModifyTokenModPlugin = MarkdownItPlugins.getPlugin('markdown-it-modify-token-modified');
  markdownRenderer
    .use(markdownItModifyTokenModPlugin, function(token, env) {
      // console.log(token) // do this to have a look at the token stream
      switch (token.type) {
        case 'link_open':
          if (token.attrObj['href'] && (token.attrObj['href'].toString().indexOf("://") !== -1)) {
            token.attrObj['target'] = '_blank';
          }
          break;
        case 'checkbox_input':
          token.attrObj['disabled'] = true;
      }
    });
}
```