## React `<AutoForm>`

An `<AutoForm>` [React](http://facebook.github.io/react/) component, which
handles getting data from its contained form inputs `onChange` events and/or
the form's `onSubmit` event, optionally trimming text input.

## [Live Demo](http://insin.github.io/react-auto-form/)

## Install

### npm

`AutoForm` can be used on the server, or bundled for the client using an
npm-compatible packaging system such as [Browserify](http://browserify.org/) or
[webpack](http://webpack.github.io/).

```
npm install react-auto-form --save
```

### Browser bundle

The browser bundle exposes a global `AutoForm` variable and expects to find a
global `React` variable to work with.

You can find it in the [/dist directory](https://github.com/insin/react-auto-form/tree/master/dist).

## Usage

The following React component shows all the custom props accepted by `AutoForm`
and the argument signatures it expects event callbacks to have:

```html
var ExampleForm = React.createClass({
  _onChange(event, name, data, change) {
    // ...
  },

  _onSubmit(event, data) {
    // ...
  },

  render() {
    return <AutoForm onSubmit={this._onSubmit} onChange={this._onChange} trim>
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

3. `data: (null|String|Array.<String>)` - submittable data for the form element which changed.

   This value will be as documented for the get-form-data module's
   [`getNamedFormElementData()` return value](https://github.com/insin/get-form-data#return-type-nullstringarraystring).

   The TL;DR for that is:

   * `data` for an empty text input will be an empty string (`''`).
   * `data` for any other type of input which doesn't have a submittable value
     will be `null`.

4. `change: Object<String, (null|String|Array.<String>)>` - an object containing
   `{[name]: data}`, for convenience if you're using
   [controlled form components](http://facebook.github.io/react/docs/forms.html#controlled-components)
   and need to call `setState()` on every change.

##### `onSubmit: Function(event, data)`

If this prop is given, `AutoForm` will configure the form with an `onSubmit`
handler which will handle the form's `onSubmit` event, extract submittable data
for the form's elements and call the given `onChange` function with the following
arguments:

1. `event: `[`SyntheticEvent`](http://facebook.github.io/react/docs/events.html#syntheticevent) - the event being handled.

2. `data: Object<String, (String|Array.<String>)>` - submittable data for the form.

   The properties of this object will be as documented for the get-form-data
   module's [`getFormData()` return value](https://github.com/insin/get-form-data#return-type-objectstring-stringarraystring).

##### `trim: Boolean`

If `true`, user input from text inputs will be trimmed of leading and trailing
whitespace when it is being extracted.

**Note:** It's not advisable to use this option in conjunction with `onChange`
and controlled input components, as the user will be completely disallowed from
entering a leading or trailing space, so they won't be able to enter information
containing spaces without copying and pasting it.

## MIT Licensed