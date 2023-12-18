// 여기에 정답을 작성해주세요

// 1
const target1 = document.querySelector('#target-1');
target1.classList.remove('border');

// 2
target1.style.left = '250px';

// 3
const target2 = document.querySelector('.target-2');
target2.classList.remove('border');
target2.classList.add('blue');

// 3 replace
// target2.classList.replace('border','blue');

// 4
target2.style.cssText = 'left: 50px; margin-top: -15px;';

// 5
const target3 = document.querySelector('#target-3');
const target4 = document.querySelector('#target-4');

target3.style.transition = 'opacity 500ms';
target3.style.opacity = '0';

target3.addEventListener('transitionend', () => {
  target3.style.display = 'none';
  target4.classList.add('green');
});

// 아래 코드는 수정하지 않습니다

// // 1
// $('#target-1').removeClass('border');

// // 2
// $('#target-1').css('left', '250px');

// // 3
// $('.target-2').removeClass('border').addClass('blue');

// // 4
// $('.target-2').css({ left: 50, 'margin-top': '-15px' });

// // 5
// $('#target-3').fadeOut(() => $('#target-4').addClass('green'));
