// PRELOADER
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  // loader.style.display = "none";
  loader.style.opacity = "0";
  loader.style.visibility = "hidden";
});

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