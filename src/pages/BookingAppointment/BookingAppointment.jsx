import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Flip, ToastContainer, toast } from 'react-toastify';
import styles from './BookingAppointment.module.scss';
import Button from '~/components/Button';
import GetToken from '~/Token/GetToken';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    id_service: '',
    appointmentTime: '',
    endTime: '',
    order_phoneNumber: '',
    note: '',
  });
  const [services, setServices] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/service');
        // console.log("res kaka", response);
        setServices(response.data.result);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    fetchServices();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.id_service) {
      errors.id_service = 'サービスを選択してください。';
      isValid = false;
    }
    if (!formData.appointmentTime) {
      errors.appointmentTime = '開始時間を選択してください。';
      isValid = false;
    }
    if (!formData.endTime) {
      errors.endTime = '終了時間を選択してください。';
      isValid = false;
    }
    if (!formData.order_phoneNumber) {
      errors.order_phoneNumber = '電話番号を入力してください。';
      isValid = false;
    }
    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/appointment/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setStep(3);
        //   setTimeout(() => {
        //     window.location.reload();
        //   }, 2000);
        setTimeout(() => navigate('/'), 2000);
      }
      if (!response.data.success) {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <>
            <label className={cx('form-label')}></label>
            <div className={cx('form-group')}>
              <label htmlFor="service">サービス</label>
              <select id="service" name="id_service" value={formData.id_service} onChange={handleChange}>
                <option value="">サービスを選択してください</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errorMessages.id_service && <small className={cx('error')}>{errorMessages.id_service}</small>}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <label className={cx('form-label')}>日時をご選択ください。</label>
            <div className={cx('form-group')}>
              <label htmlFor="appointmentTime">開始時間</label>
              <input
                type="datetime-local"
                id="appointmentTime"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
              />
              {errorMessages.appointmentTime && <small className={cx('error')}>{errorMessages.appointmentTime}</small>}
            </div>
            <div className={cx('form-group')}>
              <label htmlFor="endTime">終了時間</label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
              {errorMessages.endTime && <small className={cx('error')}>{errorMessages.endTime}</small>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <label className={cx('form-label')}>詳細情報をご入力ください。</label>
            <div className={cx('form-group')}>
              <label htmlFor="phoneNumber">電話番号</label>
              <input
                type="text"
                id="phoneNumber"
                name="order_phoneNumber"
                value={formData.order_phoneNumber}
                onChange={handleChange}
              />
              {errorMessages.order_phoneNumber && (
                <small className={cx('error')}>{errorMessages.order_phoneNumber}</small>
              )}
            </div>
            <div className={cx('form-group')}>
              <label htmlFor="note">メモ</label>
              <input type="text" id="note" name="note" value={formData.note} onChange={handleChange} />
            </div>
          </>
        );
      case 3:
        return <p>ありがとうございます！ご予約が確定いたしました。</p>;
      default:
        return null;
    }
  };

  return (
    <div className={cx('page-container')}>
      <div className={cx('slider')}>
        <Slider {...settings}>
          <img
            className={cx('slide')}
            alt="slide2"
            src="https://marketplace.canva.com/kx6jY/MAGzG5kx6jY/1/tl/canva-MAGzG5kx6jY.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide3"
            src="https://cdn.pixabay.com/photo/2023/06/29/12/28/cats-8096304_640.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide4"
            src="https://marketplace.canva.com/kx6jY/MAGzG5kx6jY/1/tl/canva-MAGzG5kx6jY.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cdn.pixabay.com/photo/2023/06/29/12/28/cats-8096304_640.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-6.jpg"
          ></img>
          <img
            className={cx('slide')}
            alt="slide5"
            src="https://cosp.com.vn/uploaded/Nhi/pet%20shop/thiet-ke-pet-shop-kim-cuong-8.jpg"
          ></img>
        </Slider>
      </div>

      <div className={cx('main-content')}>
        <div className={cx('appointment-container')}>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            transition={Flip}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <img
            className={cx('advertisement-left')}
            src="https://i.pinimg.com/564x/1e/ce/71/1ece71fa61d85dbd7d42dd8e3882f933.jpg"
            alt="Left Banner"
          />
          <div className={cx('form-container')}>
            <div className={cx('appointment-form')}>
              <h1>予約する</h1>
              <div className={cx('progress-bar')}>
                <div className={cx('progress-step', { active: step >= 0 })}>サービス</div>
                <div className={cx('progress-line', { active: step >= 1 })}></div>
                <div className={cx('progress-step', { active: step >= 1 })}>時間</div>
                <div className={cx('progress-line', { active: step >= 2 })}></div>
                <div className={cx('progress-step', { active: step >= 2 })}>詳細</div>
                <div className={cx('progress-line', { active: step >= 3 })}></div>
                <div className={cx('progress-step', { active: step >= 3 })}>完了</div>
              </div>
              <form onSubmit={handleSubmit}>
                {renderForm()}
                {step < 3 && (
                  <p className={cx('privacy-policy')}>
                    このフォームを送信することで、お客様は当社のプライバシーポリシーに同意したことになります。
                  </p>
                )}
                <div className={cx('form-actions')}>
                  {step > 0 && (
                    <Button type="button" className={cx('btn', 'previous')} onClick={prevStep}>
                      戻る
                    </Button>
                  )}
                  {step < 2 && (
                    <Button type="button" className={cx('btn', 'next')} onClick={nextStep}>
                      次へ
                    </Button>
                  )}
                  {step === 2 && (
                    <Button type="submit" className={cx('btn', 'next')}>
                      完了
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <img
            className={cx('advertisement-right')}
            src="https://i.pinimg.com/564x/1e/ce/71/1ece71fa61d85dbd7d42dd8e3882f933.jpg"
            alt="Right Banner"
          />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
