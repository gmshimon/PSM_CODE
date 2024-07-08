import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../firebase.init'

const useGetUser = () => {
  const [user, loading, error] = useAuthState(auth)
  const [userDetails, setUserDetails] = useState('')

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/findUser', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ email: user?.email || '' })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setUserDetails(data)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    if (user) {
      fetchUserDetails()
    }
  }, [user,userDetails])

  return { userDetails }
}

export default useGetUser
