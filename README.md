## React `<AutoForm>`

[![Travis][build-badge]][build]
[![Codecov][coverage-badge]][coverage]
[![npm package][npm-badge]][npm]

An `<AutoForm>` [React](http://facebook.github.io/react/) component, which simplifies getting data from its contained form inputs via their `onChange` events and the form's `onSubmit` event, optionally trimming text input.

## [Live Demo](http://insin.github.io/react-auto-form/)

## Install

```
npm install react-auto-form
```

```javascript
var AutoForm = require('react-auto-form')
// or
import AutoForm from 'react-auto-form'
```

Browser bundles are available, which export a global `AutoForm` variable and expect to find a global ``React`` variable to work with.

* [react-auto-form.js](https://npmcdn.com/react-auto-form/umd/react-auto-form.js) (development version)
* [react-auto-form.min.js](https://npmcdn.com/react-auto-form/umd/react-auto-form.min.js) (compressed production version)

## Usage

The following React component skeleton shows usage of `AutoForm` to handle getting input `onChange` and `onSubmit`, plus the argument signatures it expects event callbacks to have:

```javascript
var ExampleForm = React.createClass({
  _onChange(event, name, data, change) {
    // ...
  },

  _onSubmit(event, data) {
    // ...
  },

  render() {
    return <AutoForm onChange={this._onChange} onSubmit={this._onSubmit} trimOnSubmit>
      {/* ...form inputs... */}
    </AutoForm>
  }
})
```

## API

### `AutoForm` component

This component configures a `<form>` for convenient handling of input data
changes as they happen and extraction of submittable form data.

It saves you from having to manually configure an `onChange` handler for each
individual form input and from having to manually extract data from form inputs.

In order to do this, it expects form inputs contained within it to have `name`
attributes set up as you would for any form which will be used for regular form
submission.

Multiple inputs with the same `name` are supported - their extracted data will
always be contained in an `Array` when they have some submittable data, with the
exception of a group of radio buttons all having the same name, which will
return the selected value only.

The data extracted from form inputs and the form as a whole is in line with
data which would be submitted for the form's current state via a regular form
submission - this makes it suitable for use in isomorphic apps which configure
a form for regular submission and progressively enhance form-handling when
JavaScript runs on the client.

Where available, data extracted from file inputs will be native
[`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) objects.

#### `AutoForm` props

You can pass all the usual form attributes to `AutoForm` (`action`, `method`,
`encType`, `noValidate` etc.), and they will be passed on to the `<form>` it
renders for you.

The following props are treated specially:

##### `onChange: Function(event, name, data, change)`

If this prop is given, AutoForm will configure the form with an `onChange`
handler which will handle `onChange` events from any inputs contained within
the form, extract data for the form element which triggered the event and
call the given `onChange` function with the following arguments:

1. `event: `[`SyntheticEvent`](http://facebook.github.io/react/docs/events.html#syntheticevent) - the event being handled.

2. `name: String` - the name of the form element which was the target of the event.

3. `data: (null|String|Array.<String>|File|Array.<File>)` - submittable data for the form element which changed.

   This value will be as documented for the get-form-data module's
   [`getNamedFormElementData()` return value](https://github.com/insin/get-form-data#return-type-nullstringarraystring).

   The TL;DR for that is:

   * `data` for an empty text input will be an empty string (`''`).
   * `data` for any other type of input which doesn't have a submittable value will be `null`.
   * `data` for an `<input type="file">` will be a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) if the browser supports the File API. If the input has a `multiple` attribute, `data` will be a list of Files when any are selected.

4. `change: Object<String, (null|String|Array.<String>|File|Array.<File>)>` - an object containing `{[name]: data}`, for convenience if you're using [controlled form components](http://facebook.github.io/react/docs/forms.html#controlled-components) and need to call `setState()` on every change.

##### `onSubmit: Function(event, data)`

If this prop is given, `AutoForm` will configure the form with an `onSubmit` handler which will handle the form's `onSubmit` event, extract submittable data for the form's elements and call the given `onChange` function with the following arguments:

1. `event: `[`SyntheticEvent`](http://facebook.github.io/react/docs/events.html#syntheticevent) - the event being handled.

2. `data: Object<String, (String|Array.<String>|File|Array.<File>)>` - submittable data for the form.

   The properties of this object will be as documented for the get-form-data module's [`getFormData()` return value](https://github.com/insin/get-form-data#return-type-objectstring-stringarraystring).

##### `trimOnSubmit: Boolean` (default: `false`)

If `true`, user input from text inputs will be trimmed of leading and trailing whitespace only when it is being extracted after an `onSubmit` event.

##### `trim: Boolean` (default: `false`)

If `true`, user input from text inputs will always be trimmed of leading and trailing whitespace when it is being extracted.

When `true`, this prop takes precedence over `trimOnSubmit`.

**Note:** It's not advisable to use the `trim` prop in conjunction with `onChange` and controlled input components, as the user will be completely disallowed from entering a leading or trailing space, so they won't be able to enter information containing spaces without copying and pasting it. Just use `trimOnSubmit` instead in this case.

## MIT Licensed

[build-badge]: https://img.shields.io/travis/insin/react-auto-form/master.svg
[build]: https://travis-ci.org/insin/react-auto-form

[coverage-badge]: https://img.shields.io/codecov/c/github/insin/react-auto-form.svg
[coverage]: https://codecov.io/github/insin/react-auto-form

[npm-badge]: https://img.shields.io/npm/v/react-auto-form.svg
[npm]: https://www.npmjs.org/package/react-auto-form
