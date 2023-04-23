<template>
  <div id="one">
    <button @click="show_edit = !show_edit" class="button is-size-4">+</button>
  </div>

  <div
    id="modal-rusure"
    class="modal"
    v-bind:class="{ 'is-active': show_edit }"
  >
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box proeditbackground p-6">
        <div
          class="columns"
          style="background-color: transparent; border-bottom: 3px solid white"
        >
          <div class="column has-text-left">
            <button class="buttom nonebackbutton">
              <a class="is-size-4" @click="show_edit = !show_edit">Cancel</a>
            </button>
          </div>
          <div class="column has-text-centered">
            <p class="is-size-3 has-text-white">Edit Profile</p>
          </div>
          <div class="column has-text-right">
            <button class="buttom nonebackbutton">
              <a class="is-size-4" @click="show_edit = !show_edit">Done</a>
            </button>
          </div>
        </div>
        <div class="columns p-6">
          <div class="column has-text-centered">
            <figure class="image is-128x128 is-inline-block">
              <img
                class="is-rounded"
                src="https://cdn.discordapp.com/attachments/1087447051387813909/1087617962984357918/Ellipse_7.png"
              />
            </figure>
            <div>
              <div class="column has-text-centered">
                <button class="buttom nonebackbutton">
                  <a class="is-size-4 has-text-white" @click="">Edit Picture</a>
                </button>
              </div>
            </div>
          </div>
          <div class="column">

            <div class="field">
              <div class="control">
                <input class="input" type="text" :value="fname" disabled />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  :value="lname" disabled
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  :value="phone" disabled
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Name"
                  :value="name"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Username"
                  :value="username"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <textarea class='textarea' name="bio" rows="4" cols="50" placeholder="Bio" :value="bio"></textarea>
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
    name: "admin1",
    data(){
        return {
      show_edit: false,
      fname: 'Peter',
      lname: 'Parker',
      phone: '999-999-9999',
      name: 'Mario',
      username: 'mario_maulao',
      bio: "Because I'm happy - Clap along if you feel like a room without a roof",
    };
    }
}
</script>

<style>

</style>