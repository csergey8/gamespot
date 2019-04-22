<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>
          Title
        </md-table-head>
        <md-table-head>
          Description
        </md-table-head>
        <md-table-head>
          Rating
        </md-table-head>
        <md-table-head>
          Action
        </md-table-head>
      </md-table-row>

      <md-table-row v-for="(post, i) in posts" :key="i">
        <md-table-cell>{{ post.title }}</md-table-cell>
        <md-table-cell>{{ post.desc }}</md-table-cell>
        <md-table-cell>{{ post.rating }}</md-table-cell>
        <md-table-cell>
          <div 
            class="post_delete"
            @click="deleteHandler(post.id)"
          >


          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      let posts = this.$store.getters['admin/getAdminPosts'];
      console.log(posts);
      return posts;
    }
  },
  methods: {
    deleteHandler(id) {
      
    }
  },
  created() {
    this.$store.dispatch('admin/getAdminPosts');
  }
}
</script>
