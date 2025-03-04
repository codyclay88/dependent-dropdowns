/**
 * v2: This version of the script uses a mutation observer (rather than event delegation at the document level)
 * to listen for changes to the DOM and initialize dependent dropdowns.
 * This version also immediately updates dependent dropdowns when the node is added to the DOM, rather than
 * relying on the server to hide/show initial options before a change event occurs.
 *
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
  // If the MutationObserver is already defined, return
  if (document.__dd_mo) return;

  document.__dd_mo = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== "childList") {
        return;
      }

      mutation.addedNodes.forEach(process);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.__dd_mo.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });

  function process(node) {
    if (node.matches) {
      if (node.matches("select[data-depends-on]")) {
        initialize(node);
      }
    }
    if (node.querySelectorAll) {
      node.querySelectorAll("select[data-depends-on]").forEach(initialize);
    }
  }

  // Initialize a dependent dropdown.
  // This function will:
  // - Find the source dropdown, print error if not found
  // - Set up an event listener on the source dropdown that will update the dependent dropdown on change
  // - Immediately update the dependent dropdown based on the current value of the source dropdown
  function initialize(dropdown) {
    console.log("updateDependentDropdowns: processing dropdown", dropdown);

    if (dropdown.__dd_processed) {
      return;
    }

    const dependsOnEl = dropdown.form.querySelector(
      `select[name="${dropdown.dataset.dependsOn}"]`
    );
    if (!dependsOnEl) {
      console.error(
        `updateDependentDropdowns: could not find element with name ${dropdown.dataset.dependsOn}`
      );
      return;
    }

    dependsOnEl.addEventListener("change", (e) => {
      update(e.target);
    });

    update(dependsOnEl);

    dropdown.__dd_processed = true;
  }

  // Update the dependent dropdown based on the current value of the source dropdown
  // This function will:
  // - Find the dependent dropdown, print error if not found
  // - Find all options in the dependent dropdown that have a data-dependent-value attribute
  // - Show the options that have a data-dependent-value that matches the selected value of the source dropdown
  // - Hide the options that do not match the selected value of the source dropdown
  // - If a hidden option was selected, deselect it and clear the value of the dependent dropdown
  function update(el) {
    const dependent = el.form.querySelector(
      `select[data-depends-on="${el.name}"]`
    );

    if (!dependent) {
      console.error(
        `dependent-dropdown: could not dependent dropdown for source ${el.name}`
      );
      return;
    }

    const dependentOptions = dependent.querySelectorAll(
      "option[data-dependent-value]"
    );

    dependentOptions.forEach((option) => {
      if (option.dataset.dependentValue === el.value) {
        option.style.display = "";
      } else {
        option.style.display = "none";

        if (option.selected) {
          option.selected = false;
          dependent.value = "";
        }
      }
    });
  }
})();
