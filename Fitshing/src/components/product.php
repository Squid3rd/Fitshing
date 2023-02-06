<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
        .product {
            padding: 2em;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1em;
        }

        .product_items {
            cursor: grab;
            padding: 1em;
        }

        .product_items {
            cursor: grab;
        }

        .product-img {
            width: 100%;
            height: 150px;
            object-fit: contain;
            border-radius: 10px;
        }
    </style>
    <title>Document</title>
</head>

<body>
    <!-- ไิอลิงค์เชื่อมนี่เชื่อมไว้ก่อนเฉยๆ -->
    <div class="container" style="max-width: 60%;">
        <form action="">
            <select name="sort" id="sort" class="button">
                <option value="01">บลา1</option>
                <option value="02">บลา2</option>
                <option value="03">บลา3</option>
            </select>
        </form>
        <?php
        echo '<div class="product">';
        for ($k = 0; $k < 10; $k++) {
            echo '<div class="card product_items ">
                        <a href="cart.html"><img class="product-img" src="https://m.media-amazon.com/images/I/61bwq9ljJOL._AC_UF1000,1000_QL80_.jpg" alt=""></a>
                        <p class="title is-6 m-3">OPTIMUM PLATINUM HYDROWHEY 100% Whey Protein Hydrolyzed - 3.5 Lbs</p>
                        <p class="subtitle is-6 m-3">$100</p>
                        <div class="buttons is-centered">
                            <a href="cart.html"><button class="button is-success">ซื้อ</button></a>
                        </div>
                    </div></a>';
        }
        echo '</div>';
        // for($k=0;$k<4;$k++){
        //     echo '<div class="columns">';
        //     for($i=0;$i<4;$i++){
        //         echo '<div class="m-2 card column is-3 ">
        //                 <div class="">
        //                     <figure style="display:flex; justify-content: center; align-items: center;">
        //                         <img src="https://m.media-amazon.com/images/I/61bwq9ljJOL._AC_UF1000,1000_QL80_.jpg" style="width:auto; height: 250px; " alt="">
        //                     </figure>
        //                 </div>
        //         <div class="card-content">
        //             <div class="media">
        //                 <div class="media-content">
        //                 <p class="title is-6">OPTIMUM PLATINUM HYDROWHEY 100% Whey Protein Hydrolyzed - 3.5 Lbs</p>
        //                 <p class="subtitle is-6">$2999</p>
        //                 </div>
        //             </div>
        //             <div class="buttons is-centered">
        //                 <button class="button is-success">สั่งซื้อ</button>
        //             </div>
        //         </div>
        //     </div>';
        //     }
        //     echo '</div>';
        // }
        ?>

    </div>
</body>

</html>