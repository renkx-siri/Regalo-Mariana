
(() => {
  const page = document.querySelector(".envelope-page");
  if (!page) return;

  const $ = (selector) => page.querySelector(selector);

  const card = $(".envelope-card");
  const envelope = $("#envelope-button");
  const hint = $("#envelope-hint");
  const message = $("#envelope-message");
  const continueButton = $("#continue-button");

  const transition = $("#story-transition");
  const transitionContinue = $("#transition-continue");

  const birthdayScene = $("#birthday-scene");
  const birthdayTitle = $("#birthday-title");
  const birthdayContinue = $("#scene2-continue");

  const lauraScene = $("#laura-scene");
  const lauraTitle = $("#laura-title");
  const lauraContinue = $("#scene3-continue");

  const questionsScene = $("#questions-scene");
  const questionsTitle = $("#questions-title");
  const questionsContinue = $("#scene4-continue");

  const farewellScene = $("#farewell-scene");
  const farewellTitle = $("#farewell-title");

  const requiredElements = [
    card,
    envelope,
    hint,
    message,
    continueButton,
    transition,
    transitionContinue,
    birthdayScene,
    birthdayTitle,
    birthdayContinue,
    lauraScene,
    lauraTitle,
    lauraContinue,
    questionsScene,
    questionsTitle,
    questionsContinue,
    farewellScene,
    farewellTitle
  ];

  if (requiredElements.some((element) => !element)) {
    console.error(
      "No se encontraron todos los elementos necesarios para las escenas."
    );
    return;
  }

  let isOpen = false;
  let isTransitioning = false;
  let currentScene = 1;

  const showScene = (scene, title) => {
    const scenes = [
      transition,
      birthdayScene,
      lauraScene,
      questionsScene,
      farewellScene
    ];

    scenes.forEach((item) => {
      item.hidden = item !== scene;
    });

    currentScene += 1;

    page.classList.add("envelope-page--reading");

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });

    if (title) {
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
    }
  };

  // ESCENA 1: abrir el sobre.
  envelope.addEventListener("click", () => {
    if (isOpen) return;

    isOpen = true;

    card.classList.add("is-open");

    envelope.setAttribute("aria-expanded", "true");
    envelope.setAttribute("aria-label", "Sobre abierto");

    hint.textContent = "Una historia todavía puede sorprendernos.";

    window.setTimeout(() => {
      message.hidden = false;
      continueButton.focus({ preventScroll: true });
    }, 850);
  });

  // BOTÓN 1: pasar del sobre a la transición.
  continueButton.addEventListener("click", () => {
    if (!isOpen || isTransitioning) return;

    isTransitioning = true;
    continueButton.disabled = true;

    card.classList.add("is-transitioning");

    window.setTimeout(() => {
      card.hidden = true;
      transition.hidden = false;

      transitionContinue.focus({ preventScroll: true });
    }, 650);
  });

  // BOTÓN 2: entrar a la felicitación.
  transitionContinue.addEventListener("click", () => {
    if (!isTransitioning || currentScene !== 1) return;

    currentScene = 1;
    showScene(birthdayScene, birthdayTitle);
  });

  // ESCENA 2: cumpleaños → ESCENA 3.
  birthdayContinue.addEventListener("click", () => {
    if (currentScene !== 2) return;

    showScene(lauraScene, lauraTitle);
  });

  // ESCENA 3: reflexión → ESCENA 4.
  lauraContinue.addEventListener("click", () => {
    if (currentScene !== 3) return;

    showScene(questionsScene, questionsTitle);
  });

  // ESCENA 4: preguntas → despedida final.
  questionsContinue.addEventListener("click", () => {
    if (currentScene !== 4) return;

    showScene(farewellScene, farewellTitle);
  });
})();
