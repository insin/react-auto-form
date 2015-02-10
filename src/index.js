'use strict';

var getFormData = require('get-form-data')
var React = require('react')
var assign = require('react/lib/Object.assign')

var getElementData = getFormData.getNamedFormElementData

var AutoForm = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    trim: React.PropTypes.bool,
    trimOnSubmit: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      trim: false
    , trimOnSubmit: false
    }
  },

  _onChange(e) {
    var {form, name} = e.target
    var data = getElementData(form, name, {trim: this.props.trim})
    var change = {}
    change[name] = data
    this.props.onChange(e, name, data, change)
  },

  _onSubmit(e) {
    var data = getFormData(e.target, {trim: this.props.trimOnSubmit || this.props.trim})
    this.props.onSubmit(e, data)
  },

  render() {
    var props = assign({}, this.props, {
      onChange: this.props.onChange && this._onChange,
      onSubmit: this.props.onSubmit && this._onSubmit
    })

    return React.createElement('form', props, this.props.children)
  }
})

module.exports = AutoForm