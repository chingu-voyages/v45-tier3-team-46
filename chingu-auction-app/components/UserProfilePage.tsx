import { useSession } from "next-auth/react"

export function UserProfilePage(props: any) {
  const { data: session } = useSession()
  const p_style = "mb-1 p-1 border-b-2 border-purple-400 rounded-md"

  return (
    <div className="flex gap-2 p-4 border-2 border-purple-200 rounded-md w-6/12 mx-auto mt-5" id="tab-menu">
      <div id="left-menu-tab" className="flex flex-col gap-1">
        <button className="bg-purple-200 border-2 border-purple-400 rounded-md p-1">
          Details
        </button>
        <button className="bg-purple-200 border-2 border-purple-400 rounded-md p-1">
          Items
        </button>
      </div>
      <div id="show-menu-details">
        <div className="flex">
          <p className={`${p_style}`}> User Name: {session?.user?.name} </p>
          <p>{props.username}</p>
        </div>

        {/* find a way to change password  */}
        <div className="flex">
          <p className={`${p_style}`}>Password: {session?.user?.name} </p>
          <p>{props.password}</p>
        </div>

        <div className="flex">
          <p className={`${p_style}`}>Email: {session?.user?.email} </p>
          <p>{props.password}</p>
        </div>
        <div className="flex">
          {/*
Add a slider to browser items
Need to create a api to get the Items for sale
*/}
          <p className={`${p_style}`} >Items for Sale </p>
          <p>{props.itemsForSale}</p>
        </div>
        <div className="flex">
          <p className={`${p_style}`}>Items Sold</p>
          <p>{props.itemsSold}</p>
        </div>
        <div className="flex">
          <p className={`${p_style}`}>Items Purchased</p>
          <p >{props.itemsPurchased}</p>
        </div>
        <div className="flex">
          <p className={`${p_style}`}>User Address:</p>
          <p>{props.userAddresses}</p>
        </div>
      </div>
    </div>
  )
}
