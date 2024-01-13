import React, { useState } from 'react'
import HeaderSub from './HeaderSub'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from './Loading'

function FlightItem() {
  const location = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(10)
  if (!location?.state?.itineraries?.length) {
    return <Loading />
  }
  return (
    <div>
      <HeaderSub />
      <div className='bg-[#eff1f2]'>
        <div className='mx-auto px-4 pt-[120px] max-w-[600px]'>
          <div className='flex flex-col gap-2 items-center px-4 py-2'>
            {location?.state?.itineraries?.slice(0, value).map((item: any) => {
              return (
                <div className='px-3 py-6 flex justify-between items-center rounded-xl w-full bg-white' key={item.id}>
                  <div className='flex justify-center '>
                    <img
                      src={item.legs[0].carriers.marketing[0].logoUrl}
                      alt=''
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex gap-3 items-center'>
                    <div className='flex flex-col justify-center'>
                      <span className='font-semibold'>{location.state.filterStats.airports[0].airports[0].name}</span>
                      <span className='text-center text-sm font-semibold'>
                        {location.state.filterStats.airports[0].airports[0].id}
                      </span>
                    </div>
                    <div className='relative'>
                      <img
                        src='https://www.vietnamairlinesgiare.vn/wp-content/themes/vietnamairlines/images/flight-icon.svg'
                        alt=''
                      />
                      <div className='absolute text-xs top-[-10px] left-1/3'>
                        {+location.state.filterStats.stopPrices.direct.formattedPrice.slice(1, 3) * 25}.000 VNĐ
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-semibold'>{location.state.filterStats.airports[1].airports[0].name}</span>
                      <span className='text-center text-sm font-semibold'>
                        {location.state.filterStats.airports[1].airports[0].id}
                      </span>
                    </div>
                  </div>
                  <div className='bg-[#154679] rounded-lg' onClick={() => navigate('/flight', { state: item })}>
                    <button className='flex px-2 py-1 gap-3 items-center'>
                      <p className='text-white font-semibold'>Chọn</p>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                        fill='white'
                        style={{ width: '1rem', height: '1rem' }}
                      >
                        <path
                          d='M3 12a1.5 1.5 0 001.5 1.5h11.379l-4.94 4.94a1.5 1.5 0 002.122 2.12l7.5-7.5a1.5 1.5 0 000-2.12l-7.5-7.5a1.5 1.5 0 00-2.122 2.12l4.94 4.94H4.5A1.5 1.5 0 003 12z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
            <div className='bg-[#c2c9cd] px-3 py-2 rounded-lg mt-2' onClick={() => setValue(value + 10)}>
              <button className='text-[#161616] font-bold'>Hiển thị thêm kết quả</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightItem
