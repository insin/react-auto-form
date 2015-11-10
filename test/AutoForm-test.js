import React from 'react'
import test from 'tape'
import {render} from 'react-dom'
import {Simulate} from 'react-addons-test-utils'

import AutoForm from 'src/index'

const {change, submit} = Simulate

let renderForm = (FormComponent, cb) => {
  let node = document.createElement('div')
  render(<FormComponent/>, node, () => cb(node.querySelector('form')))
}

test('AutoForm props', t => {
  t.plan(4)

  renderForm(
    () => <AutoForm action="/add-thing" method="POST" name="test-form"/>,
    form => {
      t.ok(form, 'renders a form')
      t.equal(form.getAttribute('action'), '/add-thing', 'passes through props')
      t.equal(form.getAttribute('method'), 'POST', 'passes through props')
      t.equal(form.getAttribute('name'), 'test-form', 'passes through props')
    }
  )
})

test('AutoForm data extraction', t => {
  t.plan(10)

  let FormWrapper = (props = {}) => () =>
    <AutoForm action="/submit" method="POST" {...props}>
      <input type="text" name="name" defaultValue="AzureDiamond  "/>
      <input type="password" name="password" defaultValue="hunter2"/>
      <input type="checkbox" name="accepted" value="accepted" defaultChecked/>
      <button type="submit">Submit</button>
    </AutoForm>

  renderForm(
    FormWrapper({
      onSubmit(e, data) {
        t.ok(e.target, 'event object passed to onSubmit')
        t.deepEqual(
          data,
          {name: 'AzureDiamond  ', password: 'hunter2', 'accepted': 'accepted'},
          'form data extracted and passed to onSubmit')
      }
    }),
    form => submit(form)
  )

  renderForm(
    FormWrapper({
      onChange(e, name, value, change) {
        t.ok(e.target, 'event object passed to onChange')
        t.equal(name, 'name', 'field name passed to onChange')
        t.equal(value, 'AzureDiamond  ', 'field value passed to onChange')
        t.deepEqual(change, {name: 'AzureDiamond  '}, 'change object passed to onChange')
      }
    }),
    form => change(form.querySelector('input[name=name]'))
  )

  // The trim prop controls trimming of text inputs for all events. Forms with
  // controlled text inputs should not use this, as the user will be unable to
  // type whitespace.
  renderForm(
    FormWrapper({
      trim: true,
      onSubmit(e, data) {
        t.equal(data.name, 'AzureDiamond', 'text input value trimmed onSubmit when trim=true')
      },
      onChange(e, name, value, change) {
        t.equal(value, 'AzureDiamond', 'text input value trimmed onChange when trim=true')
      }
    }),
    form => {
      change(form.querySelector('input[name=name]'))
      submit(form)
    }
  )

  // The trimOnSubmit prop only controls trimming for the onSubmit event
  renderForm(
    FormWrapper({
      trimOnSubmit: true,
      onSubmit(e, data) {
        t.equal(data.name, 'AzureDiamond', 'text input value trimmed onSubmit when trimOnSubmit=true')
      },
      onChange(e, name, value, change) {
        t.equal(value, 'AzureDiamond  ', 'text input value NOT trimmed onChange when trimOnSubmit=true')
      }
    }),
    form => {
      change(form.querySelector('input[name=name]'))
      submit(form)
    }
  )
})
