let mainSlide = document.querySelector('.mainSlide');
let slide = document.querySelector('.slide');
let slideLi = slide.querySelector('li');
let slideLis = slide.querySelectorAll('li');
let slideLiLast = slideLis.length - 1;
let paging = document.querySelector('.paging');
let timeBar = document.querySelector('.timeBar');
let btnPrev = document.querySelector('.btnPrev');
let btnNext = document.querySelector('.btnNext');
let btnStop = document.querySelector('.btnStop');
let productList = document.querySelectorAll('.productList');
let crrentSlide;

mainSlide.addEventListener('click', onMainSlide);

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
        button.classList.add('play')
    } else {
        button.classList.remove('play')
    }
}

let btnPlay = document.querySelector('.btnStop.play')
let autoStart = setInterval(autoPlay, 5000);
function autoPlay() {
    let next = crrentSlide.nextElementSibling;
    btnNextAction(next);
    pagingNow(pageNow);
}

function slideTimeBar() {
    let time = timeBar.querySelector('.time');
    time.style.width = ``
}

let pageNow = paging.querySelector(".now")

function onMainSlide(e) {
    let clickTarget = e.target;

    if (clickTarget === btnPrev) {
        let prev = crrentSlide.previousElementSibling;
        btnPrevAction(prev)
    } else if (clickTarget === btnNext) {
        let next = crrentSlide.nextElementSibling;
        btnNextAction(next)
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




