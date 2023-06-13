import axios from "axios"
const API_URL = "https://nursery-verient-live.onrender.com";

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


