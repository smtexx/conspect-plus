export const sampleToParse = `
##_H Заголовок ##_/H
##_S Подзаголовок ##_/S

##_P
  А здесь просто параграф текста
##_/P

##_P 
  А тут параграф с разными видами текстового содержимого. Например
  текст выделенный ##_B Жирный текст ##_/B, или текст написаный
  ##_I курсивом ##_/I, ну и конечно ##_M маркированный текст ##_/M. 
  Как то так. А вот и текстовая ссылка ##_A Яндекс (https://ya.ru)##_/A
##_/P

##_W
  Текстовое предупреждение, очень страшное текстовое предупреждение
##_/W

##_U
##_L Пункт первый ##_/L
##_L Пункт второй ##_/L
##_L Пункт третий ##_/L
##_/U

##_O
##_L Пункт один ##_/L
##_L Пункт два ##_/L
##_L Пункт три ##_/L
##_/O

##_C
let a = true;  
##_T Создаем переменную ##_/T
if(a) {
  ##_T Если значение true - уходим в лес ##_/T
  goAway();
}
##_/C

##_C
<header class="entry-header" aria-label="Содержимое">
<h1 class="entry-title" itemprop="headline">Экранирование спец. символов HTML</h1>
##_T Главный заголовок страницы ##_/T
  <div class="entry-meta">
    <span class="posted-on">
      <time  
        class="entry-date published" 
        datetime="2023-06-14T08:36:25+03:00" 
        itemprop="datePublished"
      >
        14.06.2023
      </time>
    </span>
  </div>
</header>
##_/C

##_R Что такое mvc? (https://ru.wikipedia.org/wiki/Model-View-Controller)##_/R
`;
