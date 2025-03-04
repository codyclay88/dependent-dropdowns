/**
 * This script allows you to create dependent dropdowns in your forms.
 *
 * To use it, add the `data-depends-on` attribute to the dependent dropdowns.
 * The value of this attribute should be the name of the dropdown that the current dropdown depends on.
 *
 * Then, add the `data-dependent-value` attribute to the options in the dependent dropdown.
 * The value of this attribute should be the value of the dropdown that the option depends on.
 *
 * When the value of the dropdown that the current dropdown depends on changes,
 * this script will show/hide the options in the dependent dropdown based on the selected value.
 *
 * Example:
 * <select name="category">
 *     <option value="1">Category 1</option>
 *     <option value="2">Category 2</option>
 *     <option value="3">Category 3</option>
 * </select>
 *
 * <select name="subcategory" data-depends-on="category">
 *     <option value="1" data-dependent-value="1">Subcategory 1.1</option>
 *     <option value="2" data-dependent-value="1">Subcategory 1.2</option>
 *     <option value="3" data-dependent-value="2">Subcategory 2.1</option>
 *     <option value="4" data-dependent-value="2">Subcategory 2.2</option>
 *     <option value="5" data-dependent-value="3">Subcategory 3.1</option>
 * </select>
 */

(function () {
  // Listen for changes on all dropdowns
  document.addEventListener("change", updateDependentDropdowns);

  function updateDependentDropdowns(e) {
    if (e.target.tagName !== "SELECT") {
      return;
    }

    const dropdown = e.target;
    const dependentValue = dropdown.value;

    // Find all dependent dropdowns within the same form
    const dependentDropdowns = dropdown.form.querySelectorAll(
      `select[data-depends-on="${dropdown.name}"]`
    );

    dependentDropdowns.forEach((dependentDropdown) => {
      const dependentOptions = dependentDropdown.querySelectorAll(
        "option[data-dependent-value]"
      );

      dependentOptions.forEach((option) => {
        // If this option has a dependent value that matches the selected value, show it
        if (option.dataset.dependentValue === dependentValue) {
          option.style.display = "";
        }

        // Otherwise, hide it
        // And if it was selected, deselect it and clear the value
        else {
          option.style.display = "none";

          if (option.selected) {
            option.selected = false;
            dependentDropdown.value = "";
          }
        }
      });
    });
  }
})();
