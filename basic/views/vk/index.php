<?php

/* @var $this yii\web\View */

$this->title = 'Items';
?>
<div class="site-index">
    <?php //echo $_GET['api_result'] ?>
    <div class="row goods-row" style="text-align:center">
        <div class="col-sm-4">
            <p><img class="goods" src="<?= \yii\helpers\Url::to('@web/images/goods-1.jpg') ?>" alt=""></p>
            <p>
                <button class="btn btn-primary btn-buy">Купить в кредит</button>
            </p>
        </div>
        <div class="col-sm-4">
            <p>
                <img class="goods" src="<?= \yii\helpers\Url::to('@web/images/goods-2.jpg') ?>" alt="">
            </p>
            <p>
                <button class="btn btn-primary btn-buy">Купить в кредит</button>
            </p>
        </div>
        <div class="col-sm-4">
            <p><img class="goods" src="<?= \yii\helpers\Url::to('@web/images/goods-3.jpg') ?>" alt="">
            </p>
            <p>
                <button class="btn btn-primary btn-buy">Купить в кредит</button>
            </p>
        </div>
    </div>
</div>

<style>
    .goods {
        width: 100%;
        max-width: 350px;
    }
</style>

<script>
    $('.btn-buy').click(function () {
        // todo check is web3 exists - if not exists block buttons
        // todo web3 call contract
    });
</script>