|Selector|Example|description|
|:-:|:-:|:-:|
|.class|.intro|introクラス属性を持つ要素すべてを選択します|
|[hogehoge]:not([hogehoge="hogehogeValue"])|[data-module-id]:not([data-module-id="articleText"])|data-module-id属性を持つ要素のうちdata-module-id属性の値がarticleTextでない要素すべてを選択します|
|.class:not([class^="classNamePrefix"]):not([class*="classNameKeyword"])|.signUp:not([class^="background"]):not([class*=" background"])|signUpクラスを持つ要素のうちclass属性の接頭辞がbackgroundでないかつclass属性の値にbackgroundが含まれない要素すべてを選択します|
