# HTML-only Dependent Dropdowns

This is a little utility that allows you to create dependent dropdowns (`<select>` elements whose value and available `<option>`s are dependent on the value of another `<select>`) in your forms with only HTML data attributes, without writing any extra JavaScript.

There are currently two versions:
- [The original](https://raw.githubusercontent.com/codyclay88/dependent-dropdowns/refs/heads/main/src/dependent-dropdowns.js) uses event delegation at the document level to listen for all change events, and if the event target 
has a dependent dropdown, then the dependent is updated.
- [The second version](https://raw.githubusercontent.com/codyclay88/dependent-dropdowns/refs/heads/main/src/dependent-dropdowns-v2.js) uses a mutation observer to setup event handlers on source dropdowns as they are added to the DOM,
rather than delegating the event handler to the document. This version also will update dependent dropdowns as soon as they are rendered, rather than waiting for a change event.

## Installation
Just copy and paste [the source](https://raw.githubusercontent.com/codyclay88/dependent-dropdowns/refs/heads/main/src/dependent-dropdowns-v2.js) into your project. 

## Usage
Add the `data-depends-on` attribute to a `<select>` element that is dependent on another `<select>` element.
The value of this attribute should be the name (meaning, the value of the `name` attribute) of the `<select>` that the current dropdown depends on.

Then, add the `data-dependent-value` attribute to the relevant `<option>`s in the dependent dropdown.
The value of `data-dependent-value` attribute should be the value of the dropdown that the option depends on.

When the value of the dependent `<select>` changes, 
this script will show/hide the `<option>`s in the dependent dropdown based on whether the 
selected value matches the value of the `data-dependent-value` attribute.

If the selected `<option>` of the dependent `<select>` is no longer available as a result of the source `<select>` changing, then the value of the dependent dropdown is cleared and the `selected` attribute of the `<option>` is removed. 

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
- The dependent dropdowns must exist within the same form. 
- Dependent `<select>` can only depend on other `<select>` elements.
- A lot of the implementation for v2 was borrowed from [fixi.js](https://github.com/bigskysoftware/fixi/blob/master/fixi.js), which managed to solve a much harder problem than I am in much fewer lines of code, and I learned a lot from it.

## Pull Requests
I'd love feedback and help in making this better. I'm a bit naive in the client side JavaScript world (I've spent most of my career "frameworking" with Angular and React, so naturally I have very little clue how to do much Vanilla JavaScript in the browser). 