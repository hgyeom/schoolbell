// function getMaxNumber() {
//   // 정수형끼리의 덧셈이 되지 않도록 문자열로 저장
//   const nums = ['9', '7', '5', '3', '1'];
//   let num1 = '';
//   let num2 = '';

//   // 가장 큰 수 두개를 곱해야 가장 큰 수가 나온다.
//   // 가장 큰 수를 여러번 곱할수록 큰 수가 나온다.

//   // 5개의 수를 조합하여 큰 수를 만드려면 3자리 * 2자리
//   // 그럼, 가장 큰 수를 여러번 곱하기 위해 2자리의 십의자리에 넣는다. ( 3번 곱할 수 있다.)
//   num2 += nums[0];

//   // 가장 큰 수와 다음 큰 수를 곱해야 하기 때문에 3자리의 백의자리에 넣는다.
//   num1 += nums[1];

//   // 다음으로, 가장 큰 수와 3번째로 큰 수를 곱해야 한다. 3자리의 십의자리에 3번째로 큰 수가 들어가야 한다.
//   // 이제 4번째로 큰 수와 마지막 수만 남았다. 4번째로 큰 수를 더 많이 곱해야 하니 2자리의 빈 자리에 넣는다.
//   // 자연스럽게 마지막 수는 3자리의 빈 자리에 넣는다.
//   for (let i = 2; i < nums.length; i++) {
//     if (i % 2 === 0) {
//       num1 += nums[i];
//     } else {
//       num2 += nums[i];
//     }
//   }

//   console.log(num1, num2);
//   return parseInt(num1) * parseInt(num2);
// }

// console.log(getMaxNumber());

function solution(numbers) {
  let max = 0;
  let temp = [];
  const result = [];
  const N = numbers.length;
  const visited = new Array(N).fill(false);

  const dfs = (n, str) => {
    if (n === N) {
      result.push(str);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        visited[i] = true;
        dfs(n + 1, str + numbers[i]);
        visited[i] = false;
      }
    }
  };

  dfs(0, '');

  result.forEach((strNum) => {
    for (let i = 1; i < strNum.length; i++) {
      const first = parseInt(strNum.slice(0, i));
      const second = parseInt(strNum.slice(i));
      if (max < first * second) {
        max = first * second;
        temp = `${first}, ${second}`;
      }
    }
  });

  return [max, temp];
}

const arr = [1, 3, 5, 7, 9];
console.log(arr, solution(arr));
