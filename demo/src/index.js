import './style.css'

import React, {Component} from 'react'
import {render} from 'react-dom'

import AutoForm from '../../src'

if ('File' in window) {
  window.File.prototype.toJSON = function () {
    let {name, size, type} = this
    return {name, size, type}
  }
}

class App extends Component {
  state = {
    lastOnChange: null,
    lastOnSubmit: null,
    trim: true,
    trimOnSubmit: false
  }

  _onChange = (e, name, data, change) => {
    this.setState({lastOnChange: {name, data, change}})
  }

  _onSubmit = (e, data) => {
    this.setState({lastOnSubmit: {data}})
    e.preventDefault()
  }

  _onOptionsChange = (e, name, data, change) => {
    this.setState(change)
  }

  render () {
    let {lastOnChange, lastOnSubmit, trim, trimOnSubmit} = this.state
    return <div className="App">
      <h1><a href="https://github.com/insin/react-auto-form"><code>AutoForm</code></a></h1>
      <p><strong>A <a href="(http://facebook.github.io/react/">React</a> component which simplifies getting user input from forms <code>onChange</code> and <code>onSubmit</code></strong></p>
      <hr/>
      <p>How to use <code>AutoForm</code>:</p>
      <ul>
        <li>Ensure your form inputs have <code>name</code> attributes.</li>
        <li>Wrap your form inputs in an <code>AutoForm</code> component instead of a <code>form</code>, using any of the usual form attributes you need.</li>
        <li>Pass <code>AutoForm</code> <code>onChange</code> and/or <code>onSubmit</code> callback functions as props and it will handle getting user input for you.</li>
        <li>To trim text input values, give <code>AutoForm</code> a boolean <code>trim</code> or <code>trimOnSubmit</code> prop.</li>
      </ul>
      <hr/>
      <h2>Demo form</h2>
      <div className="block">
        <AutoForm onSubmit={this._onSubmit} onChange={this._onChange} trim={!!trim} trimOnSubmit={!!trimOnSubmit}>
          <div className="form-field">
            <label htmlFor="product">Product:</label><br/>
            <select name="product" id="product" defaultValue="1">
              <option value="1">T-shirt</option>
              <option value="2">Hat</option>
              <option value="3">Shoes</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="colours">Colours:</label><br/>
            <select name="colours" id="colours" multiple size="3" defaultValue={['G']}>
              <option value="R">Red</option>
              <option value="G">Green</option>
              <option value="B">Blue</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="quantity">Quantity:</label><br/>
            <input type="number" name="quantity" id="quantity" min="0" step="1" defaultValue="9"/>
          </div>
          <div className="form-field">
            <label>Sizes:</label><br/>
            <label><input type="checkbox" name="sizes" value="S"/> Small</label><br/>
            <label><input type="checkbox" name="sizes" value="M" defaultChecked/> Medium</label><br/>
            <label><input type="checkbox" name="sizes" value="L" defaultChecked/> Large</label><br/>
          </div>
          <div className="form-field">
            <label>Shipping type:</label><br/>
            <label><input type="radio" name="shipping" value="express" defaultChecked/> Express</label><br/>
            <label><input type="radio" name="shipping" value="regular"/> Regular</label>
          </div>
          <div className="form-field">
            <label htmlFor="username">Username:</label><br/>
            <input type="text" name="username" id="username" defaultValue=" AzureDiamond"/>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password:</label><br/>
            <input type="password" name="password" id="password" defaultValue="hunter2 "/>
          </div>
          <div className="form-field">
            <label>Security message:</label><br/>
            <textarea name="message" defaultValue=" Hello "/>
          </div>
          <div className="form-field">
            <label>A cat picture:</label><br/>
            <input type="file" name="catpic"/>
          </div>
          <div className="form-field">
            <label>Many cat pictures:</label><br/>
            <input type="file" multiple name="catpics"/>
          </div>
          <div className="form-field">
            <label>
              <input type="checkbox" name="tos" value="Y" defaultChecked/> I have read and agree to the <a href="#">Terms of Service</a>
            </label>
          </div>
          <button>Submit</button>
        </AutoForm>
      </div>
      <div className="block">
        <AutoForm onChange={this._onOptionsChange}>
          <p><label><input type="checkbox" name="trim" defaultChecked={!!trim}/> Always trim text input</label></p>
          <p><label><input type="checkbox" name="trimOnSubmit" defaultChecked={!!trimOnSubmit}/> Trim text input <code>onSubmit</code></label></p>
        </AutoForm>
        <p>Last <code>onChange</code> arguments:</p>
        <pre><code>{lastOnChange ? JSON.stringify(lastOnChange, null, 2) : ' '}</code></pre>
        <p>Last <code>onSubmit</code> arguments:</p>
        <pre><code>{lastOnSubmit ? JSON.stringify(lastOnSubmit, null, 2) : ' '}</code></pre>
      </div>
      <hr/>
      <footer><a href="https://github.com/insin/react-auto-form">Source on GitHub</a></footer>
    </div>
  }
}

render(<App />, document.querySelector('#demo'))
