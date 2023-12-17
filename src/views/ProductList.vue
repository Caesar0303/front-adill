<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      }
      const response = await axios.get('/products',{ headers });
      this.products = response.data;
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
};
</script>

<template>
  <h2>Все объявления</h2>
  <div class="container mx-auto mt-0">
    <div class="cards flex flex-wrap justify-center">
      <div v-for="product in products" :key="product.id" class="w-30 overflow-hidden shadow-lg m-4 transition transform hover:-translate-y-1 hover:shadow-2xl">
        <img :src="'http://127.0.0.1:8000/' + product.image" alt="Product Image" class="product-image">
        <div class="cards px-6 py-2 bg-white">
            <br>
            <span class="font-bold text-xl mb-5 text-gray-800">{{ product.name }}</span>
            <br>
            <br>
            <p class="text-gray-700 text-base mb-4">
              Описание
              <br>
              {{ product.description }}
            </p>
            <p class="text-gray-700 text-base mb-4">
              Количество
              <br>
              {{ product.quantity }}
            </p>
            <p class="text-gray-700 text-base mb-4">
              Категория
              <br>
              {{ product.category.name }}
            </p>
          </div>
          <div class="px-2 py-2 bg-gradient-to-r from-blue-500 to-teal-400">
            Цена
            <br>
            <span class="price">{{ product.price }}
              </span>
          </div>
        <RouterLink :to="`/product/${product.id}/show`" class="custom-link">
          Посмотреть
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price {
  color: green;
}

.product-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  object-position: center;
}

.custom-link {
  background-color: #4299e1; /* Цвет фона */
  color: #ffffff; /* Цвет текста */
  font-weight: bold; /* Жирный текст */
  padding: 8px 16px; /* Отступы внутри ссылки */
  border-radius: 4px; /* Закругление углов */
  text-decoration: none; /* Убрать подчеркивание под ссылкой */
}

.custom-link:hover {
  background-color: #3182ce; /* Изменение цвета фона при наведении */
}

.cards > div {
  border-radius: 10px;
  border: 2px solid #94c3f1; /* добавляем границу */
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; /* плавный переход для трансформации, тени и цвета границы */
}

.cards > div:hover {
  transform: scale(1.05); /* немного увеличиваем размер */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* увеличиваем тень */
  border-color: #007bff; /* изменяем цвет границы при наведении */
}
</style>
