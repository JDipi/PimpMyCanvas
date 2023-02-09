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

let defaultColors = {
  "--backgroundColor": "#262626",
  "--sideColor": "#121212",
  "--sideColorGradient":
    "linear-gradient(0deg, #161616, #00171f, #003459, #007ea7, #00a8e8)",
  "--minorsideColor": "#0971d3",
  "--newNotifColor": "#ffac1b",
  "--dangerColor": "#ff0d41",
  "--textColor": "#e3e3e3",
  "--minortextColor": "#d6d6d6",
  "--buttonbackColor": "#3960ba",
  "--secondarybackgroundColor": "#1c1c1c",
  "--tertiarybackgroundColor": "#2b2b2b",
  "--hoverColor": "#2474f5",
  "--iconColor": "#ffffff",
  "--slimborderfixColor": "#c7cdd1",
};

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
  $(":root").css("--MlJlv-textColor", newColors["--textColor"]);
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

const enable = (mode) => {
  if (mode) {
    let styles = chrome.runtime.getURL("custom.css")
    $('head').append($('<link>').attr("rel","stylesheet").attr("type","text/css").attr("href", styles).addClass("injected"));
  } else {
    $('link.injected').detach()
    //TODO: fix remove style from html tag
    $("html").removeAttr('style')
  }
}
chrome.storage.sync.get(["enabled"], (data) => {
  if (data.enabled) {
    enable(true)
  } else {
    enable(false)
  }
})

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
  // if no colors, load default theme (for fresh install or update)
  try {
    updateColors(data.colors);
  } catch {
    updateColors(defaultColors);
  }
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
    $(":root").css("--gradientBackgroundSize", "100% 100%");
  } else {
    $(":root").css("--gradientSpeed", `${11 - data.gradientSpeed}s`);
    $(":root").css("--gradientBackgroundSize", "200% 200%");
  }
  $("header#header").css("background", "var(--sideColorGradient)");
  $("header#header").css("background-size", "var(--gradientBackgroundSize)");
});

// gets the current theme colors on every color change
chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.action == "colorsChanged") {
    updateColors(req.newColors);
  }

  //TODO: test this amd make it jquery
  if (req.action == "toggleGradient") {
    if (req.mode) {
      document
        .querySelector("header#header")
        .setAttribute(
          "style",
          "background: var(--sideColorGradient);background-size: 200% 200%;"
        );
    } else {
      document
        .querySelector("header#header")
        .setAttribute(
          "style",
          "background: var(--sideColor);background-size: 100% 100%;"
        );
    }
  }

  if (req.action === "changeGradientSpeed") {
    $(":root").css("--gradientSpeed", `${req.speed}s`);
    if (!req.speed) {
      $(":root").css("--gradientBackgroundSize", "100% 100%");
    } else {
      $(":root").css("--gradientBackgroundSize", "200% 200%");
    }
    $("header#header").css("background", "var(--sideColorGradient) !important");
    $("header#header").css(
      "background-size",
      "var(--gradientBackgroundSize) !important"
    );
  }

  if (req.action === "downloadFile") {
    download(req.content, req.fileName, req.contentType);
  }

  if (req.action === "getCurrentGradient") {
    res({ currentGradient: $("header#header").css("background") });
  }

  if (req.action === "enable") {
    enable(req.mode)
  }
});