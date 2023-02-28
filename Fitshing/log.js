var login1 = new Vue({
  el: "#login1",
  data: {
    form1: {
      password: "",
      email: "",
      logtype: "",
      enpass: 'test1',
      enemail: 'test1',
    },
  },
  // validations() {
  //   return {
  //     password: { required },
  //     email: { required },
  //     logtype: { required },
  //   };
  // },
  methods: {
    checkvalid(){
        if(this.email.length == 0){
          
        }
    },
    submitForm() {
      // console.log("peter")
      alert("petre");
    },
  },
});
