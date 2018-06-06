<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>PuttyImage</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt/>
        <my-footer/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MyFooter from '~/components/Footer';

export default {
  components: {
    MyFooter,
  },
};
</script>

<style>
.container
{
  margin: 0;
  width: 100%;
  padding: 0;
  text-align: center;
}

.content {
  padding-top: 56px !important;
}

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #000;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
