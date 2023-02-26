<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- <link rel="icon" type="image/png" href="/logo.png"/> -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="main.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
    />
    <title>Header</title>
  </head>
  <body>
    <header class="header has-background-success">
      <div class="columns">
        <div class="column is-1"></div>
        <div class="column is-1">
          <a href="index.php">
            <img
              src="assets/logo.png"
              alt=""
              class="image is-96x96 has-text-centered m-3"
            />
          </a>
        </div>
        <div class="column is-2">
          <p class="is-size-1 has-text-left has-text-weight-semibold my-5">
            <span class="has-background-light p-1 is has-text-link">F</span
            >ishing
          </p>
        </div>
        <div class="column is-5"></div>
        <div class="column is-1">
          <a href="cart.php">
            <span class="icon has-text-info mt-6">
              <i class="fa fa-shopping-cart is-size-1 has-text-light"></i>
            </span>
          </a>
        </div>
        <div class="column is-1">
          <div class="columns mt-3">
            <div class="column is-7">
              <div
                class="navbar-item is-hoverable mt-3"
              >
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link"> More </a>

                  <div class="navbar-dropdown">
                    <a class="navbar-item" href="product.php"> All Product </a>
                    <a class="navbar-item"> Jobs </a>
                    <a class="navbar-item"> Contact </a>
                    <hr class="navbar-divider" />
                    <a class="navbar-item"> Report an issue </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-1"></div>
          </div>
        </div>
        <div class="column is-1">
          <a href="Login.php">
            <span class="icon has-text-info mt-6">
              <i class="fa fa-user is-size-1 has-text-info"></i>
            </span>
          </a>
        </div>
      </div>
    </header>
  </body>
</html>
