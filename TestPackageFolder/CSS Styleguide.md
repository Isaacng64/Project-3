# CSS Style Guide

This is the CSS Styleguide for the Project 3 of the August 9th Batch. Here are some guidelines that help us in keeping our CSS consistant and structured.

## Table of Contents

* [Coding Style](#coding-style)
  * [Spacing](#spacing)
  * [Formating](#formating)
  * [Comments](#comments)
* [Coding Preferences](#coding-preferences)
  * [Pixels vs. Ems](#pixels-vs-ems)
* [Specificity](#specificity)
* [Declaration Order](#declaration-order)
* [Media Query Placement](#media-query-placement)
* [Shorthand Notation](#shorthand-notation)

## Coding Style

### Spacing

* Use soft-tabs with a two space indent. It is the only way to guarantee code renders the same in any environment.
* Put spaces after  colon `:` in declarations.
* Put spaces before curly bracket `{` in rule declarations.
* Put spaces after comma `,`.
* Seperate rules by new lines.

### Formating

* Use a semicolon `;` after every declaration. Even the last one.
* Each declaration should appear on its own line for more accurate error reporting.
* In instances where a rule set includes a single declaration remove the line breaks, e.g., `.span1 { width: 60px; }`
* Place closing braces of declaration blocks on a new line
* Use dashes in class and ID names. Don't use camelCase as this can cause some issues with the `|=` selector specifier.
* Avoid excessive and arbitrary shorthand notation for class and ID names. .btn is useful for button, but .s doesn't mean anything.
* Properties within rule sets should each reside on their own line.
* Use hex color codes `#000` instead of using rgb values.
* Lowercase all hex values, e.g., `#ffffff`. Lowercase letters are much easier to discern from each other.
* When grouping selectors, keep individual selectors to a single line.
* Avoid specifying units for zero values, e.g., `margin: 0;` instead of `margin: 0px;`.
* Prefer `border: none` over `border: 0px`.
* Prefer `color: #ffffff` instead of `color: white`.
* Strip out the zero for decimal number, prefer `.5` over `0.5`.
* Try to use single `'` quotes instead of double quotes`”`. In rare situtations where both needed inner quotes should always be single.
* Attributes selector should always be enclosed within quotes (Bad example: `[type=submit]`, Good example: `[type='submit']`
* Set a limit of 80 characters width at CSS files.
* Max nesting limit of 5 levels.
* Avoid unnecessary nesting. Consider nesting only if you must scope styles to a parent and if there are multiple elements to be nested.
* Always include mixins at top of any other css properties.
* Always add an empty line between nesting block (even if it hasn’t any properties).
* Parentheses should not be padded with spaces.

Examples:

#### Bad
```CSS

.element-one {
   border: 1px solid grey;
   color: blue;
   background: rgba(0, 0, 0, .5);
}
.element-two {
  color: orange;
  font-size: 13px;
}
```

#### Good
```CSS

.element-one {
  border: 1px solid #898c8a;
  color: #575eeb;
  background: #f7f7f7;
}

.element-two {
  color: #ba8523;
  font-size: 13px;
}
```

### Comments

Ensure your code is descriptive, well commented, and approachable by others. Great code comments convey context or purpose. Do not simply reiterate a component or class name. Be sure to write in complete sentences for larger comments and concise phrases for general notes.


## Coding Preferences

### Pixels vs. Ems

Use `px` for `font-size`, because it offers absolute control over text. Additionally, unit-less `line-height` is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the `font-size`.

## Specificity

Elements that occur **exactly once** inside a page should use IDs, otherwise, use classes. When in doubt, use a class name.

  * **Good** candidates for ids: header, footer, main.
  * **Bad** candidates for ids: navigation, item listings, buttons.

When the class of an HTML tag is used for SLDS the you can use the tag in exchange for the class name

Example:

`h1 { margin-bottom: 1px; }`.

## Declaration Order

To keep things organized it is best to keep related property declarations should be grouped together in the following order:
* Positioning
* Box model
* Typographic
* Visual
* Misc

Positioning comes first because it can remove an element from the normal document flow and override box model related styles. The box model follows as it dictates a component's dimensions, placement, and alignment whether it's flex, float, grid, or table.

Everything else takes place inside the component or without impacting the previous two sections, and thus they come last.

Examples:

```CSS

.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc */
  opacity: 1;
}

```



## Media Query Placement

Place media queries as close to their relevant rule sets whenever possible. Don't bundle them in a separate stylesheet or at the end of the document.

Examples:

```CSS

.element { ... }
.element-avatar { ... }
.element-selected { ... }

@media (min-width: 480px) {
  .element { ...}
  .element-avatar { ... }
  .element-selected { ... }
}

```

## Shorthand Notation

Limit shorthand declaration usage to instances where you must explicitly set all available values. Frequently used shorthand includes padding, margin, font, background, and border.

Generaly we don't need to set all values a shorthand property requires. A `0` value implies an overide of a defult or another specified value.

Examples:

#### Bad
```CSS

.element {
  margin: 0 0 10px;
  background: red;
  background: url("image.jpg");
  border-radius: 3px 3px 0 0;
}
```

#### Good
```CSS

.element {
  margin-bottom: 10px;
  background-color: red;
  background-image: url("image.jpg");
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

```
