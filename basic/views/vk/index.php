<?php

/* @var $this yii\web\View */

use yii\helpers\Url;
use kartik\spinner\Spinner;

$this->title = 'Items';
?>
<div class="site-index">
    <?php //echo $_GET['api_result'] ?>
    <div class="row web3-load text-center">
        <h1>Ожидание подключения к Metamask для работы с Ethereum</h1>
        <p>Пожалуйста, для работы с сайтом используйте Google Chrome, а еще установите Metamask</p>
        <div class="text-center">
            <?= Spinner::widget([
                'preset' => Spinner::LARGE,
                'color' => 'grey',
                'align' => 'center'
            ]) ?>
        </div>
        <a target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
            <img src="<?= Url::to('@web/images/metamask.png') ?>" alt="">
        </a>

    </div>
    <div class="row goods-row hide text-center">
        <div class="col-sm-4">
            <p><img class="goods" src="<?= Url::to('@web/images/goods-1.jpg') ?>" alt=""></p>
            <p>
                <button class="btn btn-primary btn-buy ">Купить в кредит за ETH</button>
            </p>
        </div>
        <div class="col-sm-4">
            <p>
                <img class="goods" src="<?= Url::to('@web/images/goods-2.jpg') ?>" alt="">
            </p>
            <p>
                <button class="btn btn-primary btn-buy ">Купить в кредит за ETH</button>
            </p>
        </div>
        <div class="col-sm-4">
            <p><img class="goods" src="<?= Url::to('@web/images/goods-3.jpg') ?>" alt="">
            </p>
            <p>
                <button class="btn btn-primary btn-buy ">Купить в кредит за ETH</button>
            </p>
        </div>
    </div>
</div>