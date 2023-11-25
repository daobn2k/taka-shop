import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Image } from 'antd';

import { IProductData } from '@/api/interface';

import styles from './banner.module.scss';

const ListProductRelated = ({ images }: { images: IProductData[]; loading?: boolean }) => {
  return (
    <div className={styles.banner}>
      <Splide
        aria-label='My Favorite Images'
        hasTrack={false}
        options={{ rewind: true, autoplay: true, interval: 3000 }}
      >
        <SplideTrack>
          {images?.length > 0 &&
            images.map((ele: IProductData, index: number) => (
              <SplideSlide key={`banners-${index}`}>
                <Image src={ele.image} alt='' preview={false} />
              </SplideSlide>
            ))}
        </SplideTrack>
      </Splide>
    </div>
  );
};

export default ListProductRelated;
