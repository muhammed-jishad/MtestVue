<template>
    <div class="container">
      <div class="main">
        <h3>Enter your login credentials</h3>
        <form @submit.prevent="handleLogin">
          <label for="first">Username:</label>
          <input
            type="text"
            id="first"
            name="first"
            v-model="username"
            placeholder="Enter your Username"
            required
          />
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            placeholder="Enter your Password"
            required
          />
          <div class="wrap">
            <button type="submit">Submit</button>
          </div>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          const token = localStorage.getItem('token') || await this.fetchToken();
          const response = await axios({
            method: 'post',
            url: 'http://localhost/MTest/login',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-TEST-CLIENT-ID': 'test',
              'Authorization': `Bearer ${token}`
            },
            data: {
              serviceName: 'Login',
              param: {
                username: this.username,
                password: this.password
              }
            }
          });
  
          if (response.data && response.data.response && response.data.response.status === 200) {
            this.$router.push('/admin');
          } else {
            this.handleErrorResponse(response.data);
          }
        } catch (error) {
          console.error(error);
          this.errorMessage = 'An error occurred during login.';
        }
      },
      async fetchToken() {
        try {
          const response = await axios.post('http://localhost/MTest/oauth2/token', {
            client_id: 'test',
            client_secret: '00112233-test-4455-jishad-6677-jishad-8899-aabbccdtest',
            grant_type: 'client_credentials'
          }, {
            headers: {
              'content-type': 'application/json',
              'accept': 'application/json'
            }
          });
  
          const token = response.data.response.result.token;
          localStorage.setItem('token', token);
          return token;
        } catch (error) {
          console.error(error);
          this.errorMessage = 'An error occurred while fetching the token.';
          throw error;
        }
      },
      async handleErrorResponse(data) {
        if (data.error && data.error.status === 403) {
          const newToken = await this.fetchToken();
          console.log(newToken);
          this.handleLogin();
        } else if (data.response && data.response.status === 401) {
          this.errorMessage = 'Username or key is incorrect.';
        }
      }
    },
    async mounted() {
      if (!localStorage.getItem('token')) {
        await this.fetchToken();
      }
    }
  };
  </script>
  
  <style scoped>
  body, html {
    height: 100%;
    margin: 0;
    font-family: sans-serif;
    background: #f3f3f3;
  }
  
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  .main {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    width: 90%;
    max-width: 400px;
    text-align: center;
  }
  
  h3 {
    color: #4caf50;
  }
  
  label {
    display: block;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: left;
    color: #555;
    font-weight: bold;
  }
  
  input {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: none;
    color: white;
    cursor: pointer;
    background-color: #4caf50;
    width: 100%;
    font-size: 16px;
  }
  
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  