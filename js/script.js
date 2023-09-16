const widthVideoItem = 330;
const columnGap = 16;

const headerEnd = document.getElementById("end"),
  searchIcon = document.getElementById("search-icon"),
  searchContainer = document.getElementById("search-container"),
  backIcon = document.getElementById("back-arrow-icon"),
  headerStart = document.getElementById("start");

const sidebar = document.getElementById("sidebar"),
  toggle = document.getElementById("toggle"),
  sidebarToggle = document.getElementById("sidebar-toggle"),
  scrim = document.getElementById("scrim");
const w = window.matchMedia("(max-width: 1312px)");

const homeContainer = document.getElementById("home"),
  chipsContainer = document.getElementsByClassName("chips-container"),
  leftIcon = document.getElementById("gradient-left-button"),
  rightIcon = document.getElementById("gradient-right-button"),
  // videoItem = document.getElementsByClassName("video-item"),
  // videoItemInner = document.getElementsByClassName("video-item-inner"),
  videosContainer = document.getElementsByClassName("videos-container");

// handle click button search on small screen
function toggleSearchBoxOnSmallScreen() {
  headerStart.classList.toggle("clicked-search-icon");
  headerEnd.classList.toggle("clicked-search-icon");
  backIcon.classList.toggle("clicked-search-icon");
  searchContainer.classList.toggle("clicked-search-icon");
  searchIcon.classList.toggle("clicked-search-icon");
}

searchIcon.addEventListener("click", () => {
  toggleSearchBoxOnSmallScreen();
});

backIcon.addEventListener("click", () => {
  toggleSearchBoxOnSmallScreen();
});

//Cách 1 handle toggle sidebar
var d = false;
function fun(e) {
  if (e.matches) {
    if (!sidebar.classList.contains("close")) {
      sidebar.classList.add("close");
      d = true;
    } else {
      d = false;
    }
    scrim.classList.remove("show");
  } else {
    if (d) {
      sidebar.classList.remove("close");
    } else {
      sidebar.classList.add("close");
    }
    // scrim.classList.remove("show");
  }
}
// for initial screen width change detection
if (window.innerWidth < 1313) {
  fun(w);
}

w.addEventListener("change", fun);

[toggle, sidebarToggle, scrim].forEach(function (elm) {
  elm.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    scrim.classList.toggle("show");
  });
});

// Cách 2 handle toggle sidebar
// var x = false;
// function fun(e) {
//   if (e.matches) {
//     if (sidebar.classList.contains("close")) {
//       sidebar.classList.remove("close");
//       x = true;
//     } else {
//       x = false;
//     }
//     sidebar.classList.add("close2");
//   } else {
//     if (x) {
//       sidebar.classList.add("close");
//     }
//   }
// }
// // for initial screen width change detection
// fun(w);

// w.addEventListener("change", fun);

// toggle.addEventListener("click", () => {
//   if (window.innerWidth < 1313) {
//     sidebar.classList.toggle("close2");
//   } else {
//     sidebar.classList.toggle("close");
//   }
// });

const scrollRange = 300;

function displayNextChipsButton(){
  //ở màn hình đủ to hiển thị đủ nội dung.không có scrollbar
  if (chipsContainer[0].scrollWidth === chipsContainer[0].offsetWidth) {
    //ẩn next icon và back icon
    rightIcon.classList.add("none-icon");
    leftIcon.classList.add("none-icon");

    //ra màn hình to thì xóa cờ endpoint (nếu có) để khi resize xuống lại màn hình bé sẽ hiển thị next icon
    rightIcon.classList.remove("endpoint");
  }

  //xuống màn hình bé nội dung bị tràn mất.xuất hiện scrollbar
  if (chipsContainer[0].scrollWidth > chipsContainer[0].offsetWidth) {
    rightIcon.classList.remove("none-icon"); //hiển thị next icon

    //nếu next icon đang ẩn ở màn hình bé (đã scroll đến điểm cuối) thì khi resize trong màn hình bé sẽ không hiển thị lại next icon nữa
    if (rightIcon.classList.contains("endpoint")) {
      rightIcon.classList.add("none-icon");
    }
  }
}
//xử lý khi khi load trang lần đầu tiên
displayNextChipsButton();
//Lắng nghe nếu có sự thay đổi chipsContainer[0] size
new ResizeObserver(displayNextChipsButton).observe(chipsContainer[0]);

rightIcon.addEventListener("click", () => {
  chipsContainer[0].scrollLeft += scrollRange;

  //hiện arrow-back khi click arrow-next
  leftIcon.classList.remove("none-icon");

  //ẩn arrow-next + gắn cờ endpoint khi đã scroll đến điểm cuối
  if (
    chipsContainer[0].scrollWidth -
      (chipsContainer[0].offsetWidth + chipsContainer[0].scrollLeft) <=
    scrollRange
  ) {
    rightIcon.classList.add("none-icon", "endpoint");
  }
});

leftIcon.addEventListener("click", () => {
  chipsContainer[0].scrollLeft -= scrollRange;

  /* đã scroll đến điểm cuối (next-icon ẩn) ---> sau đó click back icon (next-icon sẽ hiện lại) ---> 
   thì phải xóa cờ endpoint cho next icon (để khi resize trong màn hình bé thì next-icon ko bị ẩn ko mong muốn) */
  rightIcon.classList.remove("endpoint");

  ////hiện arrow-next khi click arrow-back
  rightIcon.classList.remove("none-icon");

  //ẩn arrow-back khi đã scroll về điểm đầu
  if (chipsContainer[0].scrollLeft <= scrollRange) {
    leftIcon.classList.add("none-icon");
  }
});

// //
function centerVideoItem() {
  const widthAVideoItem = widthVideoItem + columnGap;
  const spaceAvailable =
    videosContainer[0].offsetWidth -
    Math.floor(videosContainer[0].offsetWidth / widthAVideoItem) *
      widthAVideoItem;

  videosContainer[0].style.margin = `56px ${spaceAvailable / 2}px 0`;
}
//xử lý khi khi load trang lần đầu tiên
centerVideoItem();
//Lắng nghe nếu có sự thay đổi videosContainer[0] size
new ResizeObserver(centerVideoItem).observe(videosContainer[0]);
