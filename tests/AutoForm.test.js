import expect from 'expect'
import React from 'react'
import {render} from 'react-dom'
import {Simulate} from 'react-dom/test-utils'

import AutoForm from 'src/index'

const {change, submit} = Simulate

let renderForm = (FormComponent, cb, query = 'form') => {
  let node = document.createElement('div')
  render(<FormComponent/>, node, () => cb(node.querySelector(query)))
}

let FormWrapper = (props = {}) => () =>
  <AutoForm action="/submit" method="POST" {...props}>
    <input type="text" name="name" defaultValue="AzureDiamond  "/>
    <input type="password" name="password" defaultValue="hunter2"/>
    <input type="checkbox" name="accepted" defaultChecked/>
    <button type="submit">Submit</button>
  </AutoForm>

describe('AutoForm component', () => {
  let errorLogSpy
  beforeEach(() => {
    errorLogSpy = expect.spyOn(console, 'error')
  })
  afterEach(() => {
    expect(errorLogSpy).toNotHaveBeenCalled()
    errorLogSpy.restore()
  })

  it('renders a form and passes through props', done => {
    renderForm(
      () => <AutoForm action="/add-thing" method="POST" name="test-form"/>,
      form => {
        expect(form).toExist()
        expect(form.getAttribute('action')).toEqual('/add-thing')
        expect(form.getAttribute('method')).toEqual('POST')
        expect(form.getAttribute('name')).toEqual('test-form')
        done()
      }
    )
  })

  it('extracts form data and passes it to onSubmit()', done => {
    renderForm(
      FormWrapper({
        onSubmit(e, data) {
          expect(e.target).toExist()
          expect(data).toEqual({
            name: 'AzureDiamond  ',
            password: 'hunter2',
            accepted: true,
          })
          done()
        },
      }),
      form => submit(form)
    )
  })

  it('extracts field data and passes it to onChange()', done => {
    renderForm(
      FormWrapper({
        onChange(e, name, value, change) {
          expect(e.target).toExist()
          expect(name).toEqual('name')
          expect(value).toEqual('AzureDiamond  ')
          expect(change).toEqual({name: 'AzureDiamond  '})
          done()
        },
      }),
      form => change(form.querySelector('input[name=name]'))
    )
  })

  it('component prop provides component to be rendered', done => {
    renderForm(
      FormWrapper({
        component: 'div',
      }),
      div => {
        expect(div).toExist()
        done()
      },
      'div'
    )
  })

  // The trim prop controls trimming of text inputs for all events. Forms with
  // controlled text inputs should not use this, as the user will be unable to
  // type whitespace.
  it('trim prop controls trimming of text inputs for all events', done => {
    let values = {}
    renderForm(
      FormWrapper({
        trim: true,
        onChange(e, name, value, change) {
          values['onChange'] = value
        },
        onSubmit(e, data) {
          values['onSubmit'] = data.name
        },
      }),
      form => {
        change(form.querySelector('input[name=name]'))
        submit(form)
        expect(values).toEqual({
          onChange: 'AzureDiamond',
          onSubmit: 'AzureDiamond',
        })
        done()
      }
    )
  })

  it('trimOnSubmit prop controls trimming of text inputs onSubmit', done => {
    let values = {}
    renderForm(
      FormWrapper({
        trimOnSubmit: true,
        onChange(e, name, value, change) {
          values['onChange'] = value
        },
        onSubmit(e, data) {
          values['onSubmit'] = data.name
        },
      }),
      form => {
        change(form.querySelector('input[name=name]'))
        submit(form)
        expect(values).toEqual({
          onChange: 'AzureDiamond  ',
          onSubmit: 'AzureDiamond',
        })
        done()
      }
    )
  })
})
