import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Image } from 'antd';

import styles from './banner.module.scss';

const BANNER_FAKE = [
  'https://routine.vn/media/catalog/category/thoi-trang-nam-thuong-hieu-routine-dep-cao-cap-chinh-hang.jpg',
  'https://onoff.vn/media/wysiwyg/quan-ao-nam-mac-nha-onoff.jpg',
  'https://theme.hstatic.net/200000053174/1001115888/14/home_about_1_image.jpg?v=1499',
];
const Banner = () => {
  return (
    <div className={styles.banner}>
      <Splide
        aria-label='My Favorite Images'
        hasTrack={false}
        options={{ rewind: true, autoplay: true, interval: 3000 }}
      >
        <SplideTrack>
          {BANNER_FAKE?.length > 0 &&
            BANNER_FAKE.map((ele, index: number) => (
              <SplideSlide key={`banners-${index}`}>
                <Image src={ele} alt='' preview={false} />
              </SplideSlide>
            ))}
        </SplideTrack>
      </Splide>
    </div>
  );
};

export default Banner;
