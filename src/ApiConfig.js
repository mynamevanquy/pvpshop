// import { message, notification } from 'antd';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const API = axios.create({
//     baseURL: 'https://localhost:443/api'
// });
// API.interceptors.response.use(config => {
//     const token = Cookies.get('token')
//     if (token) {
//         config.headers.getAuthorization = `Bearer ${token}`
//     }
//     return config;
// },
//     (response) => {
//         if (response.status === 200) {
//             notification.success({
//               message: 'Thành công',
//               description: 'Đăng nhập thành công!',
//             });
//           }
//         return response;
//     },
//     (error) => {
//         if (error.response) {
//             const { status, data } = error.response;
//             console.log(' :>> data' ,data);
//             if(status === 401){
//                 notification.error({
//                     message:"Lỗi",
//                     description:"Hết phiên làm việc, vui lòng đăng nhập lại"
//                 })
//             }
//             if (status === 403) {
//                 notification.error({
//                     message: "Lỗi",
//                     description: "Bạn không có quyền truy cập"
//                 })
//             }
//             if (status === 201) {
//                 notification.success({
//                     message: "Thông báo",
//                     description: "Tạo mới thành công"
//                 })
//             }
//         } else {
//             // Xử lý lỗi mạng hoặc lỗi không xác định
//             message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
//         }
//         console.log('error :>> ', error);
//         return Promise.reject(error);
//     }
// )
// export default API;