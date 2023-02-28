<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
  <link rel="stylesheet" href="main.css" />
  <title>Payment</title>
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
</head>

<body>
  <?php include 'Header.php' ?>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-fullheight">
      <div class="
              container
              is-flex is-justify-content-center is-align-items-center
            ">
        <div class="mt-5 out is-centered">
          <div class="is-rounded inner">
            <form action="">
              <div class="information-user mt-5">
                <label for="Name" class="label">Name</label>
                <input type="text" class="input" style="width: 70%" disabled value="dhd" />
              </div>
              <div class="information-user">
                <label for="Phone" class="label">Phone</label>
                <input type="text" class="input" style="width: 70%" disabled value="segs" />
              </div>
              <div class="information-user">
                <label for="Address" class="label">Address</label>
                <textarea type="text" class="input" disabled></textarea>
              </div>
              <div class="information-user">
                <label for="Type of purchase" class="label">Type of purchase</label>
                <input type="text" class="input" style="width: 70%" />
              </div>
              <div class="buttons is-right mt-6">
                <a class="button button-payment" href='success.php'>ชำระเงิน</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <?php include 'Footer.html' ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="./main.js">
  </script>
</body>

</html>