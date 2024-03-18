document.addEventListener("DOMContentLoaded", () => {
  var mobileNavigation = document.querySelector(".mobileNavigation");
  var navigation = document.querySelector(".navigation");
  var headerLinksContainer = document.querySelector(".header__links-container");
  var burgerIcon = document.querySelector(".header__burgerIcon");
  var arrowButtons = document.querySelectorAll(".arrowButton");
  var chooseYourPlanArrowButtons = document.querySelectorAll(
    ".chooseYourPlan__cardsBlock .arrowButton"
  );

  const PRICES_CARDS = document.querySelectorAll(".chooseYourPlan__variant");

  function onResizeHeader() {
    if (window.innerWidth <= 900) {
      mobileNavigation.appendChild(document.querySelector(".header__links"));
      mobileNavigation.appendChild(document.querySelector(".header__buttons"));
    } else if (window.innerWidth > 900) {
      headerLinksContainer.appendChild(document.querySelector(".header__links"));
      navigation.appendChild(document.querySelector(".header__buttons"));
    }
  }

  function onClickBurgerMenu() {
    if (burgerIcon.src.includes("assets/menu.svg")) {
      burgerIcon.src = "assets/close.svg";
      mobileNavigation.classList.add("active");
    } else {
      burgerIcon.src = "assets/menu.svg";
      mobileNavigation.classList.remove("active");
    }
  }

  burgerIcon.addEventListener("click", onClickBurgerMenu);

  arrowButtons.forEach((element) => {
    let arrowImage = element.firstElementChild;
    let source = arrowImage.src;
    element.addEventListener("mouseenter", () => {
      arrowImage.setAttribute("src", source.replace("ArrowRed.svg", "ArrowWhite.svg"));
    });
    element.addEventListener("mouseleave", () => {
      arrowImage.setAttribute("src", source.replace("ArrowWhite.svg", "ArrowRed.svg"));
    });
  });

  /*-----------------------------------------------------------------------------------*/

  function onResizeChooseYourPlanBlock() {
    var chooseYourPlanMobileArrowsBlock = document.querySelector(
      ".chooseYourPlan__mobileArrowsBlock"
    );
    var chooseYourPlanCardsBlock = document.querySelector(".chooseYourPlan__cardsBlock");

    window.innerWidth > 1024 &&
      PRICES_CARDS.forEach((item) => {
        item.classList.contains("active") && item.classList.remove("active");
        item.hasAttribute("style") && item.removeAttribute("style");
      });

    if (window.innerWidth <= 1024) {
      PRICES_CARDS.forEach((item, index) => {
        if (index !== 2) {
          item.classList.remove("active");
          item.removeAttribute("style");
        } else {
          item.classList.add("active");
          item.removeAttribute("style");
        }
      });
      chooseYourPlanArrowButtons[0].classList.add("moveToLeft");
      chooseYourPlanArrowButtons[1].classList.remove("moveToRight");
    }

    if (window.innerWidth < 550) {
      chooseYourPlanMobileArrowsBlock.append(
        chooseYourPlanArrowButtons[0],
        chooseYourPlanArrowButtons[1]
      );
    }
    if (window.innerWidth > 550) {
      chooseYourPlanCardsBlock.prepend(chooseYourPlanArrowButtons[0]);
      chooseYourPlanCardsBlock.append(chooseYourPlanArrowButtons[1]);
    }
  }

  function onPressChooseYourPlanArrowButton(pressedButton) {
    var indexOfActiveCard;
    PRICES_CARDS.forEach((item, index) => {
      return item.classList.contains("active") && (indexOfActiveCard = index);
    });
    switch (indexOfActiveCard) {
      case 2:
        if (pressedButton === "next") {
          PRICES_CARDS[2].classList.remove("active");
          PRICES_CARDS[2].setAttribute("style", "transform: translateX(-200vw)");
          chooseYourPlanArrowButtons[0].classList.remove("moveToLeft");
          PRICES_CARDS[1].classList.add("active");
          break;
        }
      case 1:
        if (pressedButton === "next") {
          PRICES_CARDS[1].classList.remove("active");
          PRICES_CARDS[1].setAttribute("style", "transform: translateX(-200vw)");
          PRICES_CARDS[0].classList.add("active");
          chooseYourPlanArrowButtons[1].classList.add("moveToRight");
        } else if (pressedButton === "prev") {
          PRICES_CARDS[1].classList.remove("active");
          PRICES_CARDS[2].removeAttribute("style");
          PRICES_CARDS[2].classList.add("active");
          chooseYourPlanArrowButtons[0].classList.add("moveToLeft");
        }
        break;
      case 0:
        if (pressedButton === "prev") {
          PRICES_CARDS[0].classList.remove("active");
          PRICES_CARDS[1].removeAttribute("style");
          PRICES_CARDS[1].classList.add("active");
          chooseYourPlanArrowButtons[1].classList.remove("moveToRight");
        }
        break;
    }
  }

  chooseYourPlanArrowButtons[0].addEventListener("click", () =>
    onPressChooseYourPlanArrowButton("prev")
  );
  chooseYourPlanArrowButtons[1].addEventListener("click", () =>
    onPressChooseYourPlanArrowButton("next")
  );

  /*-----------------------------------------------------------------------------------*/

  function onChangeFeedbacksBlock() {
    var feedbacksBlockArrowButtons = document.querySelectorAll(
      ".feedbacksBlock__buttons .arrowButton"
    );
    feedbacksBlockArrowButtons[0].classList.add("moveToLeft");
    var feedbacks = document.querySelectorAll(".feedbacksBlock__feedback");
    var indexOfActiveFeedback = 0;

    function updateFeedbacksBlockPagination() {
      var paginationCirclesArray = document.querySelectorAll(".feedbacksBlock__paginationCircle");

      paginationCirclesArray.forEach((element, index) => {
        index === indexOfActiveFeedback
          ? element.classList.add("active")
          : element.classList.remove("active");
      });
    }

    function updateMoveToLeftClass() {
      feedbacksBlockArrowButtons[0].classList.toggle("moveToLeft", indexOfActiveFeedback === 0);
    }

    function onPressFeedbacksBlockArrowButton(pressedButton) {
      for (let index = indexOfActiveFeedback; index < feedbacks.length; index++) {
        feedbacks[index].classList.remove("active");

        if (pressedButton === "next" && index < feedbacks.length - 1) {
          feedbacks[index + 1].classList.add("active");
          indexOfActiveFeedback++;
          updateMoveToLeftClass();
          break;
        } else if (pressedButton === "next" && index === feedbacks.length - 1) {
          feedbacks[0].classList.add("active");
          indexOfActiveFeedback = 0;
          updateMoveToLeftClass();
          break;
        }
        if (pressedButton === "prev" && index > 0) {
          feedbacks[index - 1].classList.add("active");
          indexOfActiveFeedback--;
          updateMoveToLeftClass();
          break;
        }
      }
      feedbacks[indexOfActiveFeedback].scrollIntoView({
        inline: "center",
        behavior: "smooth",
        block: "nearest",
      });
      updateFeedbacksBlockPagination();
    }

    feedbacksBlockArrowButtons[0].addEventListener("click", () => {
      onPressFeedbacksBlockArrowButton("prev");
    });
    feedbacksBlockArrowButtons[1].addEventListener("click", () => {
      onPressFeedbacksBlockArrowButton("next");
    });
  }

  window.addEventListener("resize", () => {
    onResizeHeader();
    onResizeChooseYourPlanBlock();
    onChangeFeedbacksBlock();
  });
  window.addEventListener("load", () => {
    onResizeHeader();
    onResizeChooseYourPlanBlock();
    onChangeFeedbacksBlock();
  });
});
