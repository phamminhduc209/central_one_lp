<header class="p-header">
	<div class="p-header__wrap">
        <div class="p-header__logo"><a href="<?= home_url ?>" class="hover"><img src="<?= path_url ?>assets/images/common/logo.svg" alt="CentralOne"></a></div>
        <div class="p-header__nav">
            <div class="nav">
                <ul class="nav-list">
                    <li class="nav-item"><a href="<?= home_url ?>service/" class="nav-link">Central Oneとは</a></li>
                    <li class="nav-item">
                        <a href="<?= home_url ?>functions/" class="nav-link">機能</a>
                        <ul class="nav-item__child">
                            <li><a href="<?= home_url ?>functions/#func01" class="hover anchor-link">クラウド統合管理</a></li>
                            <li><a href="<?= home_url ?>functions/#func02" class="hover anchor-link">Webアプリ統合管理</a></li>
                            <li><a href="<?= home_url ?>functions/#func03" class="hover anchor-link">ID・アクセス権限管理</a></li>
                            <li><a href="<?= home_url ?>functions/#func04" class="hover anchor-link">操作過程の完全記録</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a href="<?= home_url ?>usagescenes/" class="nav-link">活用シーン</a></li>
                    <li class="nav-item"><a href="<?= home_url ?>plan/" class="nav-link">料金プラン・サポート</a></li>
                    <!-- <li class="nav-item"><a href="<?= home_url ?>usagescenes/" class="nav-link">導入事例</a></li> -->
                    <li class="nav-item"><a href="<?= home_url ?>news/" class="nav-link">お知らせ</a></li>
                    <!-- <li class="nav-item"><a href="<?= home_url ?>seminar/" class="nav-link">セミナー・イベント</a></li> -->
                </ul>
            </div>
            <div class="action">
                <a href="<?= home_url ?>contact/" class="btn btn--primary btn--small">
                    <span class="btn__text d-none d-md-block">お問い合わせ</span>
                    <span class="btn__text d-md-none">お問い合わせ・ご相談はこちら</span>
                    <span class="btn__icon"><span class="btn__icon-inr"></span></span>
                </a>
                <a href="<?= home_url ?>apply/" class="btn btn--secondary btn--small">
                    <span class="btn__text d-none d-md-block">お申し込み</span>
                    <span class="btn__text d-md-none">導入のお申し込みはこちら</span>
                    <span class="btn__icon"><span class="btn__icon-inr"></span></span>
                </a>
            </div>
        </div>
        <div class="p-header__hamburger">
            <button class="menu-toggle js-menu-toggle">
                <div class="menu-toggle__dots">
                    <div class="menu-toggle__dot"></div>
                    <div class="menu-toggle__dot"></div>
                    <div class="menu-toggle__dot"></div>
                </div>
                <div class="menu-toggle__icon"></div>
            </button>
        </div>
    </div>
</header>