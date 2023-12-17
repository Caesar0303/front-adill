<script>
import axios from "axios";

export default {
  components: {
  },
  data() {
    return {
      name: '',
      phone: '',
      description: '',
      quantity: '',
      price: '',
      category: '',
      categories: [],
      image:null,
    };
  },
  async created() {
    try {
      const response = await axios.get('/product/create');
      this.categories = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  },
  methods: {
    async submit() {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const productData = {
          name: this.name,
          phone: this.phone,
          description: this.description,
          quantity: this.quantity,
          price: this.price,
          category: this.category,
          image: this.image,
        };

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post('/product/store', productData, { headers });
        if (response.status === 200) {
          console.log(response);
          window.location.href = '/products/my'
        }
        console.log('Product created:', response.data);
      } catch (error) {
        console.error("Ошибка при создании продукта:", error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        console.log('Выбран файл:', file);
        this.image = file;
      }
    }
  }
};
</script>

<template>
  <h2>Создание объявлений</h2>
  <div class="flex items-center h-screen bg-gray-100 mt-5">
    <div class="w-full max-w-lg p-5 mx-auto bg-white rounded-lg shadow">
      <form @submit.prevent="submit" class="mb-4" enctype="multipart/form-data">
        <!-- Выпадающий список для выбора категории -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
            Категория
          </label>
          <br>
          <select v-model="category" class="block w-full bg-gray-200 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
            <option disabled value="">Выберите категорию</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Поле для названия -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Название
          </label>
          <br>
          <input type="text" v-model="name" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <!-- Поле для номера телефона -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
            Номер телефона
          </label>
          <br>
          <input type="number" v-model="phone" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <!-- Поле для описания -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Описание
          </label>
          <br>
          <input type="text" v-model="description" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <!-- Поле для количества -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">
            Количество
          </label>
          <br>
          <input type="number" v-model="quantity" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <!-- Поле для цены -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
            Цена
          </label>
          <br>
          <input type="number" v-model="price" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
            Загрузить изображение
          </label>
          <br>
          <input type="file" @change="handleImageUpload" accept="image/*">
        </div>

        <!-- Кнопка отправки формы -->
        <div class="mt-6">
          <button class="w-full" type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>