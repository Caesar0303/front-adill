<template>
  <nav class="header navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ul-nav">
<!--          <li class="nav-item">-->
<!--            <RouterLink :to="'/'" class="nav-link">Home</RouterLink>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <RouterLink :to="'/users'" class="nav-link">Users</RouterLink>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <RouterLink :to="'/posts'" class="nav-link">Posts</RouterLink>-->
<!--          </li>-->
          <li class="nav-item">
            <RouterLink :to="'/products'" class="nav-link" active-class="active-link">Все объявления</RouterLink>
          </li>
          <li class="nav-item" v-if="role === 1 || role === 3">
            <RouterLink :to="'/products/my'" class="nav-link" active-class="active-link">Мои объявление</RouterLink>
          </li>
          <li class="nav-item" v-if="role === 2 || role === 3">
            <RouterLink :to="'/admin/users'" class="nav-link">Редактирование пользователей</RouterLink>
          </li>
          <li class="nav-item" v-if="role === 2 || role === 3">
            <RouterLink :to="'/admin/categories'" class="nav-link">Редактирование категорий</RouterLink>
          </li>
          <li class="nav-item" v-if="role === 1 || role === 3">
            <RouterLink :to="'/product/create'" class="nav-link" active-class="active-link">Создание объявление</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/login'" class="nav-link">log out</RouterLink>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome Nurkhan! How are you?" text="Let's make new code"/>-->
  <!--  <PostsData/>-->
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // PostsData
  },
  computed: {
    role() {
      return this.getUserRoleId();
    }
  },
  methods: {
    parseJwt(token) {
      try {
        const base64Url = token.split('.')[1]; // Получаем Payload
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(payload);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    },
    getUserRoleId() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = this.parseJwt(token);
        console.log(decoded.role_id);
        return decoded.role_id; // Получаем role_id из токена
      }
      return null;
    }
  }
}
</script>

<style>
.header {
  display: flex !important;
  flex-basis: auto;
  justify-content: flex-end;
  flex-direction: row;
}

.navbar-expand-lg .navbar-collapse {
  display: flex !important;
  flex-basis: auto;
  justify-content: flex-end;
}

.ul-nav {
  display: flex;
  gap: 40px;
  margin-right: 150px;
  padding: 20px 0 10px;
  justify-content: flex-end;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}</style>
