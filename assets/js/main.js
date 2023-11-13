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

  $(".sidebar-m .logo").css("height", navbarHeight);
});

// SideBar
$("#open_links").on("click", function () {
  $(".sidebar-m").addClass("active");
  $(".nav-overlay").addClass("active");
});

// SideBar
$(".nav-overlay").on("click", function () {
  $(".sidebar-m").removeClass("active");
  $(this).removeClass("active");
});

let isRtl = $('html[lang="ar"]').length > 0;

// Normal Select To
if ($(".select").length > 0) {
  $(".select").select2({
    dir: isRtl ? "rtl" : "ltr",
    minimumResultsForSearch: Infinity,
  });
}

/************* Data Table *************/

$(document).ready(function () {
  let tableTanguage = {};
  let arTable = {
    paginate: {
      previous: `<i class="fa-solid fa-angles-left"></i>`,
      next: `<i class="fa-solid fa-angles-right"></i>`,
    },
    sProcessing: "جارٍ التحميل...",
    sLengthMenu: "أظهر _MENU_ مدخلات",
    sZeroRecords: "لم يعثر على أية سجلات",
    sInfo: "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
    sInfoEmpty: "يعرض 0 إلى 0 من أصل 0 سجل",
    sInfoFiltered: "(منتقاة من مجموع _MAX_ مُدخل)",
    sInfoPostFix: "",
  };

  let enTable = {
    paginate: {
      previous: `<i class="fa-solid fa-angles-left"></i>`,
      next: `<i class="fa-solid fa-angles-right"></i>`,
    },
    sLengthMenu: "Display _MENU_ records per page",
    sZeroRecords: "Nothing found - sorry",
    zInfo: "Showing page _PAGE_ of _PAGES_",
    sInfoEmpty: "No records available",
    sInfoFiltered: "(filtered from _MAX_ total records)",
  };

  if (isRtl) {
    tableTanguage = arTable;
  } else {
    tableTanguage = enTable;
  }

  var myTable = $("#myTable").dataTable({
    pageLength: 7,
    // responsive: true,
    bLengthChange: false,
    ordering: false,
    language: tableTanguage,
  });

  $("#searchTable").on("keyup", function () {
    $("#myTable").DataTable().search($(this).val()).draw();
  });
});

/************* Upload Files Or Img *************/
let loginInputs = document.querySelectorAll(".img-upload-input");

loginInputs.forEach((input) => {
  if (input.classList.contains("profile")) {
    let img = input.parentElement.querySelector(".profile-img .img");
    let imageSrc = img.getAttribute("src");
    input.onchange = function () {
      let reader = new FileReader();
      if (input.files[0]) {
        reader.readAsDataURL(input.files[0]);
      } else {
        img.setAttribute("src", imageSrc);
        img.classList.remove("wid");
      }

      reader.onload = () => {
        img.setAttribute("src", reader.result);
        img.classList.add("wid");
      };
    };
  } else {
    input.addEventListener("change", function () {
      imgPreview(input);
    });

    function imgPreview(input) {
      var file = input.files[0];
      var mixedfile = file["type"].split("/");
      var filetype = mixedfile[0];
      let photoContainer = $(input).closest(".upload-con").find(".photo-con");

      const multiple = $(input).attr("multiple");

      if (multiple) {
        if (filetype == "image") {
          uploadMultiImgs(input, photoContainer);
        } else if (filetype == "application") {
          uploadFile(input, photoContainer);
        }
      } else {
        if (filetype == "image") {
          uploadImg(input, photoContainer);
        } else if (filetype == "application") {
          photoContainer.empty();
          uploadFile(input, photoContainer);
        } else {
          alert("Invalid file type");
        }
      }
    }
  }
});

// uploadMultiImgs
function uploadMultiImgs(input, photoContainer) {
  for (file of input.files) {
    let reader = new FileReader();
    reader.onload = () => {
      let img = `
          <div class="hidden-img">
              <input type='hidden' value='${reader.result}' />
              <a class="fancybox" data-fancybox="gallery" href="${reader.result}">
                  <img class="img" src="${reader.result}" />
              </a>

              <button type='button' class='remove-img'>
                  <i class="fa-solid fa-xmark"></i>
              </button>

          </div>
      `;

      photoContainer.append(img);
      removeIcon();
    };
    reader.readAsDataURL(file);
  }
}

// Upload Image
function uploadImg(input, photoContainer) {
  var reader = new FileReader();
  reader.onload = function (e) {
    photoContainer.empty();
    let img = `
        <div class="hidden-img">

            <a class="fancybox" data-fancybox="gallery" href="${e.target.result}">
                <img class="img" src="${e.target.result}" />
            </a>

            <button type='button' class='remove-img'>
                <i class="fa-solid fa-xmark"></i>
            </button>

        </div>
    `;

    photoContainer.append(img);
    removeIcon();
  };
  reader.readAsDataURL(input.files[0]);
}

// uploadFiles
function uploadFile(input, photoContainer) {
  Object.values(input.files).forEach(function (file) {
    var name = file.name;

    let myFile = `
          <div class="upload-label">
              <input type='hidden' value='${name}' />
              <img src='./assets/imgs/icons/pdf-file.gif' />
              <span>${name}</span>
              <button type='button' class='remove-img'>
                <i class="fa-solid fa-xmark"></i>
              </button>
          </div>
        `;

    photoContainer.append(myFile);
    removeIcon();
  });
}

// Remove Icon
function removeIcon() {
  $(".remove-img").on("click", function (e) {
    if (e.target.closest(".hidden-img")) {
      e.target.closest(".hidden-img").remove();
    } else if (e.target.closest(".upload-label")) {
      e.target.closest(".upload-label").remove();
    }
  });
}

removeIcon();
