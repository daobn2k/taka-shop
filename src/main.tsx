import 'antd/dist/reset.css';
import './styles/globals.scss';
import './i18n';
import '@splidejs/react-splide/css';

import React from 'react';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import { Provider } from 'jotai';
import ReactDOM from 'react-dom/client';

import App from './App';
import { DebugAtoms } from './components/DebugAtoms/DebugAtoms';
import ErrorBoundary from './components/ErrorBoundary';
import 'dayjs/locale/vi';

dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.updateLocale('en', {
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
});
dayjs.updateLocale('vi', {
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthsShort: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  weekdays: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
});
dayjs.locale('vi');
ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <ErrorBoundary>
    <Provider>
      <DebugAtoms />
      <App />
    </Provider>
  </ErrorBoundary>,
);
