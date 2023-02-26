<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <title>SignUp (User)</title>
      <link rel="icon" type="images/x-icon" href="assets/logo.png" />
    </head>
    <body>
    <?php include 'Header.php'; ?>
      <section class="hero is-fullheight">
        <div class="columns hero-body is-centered is-fullheight">
          <div class="column is-half">
            <form class="box p-5 m-5">
              <div class="box has-background-danger has-text-info-light">
                <div class="field is-grouped is-grouped-left">
                  <h1 class="is-size-3">SIGN UP (USER)</h1>
                </div>
              </div>
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Username"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Firstname</label>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Firstname"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Lastname</label>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Lastname"
                  />
                </div>
              </div>

              <div class="field is-horizontal">
                <div class="column is-half">
                  <label class="label">Weight</label>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Weight"
                  />
                </div>
                </div>
                <div class="column is-half">
                  <label class="label">Height</label>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Height"
                  />
                </div>
                </div>
              </div>

              <div class="field">
                <label class="label">Address</label>
                <div class="control">
                  <textarea class="textarea is-rounded" placeholder="Adress"></textarea>
                </div>
              </div>

              <div class="field">
                <label class="label">Phone</label>
                <div class="control">
                  <input
                    class="input is-rounded"
                    type="input"
                    placeholder="Phone"
                  />
                </div>
              </div>

              <div class="field is-grouped is-grouped-right pt-2">
                <a class="button is-danger is-rounded" href='selsign.php'>Back</a>
                <span>
                  <RouterLink to="/">
                    <button class="button is-success is-rounded ml-5">Submit</button>
                  </RouterLink>
                </span>
              </div>
              <!-- <button class="button is-primary">Sign in</button> -->
            </form>
          </div>
        </div>
      </section>
      <?php include 'Footer.html'; ?>
    </body>
  </html>