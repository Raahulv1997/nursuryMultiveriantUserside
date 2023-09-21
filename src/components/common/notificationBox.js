import moment from "moment";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotificationBox({ data, close }) {
  let navigate = useNavigate(null);
  const OnNotificationClick = () => {
    navigate("/profile?ClickedBy=checkout");
    setTimeout(() => {
      close();
    }, 1000);
  };
  return (
    <div className="m-1 border rounded" onClick={OnNotificationClick}>
      <Link className="text-decoration-none text-dark">
        <div className=" row m-2">
          <div className="">
            <small>{moment(data.created_on).format("YYYY-MM-DD")}</small>
            <p>
              {data.status === "read" ? data.message : <b> {data.message}</b>}
            </p>
          </div>
          {/* <div className='col-1 flex-end'><i className="fas fa-bell"></i></div> */}
        </div>
      </Link>
    </div>
  );
}
