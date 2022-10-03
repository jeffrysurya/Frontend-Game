import axios from "axios";

// export default function handler(req,res) {axios({
//   method: "post",
//   url: "http://127.0.0.1:4000/v1/auth/login",
//   data: {
//     email: "fake@example.com",
//     password: "password1",
//   },
// }).then((res) => {
//   console.log(res.data.tokens.access.token);
// }, (error) => {
//   console.log(error.data)
// })
// }

export default async function handler(req,res) {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:4000/v1/auth/login',
      data: {
        email: "fake@example.com",
        password: "password1",
      }
    })

    if (response.status === 200) {
      res.status(200).json({ token: response.data.tokens.access.token });
    }
    
  } catch (error) {
    return res.status(500).json({ error: 'Please check your email and password' })
    
  }
}

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }
