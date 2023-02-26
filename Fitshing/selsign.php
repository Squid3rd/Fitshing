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
                  <h1 class="is-size-3">Select Sign up</h1>
                </div>
              </div>
              

              <div class="field is-grouped is-grouped-centered pt-2">
                <a class="button is-medium is-primary is-rounded" href='Login.php'>Back</a>
                <span>
                  <a class="button is-medium is-danger is-rounded ml-5" href='SignT.php'>For Trainer</a>
                </span>
                <span>
                  <a class="button is-medium is-danger is-rounded ml-5" href='Sign.php'>For User</a>
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