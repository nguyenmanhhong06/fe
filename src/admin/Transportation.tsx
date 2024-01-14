import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getBooking, updateStatus } from 'src/apis/booking.api'
import { TransBody, createTrans, updateTrans } from 'src/apis/transportation.api'
import Loading from 'src/component/Loading'
import { AppContext } from 'src/context/app.context'
import { formatDate, formatStatus } from 'src/utills/date'
import { fetchUser, uploadImage } from 'src/apis/auth.api'
import Modal from 'react-modal'
const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
Modal.setAppElement('#root')
type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  body: any
  setBody: React.Dispatch<React.SetStateAction<any>>
  result: any
}
const ModalUpdate = ({ isOpen, setIsOpen, body, setBody, result }: Props) => {
  const [file, setFile] = useState<File>()
  const uploadFileMutation = useMutation(uploadImage)
  const { profile } = useContext(AppContext)
  const [seater, setSeater] = useState<number[]>([])
  const mutation = useMutation((body: TransBody) => createTrans(body))
  const mutationUpdate = useMutation((body: TransBody) => updateTrans(body, profile.transportation_id))
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    setFile(fileFromLocal)
  }
  const handleAddSeater = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeater((prev) => {
      if (!prev.includes(+e.target.value)) {
        return [...prev, +e.target.value]
      }
      return prev
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let qr_img = ''
    if (file) {
      const form = new FormData()
      form.append('image', file)
      await uploadFileMutation.mutateAsync(form, {
        onSuccess: (data) => {
          qr_img = data.data.result[0].url
        }
      })
    }
    await mutation.mutateAsync(
      { ...body, car_vehicle: qr_img || '' },
      {
        onSuccess: (data) => {
          setIsOpen(false)
        }
      }
    )
    await result.refetch()
  }
  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let qr_img = ''
    if (file) {
      const form = new FormData()
      form.append('image', file)
      await uploadFileMutation.mutateAsync(form, {
        onSuccess: (data) => {
          qr_img = data.data.result[0].url
        }
      })
    }
    await mutationUpdate.mutateAsync(
      { ...body, car_vehicle: qr_img || '' },
      {
        onSuccess: (data) => {
          setIsOpen(false)
        }
      }
    )
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel='Example Modal'
      overlayClassName='Overlay'
      className='Modal'
    >
      <h1 className='text-xl font-bold border inline p-1 rounded-md bg-slate-200'>Chỉnh sửa dịch vụ</h1>
      <div className='w-[600px] mt-4'>
        <form
          action=''
          className='flex flex-col gap-2'
          onSubmit={profile.transportation_id ? handleUpdateSubmit : handleSubmit}
        >
          <input
            name='tranportation_name'
            type='text'
            // value={body.departure}
            placeholder='Tên dịch vụ'
            className='py-2 px-3 rounded-md'
            onChange={handleOnChange}
          />
          <input
            name='location'
            type='text'
            // value={body.destination}
            placeholder='Địa điểm'
            className='py-2 px-3 rounded-md'
            onChange={handleOnChange}
          />
          <input
            name='price'
            type='string'
            // value={body.departure_time}
            placeholder='Giá tiền'
            className='py-2 px-3 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            onChange={handleOnChange}
          />
          <input
            name='description'
            type='text'
            // value={body.destination_time}
            placeholder='Mô tả dịch vụ'
            className='py-2 px-3 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            onChange={handleOnChange}
          />
          <input
            name='total_of_vehicle'
            type='number'
            // value={body.destination_time}
            placeholder='Số lượng vận chuyển'
            className='py-2 px-3 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            onChange={handleOnChange}
          />
          <input
            type='file'
            name='car_img'
            accept='.jpg,.jpeg,.png'
            onChange={onFileChange}
            // placeholder='Address'
            className='py-2 w-full px-4 outline-none focus:border focus:border-[#0194f3] rounded-lg mb-4'
          />
          <div className='flex justify-center'>
            <button
              type='submit'
              // onClick={handleAddTicket}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
function Transportation() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [body, setBody] = useState<TransBody>()
  const [message, setMessage] = useState('')
  const [updated, setUpdated] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      setUpdated(message)
    }
  }
  const mutation = useMutation((body: { id: string; status: string }) => updateStatus(body.id, { status: body.status }))
  const { data, refetch } = useQuery({
    queryKey: [''],
    queryFn: () => {
      return getBooking('transportations')
    }
  })
  const { profile, setProfile } = useContext(AppContext)
  const result = useQuery({
    queryKey: ['admin'],
    queryFn: () => {
      return fetchUser()
    }
  })
  useEffect(() => {
    if (result.data?.data.result) {
      setProfile(result.data.data.result)
    }
  }, [result])
  if (!data) {
    return <Loading />
  }
  const handleUpdateSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, status: number) => {
    e.preventDefault()
    await mutation.mutateAsync({ id, status: status.toString() })
    await refetch()
  }
  return (
    <div className='p-4 col-span-10 bg-[#eee]'>
      <ModalUpdate isOpen={isOpen} setIsOpen={setIsOpen} body={body} setBody={setBody} result={result} />
      <div className='flex justify-between mx-10 pb-6 border-b-2'>
        <h1 className='text-xl font-bold'>Vé vận chuyển</h1>
        <div className='flex gap-4'>
          {profile.transportation_id ? (
            <div
              className='px-4 cursor-pointer py-2 rounded-md text-white bg-[#010095]'
              onClick={() => setIsOpen(true)}
            >
              Chỉnh sửa dịch vụ
            </div>
          ) : (
            <div
              className='px-4 cursor-pointer py-2 rounded-md text-white bg-[#010095]'
              onClick={() => setIsOpen(true)}
            >
              Đăng ký dịch vụ
            </div>
          )}
          <input
            className='pl-2 pr-8 py-2 text-[#989d9f] bg-white'
            placeholder='Tìm kiếm/Lọc thông tin'
            type='text'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div>
        <ul className='grid grid-cols-9'>
          <li className='col-span-1 text-center'>Mã vé</li>
          <li className='col-span-1 text-center'>Tên người đặt</li>
          <li className='col-span-1 text-center'>Ngày đặt vé</li>
          <li className='col-span-1 text-center'>Giá tiền</li>
          <li className='col-span-1 text-center'>Mã thanh toán</li>
          <li className='col-span-1 text-center'>Ngày check-in</li>
          <li className='col-span-1 text-center'>Ngày check-out</li>
          <li className='col-span-1 text-center'>Trạng thái vé</li>
          <li className='col-span-1 text-center'>Hành động</li>
        </ul>
        {updated &&
          data.data.result.map((item: any, index: any) => {
            if (updated && (item.user.full_name || item.name).includes(updated)) {
              return (
                <ul className='grid grid-cols-9 items-center mt-4' key={index}>
                  <li className='col-span-1 text-sm text-center font-medium'>{item._id.slice(0, 15)}</li>
                  <li className='col-span-1 text-sm text-center font-medium'>{item?.user?.full_name || item.name}</li>
                  <li className='col-span-1 text-sm text-center font-medium'>{formatDate(item.date_pick)}</li>
                  <li className='col-span-1 text-sm text-center font-medium'>{item.transportations?.price}</li>
                  <li className='col-span-1 text-sm text-center font-medium'>{item.code}</li>
                  <li className='col-span-1 text-sm text-center font-medium'>{formatDate(item.timeOrder)}</li>
                  <li className='col-span-1 text-sm text-center font-medium'>{formatDate(item.timeBack)}</li>
                  <li className='col-span-1 text-sm text-center font-medium'>{formatStatus(item.status)}</li>
                  <li className='col-span-1'>
                    {item.status === 0 ? (
                      <div className='flex gap-2'>
                        <button
                          onClick={(e) => handleUpdateSubmit(e, item._id, 2)}
                          className='px-2 py-1 bg-[#fdbd28] rounded-md text-white text-xs'
                        >
                          Xác nhận
                        </button>
                        <button
                          onClick={(e) => handleUpdateSubmit(e, item._id, 1)}
                          className='px-3 py-2 bg-[#f77172] rounded-md text-white text-xs'
                        >
                          Huỷ vé
                        </button>
                      </div>
                    ) : item.status === 1 ? (
                      <button className='px-3 py-2 bg-[#45e37e] rounded-md text-white text-xs'>Hoàn thành</button>
                    ) : item.status === 2 ? (
                      <button
                        onClick={(e) => handleUpdateSubmit(e, item._id, 3)}
                        className='px-3 py-2 bg-[#62a6f9] rounded-md text-white text-xs'
                      >
                        Trả phòng
                      </button>
                    ) : (
                      <button className='px-3 py-2 bg-[#45e37e] rounded-md text-white text-xs'>Hoàn thành</button>
                    )}
                  </li>
                </ul>
              )
            }
          })}
        {!updated &&
          data.data.result.map((item: any, index: any) => {
            return (
              <ul className='grid grid-cols-9 items-center mt-4' key={index}>
                <li className='col-span-1 text-sm text-center font-medium'>{item._id.slice(0, 15)}</li>
                <li className='col-span-1 text-sm text-center font-medium'>{item?.user?.full_name || item.name}</li>
                <li className='col-span-1 text-sm text-center font-medium'>{formatDate(item.date_pick)}</li>
                <li className='col-span-1 text-sm text-center font-medium'>{item.transportations?.price}</li>
                <li className='col-span-1 text-sm text-center font-medium'>{item.code}</li>
                <li className='col-span-1 text-sm text-center font-medium'>{formatDate(item.timeOrder)}</li>
                <li className='col-span-1 text-sm text-center font-medium'>{formatDate(item.timeBack)}</li>
                <li className='col-span-1 text-sm text-center font-medium'>{formatStatus(item.status)}</li>
                <li className='col-span-1'>
                  {item.status === 0 ? (
                    <div className='flex gap-2'>
                      <button
                        onClick={(e) => handleUpdateSubmit(e, item._id, 2)}
                        className='px-2 py-1 bg-[#fdbd28] rounded-md text-white text-xs'
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={(e) => handleUpdateSubmit(e, item._id, 1)}
                        className='px-3 py-2 bg-[#f77172] rounded-md text-white text-xs'
                      >
                        Huỷ vé
                      </button>
                    </div>
                  ) : item.status === 1 ? (
                    <button className='px-3 py-2 bg-[#45e37e] rounded-md text-white text-xs'>Hoàn thành</button>
                  ) : item.status === 2 ? (
                    <button
                      onClick={(e) => handleUpdateSubmit(e, item._id, 3)}
                      className='px-3 py-2 bg-[#62a6f9] rounded-md text-white text-xs'
                    >
                      Trả phòng
                    </button>
                  ) : (
                    <button className='px-3 py-2 bg-[#45e37e] rounded-md text-white text-xs'>Hoàn thành</button>
                  )}
                </li>
              </ul>
            )
          })}
      </div>
    </div>
  )
}

export default Transportation
