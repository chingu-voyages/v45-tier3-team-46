import { useState, useEffect } from 'react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const source = new EventSource('/api/notifications')
    console.log(source, 'use effect')
    
    source.onmessage = (event) => {
      console.log(event.data)
    }

    source.addEventListener('update', (event) => {
      console.log('event listener')
      const data = JSON.parse(event.data)
      console.log(data, 'data')
      setNotifications(prevNotifications => [...prevNotifications, data])
      console.log(notifications)
    })
  }, [])


  return (
    <>
      <p className='mr-1'>🔔({notifications.length})</p>
    </>
  )
}

export default Notifications