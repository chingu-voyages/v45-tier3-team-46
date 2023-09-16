import { useState, useEffect } from 'react'
import {
  // Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const source = new EventSource('/api/notifications')
    console.log(source, 'use effect')
    
    source.onmessage = (event) => {
      console.log(event.data)
    }

    source.addEventListener('update', (event) => {
      console.log(source, 'event listener')
      const data = JSON.parse(event.data)
      console.log(data, 'data')

      setNotifications(prevNotifications => [...prevNotifications, ...data])
      console.log(notifications)
    })
  }, [])

  console.log(notifications)
  if (notifications.length > 0)
    return (
      <Dropdown>
        <DropdownTrigger>
          <p className='mr-1'>🔔({notifications.length})</p>
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions'>
        {notifications.map(notification =>
          <DropdownItem key={notification.id}>
            <p>{notification.message}</p>
          </DropdownItem>
        )}
        </DropdownMenu>
      </Dropdown>
    )
  else
    return null
}

export default Notifications