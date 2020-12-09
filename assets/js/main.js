let mainSlide = document.querySelector('.mainSlide');
let slide = document.querySelector('.slide');
let slideLi = slide.querySelector('li');
let slideLis = slide.querySelectorAll('li');
let slideLiLast = slideLis.length - 1;
let slideImgs = slide.querySelectorAll('.slideImg');
let paging = document.querySelector('.paging');
let timeBar = document.querySelector('.timeBar');
let btnSlide = document.querySelector('.btnSlide');
let btnIconPrev = document.querySelector('.mainSlide .btnIconPrev');
let btnIconNext = document.querySelector('.mainSlide .btnIconNext');
let btnIconStop = document.querySelector('.mainSlide .btnIconStop');
let productList = document.querySelectorAll('.productList');
let listSlides = document.querySelectorAll('.listSlide');
let bannerSlides = document.querySelectorAll('.bannerSlide');
let crrentSlide;
let autoStart;

let btnTurnSet = document.querySelectorAll('.btnTurnSet');
let listSlideBtnSet = document.querySelectorAll('.listSlide .btnTurnSet');

let serchBox = document.querySelector('.serchBox');

let btnIconGotoTop = document.querySelector('.btnIconGotoTop');
let currentScroll;

window.addEventListener('scroll', onScrollCheck)
btnIconGotoTop.addEventListener('click', onGotoTop);
mainSlide.addEventListener('click', onMainSlide);
serchBox.addEventListener('click', onSerch);

function slideSetting() {
    slideLi.classList.add('on');
    crrentSlide = slideLi
}
slideSetting();

function slidOn(on) {
    crrentSlide.classList.remove('on');
    on.classList.add('on')
    crrentSlide = on
}

function pagingNow(onPage) {
    let liArray = Array.from(slideLis);
    let onNumber = liArray.indexOf(crrentSlide);
    onPage.innerText = `${onNumber + 1}`;
}

function slidePaging() {
    let creatSpan = document.createElement('span');
    let creatEm = document.createElement('em');

    paging.appendChild(creatEm);
    creatEm.classList.add('now');
    pagingNow(creatEm);

    paging.appendChild(creatSpan);
    creatSpan.classList.add('all');
    creatSpan.innerText = ` / ${slideLis.length}`
}
slidePaging()

function timebarAction() {
    let timebarClass = timeBar.getAttribute('class');

    if (timebarClass === 'timeBar') {
        timeBar.classList.add('on')
    } else {
        timeBar.classList.remove('on')
    }
}
timebarAction()

function timeBarStop() {
    timeBar.classList.remove('on')
}

function btnIconPrevAction(list) {
    let last = slide.lastElementChild;
    if (slideLi && list === undefined || list === null) {
        slidOn(last)
        return
    }
    slidOn(list)
}

function btnIconNextAction(list) {
    if (slideLiLast && list === undefined || list === null) {
        slidOn(slideLi)
        return
    }
    slidOn(list)
}

function btnIconStopAction(button) {
    let btnClass = button.getAttribute('class');

    if (btnClass === 'btnIconStop') {
        button.classList.add('play');
        clearInterval(autoStart);
        timebarAction()
    } else {
        button.classList.remove('play');
        autoStart = setInterval(autoPlay, 7000);
        timebarAction()
    }
}

let pageNow = paging.querySelector(".now")
autoStart = setInterval(autoPlay, 7000);
function autoPlay() {
    let next = crrentSlide.nextElementSibling;
    btnIconNextAction(next);
    pagingNow(pageNow);
    timeBar.classList.add('on');
}

mainSlide.addEventListener('keydown', keyControl);
function keyControl(e) {
    let keyCheck = e.key;
    let keyFocus = e.target;
    let keyFocusParent = keyFocus.parentNode;
    let prev = keyFocus.previousElementSibling;
    let next = keyFocus.nextElementSibling;
    let nextOn = keyFocusParent.nextElementSibling;

    if (keyCheck === 'Tab' && keyFocus.tagName === 'A' && nextOn) {
        slidOn(nextOn)
        pagingNow(pageNow)
        timeBarStop()
    }

    if (keyCheck === 'ArrowLeft' && keyFocus.tagName === 'BUTTON' && prev) {
        prev.focus()
    } else if (keyCheck === 'ArrowRight' && keyFocus.tagName === 'BUTTON' && next) {
        next.focus()
    }
}

function onMainSlide(e) {
    let clickTarget = e.target;

    if (clickTarget === btnIconPrev) {
        let prev = crrentSlide.previousElementSibling;
        btnIconPrevAction(prev)
        timeBarStop()
    } else if (clickTarget === btnIconNext) {
        let next = crrentSlide.nextElementSibling;
        btnIconNextAction(next)
        timeBarStop()
    } else if (clickTarget === btnIconStop) {
        btnIconStopAction(btnIconStop)
    }
    pagingNow(pageNow)
}

for (let i = 0; productList.length > i; i++) {
    productList[i].addEventListener('click', onLike);
}
function onLike(e) {
    let like = e.target;
    let likeData = like.getAttribute('class');
    if (likeData === 'btnIconLike on') {
        like.classList.remove('on')
        like.textContent = "좋아요 체크하기";
    } else if (likeData === 'btnIconLike') {
        like.classList.add('on')
        like.textContent = "좋아요 해제하기";
    }
}

for (let i = 0; listSlideBtnSet.length > i; i++) {
    let setbtnIconPrev = listSlideBtnSet[i].querySelector('.btnIconPrev');
    setbtnIconPrev.classList.add('off');

    listSlideBtnSet[i].addEventListener('click', onListSlides);
}
function onListSlides(e) {
    let clickTarget = e.target;
    let topParent = clickTarget.parentNode.parentNode;
    let targetClass = clickTarget.getAttribute('class');
    let targrtUl = topParent.querySelector('ul');
    let targrtLi = topParent.querySelector('ul li');
    let targrtUlwidth = targrtUl.querySelectorAll('li');
    let widthLi = targrtLi.offsetWidth;
    let widthLiAll = widthLi * targrtUlwidth.length;
    let width = topParent.offsetWidth;
    let maxWidth = widthLiAll - width;
    let translateX = targrtUl.style.transform;
    let translateXValue = translateX.replace(/[^0-9]/g, '');
    let translatexValueNumber = Number(translateXValue);
    let setPrev = clickTarget.previousElementSibling;
    let setNext = clickTarget.nextElementSibling;


    if (clickTarget.tagName === 'BUTTON' && targetClass === 'btnIconPrev' && 0 <= translatexValueNumber) {
        let setNextClass = setNext.getAttribute('class');
        setNextClass === 'btnIconNext off' && setNext.classList.remove('off');

        targetTranslateX = translatexValueNumber - width - 16;
        targrtUl.style.transform = `translateX(-${targetTranslateX}px)`;
        targetTranslateX === 0 && clickTarget.classList.add('off');
    } else if (clickTarget.tagName === 'BUTTON' && targetClass === 'btnIconNext' && maxWidth > translatexValueNumber) {
        let setPrevClass = setPrev.getAttribute('class');
        setPrevClass === 'btnIconPrev off' && setPrev.classList.remove('off');

        targetTranslateX = translatexValueNumber + width + 16;
        targrtUl.style.transform = `translateX(-${targetTranslateX}px)`;
        maxWidth < targetTranslateX && clickTarget.classList.add('off');
    } else {
        return
    }
}

for (let i = 0; bannerSlides.length > i; i++) {
    let setbtnIconPrev = bannerSlides[i].querySelector('.btnIconPrev');
    setbtnIconPrev.classList.add('off');

    bannerSlides[i].addEventListener('click', onBannerSlides);
}
// function bannerSlidesCount(){
//     let slideCount = bannerSlides.length;
// }
// function bannerSlidesOuto(){
//     let slideCount = bannerSlides.length;
// }
function onBannerSlides(e) {
    let clickTarget = e.target;
    let topParent = clickTarget.parentNode.parentNode;
    let targetClass = clickTarget.getAttribute('class');
    let targrtUl = topParent.querySelector('ul');
    let targrtLi = topParent.querySelector('ul li');
    let targrtUlwidth = targrtUl.querySelectorAll('li');
    let widthLi = targrtLi.offsetWidth;
    let widthLiAll = widthLi * targrtUlwidth.length;
    let width = topParent.offsetWidth;
    let maxWidth = widthLiAll - width;
    let translateX = targrtUl.style.transform;
    let translateXValue = translateX.replace(/[^0-9]/g, '');
    let translatexValueNumber = Number(translateXValue);
    let setPrev = clickTarget.previousElementSibling;
    let setNext = clickTarget.nextElementSibling;

    if (clickTarget.tagName === 'BUTTON' && targetClass === 'btnIconPrev' && 0 <= translatexValueNumber) {
        let setNextClass = setNext.getAttribute('class');
        setNextClass === 'btnIconNext off' && setNext.classList.remove('off');

        targetTranslateX = translatexValueNumber - width;
        targrtUl.style.transform = `translateX(-${targetTranslateX}px)`
        targetTranslateX === 0 && clickTarget.classList.add('off');
    } else if (clickTarget.tagName === 'BUTTON' && targetClass === 'btnIconNext' && maxWidth > translatexValueNumber) {
        let setPrevClass = setPrev.getAttribute('class');
        setPrevClass === 'btnIconPrev off' && setPrev.classList.remove('off');

        targetTranslateX = translatexValueNumber + width;
        targrtUl.style.transform = `translateX(-${targetTranslateX}px)`;
        maxWidth === targetTranslateX && clickTarget.classList.add('off');
    } else {
        return
    }
}

function onSerch(e) {
    let serchBtn = e.target;
    let serchBoxClass = serchBtn.getAttribute('class');

    if (serchBoxClass === 'btnIconSerchOn') {
        serchBox.classList.add('on')
    } else if (serchBoxClass === 'btnIconClose') {
        serchBox.classList.remove('on')
    }
}

function onGotoTop() {
    window.scrollTo(0, 0);
}

function onScrollCheck() {
    let scrollPosition = document.documentElement.scrollTop;

    if (scrollPosition < currentScroll && scrollPosition !== 0) {
        btnIconGotoTop.classList.add('on');
    } else {
        btnIconGotoTop.classList.remove('on');
    }
    currentScroll = scrollPosition
}
