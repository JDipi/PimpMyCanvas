/*
Things to add in the future:
 - coolors.co gradient preview swatches
 - progress bar LHS primary color
 - Canvas cheat options (maybe)
 - better system than google forms for theme submission
 - "load default themes" button
 - different theme for the whole application
 - custom gradient editor like the one in photoshop
*/

// default colors if the user hasn't set any
let userColors = {
  "--backgroundColor": "#faebd7",
  "--sideColor": "#ff6536",
  "--sideColorGradient": "linear-gradient(0deg, #161616, #00171f, #003459, #007ea7, #00a8e8)",
  "--minorsideColor": "#ffffff",
  "--textColor": "#03081f",
  "--minortextColor": "#ffffff",
  "--iconColor": "#ffffff",
  "--secondarybackgroundColor": "#f7c88b",
  "--tertiarybackgroundColor": "#faf0e3",
  "--hoverColor": "#fa9a1e",

  "--newNotifColor": "#ffae0d",
  "--dangerColor": "#ff0d41",
  "--buttonbackColor": "#ffffff",
  "--slimborderfixColor": "#c7cdd1",
};
let tempColors

const useAlert = (type, text, time) => {
  let $alert = $('div.alert')
  $alert.removeClass()
  $alert.addClass('transition-all opacity-100 w-fit fixed p-2 m-2 z-[1000] right-0 bottom-0 px-4 font-bold')
  $alert.find('svg').remove()

  if (type === "success") {
    $alert.addClass('alert alert-success shadow-lg')
    $(`<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`).insertBefore($alert.find('span'))
  } else if (type === "info") {
    $alert.addClass('alert alert-info shadow-lg')
    $(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`).insertBefore($alert.find('span'))
  } else if (type === "warning") {
    $alert.addClass('alert alert-warning shadow-lg')
    $(`<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`).insertBefore($alert.find('span'))
  } else if (type === "error") {
    $alert.addClass('alert alert-error shadow-lg')
    $(`<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`).insertBefore($alert.find('span'))
  } else if (type === "alert") {
    $alert.addClass('alert')
    $(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`).insertBefore($alert.find('span'))
  }

  $alert.find('span').text(text)

  setTimeout(() => {
    $alert.addClass('opacity-0')
  }, time)
}


// loads in the themes 
chrome.storage.sync.get(["themes"], (data) => {
  if (!data.themes) return
  console.log(data)
  data.themes.forEach((el, i) => {
    if (!el.name) return
    let ht = /*html*/ `
    <input type='radio' id="${i}" name="theme" class="hidden"/>
    <div class="relative w-full" verified=${el.verified ? "true" : "false"}>
      <span class="absolute z-10 right-5 top-4 flex gap-2 mt-0.5">
        <label for="editColorModal" class="editTheme" title="Edit Theme" data-themeIDX="${i}">
          <svg class="fill-slate-300 hover:fill-purple-500" x="0px" y="0px" width="25" height="25"viewBox="0 0 64 64"><path d="M39.086 17.914l7 7L21.505 49.495l-9.201 4.412c-1.367.457-2.668-.844-2.211-2.211l4.412-9.201L39.086 17.914zM41.914 15.086l4.5-4.5c.781-.781 2.047-.781 2.828 0l4.172 4.172c.781.781.781 2.047 0 2.828l-4.5 4.5L41.914 15.086z"></path></svg>
        </label>
        <label for="confirmModal" class="deleteTheme" title="Delete Theme" data-themeIDX="${i}">
          <svg class="fill-slate-300 hover:fill-red-500" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path></svg>
        </label>
      </span>
      <label for="${i}" class="theme card cursor-pointer bg-base-300 w-full flex items-center justify-center p-4 rounded-box transition-colors hover:border border-primary">
        <h3 class="font-bold mb-2 text-lg flex items-center gap-2 w-full">
          ${el.name}
          <div title="${el.verified ? "Verified Theme" : "User Theme"}" class="badge badge-outline">${el.verified ? "★" : "👤"}</div>
        </h3>
        <div title="${el.name}" class="w-full">
          <img class="themeImage" src="${el.img}"/>
          <div class="flex my-1 w-full h-[1.1rem] w-full">`;
            for (let [key, val] of Object.entries(el.colors)) {
              ht = ht + `<div class="themeColor flex-1" style="background: ${val}" data-color="${key}"></div>`;
            }
            ht = ht + /*html*/`
          </div>
        </div>  
      </label>
    </div>`
    $(ht).appendTo(".themes");
  });

  // angle input logic by me!
  // true if you want to capture X movement, false if you want to capture Y movement
  let moveX = false;

  let dragging;
  let dragamount

  // if the user has set an angle before, make that the current angle of the angle input
  chrome.storage.sync.get(["gradientAngle"], (data) => {
    if (data.gradientAngle) {
      dragamount = data.gradientAngle
    } else {
      dragamount = 0;
    }
    $(":root").css("--initialPosition", `${dragamount}deg`)
  })

  
  let angleControl = document.querySelector(".angleControl");
  let slider = document.querySelector(".slider");

  window.addEventListener("mousemove", (e) => {
    if (dragging) {
      moveX ? (dragamount += e.movementX) : (dragamount += e.movementY);
      if (Math.abs(dragamount) >= 360) {
        dragamount = Math.abs(dragamount) - 360;
      }
      if (dragamount < 0) {
        dragamount = 360 - Math.abs(dragamount);
      }
      slider.style.transform = `translate(-50%, -50%) rotate(${dragamount}deg)`;
      slider.setAttribute("data-angle", dragamount);

      userColors["--sideColorGradient"] = userColors["--sideColorGradient"].replace(/\d*deg/gm, `${dragamount}deg`)
      console.log(userColors["--sideColorGradient"])
      chrome.storage.sync.set({colors: userColors})
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "colorsChanged",
          newColors: userColors,
        });
      });
    }
  });
  angleControl.addEventListener("mousedown", (e) => {
    dragging = true;
    $('body').css({
        "-webkit-touch-callout": "none",
        "-webkit-user-select": "none",
        "-khtml-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
    })
  });
  window.addEventListener("mouseup", (e) => {
    chrome.storage.sync.set({gradientAngle: dragamount})
    dragging = false;
    $('body').css({
        "-webkit-touch-callout": "auto",
        "-webkit-user-select": "auto",
        "-khtml-user-select": "auto",
        "-moz-user-select": "auto",
        "-ms-user-select": "auto",
        "user-select": "auto",
    })
  });
  
  

  //TODO: export themes button
  
  // when you click on a theme, change all of the colors based on the swatches
  $("label.theme").on("click", function (e) {
    // $(this).prev()
    $(this)
    .find(".themeColor")
    .each((i, el) => {
      console.log($(el))
      if ($(el).attr("data-color") == "--sideColorGradient") {
        userColors[$(el).attr("data-color")] = $(el).css("background");
      } else {

        userColors[$(el).attr("data-color")] = $(el).css("background-color");
      }
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "colorsChanged",
          newColors: userColors,
        });
      });
    });

    // change each of the color previews in the colors menu
    $(".colorPreview").each(function (i) {
      $(this).css("background", userColors[$(this).attr("data-color")]);

      // bc the colors are in this format, use regex to get the rgb only 
      // rgb(18, 18, 18) none repeat scroll 0% 0% / auto padding-box border-box
      try {
        $(this).prev().css("color", userColors[$(this).attr("data-color")].match(/rgb\(.*\)/gm));
      } catch {
        $(this).prev().css("color", userColors[$(this).attr("data-color")]);
      }
    });
    
    chrome.storage.sync.set({ colors: userColors });
    
    chrome.storage.sync.set({ currentThemeNum: $(this).attr("for") });
  });
  
  // if the user refreshes and has a theme selected, apply the theme automatically
  chrome.storage.sync.get(["currentThemeNum"], (data) => {
    if (data.currentThemeNum) {
      $(`label.theme[for="${data.currentThemeNum}"]`).parent().prev().attr("checked", true);
    }
  });

  // when the user wants to delete a theme, set the theme id to the modal so that the modal knows what it's targeting
  $('label.deleteTheme').on('click', function(e) {
    if ($(this).parent().parent().attr("verified") === "true") {
      useAlert("warning","You are deleting a verified theme!",5000)
    }
    $('label[for=confirmModal].modal').attr('data-themeIDX',$(this).attr('data-themeIDX'))
  })
  
  // when the user confirms deletion, remove the index of the theme from storage.
  // the index is found with the data-themeIDX attribute on the modal
  $('label[for=confirmModal] button.yes').on('click', function(e) {
    chrome.storage.sync.get(['themes'], (data) => {
      let idx = parseInt($(this).parent().parent().parent().attr('data-themeIDX'))
      data.themes.splice(idx)
      chrome.storage.sync.set({"themes": data.themes})
    })
    // closes the modal
    $("input#confirmModal").trigger("click");
    useAlert("success","Theme deleted! Reopen the extension to reflect changes.", 5000)
  })
  
  // when the user changes their mind about deleting a theme
  $('label[for=confirmModal] button.no').on('click', function(e) {
    // closes the modal
    $("input#confirmModal").trigger("click");
  })
  
  
  // when the user wants to delete a theme, set the theme id to the modal so that the modal knows what it's targeting
  $('label.editTheme').on('click', function(e) {
    tempColors = userColors
    $('label[for=editColorModal].modal').attr('data-themeIDX',$(this).attr('data-themeIDX'))
    chrome.storage.sync.get(["themes"], (data) => {
      // if the user is editing a verified theme, give a warning
      if (data.themes[$(this).attr('data-themeIDX')].verified) useAlert("warning","You are editing a verified theme!",5000)
      $('label[for=editColorModal] label.colorPreview').each((i, el) => {
        $(el).css("background", data.themes[$(this).attr('data-themeIDX')].colors[$(el).attr("data-color")]);
        $(el).prev().css("color", data.themes[$(this).attr('data-themeIDX')].colors[$(el).attr("data-color")]);  
      })
    })
  })

  //TODO: make it so the colors dont update when editing a theme that is not currently applied
  
  $('.confirmEdit').on('click', function(e) {
    $("input#editColorModal").trigger("click");
    let newColors = {}
    $("label[for=editColorModal] .colorPreview").each((i, el) => {
      newColors[$(el).attr("data-color")] = $(el).css('background')
    })
    chrome.storage.sync.get(["themes"], (data) => {
      data.themes[$('label[for=editColorModal]').attr('data-themeidx')].colors = newColors
      chrome.storage.sync.set({themes: data.themes})
    })
    useAlert("success","Theme successfully edited! Reopen extension window to reflect changes.", 5000)
  })
  $('.cancelEdit').on('click', function(e) {
    console.log(tempColors)
    console.log(userColors)
    $("input#editColorModal").trigger("click");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "colorsChanged",
        newColors: tempColors,
      });
    });
  })

});

// loads in previous colors if they exist, else default colors
chrome.storage.sync.get(["colors"], (data) => {
  if (data) {
    $(".colorPreview").each(function (i) {
      $(this).css("background", data.colors[$(this).attr("data-color")]);
      $(this).prev().css("color", data.colors[$(this).attr("data-color")]);
      userColors = data.colors;
    });
  } else {
    // use the default colors from the var at the top
    $(".colorPreview").each(function (i) {
      $(this).css("background", userColors[$(this).attr("data-color")]);
      $(this).prev().css("color", userColors[$(this).attr("data-color")]);
    });
  }
});

// I am using one spectrum instance for every color selector, it knows which color is which because of the data-color attribute
$("#spectrum").spectrum({
  flat: true,
  showInput: true,
  preferredFormat: "hex",
  move: (c) => {

    // if the user has a theme selected and changes a theme color, unapply the theme so it doesn't look like they're editing the theme
    if ($('input[name=theme]').is(":checked")) {
      $('input[name=theme]:checked').prop("checked", false)
      chrome.storage.sync.set({ currentThemeNum: "" });
    }
    
    // the color spectrum is targeting
    let colorType = $("label.MAIN[data-color]").attr("data-color");
    userColors[colorType] = c.toHexString();
    // changes the label and preview box when you change the color
    $(`label.colorPreview[data-color="${colorType}"]`).css(
      "background",
      c.toHexString()
    );
    $(`label.colorPreview[data-color="${colorType}"]`)
      .prev()
      .css("color", c.toHexString());

    // updates in the front end
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "colorsChanged",
        newColors: userColors,
      });
    });
  },
});


// since there is only one spectrum modal, set the data attribute of the color it's changing so it knows what to target
$(".colorPreview").on("click", function (e) {
  $("label.MAIN[data-color]").attr("data-color", $(this).attr("data-color"));
  $("#spectrum").spectrum("set", userColors[$(this).attr("data-color")]);
});

$(".sp-choose").addClass("btn btn-xs");

$(".sp-choose").on("click", function (e) {
  $("input#colorModal").trigger("click");
  chrome.storage.sync.set({ colors: userColors });
});
$(".sp-cancel").on("click", function (e) {
  $("input#colorModal").trigger("click");
});

$(".sp-button-container.sp-cf").detach().appendTo(".sp-input-container.sp-cf");

// TODO: add a way to submit to the github your custom themes?

//TODO: cancel theme submit button
$('label[for=toGithubModal].toGithub').on('click', function(e) {
  chrome.storage.sync.get(["themes"], (data) => {
    if (data.themes.every(el => el.verified == true)) {
      $('input#toGithubModal').trigger('click')
      useAlert("error", "You need to make a new theme first!", 3000)
      return
    }
    $("label[for=toGithubModal] .container").empty()
    $("label[for=toGithubModal] h1").show()
    $(".pasteMessage").hide()
    data.themes.forEach((el, i) => {
      if (el.verified) return
      $(`<button class="themeSubmitOption btn btn-sm w-full mb-2" data-themeIDX="${i}">
      ${el.name}
      </button>`).appendTo('label[for=toGithubModal].modal h1 + div')
    })
    $('.themeSubmitOption').on('click', function(e) {
      chrome.storage.sync.get(["themes"], (data) => {
        //TODO: get rid of cancel button, get textarea window with link to form
        // https://docs.google.com/forms/d/e/1FAIpQLSe_UoYmPhYp0attrSOfkD9wTuKcJaYobyLp0afcJ5oBWLiarQ/viewform?usp=sf_link
        let theme = data.themes[$(this).attr('data-themeIDX')]
        $("label[for=toGithubModal] .container").empty()
        $("label[for=toGithubModal] h1").hide()
        $(/*html*/`
          <div class="scrollbar text-sm w-full bg-neutral rounded-xl p-5 h-[260px] overflow-y-scroll">
            ${JSON.stringify(theme, null, 2)}
          </div>
          `).appendTo("label[for=toGithubModal] .container")
        $(".pasteMessage").show()
      })
    })
    $("label[for=toGithubModal] button.no").on('click', function(e) {
      $('input#toGithubModal').trigger('click')
    })
  })
})


// when the user hasn't entered a name for their new theme, the option will read cancel, else it will read save
$('input.customName').on('input', function(e) {
  if (!$(this).val()) {
    $(this).parent().next().next().text("Cancel")
  } else {
    $(this).parent().next().next().text("Save")
  }
})


// when you click to save a new theme, this hides the button and shows the input and submit button
$("button.newTheme").on("click", function (e) {
  $(this).toggle();
  $(this).next().toggle();
});

// when you submit a new theme, it does the opposite of the above function
$(".saveTheme").on("click", function (e) {
  $(this).parent().toggle();
  $(this).parent().prev().toggle();
  
  // get the new theme
  let newTheme = {
    name: $('input.customName').val(),
    img: $('input.customURL').val() || "",
    colors: {},
    verified: false
  }

  // append each color for new theme
  $('label.colorPreview').each((i, el) => {
    newTheme.colors[$(el).attr('data-color')] = $(el).css("background-color")
  })

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "getCurrentGradient",
    }, (res) => {
      newTheme.colors["--sideColorGradient"] = res.currentGradient

      // add the new theme to the themes in storage
      chrome.storage.sync.get(['themes'], (data) => {
        chrome.storage.sync.set({"themes": [...data.themes, newTheme]})
      })
    });
  });

  if ($(this).text() !== "Cancel") {
    useAlert("success", "Theme created! Reopen the extension window to reflect changes.", 5000)
  }
});

// if the user alr has a gradient set from a coolors url, put the url in the input boc
chrome.storage.sync.get(["gradientUrl"], (data) => {
  $(".submitCOOLORS").prev().val(data.gradientUrl || "")
})

// get gradient enabled state and check the box
chrome.storage.sync.get(["gradient"], (data) => {
  if (data.gradient) {
    $('.enableGradient').prop("checked", true)
  } else {
    $('.enableGradient').prop("checked", false)
  }
})

// gets the speed from storage and updates the slider
chrome.storage.sync.get(["gradientSpeed"], (data) => {
  $(".rangeSlider").attr("value", data.gradientSpeed)
})

// enables or disables the gradient with the checkbox
$('.enableGradient').on('change', function(e) {
  if ($(this).is(':checked')) {
    // toggles gradient on
    chrome.storage.sync.set({gradient: true})
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleGradient",
        mode: true,
      });
    });
  } else {
    // toggles gradient off
    chrome.storage.sync.set({gradient: false})
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleGradient",
        mode: false,
      });
    });
  }
})

// when the slider is changed, send message to front end and update storage
$(document).on('input change', '.rangeSlider', function() {
  let val = $(this).val()
  if (val == 0) {
    // if the slider is all the way to the left, make the gradient static
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeGradientSpeed",
        speed: 0,
      });
    });
  } else {
    // I have to do 11 - val to reverse the values of the slider.
    // the slider goes from 0 to 10, but I need to get inverse values because the slider should make the gradient speed up the farther it is to the right
    // having a speed of 1 is fast bc the gradient moves its full course in 1s, so 10 seconds would be slow.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeGradientSpeed",
        speed: 11 - val,
      });
    });
  }
  chrome.storage.sync.set({"gradientSpeed": val})
});

// I like these colors  https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51

// when the user clicks on the go button
$('.submitCOOLORS').on('click', function(e) {
  // return if no value
  if (!$(this).prev().val()) {alert("Enter a URL from coolors.co!"); return}

  // gets the hex codes from the url
  let gradientColors = $(this).prev().val().match(/(\w{6})(?=-|$)/gm)
  

  // FIXME: new feature maybe??
  // gradientColors.forEach((el) => {
  //   $(`
  //     <span class="flex-1 h-full" style="background: #${el}">
  //     </span>
  //   `).appendTo('.gradientColorHolder')
  // })

  //sets the url to storage
  chrome.storage.sync.set({gradientUrl: $(this).prev().val()})

  let gradient = "linear-gradient(0deg,"
  // using a loop to append each hex code to the above string
  gradientColors.forEach((el, i) => {
    i+1 === gradientColors.length ? gradient += `#${el})` : gradient += `#${el},`
  })

  // sets the gradient to storage
  userColors["--sideColorGradient"] = gradient
  chrome.storage.sync.set({ colors: userColors });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "colorsChanged",
      newColors: userColors,
    });
  });
})

$('label[for=confirmImportModal] button.no').on('click', function(e) {
  $('input#confirmImportModal').trigger('click')
})
$('label[for=confirmImportModal] button.yes').on('click', function(e) {
  $('input#themeInput').trigger('click')
  $('input#themeInput').on('change',() => {
    let importedThemes
    let file = $('input#themeInput').prop('files')[0]
    var reader = new FileReader();
    reader.onload = function(e){
      try {
        importedThemes = JSON.parse(e.target.result)
        if ($('input#overwriteImports').is(":checked")) {
          chrome.storage.sync.set({themes: importedThemes})
        } else {
          chrome.storage.sync.get(["themes"], (data) => {
            data.themes = [...data.themes, ...importedThemes]
            chrome.storage.sync.set({themes: data.themes})
          })
        }
        chrome.storage.sync.get(["themes"], (data) => {
          console.log(data)
        })
        useAlert("success", "Successfully exported themes! Reopen extension window to reflect changes.", 5000)
      } catch {
        useAlert("error", "File does not contain valid JSON!", 3000)
      }
    }
    reader.readAsText(file);
  })
  $('input#confirmImportModal').trigger('click')
})

// when the user clicks to export their themes, get the themes from storage and send a message to download them
$('button.export').on('click', function(e) {
  chrome.storage.sync.get(['themes'], (data) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "downloadFile",
        content: JSON.stringify(data.themes),
        fileName: "PMC themes.json",
        contentType: "application/json",
      });
    });
  })
  useAlert("success", "Successfully exported!", 3000)
})

$('label[for=resetAllSettingsModal] button.yes').on('click', () => {
  chrome.storage.sync.clear()
  useAlert("success", "PMC Settings Reset! Refresh the page to reflect changes.", 5000)
  $('input#resetAllSettingsModal').trigger('click')
})

$('label[for=resetAllSettingsModal] button.no').on('click', () => {
  $('input#resetAllSettingsModal').trigger('click')
})