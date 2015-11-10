import getFormData, {getNamedFormElementData as getFieldData} from 'get-form-data'
import React from 'react'

let AutoForm = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    trim: React.PropTypes.bool,
    trimOnSubmit: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      trim: false,
      trimOnSubmit: false
    }
  },

  _onChange(e) {
    let {form, name} = e.target
    let data = getFieldData(form, name, {trim: this.props.trim})
    let change = {}
    change[name] = data
    this.props.onChange(e, name, data, change)
  },

  _onSubmit(e) {
    let data = getFormData(e.target, {trim: this.props.trimOnSubmit || this.props.trim})
    this.props.onSubmit(e, data)
  },

  render() {
    return React.createElement('form', {
      ...this.props,
      ...{
        onChange: this.props.onChange && this._onChange,
        onSubmit: this.props.onSubmit && this._onSubmit
      }
    }, this.props.children)
  }
})

export default AutoForm
