<template>
<b-row id="admin" class="p-0 mx-0">
  <b-col class="" cols='12'>
    <b-nav pills class=" justify-content-around">
    <b-nav-item to='/admin/orders' class="aa" exact exact-active-class='active'>訂單管理</b-nav-item>
    <b-nav-item to='/admin/products' class="aa" exact exact-active-class='active'>商品管理</b-nav-item>
  </b-nav>
  </b-col>
  <b-col class="" cols='12'>
    <router-view></router-view>
  </b-col>
</b-row>
</template>
