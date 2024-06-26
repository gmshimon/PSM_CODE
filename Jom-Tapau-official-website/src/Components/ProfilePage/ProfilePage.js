import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import auth from '../../firebase.init'
import './ProfilePage.css'
import { Helmet } from 'react-helmet'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth)
  const [userDetails, setUserDetails] = useState('')
  const [isRider,setIsRider] = useState(false)
  const email = user?.email
  //fetch the user from the database
  useEffect(() => {
    fetch('http://localhost:5000/findUser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(response => response.json())
      .then(data => {
        if(data.rider===true){
            setIsRider(true)
        }
        setUserDetails(data)
      })
  }, [email,userDetails])
  const handleApplyRider=(id)=>{
    console.log(id)
    fetch(`http://localhost:5000/applyRider`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  const handleClick = () => {
    navigate(`/editprofile/${userDetails._id}`)
  }
  return (
    <div className='profile-container mb-5'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>profile</title>
      </Helmet>
      <section id='information-container' className='information-container'>
        <div className='information-header'>
          <h2 style={{ marginLeft: '100px' }}>My Information</h2>
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
          </button>
        </div>
        <hr></hr>
        <div className='information'>
          <div>
            <img
              src='https://i.ibb.co/QQyzW1L/ezgif-com-gif-maker.jpg'
              alt=''
              style={{ width: '200px' }}
            />
          </div>
        </div>

        <div>
          <table id='profile-table'>
            <tbody>
              <tr>
                <td className='profile'>Name:{userDetails?.name}</td>
                <td className='profile'>
                  <span id='name' className='data'></span>
                </td>
              </tr>
              <tr>
                <td className='profile'>Email:{user?.email}</td>
                <td className='profile'>
                  <span id='email' className='data'></span>
                </td>
              </tr>
              <tr>
                <td className='profile'>
                  Role:
                  {userDetails.rider != 'true' ? (
                    <span>Customer</span>
                  ) : (
                    <>{userDetails?.role}</>
                  )}
                </td>
                <td className='profile'>
                  <span id='role' className='data'></span>
                </td>
              </tr>

              <tr>
                <td className='profile'>Phone:{userDetails?.phoneNumber}</td>
                <td className='profile'>
                  <span id='phone' className='data'></span>
                </td>
              </tr>
              <tr>
                <td className='profile'>Matric:{userDetails?.matricValue}</td>
                <td className='profile'>
                  <span id='matric' className='data'></span>
                </td>
              </tr>
              <tr>
                <td className='profile'>Address: {userDetails.address}</td>
                <td className='profile'>
                  <span id='address' className='data'></span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='d-flex justify-content-center'>
           {
            isRider?<p>Already Rider</p>:userDetails?.rider===false ? <p>Applied</p>:
            <button onClick={()=>handleApplyRider(userDetails?._id)} type="button" class="btn btn-info">Apply for Rider</button>
           }
          </div>

        </div>
      </section>
    </div>
  )
}

export default ProfilePage
