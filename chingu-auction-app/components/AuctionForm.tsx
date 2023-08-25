const AuctionForm = ({
  type,
  itemData,
  setItemData,
  submitting,
  handleSubmit,
}: any) => {
  return (
    <div>
      <div className='isolate rounded-xl bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
          <div
            className='relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            List Items
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            Post your auction item here
          </p>
        </div>
        <form
          method='POST'
          className='mx-auto mt-16 max-w-xl sm:mt-20'
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='auction-title'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                Title
              </label>
              <div className='mt-2.5'>
                <input
                  onChange={(e) =>
                    setItemData({ ...itemData, title: e.target.value })
                  }
                  value={itemData.title}
                  type='text'
                  name='auction-title'
                  id='auction-title'
                  required
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='condition'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                Condition
              </label>
              <div className='mt-2.5'>
                <input
                  onChange={(e) =>
                    setItemData({ ...itemData, condition: e.target.value })
                  }
                  value={itemData.condition}
                  type='text'
                  name='condition'
                  id='condition'
                  required
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='description'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                Description
              </label>
              <div className='mt-2.5'>
                <input
                  onChange={(e) =>
                    setItemData({ ...itemData, description: e.target.value })
                  }
                  value={itemData.description}
                  type='text'
                  name='description'
                  id='description'
                  required
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='starting-bid'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                Starting Bid
              </label>
              <div className='mt-2.5'>
                <input
                  onChange={(e) =>
                    setItemData({ ...itemData, startingBid: e.target.value })
                  }
                  value={itemData.startingBid}
                  type='text'
                  name='starting-bid'
                  id='starting-bid'
                  placeholder='$'
                  required
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='starting-bid'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                Starting Time
              </label>
              <div className='mt-2.5'>
                <input
                  onChange={(e) =>
                    setItemData({ ...itemData, createdAt: e.target.value })
                  }
                  value={itemData.createdAt}
                  type='text'
                  name='starting-bid'
                  id='starting-bid'
                  placeholder='00:00:00'
                  required
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='starting-bid'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                Ending Time
              </label>
              <div className='mt-2.5'>
                <input
                  onChange={(e) =>
                    setItemData({ ...itemData, expiresAt: e.target.value })
                  }
                  value={itemData.expiresAt}
                  type='text'
                  name='starting-bid'
                  id='starting-bid'
                  placeholder='00:00:00'
                  required
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='item-pictures'
                className='block text-sm font-semibold leading-6 text-gray-900'
              >
                Images
              </label>
              <div className='mt-2.5'>
                <input
                  onChange={(e) =>
                    setItemData({ ...itemData, pictures: e.target.value })
                  }
                  value={itemData.pictures}
                  type='text'
                  name='item-pictures'
                  id='item-pictures'
                  autoComplete='organization'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <button
              type='submit'
              className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              List Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuctionForm
