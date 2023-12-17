<template>
  <div class="product-container">
    <h1 class="product-title">Информация о продукте</h1>
    <img :src="'http://127.0.0.1:8000/' + product.image" alt="Product Image" class="product-image">
    <div class="product-details">
      <p class="product-detail"><span class="detail-label">Название:</span> {{ product.name }}</p>
      <p class="product-detail"><span class="detail-label">Описание:</span> {{ product.description }}</p>
      <p class="product-detail"><span class="detail-label">Количество:</span> {{ product.quantity }}</p>
      <p class="product-detail"><span class="detail-label">Цена:</span> {{ product.price }}</p>
      <p class="product-detail"><span class="detail-label">Номер телефона:</span> {{ product.phone }}</p>
      <p class="product-detail"><span class="detail-label">Категория:</span> {{ product.category.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  background-color: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-container:hover {
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}

.product-title {
  text-align: center;
  color: #0056b3;
  margin-bottom: 20px;
  font-weight: 300;
}

.product-image {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 20px;
  border-radius: 10px;
}

.product-details {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
}

.product-detail {
  margin-bottom: 10px;
  padding: 8px;
  border-left: 4px solid #0056b3;
  background-color: #fff;
  transition: background-color 0.3s ease;
}

.product-detail:hover {
  background-color: #f0f0f0;
}

.detail-label {
  font-weight: bold;
  color: #0056b3;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        quantity: '',
        price: '',
        phone: '',
        category: { name: '' }
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    axios.get(`/product/${to.params.id}/show`)
        .then(response => {
          next(vm => {
            vm.product = response.data;
          });
        })
        .catch(error => {
          console.error('Ошибка при получении данных о продукте:', error);
        });
  },
};
</script>

