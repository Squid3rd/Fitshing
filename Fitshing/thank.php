
<!DOCTYPE html>
  <html lang="en">
  <?php include 'action.php' ?>
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
      />
      <link rel="stylesheet" href="style.css">
      <title>Success</title>
      <link rel="icon" type="images/x-icon" href="assets/logo.png" />
    </head>

    <body>
    <?php include 'Header.php'; ?>
        <section class="hero is-fullheight">
        <div class="columns hero-body is-centered is-fullheight">
      <div
        class="
          container
          is-flex is-justify-content-center is-align-items-center
        "
      >
        <div
          class="
            mt-6
            out
            is-flex is-justify-content-center is-align-items-center
          "
        >
          <p class="title is-1">Thank you for login</p>
        </div>
      </div>
      </div>
      </section>
      <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="./main.js">
  </script>
    </body>
    <?php include 'Footer.html'; ?>
  </html>

  <script>
    setTimeout(function(){location.href="login.php"} , 3000);   
  </script>