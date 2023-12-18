<template>
  <div>
    <RouterLink :to='`/category/create`' class="nav-link" active-class="active-link">
      Добавить категорию
    </RouterLink>
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.id">
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td>
          <button @click="deleteCategory(category.id)">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('/admin/categories');
      this.categories = response.data;
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  methods: {
    async deleteCategory(categoryId) {
      if (confirm('Вы уверены, что хотите удалить эту категорию?')) {
        try {
          await axios.delete(`/category/${categoryId}/delete`);
          this.categories = this.categories.filter(cat => cat.id !== categoryId);
          alert('Категория удалена');
        } catch (error) {
          console.error('Ошибка при удалении категории:', error);
        }
      }
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>