<!DOCTYPE html>
<html lang="en">
<?php include 'action.php' ?>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  <link rel="icon" type="images/x-icon" href="assets/logo.png" />
  <title>User</title>
  <link rel="stylesheet" href="style.css">
  <style>
    img {
      margin: 2em;
      width: 100%;
      border-radius: 100%;
    }

    .name {
      margin: 60px;
    }

    .link {
      position: relative;
      left: 40%;
      bottom: 30px;
      color: gold;
    }
  </style>
</head>

<body>
  <?php include 'Header.php'; ?>
  <section class="hero is-fullheight">
    <div class="columns hero-body is-fullheight">
      <div class="container" style="width: 50%;">
        <section class=" is-large has-background-danger" style="border-radius: 1em;">
          <div class="columns p-5">
            <div class="column is-3">
              <img
                src="https://img.freepik.com/free-vector/cute-koala-lay-pillow-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-5484.jpg?w=2000"
                alt="">
              <a href="" class="subtitle is-4 link"><u>Subscribe</u></a>
            </div>
            <div class="column is-9 is-offset-1 name">
              <div class="field">
                <label class="label">FirstName</label>
                <span class="label" style="position: absolute; left: 65%; top: 75px;">LastName</span>
                <div class="control">
                  <input class="input  title is-6" id="FirstName" type="text" style="width: 42%;" value="Jeerawat"
                    readonly>
                  <input class="input title is-6" id="LastName" type="text" style="width: 42%;" value="Maiwai" readonly>
                </div>
                <label class="label">Email</label>
                <div class="control">
                  <input class="input title is-6 Email" id="Email" type="text" style="width: 84.5%;"
                    value="EXample@gmail.ac.ad.to.th" readonly>
                </div>
              </div>
              <div class="field">
                <label class="label">Address</label>
                <div class="control">
                  <textarea class="" style="border: 0; border-radius: 0.4em;" name="Address" id="Address" cols="90"
                    rows="10"></textarea>
                </div>
              </div>
              <!-- <div class="field">
                <label class="label">Co_op</label>
                <div class="control">
                  <textarea class="" style="border: 0; border-radius: 0.4em;" name="Address" id="Address" cols="90"
                    rows="5"></textarea>
                </div>
              </div> -->
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
  <?php include 'Footer.html'; ?>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="./main.js">
  </script>
</body>

</html>