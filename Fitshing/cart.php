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
      <link rel="stylesheet" href="style.css" />
      <title>Cart</title>
      <link rel="icon" type="images/x-icon" href="assets/logo.png" />
    </head>

    <body>
    <?php include 'Header.php'; ?>
      <section class="hero is-fullheight">
        <div class="columns hero-body is-fullheight is-centered">
          <!-- <div class="box"> -->
            <div class="container p-4">
              <h1 class="subtitle is-3">รายการสินค้า</h1>
              <hr />
              <div
                style="position: absolute; left: 72.5%; top: 15%; width: 27.5%"
                class="has-background-light p-5 has-round"
              >
                <p class="subtitle is-5">สรุปบิล</p>
                <div class="columns">
                  <p class="column is-8">
                    OPTIMUM PLATINUM HYDROWHEY 100% Whey Protein Hydrolyzed -
                    3.5 Lbs
                  </p>
                  <p class="column is-1 is-offset-2">X2</p>
                </div>
                <div class="columns">
                  <p class="column is-7">ราคารวม</p>
                  <p class="column is-4 is-offset-2">5998 บาท</p>
                </div>
                <RouterLink to="/payment">
                  <a class="button is-success is-fullwidth" href='payment.php'>ซื้อ</a>
                </RouterLink>
              </div>
              <div class="columns" style="top: 50px">
                <div class="column is-2 has-background-light">
                  <img
                    src="https://image.makewebeasy.net/makeweb/0/k7p5FZEpV/AC/4.png?v=202012190947"
                    style="width: 150px; margin: 1em"
                    alt=""
                  />
                </div>
                <div class="column is-5 has-background-light">
                  <p class="subtitle is-5">
                    OPTIMUM PLATINUM HYDROWHEY 100% Whey Protein Hydrolyzed -
                    3.5 Lbs
                  </p>
                  <p>$2999</p>
                </div>
                <div class="column is-1">
                  <input type="number" style="width: 80%" min="1" value="1" />
                  <button
                    id="delete-button"
                    class="delete"
                    style="left: 110%; bottom: 21.5px"
                  ></button>
                </div>
                <div class="column is-1"></div>
              </div>
              <hr width="70%" />
              <div class="columns">
                <div class="column is-2 has-background-light">
                  <img
                    src="https://image.makewebeasy.net/makeweb/0/k7p5FZEpV/AC/4.png?v=202012190947"
                    style="width: 150px; margin: 1em"
                    alt=""
                  />
                </div>
                <div class="column is-5 has-background-light">
                  <p class="subtitle is-5">
                    OPTIMUM PLATINUM HYDROWHEY 100% Whey Protein Hydrolyzed -
                    3.5 Lbs
                  </p>
                  <p>$2999</p>
                </div>
                <div class="column is-1">
                  <input type="number" style="width: 80%" min="1" value="1" />
                  <button
                    id="delete-button"
                    class="delete"
                    style="left: 110%; bottom: 21.5px"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </section>
      <?php include 'Footer.html'; ?>
    </body>
  </html>
