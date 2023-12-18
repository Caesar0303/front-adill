<template>
  <div>
    <form @submit.prevent="createCategory">
      <div>
        <label for="categoryName">Название категории:</label>
        <input id="categoryName" v-model="name" placeholder="Введите название категории" />
      </div>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: null,
    };
  },
  methods: {
    async createCategory() {
      try {
        const response = await axios.post(`/category/store`, {
          name: this.name
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
/* Стилизуйте форму по вашему вкусу */
form div {
  margin-bottom: 10px;
}
</style>