import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hotel from './Hotel'
import Car from './Car'
import Location from './Location'
import Transportation from './Transportation'
import Popover from 'src/component/Popover'
import { AppContext } from 'src/context/app.context'
import { removeAccessTokenAndProfileFromLS } from 'src/utills/auth'
import http from 'src/utills/https'

export default function Admin() {
  const { setIsAuthenticated, setProfile, profile, isAuthenticated } = useContext(AppContext)
  const [menu, setMenu] = useState<'hotel' | 'car' | 'location' | 'transportation'>('hotel')
  const navigate = useNavigate()
  const handleLogout = async () => {
    await http.post('users/logout')
    setIsAuthenticated(false)
    setProfile(null)
    removeAccessTokenAndProfileFromLS()
    navigate('/')
  }
  return (
    <>
      <header className='bg-[#1c2930] h-14 flex justify-between'>
        <div className='ml-40 mt-2' onClick={() => navigate('/')}>
          <img
            src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg'
            alt='logo-img'
          />
        </div>
        <div className='text-white mr-20 cursor-pointer mt-4'>
          <Popover
            renderPopover={
              <div className='rounded-sm border border-gray-200 px-4 py-2 bg-white shadow-md'>
                <button
                  onClick={() => handleLogout()}
                  className='block w-full text-sm bg-white cursor-pointer text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Đăng xuất
                </button>
              </div>
            }
          >
            <div className='text-base'>Xin chào: {profile?.username}</div>
          </Popover>
        </div>
      </header>
      <div className='grid grid-cols-12 gap-3 h-screen'>
        <div className='p-4 col-span-2 bg-[#eee]'>
          <ul>
            <li
              onClick={() => setMenu('hotel')}
              className='flex gap-8 mt-4 cursor-pointer hover:translate-x-2 transition-all delay-75'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                data-id='IcProductDuotoneFlightFill16'
              >
                <g clip-path='url(#clip0_4978_5190)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M12.3067 1.22242C12.9992 0.606863 14.0515 0.637769 14.7067 1.29291C15.3619 1.94804 15.3928 3.00031 14.7774 3.69285L11.6317 7.23229L13.9483 14.1839C14.1067 14.6592 13.889 15.1783 13.4389 15.3984C12.9889 15.6185 12.4455 15.4716 12.1676 15.0548L8.73502 9.9059L6.50032 11.4702V14C6.50032 14.4794 6.16014 14.8914 5.68943 14.982C5.21871 15.0727 4.74987 14.8165 4.57184 14.3714L4.02318 12.9998C3.75754 13.0059 3.49182 12.9064 3.29252 12.7071C3.09332 12.5079 2.99383 12.2424 2.99987 11.9769L1.62893 11.4285C1.18385 11.2505 0.92771 10.7817 1.01836 10.3109C1.10901 9.84022 1.52095 9.50005 2.00032 9.50005H4.52895L6.09375 7.26463L0.944927 3.83212C0.528082 3.55422 0.3812 3.01076 0.601306 2.56072C0.821413 2.11067 1.34057 1.89296 1.81585 2.05138L8.76737 4.36852L12.3067 1.22242Z'
                    fill='#CDD0D1'
                  ></path>
                </g>
                <defs>
                  <clipPath id='clip0_4978_5190'>
                    <rect width='16' height='16' fill='white'></rect>
                  </clipPath>
                </defs>
              </svg>
              <p>Khách sạn</p>
            </li>
            <li
              onClick={() => setMenu('car')}
              className='flex gap-8 mt-4 cursor-pointer hover:translate-x-2 transition-all delay-75'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                data-id='IcProductDuotoneBusFill'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M3 9V11C3 11.5523 3.44772 12 4 12H5V8H4C3.44772 8 3 8.44772 3 9ZM21 11V9C21 8.44772 20.5523 8 20 8H19V12H20C20.5523 12 21 11.5523 21 11ZM8.5 20.75V20H15.5V20.75C15.5 21.7165 16.2835 22.5 17.25 22.5C18.2165 22.5 19 21.7165 19 20.75V19H5V20.75C5 21.7165 5.7835 22.5 6.75 22.5C7.7165 22.5 8.5 21.7165 8.5 20.75Z'
                  fill='#CDD0D1'
                ></path>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M16 2H8C5.79086 2 4 3.79086 4 6V18.75C4 19.3023 4.44772 19.75 5 19.75H19C19.5523 19.75 20 19.3023 20 18.75V6C20 3.79086 18.2091 2 16 2ZM8 5C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7H16C16.5523 7 17 6.55228 17 6C17 5.44772 16.5523 5 16 5H8ZM6 9C6 8.44772 6.44772 8 7 8H17C17.5523 8 18 8.44772 18 9V13C18 13.5523 17.5523 14 17 14H7C6.44772 14 6 13.5523 6 13V9ZM6 17C6 16.4477 6.44772 16 7 16H9C9.55228 16 10 16.4477 10 17C10 17.5523 9.55228 18 9 18H7C6.44772 18 6 17.5523 6 17ZM14 17C14 16.4477 14.4477 16 15 16H17C17.5523 16 18 16.4477 18 17C18 17.5523 17.5523 18 17 18H15C14.4477 18 14 17.5523 14 17Z'
                  fill='#CDD0D1'
                ></path>
              </svg>
              <p>Dịch vụ cho thuê xe</p>
            </li>
            <li
              onClick={() => setMenu('transportation')}
              className='flex gap-8 mt-4 cursor-pointer hover:translate-x-2 transition-all delay-75'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                data-id='IcProductDuotoneAirportTransportFill'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M19.5 16.5L19 15H10V14H13H14H14.8371C15.1693 14 15.4092 13.682 15.3179 13.3626L15.1217 12.6758C15.088 12.5578 15.0474 12.4432 15.0006 12.3323L17 9H21C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7H17L14 2H13L14 7H11L10 6H9L9.5 8H7V3C7 1.89543 7.89543 1 9 1H21C22.1046 1 23 1.89543 23 3V13C23 14.1046 22.1046 15 21 15L20.5 16.5L21 18V21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5V18L19.5 16.5ZM13.6313 10.8435L14 9H11L10 10V10.5H12.2371C12.7354 10.5 13.2112 10.6229 13.6313 10.8435Z'
                  fill='#CDD0D1'
                ></path>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M12.7913 9C13.1976 9 13.5921 9.06115 13.9649 9.17557L13.6313 10.8435C13.2112 10.6229 12.7354 10.5 12.2371 10.5H8.7629C7.42346 10.5 6.24631 11.3879 5.87833 12.6758L5.6821 13.3626C5.59084 13.682 5.83068 14 6.16286 14H13H14H14.8371C15.1693 14 15.4092 13.682 15.3179 13.3626L15.1217 12.6758C15.088 12.5578 15.0474 12.4432 15.0006 12.3323L16.0184 10.636C16.338 11.072 16.5729 11.5779 16.6961 12.1323L17 13.5L17.9207 13.1931C18.2531 13.0823 18.6164 13.2328 18.7731 13.5461C18.9086 13.8172 18.8555 14.1445 18.6412 14.3588L18 15C18.5523 15 19 15.4477 19 16V18.382C19 19.0672 18.6129 19.6936 18 20V21C18 21.8284 17.3284 22.5 16.5 22.5C15.6716 22.5 15 21.8284 15 21V20H6V21C6 21.8284 5.32843 22.5 4.5 22.5C3.67157 22.5 3 21.8284 3 21V20C2.38713 19.6936 2 19.0672 2 18.382V16C2 15.4477 2.44772 15 3 15L2.35881 14.3588C2.14453 14.1445 2.09141 13.8172 2.22693 13.5461C2.38362 13.2328 2.74689 13.0823 3.07927 13.1931L4 13.5L4.30394 12.1323C4.71064 10.3021 6.33389 9 8.20869 9H9.25L9 10H10L11 9H12.7913ZM5.5 18H7.5C8.05228 18 8.5 17.5523 8.5 17C8.5 16.4477 8.05228 16 7.5 16H5.5C4.94772 16 4.5 16.4477 4.5 17C4.5 17.5523 4.94772 18 5.5 18ZM15.5 18H13.5C12.9477 18 12.5 17.5523 12.5 17C12.5 16.4477 12.9477 16 13.5 16H15.5C16.0523 16 16.5 16.4477 16.5 17C16.5 17.5523 16.0523 18 15.5 18Z'
                  fill='#CDD0D1'
                ></path>
              </svg>
              <p>Dịch vụ vận chuyển</p>
            </li>
            <li
              onClick={() => setMenu('location')}
              className='flex gap-8 mt-4 cursor-pointer hover:translate-x-2 transition-all delay-75'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                data-id='IcProductDuotoneXperienceFill'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M5.32125 8.49859L9.98962 12.6068L18.1819 2.25861C18.8675 1.39258 20.1254 1.24632 20.9914 1.93193C21.8574 2.61754 22.0037 3.87539 21.3181 4.74143L11.8181 16.7414C11.1071 17.6395 9.78862 17.7581 8.92874 17.0014L2.67874 11.5014C1.84952 10.7717 1.76886 9.50798 2.49857 8.67876C3.22828 7.84955 4.49204 7.76888 5.32125 8.49859ZM4.72017 18.9617L6.81535 16.4737L8.26811 17.7522C8.86424 18.2768 9.60732 18.5209 10.3395 18.4987L7.77982 21.5383C7.06832 22.3832 5.80662 22.4913 4.96172 21.7798C4.11683 21.0683 4.00868 19.8066 4.72017 18.9617ZM12.6021 17.3621C12.1498 17.9334 11.5336 18.2945 10.8755 18.4342L15.57 21.8648C16.4618 22.5165 17.7131 22.3219 18.3648 21.4301C19.0165 20.5382 18.8218 19.287 17.93 18.6352L13.9163 15.7021L12.6021 17.3621Z'
                  fill='#CDD0D1'
                ></path>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M7 6C7 8 10 10 10 10C10 10 13 8 13 6C13 4 11.5 3 10 3C8.5 3 7 4 7 6ZM11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6Z'
                  fill='#CDD0D1'
                ></path>
              </svg>
              <p>Địa điểm vui chơi</p>
            </li>
          </ul>
        </div>
        {menu === 'hotel' && <Hotel />}
        {menu === 'car' && <Car />}
        {menu === 'location' && <Location />}
        {menu === 'transportation' && <Transportation />}
      </div>
    </>
  )
}
