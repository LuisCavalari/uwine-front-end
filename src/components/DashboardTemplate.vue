<template>
  <div class="grid--area">
    <div class="sidebar">
      <ul class="sidebar--menu">
        <router-link class="link" to="/dashboard">
          <li class="menu--item">
            <menu-icon />
            <span>Home</span>
          </li>
        </router-link >
        <router-link class="link" to="/new-wine">
        <li class="menu--item">
          <plus-icon />
          <span>Adicionar Vinho</span>
        </li>
         </router-link>
        <li class="menu--item logout">
          <logout />
          <span>Sair</span>
        </li>
      </ul>
    </div>
    <div class="header">
      <h2>{{ this.title }}</h2>
      <div class="user--information">
        <span class="user--name">{{ user.name }}</span>
        <avatar :size="36" />
      </div>
    </div>
    <div class="content">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MenuIcon from 'vue-material-design-icons/Home';
import PlusIcon from 'vue-material-design-icons/Plus';
import Avatar from 'vue-material-design-icons/AccountCircle';
import Logout from 'vue-material-design-icons/Logout';

export default {
  name: 'DashboardTemplate',
  computed: mapState(['user']),
  mounted() {
    if (!this.$store.user) {
      this.$store.dispatch('getUser');
    }
  },
  components: {
    MenuIcon,
    PlusIcon,
    Avatar,
    Logout,
  },
  props: ['title'],
};
</script>

<style>
.grid--area {
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-template-rows: 80px calc(100vh - 80px);
  grid-template-areas:
    "sidebar header"
    "sidebar content";
}
.sidebar .sidebar--menu {
  list-style: none;
  height: calc(100% - 18px);
  position: relative;
}
.sidebar .sidebar--menu .menu--item {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  transition: color 0.15s linear;
}
.sidebar .sidebar--menu .menu--item:hover {
  color: #b352ba;
}
.sidebar .sidebar--menu .menu--item span {
  text-align: center;
  font-weight: bold;
}
.sidebar {
  grid-area: sidebar;
  background-color: #69306d;
}
.header {
  grid-area: header;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #999;
}
.header h2 {
  margin-left: 15px;
}
.content {
  grid-area: content;
  padding: 0 50px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.user--information {
  margin-right: 15px;
  display: flex;
  align-items: center;
}
.user--information .user--name {
  margin-right: 18px;
}
.logout {
  position: absolute;
  bottom: 15px;
  right: 40%;
}
</style>
