let mainSlide = document.querySelector('.mainSlide');
let slide = document.querySelector('.slide');
let slideLi = slide.querySelector('li');
let slideLis = slide.querySelectorAll('li');
let slideLiLast = slideLis.length - 1;
let slideImgs = slide.querySelectorAll('.slideImg');
let paging = document.querySelector('.paging');
let timeBar = document.querySelector('.timeBar');
let btnSlide = document.querySelector('.btnSlide');
let btnPrev = document.querySelector('.mainSlide .btnPrev');
let btnNext = document.querySelector('.mainSlide .btnNext');
let btnStop = document.querySelector('.mainSlide .btnStop');
let productList = document.querySelectorAll('.productList');
let leftListSlides = document.querySelectorAll('.leftListSlide');
let leftListSlide = document.querySelector('.leftListSlide');
let crrentSlide;
let autoStart;

let btnTurnSet = document.querySelectorAll('.btnTurnSet');

let serchBox = document.querySelector('.serchBox');

let btnGotoTop = document.querySelector('.btnGotoTop');
let currentScroll;

window.addEventListener('scroll', onScrollCheck)
btnGotoTop.addEventListener('click', onGotoTop);
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

function btnPrevAction(list) {
    let last = slide.lastElementChild;
    if (slideLi && list === undefined || list === null) {
        slidOn(last)
        return
    }
    slidOn(list)
}

function btnNextAction(list) {
    if (slideLiLast && list === undefined || list === null) {
        slidOn(slideLi)
        return
    }
    slidOn(list)
}

function btnStopAction(button) {
    let btnClass = button.getAttribute('class');

    if (btnClass === 'btnStop') {
        button.classList.add('play');
        clearInterval(autoStart);
        timebarAction()
    } else {
        button.classList.remove('play');
        autoStart = setInterval(autoPlay, 5000);
        timebarAction()
    }
}

let pageNow = paging.querySelector(".now")
autoStart = setInterval(autoPlay, 5000);
function autoPlay() {
    let next = crrentSlide.nextElementSibling;
    btnNextAction(next);
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

    if (clickTarget === btnPrev) {
        let prev = crrentSlide.previousElementSibling;
        btnPrevAction(prev)
        timeBarStop()
    } else if (clickTarget === btnNext) {
        let next = crrentSlide.nextElementSibling;
        btnNextAction(next)
        timeBarStop()
    } else if (clickTarget === btnStop) {
        btnStopAction(btnStop)
    }
    pagingNow(pageNow)
}

for (let i = 0; productList.length > i; i++) {
    productList[i].addEventListener('click', onLike);
}
function onLike(e) {
    let like = e.target;
    let likeData = like.getAttribute('class');
    if (likeData === 'btnLike on') {
        like.classList.remove('on')
        like.setAttribute('aria-label', '좋아요 체크하기')
        like.setAttribute('title', '좋아요 체크하기')
    } else if (likeData === 'btnLike') {
        like.classList.add('on')
        like.setAttribute('aria-label', '좋아요 되어 있음, 좋아요 해제하기')
        like.setAttribute('title', '좋아요 해제하기')
    }
}

for (let i = 0; btnTurnSet.length > i; i++) {
    btnTurnSet[i].addEventListener('click', onLeftListSlides);
}

function onLeftListSlides(e) {
    let clickTarget = e.target;
    let topParent = clickTarget.parentNode.parentNode;
    let targetClass = clickTarget.getAttribute('class');
    let targrtUl = topParent.querySelector('ul');
    let widthUl = targrtUl.offsetWidth;
    let width = topParent.offsetWidth;
    let maxWidth = widthUl - width
    let translateX = targrtUl.style.transform;
    let translateXValue = translateX.replace(/[^0-9]/g, '');
    let translatexValueNumber = Number(translateXValue);

    if (clickTarget.tagName === 'BUTTON' && targetClass === 'btnPrev' && 0 <= translatexValueNumber) {
        targetTranslateX = translatexValueNumber - width
        targrtUl.style.transform = `translateX(-${targetTranslateX}px)`
    } else if (clickTarget.tagName === 'BUTTON' && targetClass === 'btnNext' && maxWidth > translatexValueNumber) {
        targetTranslateX = translatexValueNumber + width
        targrtUl.style.transform = `translateX(-${targetTranslateX}px)`
    } else {
        return
    }
}

function onSerch(e) {
    let serchBtn = e.target;
    let serchBoxClass = serchBtn.getAttribute('class');

    if (serchBoxClass === 'btnSerchOn') {
        serchBox.classList.add('on')
    } else if (serchBoxClass === 'btnClose') {
        serchBox.classList.remove('on')
    }
}

function onGotoTop() {
    window.scrollTo(0, 0);
}

function onScrollCheck() {
    let scrollPosition = document.documentElement.scrollTop;

    if (scrollPosition < currentScroll) {
        btnGotoTop.classList.add('on');
    } else {
        btnGotoTop.classList.remove('on');

    }
    currentScroll = scrollPosition
}


