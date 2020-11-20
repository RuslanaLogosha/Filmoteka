import throttle from 'lodash.throttle';

const upBtn = document.querySelector('[data-up-btn]');

window.addEventListener('scroll', throttle(hideElOnScroll(upBtn), 250));
upBtn.addEventListener('click', toPageTopOnClick);

function hideElOnScroll(el) {
  return function hideOnScroll(e) {
    if (pageYOffset < document.documentElement.clientHeight) {
      el.classList.add('visuallyhidden');
    } else {
      el.classList.remove('visuallyhidden');
    }
  };
}

function toPageTopOnClick(e) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// // Добавляет плавность
// function smoothScrollBackToTop() {
//   const targetPosition = 0;
//   const startPosition = window.pageYOffset;
//   const distance = targetPosition - startPosition;
//   const duration = 750;
//   let start = null;

//   window.requestAnimationFrame(step);

//   function step(timestamp) {
//     if (!start) start = timestamp;
//     const progress = timestamp - start;
//     window.scrollTo(
//       0,
//       easeInOutCubic(progress, startPosition, distance, duration),
//     );
//     if (progress < duration) window.requestAnimationFrame(step);
//   }
// }

// function easeInOutCubic(t, b, c, d) {
//   t /= d / 2;
//   if (t < 1) return (c / 2) * t * t * t + b;
//   t -= 2;
//   return (c / 2) * (t * t * t + 2) + b;
// }

// // //Get the button
// // const mybutton = document.querySelector('[button-top]');
// // mybutton.addEventListener('click', topFunction);
// // // When the user scrolls down 20px from the top of the document, show the button
// // window.onscroll = function () {
// //   scrollFunction();
// // };

// // function scrollFunction() {
// //   if (
// //     document.body.scrollTop > 300 ||
// //     document.documentElement.scrollTop > 300
// //   ) {
// //     mybutton.style.display = 'block';
// //   } else {
// //     mybutton.style.display = 'none';
// //   }
// // }

// // // When the user clicks on the button, scroll to the top of the document
// // function topFunction() {
// //   document.body.scrollTop = 0;
// //   document.documentElement.scrollTop = 0;
// // }
