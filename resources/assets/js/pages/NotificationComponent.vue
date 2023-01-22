<template>

</template>

<script>
    export default {
        mounted() {
          this.$socket.emit('new_message', {
            name: 'System',
            message: this.message
          });
        }
    }
</script>

<style scoped>
.messages-area {
  height: 500px;
  overflow-y: auto;
  border-bottom: 1px solid #d3e0e9;
  margin-bottom: 10px;
}

.action-area {
  margin-bottom: 10px;
}
</style>
