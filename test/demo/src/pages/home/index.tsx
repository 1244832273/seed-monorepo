import React, { useEffect } from 'react'
// import { login } from '@/service/api/request/login'

export default function Index() {
  const handleClickLogin = () => {
    const params = {
      username: 'admin',
      password: 'FD$OXO*WJ&',
      deviceId: '1',
    }
    // login(params)
    //   .then(res => {
    //     if (res.errorCode === '200') {
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  useEffect(() => {
    handleClickLogin()
  }, [])
  return <div>home</div>
}
