import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import * as yup from 'yup'
import schema from './validation/Schema'
import Form from './components/Form'
import User from './components/User'


const initialFormValues = {
  //text inputs
  name:'',
  email:'',
  password:'',
  //Checkbox
  terms: false
}

const initalFormErrors = {
  name:'',
  email:'',
  password:'',
}

const initialUsers = []
const initalDisabled = true

function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initalFormErrors)
  const [disabled, setDisabled] = useState(initalDisabled)

  const getUsers = () => {
    axios.get(`https://reqres.in/api/users`)
      .then(res => {
        setUsers(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postNewUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
      .then(res => {
        setUsers([...users, res.data])
        setFormValues(initialFormValues)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {

      })
      console.log('YOU DID IT')
  }

  const validate = (name, value) => {
    yup
      .reach(schema,name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues)
    .then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])


  return (
    <div className="App">
      <Form 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User 
            key={user.id} 
            details={user} 
            />
          )
        })
      }
      
    </div>
  )
}

export default App;
