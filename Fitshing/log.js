var login1 = new Vue({
  el: "#login1",
  data: {
    form1: {
      password: "",
      email: "",
      logtype: "",
    },
    enpass: false,
    enemail: false,
  },
  
  methods: {

    // checkvalid(){
    //     if(this.email.length == 0){
          
    //     }
    // },
    // submitForm() {
    //   // console.log("peter")
    //   alert("petre");
    // },
    onSubmit(event) {
      event.preventDefault()
      console.log(event)
    },
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return
      } else {
        alert("Email invalid!")
      }
    }
  },
  computed:{
    // check(){
    //   if(this.form1.email.length == 2){
    //     return enemail = true
    //   }
    //   if(this.form1.password.length == 2){
    //     return enpass = true
    //   }
    // }
  },
  watch:{
    email(value){
      this.email = value;
      this.validateEmail(value);
    }
  }
});
