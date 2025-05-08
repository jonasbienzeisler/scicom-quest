<!-- src/App.vue -->
<template>
  <div id="app" class="app-wrapper">
    <router-view class="page-content" />
  </div>
</template>


<style>
/* 1) Full-height flex container */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* 2) Let the routed page grow, push footer to bottom */
.page-content {
  flex: 1;
  padding: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* 3) Footer styling */
.footer {
  text-align: center;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  background: white;
  max-width: 800px;
  margin: 0 auto;
}
</style>

