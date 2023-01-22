<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                      <button class="btn btn-primary" @click="getMessages">Yenile</button>
                    </div>

                    <div class="panel-body messages-area">
                      <message-component v-for="message in messages" :key="message.id" :message="message"/>
                    </div>
                    <div class="container-fluid action-area">
                      <div class="row">
                        <div class="col-md-8">
                          <input type="text" class="form-control" v-model="message">
                          <span class="pull-right">Mesaj uzunluğu: {{ message.length }}</span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-8" style="margin-top: 10px;">
                          <button class="btn btn-success pull-right" :disabled="checkMessageLength" @click="sendMessage">Gönder</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
          return {
            messages: [],
            message: '',
            errors: [],
          }
        },
        computed: {
            checkMessageLength(){
                return this.message.length < 10 ? true : false;
            }
        },
        methods: {
            sendMessage(){
                axios.post('/messages', {
                    text: this.message
                })
                    .then(response => {
                        this.getMessages()

                        this.$socket.emit('new_message', {
                          name: 'this.name',
                          message: this.message
                        });

                        this.message = ''
                    })
            },
            getMessages(){
                axios.get('/messages/all')
                    .then(response => {
                      console.log(response.data)
                        this.messages = response.data.data;
                    })
            }
        },
        sockets: {
          users(data) {
            // this.users = data;
            console.log('socket data: ', data)
          },
          messages(data) {
            // this.messages = data;
            console.log('socket messages: ', data)
            this.getMessages()
          }
        },
        mounted() {
            console.log('Component mounted.')

            this.getMessages();
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
