import axios from "axios"
const API_URL = "https://nursery-verient-live.onrender.com";
let Token = localStorage.getItem("token");
const headers = {
  'Content-Type': 'application/json',
  'user_token': `${Token}`
}

/*Api for user login */
export const UserLogin = async (props) => {
  // console.log(props)
  const response = await axios.post(`${API_URL}/user_login`,
    {
      "email": props.email,
      "password": props.password
    }
  );
  return response.data;
};

/*Api for send otp for singup*/
export const SendOtp = async (props) => {
  // console.log(props)
  const response = await axios.post(`${API_URL}/user_signup `,
    {
      email: props.email,
      password: props.password,
      name: props.name
    }
  );
  return response.data;
};

/*Api for uuser Singin */
export const UserSingin = async (props) => {
  // console.log(props)
  const response = await axios.post(`${API_URL}/user_otp_verify `,
    {
      email: props.email,
      otp: props.otp,
    }
  );
  return response.data;
};

/*Api for user Singin */
export const UpdateUserPassword = async (props) => {
  // console.log(props)
  const response = axios.post(`${API_URL}/user_forgate_password_update`,
    { password: props.conf_password },
    { headers: headers }
  )
  return response;
};

/*Api for user Change password */
export const ChangeUserPassword = async (props) => {
  // console.log(props)
  const response = axios.post(`${API_URL}/change_user_password`,
    {
      "old_password": props.password,
      "new_password": props.new_password,
      "email": props.email
    },
    { headers: headers }
  )
  return response.data;
};

/*Api for forgot password */
export const ForgotUserPassword = async (props) => {
  // console.log(props)
  const response = axios.post(`${API_URL}/user_forgate_password`,
    { email: props.email },
  )
  return response.data;
};

/*Api to get user data */
export const UserData = async () => {
  const response = axios.get(`${API_URL}/user_details`,
    { headers: headers }
  )
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
  const response = axios.put(`${API_URL}/update_user`, formData, { headers: headers })
  return response.data;
};

/*Api to get Category list */
export const CategoryList = async (props) => {
  // console.log(props)
  const response = axios.post(`${API_URL}/category_list`,
    { id: props },
    { headers: headers }
  )
  return response;
};
/*Api for Filter list data  */
export const FilterList = async (props) => {
  // console.log(props)
  const response = axios.get(`${API_URL}/filter_list`,
    { headers: headers }
  )
  return response;
};

/*Api for Product list*/
export const ProductList = async (to_product_price, from_product_price, rating, CatSearch, brandFilter, Pages, currentPage, sortByAlpha, sortByRating, sortByPrice, id, search) => {
  // console.log("Category Search", CatSearch,"Token",Token)
  const response = axios.post(`${API_URL}/search?page=${currentPage}&per_page=${Pages}`,
    {
      "price_from": from_product_price === undefined ? "" : from_product_price,
      "price_to": to_product_price === undefined ? "" : to_product_price,
      "price__": sortByPrice,
      "rating__": sortByRating,
      "id__": "",
      "created_on__": "",
      "search": search === null || search === undefined ? "" : search,
      "rating": rating,
      "category": CatSearch === null || CatSearch === undefined ? "" : CatSearch,
      "brand": brandFilter,
      "seo_tag": [],
      "vendor_id": [],
      "id": [],
      "product_id": id === (null || undefined) ? [""] : [id],
      "verient_name__": sortByAlpha,
      "verient_name": ""
    },
    {
      headers: Token ? headers  : {
        'Content-Type': 'application/json',
        'user_blank': `true`
      }
    }
  )
  return response;
};

/*Api to Add product to cart */
export const AddToCart = async (id, varId, qty) => {
  // console.log(id, varId, qty)
  const response = axios.post(`${API_URL}/add_to_cart`,
    {
      "product_id": id,
      "product_verient_id": varId,
      "cart_product_quantity": qty
    },
    { headers: headers }
  )
  return response;
};

/*Api to get Cart list */
export const CartList = async (props) => {
  // console.log(props)
  const response = axios.get(`${API_URL}/cart_list`,
    { headers: headers }
  )
  return response;
};

/*Api for Order list*/
export const OrderList = async (props) => {
  const response = axios.post(`${API_URL}/order_search?page=${0}&per_page=${10}`,
    {
      "search": "",
      "order_id": "",
      "vendor_id": "",
      "category": "",
      "brand": ""
    },
    { headers: headers }
  )
  return response;
};

/*Api for Review list*/
export const ReviewList = async (props) => {
  // console.log(props);
  const response = axios.post(`${API_URL}/review_list`,
    {
      "product_id": "",
      "product_name": "",
      "status": ""
    },
    { headers: headers }
  )
  return response;
};
export const AddReview = async (props) => {
  // console.log(props);
  const response = axios.post(`${API_URL}/review_rating`,
    {
      "product_id": "",
      "user_name": "",
      "product_name": "",
      "review_date": "",
      "review_rating": "",
      "comment": ""
    },
    { headers: headers }
  )
  return response;
};
