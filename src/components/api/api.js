import axios from "axios"
const API_URL = "https://nursery-verient-live.onrender.com";
let Token = localStorage.getItem("token");
const headers = {
  'Content-Type': 'application/json',
  'user_token': `${Token}`
}

/*Api for user login */
export const UserLogin = async (props) => {
  console.log(props)
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
  console.log(props)
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
  console.log(props)
  const response = await axios.post(`${API_URL}/user_otp_verify `,
    {
      email: props.email,
      otp: props.otp,
    }
  );
  return response.data;
};

/*Api for user Singin */
export const ChangeUserPassword = async (props) => {
  console.log(props)
  const response = axios.post(`${API_URL}/user_forgate_password_update`,
  { password : props.conf_password}, 
  { headers: headers }
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
  console.log(props)
  let image_file = props.image ;
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
  const response = axios.put(`${API_URL}/update_user`, formData , { headers: headers })
return response.data;
};


