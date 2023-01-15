// PRELOADER
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  // loader.style.display = "none";
  loader.style.opacity = "0";
  loader.style.visibility = "hidden";
});
//=================================//
//SEARCH BAR
const searchBar = document.querySelector(".search__bar");
const showSearchBarBtn = document.querySelector("#show-searchbar__btn");
const hideSearchBarBtn = document.querySelector("#hide-searchbar__btn");

showSearchBarBtn.addEventListener("click", function () {
  searchBar.classList.add("show-searchbar");
});
hideSearchBarBtn.addEventListener("click", function () {
  searchBar.classList.remove("show-searchbar");
});
//sticky
const showSearchBarBtnSticky = document.querySelector("#show-searchbar__btn-sticky");
showSearchBarBtnSticky.addEventListener("click", function () {
  searchBar.classList.add("show-searchbar");
});
//=================================//
//SIDE BAR
const sideBar = document.querySelector(".sidebar__container");
const showSideBarBtn = document.querySelector("#show-sidebar__btn");
const hideSideBarBtn = document.querySelector("#hide-sidebar__btn");

showSideBarBtn.addEventListener("click", function () {
  sideBar.classList.add("show-sidebar");
});
hideSideBarBtn.addEventListener("click", function () {
  sideBar.classList.remove("show-sidebar");
});
//sticky
const showSideBarBtnSticky = document.querySelector("#show-sidebar__btn-sticky");

showSideBarBtnSticky.addEventListener("click", function () {
  sideBar.classList.add("show-sidebar");
});
//=================================//
//SLIDER
const productWrappers = document.querySelectorAll(".product__wrapper");
const dotWrapper = document.querySelector(".dot__wrapper");
const TIME_OUT = 5000;
let sliderIndex = 0;
let intervalSlider = setInterval(updateSlider, TIME_OUT);

//If dot is clicked, then change sliderIndex and reset the interval
dotWrapper.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    const cellIndex = e.target.getAttribute("cellIndex");
    if (cellIndex == sliderIndex) return;
    //clearInterval
    clearInterval(intervalSlider);
    //change sliderIndex
    sliderIndex = cellIndex;
    showSlide();
    //reset intervalSlider
    intervalSlider = setInterval(updateSlider, TIME_OUT);
  }
});

function updateSlider() {
  sliderIndex++;
  if (sliderIndex == productWrappers.length) {
    sliderIndex = 0;
  }
  showSlide();
}
function showSlide() {
  productWrappers.forEach(wrapper => {
    if (wrapper.classList.contains("disappear")) {
      wrapper.classList.remove("disappear");
    }
    else if (wrapper.classList.contains("active")) {
      wrapper.classList.add("disappear");
      wrapper.classList.remove("active");
    }
  });
  productWrappers[sliderIndex].classList.add("active");
  productWrappers.forEach(wrapper => { console.log(wrapper.classList); });
  console.log(sliderIndex);
}
//=================================//
//VIDEO
const videoAnchor = document.querySelector(".video__anchor");
const videoContainer = document.querySelector(".video__container");
const videoWrapper = document.querySelector(".video__wrapper");
const video__iframe = document.querySelector("#video__iframe");

video__iframe.onload = () => {
  
};

videoAnchor.addEventListener("click", function () {
  videoContainer.classList.add("active");
});
videoWrapper.addEventListener("click", function (e) {
  videoContainer.classList.remove("active");
  video__iframe.src = video__iframe.src;
  e.stopImmediatePropagation();
});

//=================================//
//LAZY LOADING
//==Introduction
const introTopField = document.querySelector('.introduction .top__wrapper');
const introObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const { target } = entry; // ES6
    if (entry.isIntersecting) {
      target.classList.add('trigger--animation');
      introObserver.unobserve(target);
    }
  });
});

introObserver.observe(introTopField);
//==Inspires - Gif
const inspiresField = document.querySelector('.inspires__wrapper');
const inspiresObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const { target } = entry;
    if (entry.isIntersecting) {
      target.classList.add('trigger--animation');
      inspiresObserver.unobserve(target);
    }
  });
});
inspiresObserver.observe(inspiresField);
//==LazyLoading part
const articleLazyLoadingField = document.querySelector('.lazymid__wrapper .article__wrapper');

const statisticInfoArch = document.getElementById('infoarch__statistic');
const statisticAppDev = document.getElementById('appdev__statistic');
const statisticUserInteface = document.getElementById('userinterface__statistic');

let infoArchPercent = 0;
let appDevPercent = 0;
let userInterfacePercent = 0;

let intervalInfoArch;
let intervalAppDev;
let intervalUserInterface;

const articleLazyLoadingObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const { target } = entry;
    if (entry.isIntersecting) {
      target.classList.add('trigger--transition');
      updatePercent();
      articleLazyLoadingObserver.unobserve(target);
    }
  });
});
function updatePercent() {
  intervalInfoArch = setInterval(() => {
    updateInfoArch();
  }, 66);
  intervalAppDev = setInterval(() => {
    updateAppDev();
  }, 36);
  intervalUserInterface = setInterval(() => {
    updateUserInterface();
  }, 38);

  //Nested function
  function updateInfoArch() {
    infoArchPercent++;
    if (infoArchPercent <= 53) {
      statisticInfoArch.innerHTML = infoArchPercent + '%';
    } else {
      clearInterval(intervalInfoArch);
    }
  }
  function updateAppDev() {
    appDevPercent++;
    if (appDevPercent <= 97) {
      statisticAppDev.innerHTML = appDevPercent + '%';
    } else {
      clearInterval(intervalAppDev);
    }
  }
  function updateUserInterface() {
    userInterfacePercent++;
    if (userInterfacePercent <= 92) {
      statisticUserInteface.innerHTML = userInterfacePercent + '%';
    } else {
      clearInterval(intervalUserInterface);
    }
  }
}
articleLazyLoadingObserver.observe(articleLazyLoadingField);
//=================================//
//BACK TO TOP and SHOW NAVBAR
// const  = document.getElementById("nav");
const backToTopButton = document.querySelector(".back-to-top__button");
window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset;
  const header = document.querySelector(".navbar-sticky__wrapper");
  const searchbar__container = document.querySelector(".search__bar");
  const botIntro = document.querySelector(".introduction .bot__wrapper");
  if (scrollHeight > botIntro.getBoundingClientRect().height) {
    header.classList.add('active');
    searchBar.classList.add('active');
  } else {
    header.classList.remove('active');
    searchBar.classList.remove('active');
  }

  if (scrollHeight > 600) {
    backToTopButton.classList.add('show-back-to-top');
  } else {
    backToTopButton.classList.remove('show-back-to-top');
  }
});
//==Setting to make the page scroll to the position before reload
history.scrollRestoration = 'auto';
window.onbeforeunload = function () {
  var scrollPos;
  if (typeof window.pageYOffset != 'undefined') {
    scrollPos = window.pageYOffset;
  }
  else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
    scrollPos = document.documentElement.scrollTop;
  }
  else if (typeof document.body != 'undefined') {
    scrollPos = document.body.scrollTop;
  }
  document.cookie = "scrollTop=" + scrollPos;
}
window.onload = function () {
  if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {
    var arr = document.cookie.match(/scrollTop=([^;]+)(;|$)/);
    document.documentElement.scrollTop = parseInt(arr[1]);
    document.body.scrollTop = parseInt(arr[1]);
  }
}

//=================================//
//FLOATING PICTURE
const newTechWrapper = document.querySelector('.newtech__wrapper');
const newTechImage1 = document.querySelector('.newtech-img1');
const newTechImage2 = document.querySelector('.newtech-img2');
let translateValue1 = 0;
let translateValue2 = 0;
const floatingImageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.isIntersecting);
      window.addEventListener('scroll', makeImageFloating);
    } else {
      console.log(entry.isIntersecting);
      console.log("I am unstoppable");
      window.removeEventListener('scroll', makeImageFloating);
    }
    function makeImageFloating(event) {
      event.stopImmediatePropagation();
      let middleOfScreen = window.innerHeight / 2;
      let middleOfElement = newTechWrapper.getBoundingClientRect().top + newTechWrapper.getBoundingClientRect().bottom / 2;
      // console.log(middleOfScreen, middleOfElement);
      translateValue1 = (middleOfElement - middleOfScreen) * 0.015;
      translateValue2 = (middleOfElement - middleOfScreen) * 0.03;
      // console.log(translateValue1, translateValue2);
      newTechImage1.style.transform = `translateY(${translateValue1}px)`;
      newTechImage2.style.transform = `translateY(${translateValue2}px)`;
    }
  });
});

floatingImageObserver.observe(newTechWrapper);
//=================================//