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
if($(".select").length){
  $(".select").select2({
    dir: isRtl ? "rtl" : "ltr",
    minimumResultsForSearch: Infinity,
  });
}

/************* Data Table *************/

$(document).ready(function () {
  var myTable = $("#myTable").dataTable({
    pageLength: 7,
    responsive: true,
    bLengthChange: false,
    "ordering": false,
    language: {
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
    },
  });

  $("#searchTable").on("keyup", function () {
    $("#myTable").DataTable().search($(this).val()).draw();
  });
});

/************* Upload Video Or Img *************/
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
    $(".img-upload-input").change(function () {
      imgPreview(this);
    });

    function imgPreview(input) {
      var file = input.files[0];
      var mixedfile = file["type"].split("/");
      var filetype = mixedfile[0];

      let photoContainer = $(input).closest(".upload-con").find(".photo-con");

      if (filetype == "image") {
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
          $(".remove-img").on("click", function (e) {
            e.target.closest(".hidden-img").remove();
          });
        };
        reader.readAsDataURL(input.files[0]);
      } else if (filetype == "video") {
        photoContainer.empty();

        let srcVideo = URL.createObjectURL(input.files[0]);

        let video = `
                            <div class="course-page-img">

                                <video class="img" src="${srcVideo}"></video>
                                <a href="${srcVideo}" class="video" data-fancybox="gallery" data-type='video'>
                                    <img src="../assets/imgs/icons/video_ic2.png" alt="" class="ic">
                                </a>

                                <button type='button' class='remove-img'>
                                    <img src='../assets/imgs/icons/close-square2.png' />
                                </button>

                            </div>
                        `;

        if (photoContainer.length) {
          photoContainer.append(video);
        } else {
          $(`.${$(input).data("video")}`).empty();
          $(`.${$(input).data("video")}`).append(video);
        }

        $(".remove-img").on("click", function (e) {
          e.target.closest(".course-page-img").remove();
        });
      } else {
        alert("Invalid file type");
      }
    }
  }
});

$(".remove-img").on("click", function (e) {
  e.target.closest(".course-page-img").remove();
});
