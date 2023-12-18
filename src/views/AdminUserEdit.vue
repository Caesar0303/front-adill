<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role ID</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role_id }}</td>
        <td>{{ formatDate(user.created_at) }}</td>
        <td>{{ formatDate(user.updated_at) }}</td>
        <td>
            <button @click="deleteCategory(user.id)">Удалить</button>
        </td>
        <td>
          <RouterLink :to='`/user/${user.id}/edit`' class="nav-link" active-class="active-link">
            Редактировать
          </RouterLink>
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
      users: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('/admin/users');
      this.users = response.data;
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async deleteCategory(userId) {
      if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        try {
          await axios.delete(`/user/${userId}/delete`);
          this.users = this.users.filter(cat => cat.id !== userId);
          alert('Пользователь удален');
        } catch (error) {
          console.error('Ошибка при удалении пользователя:', error);
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