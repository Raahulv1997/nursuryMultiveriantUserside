import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default function NotificationBox({ data }) {
  return (
    <div className="m-1 border rounded">
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
