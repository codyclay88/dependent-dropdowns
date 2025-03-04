# HTML-only Dependent Dropdowns

This is a little utility that allows you to create dependent dropdowns (`<select>` elements whose available `<option>`s are dependent on the value of other `<select>`s) in your forms with only HTML data attributes.

## Installation
Just copy and paste [the source](https://raw.githubusercontent.com/codyclay88/dependent-dropdowns/refs/heads/main/src/dependent-dropdowns.js) into your project. 

## Usage
Add the `data-depends-on` attribute to a `<select>` element that is dependent on another `<select>` element.
The value of this attribute should be the name (meaning, the value of the `name` attribute) of the `<select>` that the current dropdown depends on.

Then, add the `data-dependent-value` attribute to the relevant `<option>`s in the dependent dropdown.
The value of `data-dependent-value` attribute should be the value of the dropdown that the option depends on.

When the value of the dependent `<select>` changes, 
this script will show/hide the `<option>`s in the dependent dropdown based on whether the 
selected value matches the value of the `data-dependent-value` attribute.

If the selected `<option>` of the dependent `<select>` does is no longer available as a result of the source `<select>` changing, then the value of the dependent dropdown is cleared and the `selected` attribute of the `<option>` is removed. 

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