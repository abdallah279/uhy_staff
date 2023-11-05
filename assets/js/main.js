// loader js
$(window).on("load", function () {
  $(".loader-container").delay(300).fadeOut(1000);
});
// Active Link
$(".links .link").each(function () {
  $(this).removeClass("active");
  if (window.location.href.includes($(this).attr("href"))) {
    $(this).addClass("active");
  }
});

// Add Height To Logo
$(document).ready(function () {
  let navbarHeight = $(".navbar-m").outerHeight();

  $('.sidebar-m .logo').css('height', navbarHeight);
});

// SideBar
$("#open_links").on("click", function () {
  $(".sidebar-m").addClass('active');
  $(".nav-overlay").addClass('active');
});

// SideBar
$(".nav-overlay").on("click", function () {
  $(".sidebar-m").removeClass('active');
  $(this).removeClass('active');
});

// dropDown stopPropagation
$(".dropdown-menu").click(function (e) {
  e.stopPropagation();
});

// PassWord Show In Setting Page
const iconsPassSet = document.querySelectorAll(".pass-icon");

if (iconsPassSet) {
  iconsPassSet.forEach((ic) => {
    ic.addEventListener("click", function () {
      let input = ic.parentElement.querySelector("input");
      showPassword(input, ic);
    });
  });
}

// Function To Show And Hide Password
function showPassword(input, icon) {
  if (input.type == "password") {
    input.setAttribute("type", "text");
    // icon.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    input.setAttribute("type", "password");
    // icon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }

  icon.classList.toggle("show");
}

let isRtl = $('html[lang="ar"]').length > 0;

// Normal Select To
$(".select").select2({
  dir: isRtl ? "rtl" : "ltr",
  minimumResultsForSearch: Infinity,
});

// Heart
$(document).on("click", ".heart", function () {
  if ($(this).find("i").hasClass("fa-regular")) {
    $(this).find("i").addClass("fa-solid c-yellow");
    $(this).find("i").removeClass("fa-regular");
  } else {
    $(this).find("i").removeClass("fa-solid c-yellow");
    $(this).find("i").addClass("fa-regular");
  }
});

// $('[data-pass]').on('click', function(){
// let item = $(this).attr('data-pass')
// sessionStorage.setItem("activeTab", JSON.stringify(item));
// })

let allCopy = document.querySelectorAll(".circle");

if (allCopy) {
  allCopy.forEach((el) => {
    el.addEventListener("click", function () {
      let code = el.closest(".copy-item").querySelector(".copy-num");
      CopyToClipboard(code);
    });
  });
}

function CopyToClipboard(id) {
  var r = document.createRange();
  r.selectNode(id);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

// Input Number
$(document).ready(function () {
  $(".minus").click(function () {
    var $input = $(this).parent().find("input");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $(".plus").click(function () {
    var $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});
