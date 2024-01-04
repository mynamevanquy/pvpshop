import { useNavigate, useRouteError } from "react-router-dom";
import './page.css';
import { Button, Result } from "antd";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
const navigate = useNavigate()
  return (
    <div id="error-page">
      {/* <h1>Oops!</h1>
      <p>Xin lỗi, Một lỗi xảy ra không mong muốn.Trang này hiện không hoạt động.
        <i>{error.statusText || error.message}</i>
      </p> */}
      <Result
    status="404"
    title="404"
    subTitle="Xin lỗi, Bạn không có quyền hoặc trang này không tồn tài."
    extra={ <Button type="primary" onClick={() => navigate('/')}>
    Trở về trang chủ  
  </Button>}
  />
    </div>
  );
}