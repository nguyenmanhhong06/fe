import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import './content.css'

interface Props {
  button: string
  buttonCss: string
  items: number
  data: { name?: string; img: string; date?: string; price?: string }[]
  title: string
  icon?: string
  subTitle?: string
  titleCss?: string
}
export default function Content({ button, items, data, title, icon, subTitle, buttonCss, titleCss }: Props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: items,
      slidesToSlide: 1 // optional, default to 1.
    }
  }
  return (
    <div>
      <div className='mt-[90px]'>
        <div className='flex gap-2 items-center'>
          {icon && (
            <div className='w-[24px] h-[24px] rounded-lg overflow-hidden'>
              <img src={icon} alt='' className='overflow-hidden object-cover object-center w-full h-full' />
            </div>
          )}
          <p className={` text-[24px] font-bold ${titleCss}`}>{title}</p>
        </div>
        <p className='text-[#8f8f8f] text-base mt-1 mb-3'>{subTitle}</p>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition='all .75'
          // className='carousel-container'
          transitionDuration={1000}
          containerClass='carousel-container'
          removeArrowOnDeviceType={['tablet', 'mobile']}
          // deviceType={this.props.deviceType}
          dotListClass='carousel-container'
          // itemClass='carousel-container'
        >
          {data.map((item, index) => (
            <div className='px-1 shadow-lg overflow-hidden rounded-lg' key={index}>
              <div className='rounded-lg overflow-hidden'>
                <img src={item.img} alt='' className='w-full h-full object-cover object-center' />
              </div>
              <div className='pl-2 pt-4'>
                <p className='text-[#434343] font-bold'>{item.name}</p>
                <p className='text-[12px] text-[#8f8f8f]'>{item.date}</p>
                <p className='text-[#d99800]'>{item.price}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <div className='flex justify-center mt-4 '>
          <button className={buttonCss}>{button}</button>
        </div>
      </div>
    </div>
  )
}
