import axios from "axios";
import moment from "moment";

const API_URL = "http://indiakinursery.com:9999";

// const API_URL = "http://192.168.29.108:9999";

let Token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  user_token: `${Token}`,
};
/*APi to get user Notification  */
export const GetUserNotificationList = async (props) => {
  // console.log(props)
  const response = axios.get(`${API_URL}/notification`, { headers: props });
  return response;
};
/*Api for user login */
export const UserLogin = async (props) => {
  // console.log(props)
  const response = await axios.post(`${API_URL}/user_login`, {
    email: props.email,
    password: props.password,
  });
  return response.data;
};

/*Api for send otp for singup*/
export const SendOtp = async (props) => {
  // console.log(props)
  const response = await axios.post(`${API_URL}/user_signup `, {
    email: props.email,
    password: props.password,
    name: props.name,
  });
  return response.data;
};

/*Api for uuser Singin */
export const UserSingin = async (props) => {
  // console.log(props)
  const response = await axios.post(`${API_URL}/user_otp_verify `, {
    email: props.email,
    otp: props.otp,
  });
  return response.data;
};

/*Api for user Singin */
export const UpdateUserPassword = async (props, HeadersVal) => {
  // console.log(props)
  const response = axios.post(
    `${API_URL}/user_forgate_password_update`,
    { password: props.conf_password },
    { headers: HeadersVal }
  );
  return response;
};

/*Api for user Change password */
export const ChangeUserPassword = async (props) => {
  // console.log(props)
  const response = axios.post(
    `${API_URL}/change_user_password`,
    {
      old_password: props.password,
      new_password: props.new_password,
      email: props.email,
    },
    { headers: headers }
  );
  return response.data;
};

/*Api for forgot password */
export const ForgotUserPassword = async (props) => {
  // console.log(props)
  const response = axios.post(`${API_URL}/user_forgate_password`, {
    email: props.email,
  });
  return response;
};
/*Api for Verify Otp password */
export const VerifyOtp = async (props) => {
  // console.log(props)
  const response = axios.post(`${API_URL}/user_otp_verify`, {
    email: props.email,
    otp: props.otp,
  });
  return response;
};

/*Api to get user data */
export const UserData = async (props) => {
  const response = axios.get(`${API_URL}/user_details`, { headers: props });
  return response;
};

/*Api to update user */
export const UpdateUer = async (props) => {
  // console.log(props)
  let image_file = props.image;
  const formData = new FormData();
  formData.append("first_name", props.first_name);
  formData.append("last_name", props.last_name);
  formData.append("email", props.email);
  formData.append("phone_no", props.phone_no);
  formData.append("address", props.address);
  formData.append("alternate_address", props.alternate_address);
  formData.append("city", props.city);
  formData.append("pincode", props.pincode);
  formData.append("image", image_file);
  const response = axios.put(`${API_URL}/update_user`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      user_token: `${Token}`,
    },
  });
  return response;
};

/*Api to get Category list */
export const CategoryList = async (props) => {
  // console.log(props)
  const response = axios.post(
    `${API_URL}/category_list`,
    { id: props },
    { headers: headers }
  );
  return response;
};
/*Api for Filter list data  */
export const FilterList = async (props) => {
  // console.log(props)
  const response = axios.get(`${API_URL}/filter_list`, { headers: headers });
  return response;
};

/*Api for Product list*/
export const ProductList = async (
  to_product_price,
  from_product_price,
  rating,
  CatSearch,
  // brandFilter,
  Pages,
  currentPage,
  // sortByAlpha,
  // sortByRating,
  // sortByPrice,
  sort,
  id,
  search,
  feature,
  verientId
) => {
  let SortKey = sort ? sort.split(",")[0] : "product_id";
  let SorValue = sort ? sort.split(",")[1] : "ASC";
  const response = axios.post(
    `${API_URL}/search?page=${currentPage}&per_page=${Pages}&${SorValue}=${SortKey}&is_featured=${
      feature === "yes" ? feature : "no"
    }`,
    {
      price_from: from_product_price === undefined ? "" : from_product_price,
      price_to: to_product_price === undefined ? "" : to_product_price,
      price___: "",
      is_active___: "",
      id___: "",
      created_on___: "",
      search: search === null || search === undefined ? "" : search,
      rating__: "",
      avgRatings: rating.length === 2 ? [] : rating,
      category:
        CatSearch[0] === null || CatSearch[0] === undefined ? "" : CatSearch,
      // brand: brandFilter,
      seo_tag: [],
      vendor_id: [],
      id: [],
      product_id: id === (null || undefined) ? [""] : [id],
      // verient_name__: sortByAlpha,
      verient_name: "",
      product_verient_id: verientId === (null || undefined) ? [] : verientId,
      // order_count: treanding === ["Yes"] ? treanding : ["NO"]
      // "is_trending": treanding === ["Yes"] ? treanding : ["NO"]
    },
    {
      headers: Token
        ? headers
        : {
            "Content-Type": "application/json",
            user_blank: `true`,
          },
    }
  );
  return response;
};
/*Api to Get Treandig product  */
export const TreandingPro = async (end, start, HeaderVal) => {
  // console.log(start, end)
  const response = axios.post(
    `${API_URL}/trending_products`,
    {
      from_date: start,
      to_date: end,
    },
    { headers: HeaderVal }
  );
  return response;
};

/*Api to Add product to cart */
export const AddToCart = async (id, varId, qty, HeaderVal) => {
  // console.log(id, varId, qty)
  const response = axios.post(
    `${API_URL}/add_to_cart`,
    {
      product_id: id,
      product_verient_id: varId,
      cart_product_quantity: qty,
    },
    { headers: HeaderVal }
  );
  return response;
};

/*Api to Update product to cart */
export const UpdateCart = async (id, varId, qty, headersVal) => {
  console.log("header val", JSON.stringify(headersVal));
  const response = axios.put(
    `${API_URL}/cart_update`,
    {
      product_id: id,
      product_verient_id: varId,
      cart_product_quantity: qty,
    },
    { headers: headersVal }
  );
  return response;
};
/*Api to get Cart list */
// export const CartList = async (props) => {
//   // console.log(props)
//   const response = axios.get(`${API_URL}/cart_list`, { headers: headers });
//   return response;
// };

export const CartList = async (props) => {
  // console.log(props)
  const response = axios.get(`${API_URL}/cart_list_1`, { headers: props });
  return response;
};
/*Api to Delete Cart item */
export const DeleteCart = async (id, varId, headerVal) => {
  // console.log(id ,varId)
  const response = axios.put(
    `${API_URL}/cart_delete`,
    {
      product_id: id,
      product_verient_id: varId,
    },
    { headers: headerVal }
  );
  return response;
};

/*Api for Order list*/
export const OrderList = async (HeadersVal) => {
  const response = axios.post(
    `${API_URL}/order_search?page=${0}&per_page=${100}&group=yes`,
    {
      search: "",
      order_id: "",
      vendor_id: "",
      category: "",
      brand: "",
    },
    { headers: HeadersVal }
  );
  return response;
};
/*Api for Order details*/
export const Orderdetails = async (props, HeadersVal) => {
  const response = axios.get(`${API_URL}/order_details?id=${props}`, {
    headers: HeadersVal,
  });
  return response;
};

/*Api to Check address before placing order*/
export const CheckUserAddress = async (pin, vendor, headersVal) => {
  const pincode = parseInt(pin, 10);
  const vendorId = vendor.map((item) => item.toString());

  const response = axios.post(
    `${API_URL}/check_vendor_service_avaibility`,
    {
      pin: pincode,
      vendor_id: vendorId,
    },
    { headers: headersVal }
  );
  return response;
};

export const PlaceOrder = async (props, headersVal) => {
  // console.log(props);
  const response = axios.post(`${API_URL}/add_order_1`, JSON.stringify(props), {
    headers: headersVal,
  });
  return response;
};
/*Api to palace order*/
export const CreateRazorpay = async (amount, headersVal) => {
  let name = "user payment";
  let description = "payment description";
  // console.log(props);
  const response = axios.post(
    `${API_URL}/createOrder`,
    {
      name: name,
      amount: amount,
      description: description,
    },
    {
      headers: headersVal,
    }
  );
  return response;
};

/*Api to cancel order*/
export const CancelOrder = async (id, headersVal) => {
  // console.log(props);
  const response = axios.put(
    `${API_URL}/cancel_order`,
    { order_id: id },
    {
      headers: headersVal,
    }
  );
  return response;
};
/*Api for Review list*/
export const ReviewList = async (id, HeadersVal) => {
  // console.log(props);
  const response = axios.post(
    `${API_URL}/review_list`,
    {
      product_id: id,
      product_name: "",
      status: "",
    },
    { headers: HeadersVal }
  );
  return response;
};

/*Api to add review */
export const AddReview = async (props, HeadersVal) => {
  // console.log(props);
  const response = axios.post(
    `${API_URL}/review_rating`,
    {
      product_id: props.product_id,
      user_name: props.user_name,
      product_name: props.product_name,
      review_date: moment(props.review_date).format("YYYY-MM-DD"),
      review_rating: props.review_rating,
      comment: props.comment,
    },
    { headers: HeadersVal }
  );
  return response;
};

/*Api to addd complaint */
export const AddComplaint = async (props, headersVal) => {
  // console.log(props);
  const response = axios.post(
    `${API_URL}/add_complain`,
    {
      order_id: props.order_id,
      first_name: props.first_name,
      last_name: props.last_name,
      contect_no: props.contect_no,
      subject: props.subject,
      email: props.email,
      description: props.description,
    },
    { headers: headersVal }
  );
  return response;
};

export const AddComplaintFromOrder = async (props, headersVal) => {
  // console.log(props);
  const response = axios.post(
    `${API_URL}/add_complain`,
    {
      order_id: props.order_id,

      subject: props.subject,

      description: props.description,
    },
    { headers: headersVal }
  );
  return response;
};

/*Api to addd complaint */
export const ComplaintList = async (headersVal) => {
  // console.log(props);
  const response = axios.post(
    `${API_URL}/complain_search`,
    // { email: email },
    { status_: "" },
    { headers: headersVal }
  );
  return response;
};

// api to add and remove from wishlist----------------------------
export const Add_Remove_wishlist = async (id, varient_id, headersVal) => {
  // console.log(props);
  const response = axios.post(
    `${API_URL}/add_remove_to_wishlist`,

    { product_id: id, product_verient_id: varient_id },
    { headers: headersVal }
  );
  return response;
};

//for get the wishlist of product-----------------
export const getwishlist = async (props) => {
  // console.log(props);
  const response = axios.get(
    `${API_URL}/wishlist`,

    { headers: props }
  );
  return response;
};
