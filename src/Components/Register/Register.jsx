import { useFormik } from 'formik';
import React, { useState } from 'react';
import styles from './Register.module.css';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { wait } from '@testing-library/user-event/dist/utils';



export default function Register() {

  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  async function handleRegister(values) {
   
    let { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values);
    
    
    if (data.message === 'succese') {
      setisLoading(false);
      navigate('/login');
    }
   
  }
  // function validate(values) {

  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   }
  //   else if (values.name.lenght < 3) {
  //     errors.name = "name min lenght is 3"
  //   }
  //   else if (values.name.lenght > 10) {
  //     errors.name = "name max lenght is 10"
  //   }

  //   if (!values.email) {
  //     errors.email = "email is required";
  //   }
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   }
  //   else if (!/^[A-z][a-z0-9]{5,10}$/i.test(values.password)) {
  //     errors.password = 'Password must start with uppercase';
  //   }

  //   if (!values.repassword) {
  //     errors.repassword = "Repassword is required";
  //   }
  //   else if (values.password !== values.repassword) {
  //     errors.repassword = 'Not matched with password';
  //   }


  //   return errors
  // }
  let validationSchema = Yup.object({
    name: Yup.string().required('Required').max(10, 'max lenght is 10').min(3, 'min lenght is 3'),
    email: Yup.string().required('Required').email("invalid mail"),
    password: Yup.string().required('Required').matches(/^[A-z][a-z0-9]{5,8}$/, "password must start with uppercase"),
    rePassword: Yup.string().required('Required').oneOf([Yup.ref("password")], "repassword and password doesnt match"),
    phone: Yup.string().required('Required').matches(/^01[0125][0-9]{8}$/, 'invalid phone number'),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: handleRegister

  });



  return <>

    <div className="col-md-75 py-4 m-auto ">
      <h3 className='py-3'>Register Now</h3>
      <form  onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id='name' name='name' className='form-control mb-2 ' type="text" />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}


        <label htmlFor="email">Email:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' name='email' className='form-control mb-2 ' type="email" />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' name='password' className='form-control mb-2 ' type="password" />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}


        <label htmlFor="rePassword">Repassword:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id='rePassword' name='rePassword' className='form-control mb-2 ' type="password" />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}


        <label htmlFor="phone">Phone:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id='phone' name='phone' className='form-control mb-2 ' type="tel" />
        {isLoading ? <button className='btn bg-main text-white py-2' type='button'><i className='fas fa-spinner fa-spin'></i></button> :
          <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white py-2' type='submit'>Register</button>

        }


      </form>


    </div>
  </>

}
