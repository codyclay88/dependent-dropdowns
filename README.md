# HTML-only Dependent Dropdowns

This is a little utility that allows you to create dependent dropdowns (`<select>` elements) in your forms with only HTML data attributes.

## Installation
Just download the raw source and vendor it into your project. Don't forget to 
include the file in your `<head>` (or at the bottom of the `<body>`).

## Usage
Add the `data-depends-on` attribute to the dependent dropdowns.
The value of this attribute should be the name of the dropdown that the current dropdown depends on.

Then, add the `data-dependent-value` attribute to the options in the dependent dropdown.
The value of this attribute should be the value of the dropdown that the option depends on.

When the value of the dropdown that the current dropdown depends on changes,
this script will show/hide the options in the dependent dropdown based on the selected value.

## Example:
```html
<form>
  <select name="category">
    <option value="1">Category 1</option>
      <option value="2">Category 2</option>
      <option value="3">Category 3</option>
  </select>

  <select name="subcategory" data-depends-on="category">
    <option value="1" data-dependent-value="1">Subcategory 1.1</option>
    <option value="2" data-dependent-value="1">Subcategory 1.2</option>
    <option value="3" data-dependent-value="2">Subcategory 2.1</option>
    <option value="4" data-dependent-value="2">Subcategory 2.2</option>
    <option value="5" data-dependent-value="3">Subcategory 3.1</option>
  </select>
</form>
```

## Tid-bits:
- The event listener is set up at the document level, and uses the 'change' event.
- The dependent dropdowns must exist within the same form. 
- Dependent `<select>` can only depend on other `<select>` elements.

## Pull Requests
I'd love feedback and help in making this better. I'm a bit naive in the client side JavaScript world (I've spent most of my career "frameworking" with Angular and React, so naturally I have very little clue how to do much Vanilla JavaScript in the browser). 