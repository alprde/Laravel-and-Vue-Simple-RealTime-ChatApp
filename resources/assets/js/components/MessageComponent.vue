<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 bg-primary message-area">
        <div style="flex: 1">{{ message.user.name }}</div>
        <div style="flex: 2">{{ message.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['message'],
    data: () => {
        return {

        }
    }
}
</script>

<style scoped>
.message-area {
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
