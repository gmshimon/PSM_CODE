import {
  faArrowRight,
  faBookOpenReader,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import useCollapse from 'react-collapsed'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import { Badge } from 'react-bootstrap'
import alertify from 'alertifyjs'

const CustomerOrder = ({ order }) => {
  const [orderReview,setRivew] = useState("")
  const { _id, name, phoneNumber, email, total, deliveryAddress, orders } =
    order
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  const [user, loading, error] = useAuthState(auth)
  
  const handleAddReview = () =>{
    fetch(`http://localhost:5000/add-review/${_id}`,{
      method:"PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({review:orderReview}),
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.acknowledged){
        alertify.success("Review added successfully")
        setTimeout(function(){
          window.location.reload();
      }, 2000); 
      }
    })
  }
  return (
    <div className='order'>
      <div className='info-container'>
        <div className='name-user'>
          <h4>{name}</h4>
          <h4>{phoneNumber}</h4>
        </div>
        <div >
          {!order.review ? (
            <div className='d-flex align-items-center'>
              <textarea
                placeholder='Order Feedback'
                style={{
                  borderRadius: '5px'
                }}
                onChange={e=>setRivew(e.target.value)}
              ></textarea>
              <FontAwesomeIcon
              onClick={handleAddReview}
                style={{
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
                icon={faArrowRight}
              />
            </div>
          ) : (
            <div>
              <textarea
                placeholder='Order Feedback'
                style={{
                  borderRadius: '5px'
                }}
                disabled
              >{order?.review}</textarea>
            </div>
          )}
        </div>
        <div className='details'>
          <div className='total'>RM {total}</div>
          <div className='address'>{deliveryAddress}</div>
        </div>
        <div>{order.deliveryDate}</div>
        <div>
          <div>
            {(order.status === 'Delivered' && (
              <Badge bg='success'>Delivered</Badge>
            )) ||
              (order.status === 'Cancel' && (
                <Badge bg='danger'>Cancelled</Badge>
              )) ||
              (order.status === 'Accepted' && (
                <Badge bg='secondary'>Accepted</Badge>
              )) ||
              (order.status === '' && <Badge bg='warning'>Pending</Badge>)}
          </div>
        </div>
      </div>

      <div className='items' {...getCollapseProps()}>
        <ul className='item-list' style={{ marginLeft: '200px' }}>
          {orders.map(or => (
            <li key={or._id}>
              {or.name} x<span>{or.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='toggle-container'>
        <button className='toggle toggle-button' {...getToggleProps()}>
          {isExpanded ? (
            <div>
              See less <FontAwesomeIcon icon={faChevronUp} />
            </div>
          ) : (
            <div>
              See more <FontAwesomeIcon icon={faChevronDown} />
            </div>
          )}
        </button>
      </div>
      <hr className='order-end-line' />
    </div>
  )
}

export default CustomerOrder
