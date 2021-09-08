<template>
  <header class="header">
    <div class="container">
      <nav>
        <router-link :to="{name: 'home'}">
          <h1 class="nav-logo">Home</h1>
        </router-link>
        <ul v-if="!user" class="nav-links">
          <li class="nav-item">
            <router-link :to="{name: 'login'}">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'register'}">Registration</router-link>
          </li>
        </ul>
        <div v-if="user" class="user-mail">User: {{user}}</div>
        <a href="javascript:void(0)" v-if="token" @click="logout" class="nav-item">Logout</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    token: {
      required: true
    },
    user: {
      required: true
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('tevian-token')
      localStorage.removeItem('tevian-user')
      this.$emit('login')
      this.$router.push('login')
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 30px;
}
ul {
  font-size: 24px;
  display: flex;
  flex-direction: row;
}
.nav-item {
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
}
</style>


