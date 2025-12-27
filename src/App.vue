<script setup lang="ts"></script>

<template>
  <v-app>
    <v-app-bar elevation="0" color="transparent" class="px-4">
      <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn variant="text" color="indigo-darken-1" class="mx-2">Status</v-btn>
      <v-btn variant="text" color="pink" class="mx-2">Admin</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped></style>
