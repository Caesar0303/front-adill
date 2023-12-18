<template>
  <div>
    <h2>Редактирование пользователя</h2>
    <form @submit.prevent="updateRole">
        <label for="role_id">Роль:</label>
        <select id="role_id" v-model="role_id">
          <option :value="1">Пользователь</option>
          <option :value="2">Админ</option>
        </select>
      <button type="submit">Сохранить изменения</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
      role_id: null,
    };
  },
  async created() {
    try {
      const userId = this.$route.params.id;
      const response = await axios.get(`/user/${userId}/edit`);
      this.user = response.data;
      this.role_id = this.user.role_id;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    async updateRole() {
      try {
        const userId = this.$route.params.id;
        const response = await axios.post(`/user/${userId}/update`, {
          role_id: this.role_id
        });
        console.log(response);
        alert('Роль пользователя обновлена');
      } catch (error) {
        console.error('Error updating user role:', error);
        alert('Ошибка при обновлении роли пользователя');
      }
    }
  }
};
</script>

<style scoped>
/* Добавьте здесь свои стили */
form {
  /* Стили формы */
}
form div {
  margin-bottom: 15px;
}
label {
  /* Стили для меток */
}
input, button {
  /* Стили для полей ввода и кнопок */
}
</style>