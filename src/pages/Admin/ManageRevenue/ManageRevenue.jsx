import classNames from 'classnames/bind';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InputForm from '~/components/InputForm';
import styles from './ManageRevenue.module.scss';
import moment from 'moment';
import GetToken from '~/Token/GetToken';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManageRevenue() {
  const [topCustomer, setTopCustomer] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState();
  const [totalProfit, setTotalProfit] = useState();

  const [payload, setPayload] = useState({
    fromDate: '2024-01-01',
    toDate: '2024-12-31',
  });

  const [data, setData] = useState([]);

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }

  useEffect(() => {
    const fetchApiRevenue = async (fromDate, toDate) => {
      const response = await axios.get('http://localhost:8000/api/revenue', {
        params: {
          startDate: fromDate,
          endDate: toDate,
        },
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      });
      const formattedData = response.data.result.resultByDay.map((item) => ({
        revenue_date: moment(item.date).format('DD-MM-YYYY'),
        revenue: item.totalRevenue,
        profit: item.profit,
      }));
      setTotalRevenue(response.data.result.totalRevenue);
      setTotalProfit(response.data.result.profitRevenue);
      setData(formattedData);
    };

    const fetchAPICustomers = async (page, limit) => {
      const response = await axios.get('http://localhost:8000/api/revenue/customer', {
        params: {
          page: 1,
          limit: 20,
        },
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      });
      setTopCustomer(response.data.result.customers);
    };

    const fetchAPIShoes = async (page, limit) => {
      const response = await axios.get('http://localhost:8000/api/revenue/product', {
        params: {
          page: 1,
          limit: 20,
        },
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      });
      setTopProducts(response.data.result.products);
    };

    fetchApiRevenue(payload.fromDate, payload.toDate);
    fetchAPIShoes(payload.page, payload.limit);
    fetchAPICustomers(payload.page, payload.limit);
  }, [payload.fromDate, payload.toDate]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('revenue-field')}>
        <div className={cx('header1')}>注文統計</div>

        <div className={cx('date-field')}>
          <div className={cx('date')}>
            <span className={cx('title')}>Date from</span>
            <InputForm
              type="date"
              name={'fromDate'}
              value={payload.fromDate}
              setValue={setPayload}
              className={cx('input')}
            ></InputForm>
          </div>
          <div className={cx('date')}>
            <span className={cx('title')}>Date to</span>
            <InputForm
              type="date"
              name={'toDate'}
              value={payload.toDate}
              setValue={setPayload}
              className={cx('input')}
            ></InputForm>
          </div>
        </div>

        <div className={cx('chart')}>
          <BarChart width={1220} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="revenue_date" />
            <Tooltip />
            <Legend iconType="circle" align="center" iconSize={14} />
            <Bar dataKey="revenue" fill="#8884d8" name="収入" />
            <Bar dataKey="profit" fill="#82ca9d" name="利益" />
          </BarChart>
        </div>
      </div>
      <div className={cx('revenue-field')}>
        <div className={cx('header1')}>年間統計</div>
        <div className={cx('content')}>
          <div className={cx('Top10')}>
            <div className={cx('header')}>年間売上トップ20顧客</div>
            <ul className={cx('products')}>
              {topCustomer &&
                topCustomer.map((product, index) => {
                  const customerNumber = index + 1;
                  return (
                    product && (
                      <li key={product.id} className={cx('product-item')}>
                        {customerNumber}. 
                        <Link className={cx('under-line')} to={`/otherProfiles/${product.id}`}>
                          {product.inforUser.lastname} 
                        </Link>
                        {' '} ー{' '}
                        <span className={cx('high-light')}> {formatCurrency(product.point * 1000)}</span>
                      </li>
                    )
                  );
                })}
            </ul>
          </div>

          <div className={cx('BestCustomer')}>
            <div className={cx('header')}>総売上</div>
            <span className={cx('number')}>{totalRevenue && formatCurrency(totalRevenue)} 総価格</span>
            <div className={cx('header')}>総利益</div>
            <span className={cx('number')}>{totalProfit && formatCurrency(totalProfit)} 総価格</span>
          </div>

          <div className={cx('Top10')}>
            <div className={cx('header')}>年間売上トップ20商品</div>
            <ul className={cx('products')}>
              {topProducts &&
                topProducts.map((product, index) => {
                  const customerNumber = index + 1;
                  return (
                    <li key={product.id} className={cx('product-item')}>
                      {customerNumber}. 
                      <Link className={cx('under-line')} to={`/detailItem/${product.id}`}>
                      {product.name}
                      </Link>
                      {' '} ー{' '}
                      <span className={cx('high-light')}> {product.soldProductNum} 個</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageRevenue;
