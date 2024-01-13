export const formatDate = (time: number) => {
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() + 1
  const date = new Date(time).getDate()
  return `${date}-${month}-${year}`
}
export const formatDateReverse = (time: number) => {
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() + 1
  const date = new Date(time).getDate()
  if (month < 10) {
    return `${year}-0${month}-${date}`
  }
  return `${year}-${month}-${date}`
}
export const formatStatus = (status: number) => {
  switch (status) {
    case 0:
      return 'Đang chờ xác nhận'
    case 1:
      return 'Vé bị huỷ'
    case 2:
      return 'Đã xác nhận'
    case 3:
      return 'Đã hoàn thành'
  }
}
const res = [
  {
    id: 'eyJzaWQiOiJTR04iLCJlaWQiOiI5NTY3MzM3OSIsInBlaWQiOiIyNzU0NjMyOSIsImZwdCI6IkFJUlBPUlQifQ==',
    place: 'Hồ Chí Minh'
  },
  {
    id: 'eyJzaWQiOiJIQU4iLCJlaWQiOiIxMjg2NjgwNzkiLCJwZWlkIjoiMjc1NDE5OTIiLCJmcHQiOiJBSVJQT1JUIn0=',
    place: 'Hà Nội'
  },
  {
    id: 'eyJzaWQiOiJEQUQiLCJlaWQiOiI5NTY3MzYxNSIsInBlaWQiOiIyNzU0MDY2OSIsImZwdCI6IkFJUlBPUlQifQ==',
    place: 'Đà Nẵng'
  },
  {
    id: 'eyJzaWQiOiJQUUMiLCJlaWQiOiIxMjg2NjcxOTkiLCJwZWlkIjoiMzk1NjM2MDkiLCJmcHQiOiJBSVJQT1JUIn0=',
    place: 'Phú Quốc'
  }
]
export const formatBody = (body: any) => {
  let fromId = ''
  let toId = ''
  res.map((item) => {
    if (item.place === body.fromId) fromId = item.id
    if (item.place === body.toId) toId = item.id
  })
  return { ...body, fromId, toId }
}
