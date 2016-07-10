import getFormData, {getNamedFormElementData as getFieldData} from 'get-form-data'
import React, {PropTypes as t} from 'react'

let AutoForm = React.createClass({
  propTypes: {
    component: t.any,
    onChange: t.func,
    onSubmit: t.func,
    trim: t.bool,
    trimOnSubmit: t.bool,
  },

  getDefaultProps() {
    return {
      component: 'form',
      trim: false,
      trimOnSubmit: false,
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
    let {
      children, component: Component, onChange, onSubmit,
      trim, trimOnSubmit, // eslint-disable-line no-unused-vars
      ...props,
    } = this.props
    return <Component
      {...props}
      children={children}
      onChange={onChange && this._onChange}
      onSubmit={onSubmit && this._onSubmit}
    />
  }
})

export default AutoForm
