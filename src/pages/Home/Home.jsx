import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '~/components/Button';
import styles from './Home.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Home() {
  const [breeds, setBreeds] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchAPICategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/breed/');
        setBreeds(response.data.breeds);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAPIProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/revenue/product');
        setProducts(response.data.result.products);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAPIServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/service');
        setServices(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAPIAllProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product');
        console.log('product', response);
        setAllProducts(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPICategories();
    fetchAPIProducts();
    fetchAPIServices();
    fetchAPIAllProducts();
  }, []);

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={`${className} ${cx('slick-next')}`} style={{ ...style }} onClick={onClick} />;
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={`${className} ${cx('slick-prev')}`} style={{ ...style }} onClick={onClick} />;
  };

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const settingSlider = {
    // dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('slide-bar')}>
        <Slider {...settings}>
          <img
            className={cx('slide')}
            alt="slide2"
            src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/05/anh-cho-thumbnail.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide3"
            src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/08/hinh-nen-meo.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide4"
            src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-con-meo-cute.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/05/anh-cho-thumbnail.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/08/hinh-nen-meo.jpg"
          ></img>

          <img
            className={cx('slide')}
            alt="slide5"
            src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-con-meo-cute.jpg"
          ></img>
        </Slider>
      </div>

      <div className={cx('categories')}>
        <h2 className={cx('header')}>BH STOREへようこそ</h2>
        <div className={cx('list-category')}>
          <div className={cx('category-item')}>
            <img
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/welcome_1.png?1701914025229"
              alt="Online Order"
            ></img>
            <div className={cx('content-item')}>
              <h3>
                <a href="#OnlineOrder">オンラインで注文する</a>
              </h3>
              <p>市内2時間超特急配送</p>
            </div>
          </div>
          <div className={cx('category-item')}>
            <img
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/welcome_2.png?1701914025229"
              alt="Grooming"
            ></img>
            <div className={cx('content-item')}>
              <h3>
                <a href="#Service">トリミング＆スパ</a>
              </h3>
              <p>トップグルーマーによる10ステップのトリミング＆スタイリング</p>
            </div>
          </div>
          <div className={cx('category-item')}>
            <img
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/welcome_3.png?1701914025229"
              alt="Hotel"
            ></img>
            <div className={cx('content-item')}>
              <h3>
                <a href="#Service">ペットホテル</a>
              </h3>
              <p>愛犬・愛猫を24時間365日、大切にお世話＆見守り</p>
            </div>
          </div>
          <div className={cx('category-item')}>
            <img
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/welcome_4.png?1701914025229"
              alt="Veterinarian"
            ></img>
            <div className={cx('content-item')}>
              <h3>
                <a href="#Service">獣医師</a>
              </h3>
              <p>最新設備と医療機器による安心の診療</p>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('items-service')}>
        <h2 className={cx('header')}>種類</h2>
        <Slider {...settingSlider}>
          {breeds &&
            breeds.map((category) => {
              return (
                <div className={cx('item-service')}>
                  <Link>
                    <img className={cx('item-img-service')} src={category.image} alt="category"></img>
                    <div className={cx('category-container-service')}>
                      <div className={cx('category-title-service')}>{category.name}</div>
                      <Button
                        key={category.id}
                        animation
                        className={cx('category-btn')}
                        to={`${config.routes.allProducts}?id1=${category.id}`}
                      >
                        購入する
                      </Button>
                    </div>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>

      <div className={cx('items-service')}>
        <h2 className={cx('header')}>人気商品</h2>
        <Slider {...settingSlider}>
          {products &&
            products.map((products) => {
              return (
                <div className={cx('item-service')}>
                  <Link>
                    <img
                      className={cx('item-img-service')}
                      src={
                        products.image
                          ? products.image
                          : 'https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg'
                      }
                      alt="products"
                    ></img>
                    <div className={cx('category-container-service')}>
                      <div className={cx('category-title-service')}>{products.name}</div>
                      <Button
                        key={products.id}
                        animation
                        className={cx('category-btn')}
                        to={`detailItem/${products.id}`}
                      >
                        購入する
                      </Button>
                    </div>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>

      <div className={cx('items-service')}>
        <h2 className={cx('header')}>商品</h2>
        <Slider {...settingSlider}>
          {allProducts &&
            allProducts.map((products) => {
              return (
                <div className={cx('item-service')}>
                  <Link>
                    <img
                      className={cx('item-img-service')}
                      src={
                        products.image
                          ? products.image
                          : 'https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg'
                      }
                      alt="products"
                    ></img>
                    <div className={cx('category-container-service')}>
                      <div className={cx('category-title-service')}>
                        {products.name.length > 35 ? products.name.slice(0, 35) + '...' : products.name}
                      </div>
                      <Button
                        key={products.id}
                        animation
                        className={cx('category-btn')}
                        to={`detailItem/${products.id}`}
                      >
                        購入する
                      </Button>
                    </div>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>

      <div className={cx('btn-wrap')}>
        <div className={cx('custom-button-container')}>
          <Link to={config.routes.allProducts} className={cx('custom-button')}>
            <span className={cx('bg-transition')}></span>
            <span className={cx('icon-transition')}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className={cx('button-text')}>すべて表示</span>
          </Link>
        </div>
      </div>

      <div className={cx('items-service')}>
        <h2 className={cx('header')}>サービス</h2>
        <Slider {...settingSlider}>
          {services &&
            services.map((services, index) => {
              return (
                <div key={index} className={cx('item-service')}>
                  <img src={services.image} className={cx('item-img-service')} alt="img"></img>
                  <div className={cx('category-container-service')}>
                    <div className={cx('category-title-service')}>{services.name}</div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>

      <div className={cx('btn-wrap')}>
        <div className={cx('custom-button-container')}>
          <Link to={config.routes.bookingAppointment} className={cx('custom-button')}>
            <span className={cx('bg-transition')}></span>
            <span className={cx('icon-transition')}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className={cx('button-text')}>今すぐ予約する</span>
          </Link>
        </div>
      </div>

      <div className={cx('slider2')}>
        <img
          src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/banner_index.png?1701914025229"
          alt="Slider"
        ></img>
      </div>

      <div className={cx('categories')}>
        <h2 className={cx('header')}>BH STOREのサービス</h2>
        <div className={cx('list-category')}>
          <div id="Service" className={cx('service-item-left')}>
            <h2>ペットホテル</h2> {/* Hoặc ペットトリミング＆スパ */}
            <div className={cx('content-service-left')}>ペットをより清潔でスッキリとした姿に</div>
            <div className={cx('content-service-left')}>おしゃれで魅力的なスタイリングをご提案</div>
            <div className={cx('content-service-left')}>被毛や爪の衛生ケアで病気の予防にも</div>
            <div className={cx('content-service-left')}>適切なマッサージでリラックス＆ストレス解消</div>
            <div className={cx('content-service-left')}>安全・安心を最優先したケア</div>
          </div>
          <div className={cx('service-item-center')}>
            <img
              alt="service-img"
              src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/banner_service.png?1701914025229"
            ></img>
          </div>
          <div className={cx('service-item-right')}>
            <h2>獣医 - 診察・治療</h2>
            <div className={cx('content-service-right')}>危険な病気の予防と早期発見</div>
            <div className={cx('content-service-right')}>栄養バランスの乱れを管理</div>
            <div className={cx('content-service-right')}>
              初期症状から病気を発見し、徹底的な治療を実施
            </div>
            <div className={cx('content-service-right')}>ペットの治療にかかる費用と時間を節約</div>
            <div className={cx('content-service-right')}>人間への感染を防ぐ</div>
          </div>
        </div>
      </div>

      <div className={cx('categories')}>
        <h2 className={cx('header')}>BH STOREの価格表</h2>
        <div className={cx('slider3')}>
          <img
            src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/bang-pet-cung.jpg?1701914025229"
            alt="Slider"
          ></img>
        </div>
      </div>
{/* 
      <div className={cx('container-form')}>
        <div className={cx('leftColumn')}>
          <h2>ĐẶT LỊCH NGAY QUA HOTLINE</h2>
          <p className={cx('left-column-content')}>
            Quý khách vui lòng đặt lịch với chúng tôi trước khi đưa thú cưng tới sử dụng dịch vụ để đảm bảo chúng tôi
            luôn sắp xếp nhân sự để phục vụ quý khách tốt nhất
          </p>
          <div className={cx('left-column-content1')}>
            <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            <p>Điện thoại: (012) 345-6789</p>
            <p>Email: contact@petstore.com</p>
          </div>
          <div className={cx('left-column-content1')}>
            <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            <p>Điện thoại: (012) 345-6789</p>
            <p>Email: contact@petstore.com</p>
          </div>
          <div className={cx('left-column-content1')}>
            <p>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
            <p>Điện thoại: (012) 345-6789</p>
            <p>Email: contact@petstore.com</p>
          </div>
        </div>

        <div className={cx('rightColumn')}>
          <img
            src="https://bizweb.dktcdn.net/100/467/317/themes/881347/assets/banner_index.png?1701914025229"
            alt="Slider"
          ></img>
          <img
            src="https://png.pngtree.com/thumb_back/fw800/background/20220827/pngtree-pet-shop-cat-and-dog-vector-background-image_1462686.jpg"
            alt="Slider"
          ></img>
          <img src="https://vetad.net/wp-content/uploads/2018/10/Banner3-1.jpg" alt="Slider"></img>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
