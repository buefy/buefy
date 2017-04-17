> Thanks for contributing!

# Raising an Issue

* Make sure the issue hasn't been raised yet
* Include **screenshots** or animated GIFs in your issue whenever needed (if visual issue)

# Submitting a Pull Request

* Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes)
* Use the **present** tense ("Add feature" not "Added feature")
* Limit the first line to 72 characters or fewer
* Reference issues and pull requests liberally
* **Update the docs**, add examples if needed and so on (you can do this after the PR was approved)
* **DO NOT** commit the ``lib`` folder, use it only for testing on your end

## Buefy Javascript styleguide

* Follow the rules in ``.eslintrc.json``, general:
    * **Use camelCase**
    * **No semi-colons** `;`
    * **4 spaces indentation**
    * Only ``const`` or ``let``
    * **No trailing space**
    * End files with a **new line**
* Keep lines with 100 characters or less
* Add a comment block before every **method** and **watcher** explaining what it does, with this template:
```javascript
/**
* Calculates if the dropdown list is visible when activated,
* it'll be opened upwards if not.
*/
```
* Add one-line comment inside any block whenever you judge necessary
* Order Vue instance by:
    * name
    * mixins
    * components
    * props
    * data properties
    * computed properties
    * watchers
    * methods
    * directives
    * filters
    * lifecycle hooks
        * beforeCreate
        * created
        * beforeMount
        * mounted
        * beforeDestroy
        * destroyed

## Buefy Sass styleguide

* **Always on a separated file** in ``/src/scss/components``
* **Use kebab-case**
* Use only **classes**
* **No trailing space**
* End files with a **new line**
