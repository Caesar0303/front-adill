<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {
        name: '',
        phone: '',
        description: '',
        quantity: 0,
        price: 0,
        category_id: '',  // предполагая, что у продукта есть свойство category_id
        // Другие свойства продукта
      },
      categories: []  // добавлен пустой массив для категорий
    };
  },
  beforeRouteEnter(to, from, next) {
    axios.get(`/product/${to.params.id}/edit`)
        .then(response => {
          next(vm => {
            vm.product = response.data.product;
            vm.categories = response.data.categories;
          });
        })
        .catch(error => {
          console.error('Ошибка при получении данных о продукте:', error);
        });
  },
  methods: {
    async submit() {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const productData = new FormData();
        productData.append('name', this.product.name);
        productData.append('phone', this.product.phone);
        productData.append('description', this.product.description);
        productData.append('quantity', this.product.quantity);
        productData.append('price', this.product.price);
        productData.append('category_id', this.product.category.id);

        if (this.image) {
          productData.append('image', this.image);
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post(`/product/${this.product.id}/update`, productData, { headers });
        if (response.status === 200) {
          console.log(response);
          window.location.href = '/products/my'
        }

        console.log('Product updated:', response.data);

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
  <h2>Редактировать объявление</h2>
  <div class="flex items-center h-screen bg-gray-100 mt-5">
    <div class="w-full max-w-lg p-5 mx-auto bg-white rounded-lg shadow">
      <form @submit.prevent="submit" class="mb-4" enctype="multipart/form-data">
        <!-- Выпадающий список для выбора категории -->
        <div class="mb-4">
          <img :src="'http://127.0.0.1:8000/' + product.image" alt="Product Image" class="product-image">
          <br>
          <br>
          <br>
          <br>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
            Категория
          </label>
          <br>
          <select v-model="product.category_id" class="block w-full bg-gray-200 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
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
          <input type="text" v-model="product.name" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <!-- Поле для номера телефона -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
            Номер телефона
          </label>
          <br>
          <input type="number" v-model="product.phone" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <!-- Поле для описания -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Описание
          </label>
          <br>
          <input type="text" v-model="product.description" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <!-- Поле для количества -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">
            Количество
          </label>
          <br>
          <input type="number" v-model="product.quantity" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <!-- Поле для цены -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
            Цена
          </label>
          <br>
          <input type="number" v-model="product.price" required class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
            Изменить изображение
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
.product-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  object-position: center;
}
</style>