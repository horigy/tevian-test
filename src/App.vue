<template>
  <div id="app">

    <!-- wrapper -->
    <div class="wrapper">

      <!-- header component + login/logout -->
      <Header
        :user="user"
        :token="token"
        @login="getUser"
      />

      <!-- main content -->
      <div class="container">
        <router-view @login="getUser"></router-view>
      </div>

    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      token: null,
      user: null
    }
  },
  methods: {
    //check local storage for user token
    getUser() {
      this.token = localStorage.getItem('tevian-token')
      this.user = localStorage.getItem('tevian-user')
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style lang='scss'>
body {
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #1C8EF9;
  margin-top: 0;
  font-weight: 400;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  text-align: center;
}

* {
  box-sizing: border-box;
}

.container {
  width: 95%;
  max-width: 1280px;
  display: flex;
  margin: 0 auto;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
}

a {
  text-decoration: none;
}

.auth-wrapper {
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  margin: 40px auto;
  padding: 20px;
  font-size: 20px;
  border-radius: 10px;

  & h1 {
    font-size: 30px;
    font-weight: 600;
    text-transform: uppercase;

  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }

  & .form-item {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  & input {
    padding: 10px 20px;
    margin: 10px auto;
    display: inline-block;
    width: 95%;
    border: 1px solid black;
    border-radius: 5px;
  }

  & .errorText {
    font-size: 16px;
    color: red;
    margin-top: 5px;
  }

  & button {
    font-size: 20px;
    padding: 10px 20px;
    background: #1C8EF9;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
  }

  & .switch {
    font-size: 16px;
    margin-top: 20px;
    text-decoration: underline;
    text-decoration-style: dotted;
    color: gray;
  }
}
</style>
