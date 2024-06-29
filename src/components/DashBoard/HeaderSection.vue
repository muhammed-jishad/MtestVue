<template>
    <div class="header">
      <div class="header__brand" :style="{ width: menuWidth + 'px' }">
        <div class="header__brand-logo"></div>
        <span class="header__brand-name">Admin</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      menuWidth: Number
    }
  };
  </script>
  