chrome.runtime.sendMessage({ todo: "showPageAction" });
// chrome.storage.sync.clear()

let colorVars = [
  "--backgroundColor",
  "--sideColor",
  "--sideColorGradient",
  "--minorsideColor",
  "--newNotifColor",
  "--dangerColor",
  "--textColor",
  "--minortextColor",
  "--buttonbackColor",
  "--secondarybackgroundColor",
  "--tertiarybackgroundColor",
  "--hoverColor",
  "--iconColor",
  "--slimborderfixColor",
];

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

// updates the colors using the above list
const updateColors = (newColors) => {
  for (let [key, val] of Object.entries(newColors)) {
    $(":root").css(key, val);
  }
  $("header#header").css("background", "var(--sideColorGradient)");
  $(":root").css("--MlJlv-textColor", newColors["--textColor"])
  chrome.storage.sync.get(["gradient"], (data) => {
    if (data.gradient) {
      $("header#header").addClass("gradient");
      $("header#header").css("background", "var(--sideColorGradient)");
      $("header#header").css("background-size", "200% 200%");
    } else {
      $("header#header").css("background", "var(--sideColor)");
      $("header#header").css("background-size", "100% 100%");
    }
  });
};


// if this is the user's first launch, fetch the themes from github and save them in storage
chrome.storage.sync.get(["themes"], (data) => {
  if (!data.themes) {
    $.get(
      "https://raw.githubusercontent.com/JDipi/PimpMyCanvas/master/includedthemes.json",
      function (data) {
        chrome.storage.sync.set({ themes: JSON.parse(data) });
      }
    );
  }
});

// gets the current theme colors on every refresh
chrome.storage.sync.get(["colors"], (data) => {
  if (!data.colors) return
  updateColors(data.colors);
});

chrome.storage.sync.get(["gradient"], (data) => {
  if (!data.gradient) {
    $("header#header").addClass("gradient");
    $("header#header").css("background", "var(--sideColorGradient)");
    $("header#header").css("background-size", "200% 200%");
  }
});

//TODO: fix wrong scaling when refresh speed is none
chrome.storage.sync.get(["gradientSpeed"], (data) => {
  if (data.gradientSpeed == 0) {
    $(":root").css("--gradientSpeed", `0s`);
    $(":root").css("--gradientBackgroundSize", "100% 100%")
  } else {
    $(":root").css("--gradientSpeed", `${11 - data.gradientSpeed}s`);
    $(":root").css("--gradientBackgroundSize", "200% 200%")
  }
  $("header#header").css("background", "var(--sideColorGradient)");
  $("header#header").css("background-size", "var(--gradientBackgroundSize)")
  
})

// gets the current theme colors on every color change
chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.action == "colorsChanged") {
    updateColors(req.newColors);
  }
  
  //TODO: test this amd make it jquery
  if (req.action == "toggleGradient") {
    if (req.mode) {
      document.querySelector("header#header").setAttribute("style", "background: var(--sideColorGradient);background-size: 200% 200%;")
    } else {
      document.querySelector("header#header").setAttribute("style", "background: var(--sideColor);background-size: 100% 100%;")
    }
  }
  
  if (req.action === "changeGradientSpeed") {
    $(":root").css("--gradientSpeed", `${req.speed}s`);
    if (!req.speed) {
      $(":root").css("--gradientBackgroundSize", "100% 100%")
    } else {
      $(":root").css("--gradientBackgroundSize", "200% 200%")
    }
    $("header#header").css("background", "var(--sideColorGradient) !important");
    $("header#header").css("background-size", "var(--gradientBackgroundSize) !important")
  }

  if (req.action === "downloadFile") {
    download(req.content, req.fileName, req.contentType)
  }

  if (req.action === "getCurrentGradient") {
    res({currentGradient: $("header#header").css("background")})
  }
});