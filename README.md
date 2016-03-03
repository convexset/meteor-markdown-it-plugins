# MarkdownItPlugins

A bunch of plugins for markdown-it wrapped for Meteor.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Usage](#usage)
- [The Plugins](#the-plugins)
  - [markdown-it-abbr](#markdown-it-abbr)
  - [markdown-it-attrs](#markdown-it-attrs)
    - [Ambiguity](#ambiguity)
  - [markdown-it-sub](#markdown-it-sub)
  - [markdown-it-sup](#markdown-it-sup)
  - [markdown-it-regexp](#markdown-it-regexp)
  - [markdown-it-regexp-enhanced](#markdown-it-regexp-enhanced)
  - [mdvariables](#mdvariables)
  - [mdvariables-enhanced](#mdvariables-enhanced)

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

Some plugins admit options and may be loaded as outlined in the [documentation of markdown-it](https://github.com/markdown-it/markdown-it#plugins-load):
```javascript
markdownRenderer
    .use(somePlugin1)
    .use(somePlugin2, opts);
```

Default options can be loaded as follows:
```javascript
var opts = MarkdownItPlugins.getDefaults('pluginName');
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

#### Ambiguity
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

