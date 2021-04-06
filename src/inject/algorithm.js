const axios = require('axios');

// var link = 'http://qruk000.pythonanywhere.com/api/article';

// axios.get('https://httpbin.org/get', {
//     // params: {
//     //   ID: 12345
//     // }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });  

// Want to use async/await? Add the `async` keyword to your outer function/method.

// function normalization(a){
// 	a = a.replace(new RegExp("[^а-яА-ЯёЁa-zA-Z ]", 'g'), ' ');
// 	a = a.replace(new RegExp("[ ][а-яё]{1,4}[ ]", 'g'), ' ');
// 	return 	a;
// 	a = a.replace(new RegExp("\b[а-яё0-9]{1,3}\b", 'g'), ' ');
// 	a = a.replace(new RegExp("\b[АОИЕЭУЮЯ][а-яё0-9]{1,3}\b", 'g'), ' ');
// 	a = a.replace(new RegExp("'[ ]+", 'g'), ' ');
// 	// a = a.replace(/ +(?= )/g,'');

// 	return a;
// }

// s = 'Украина обратится к России с требованием вернуть вещи и объекты, находившиеся на кораблях, возвращенных на этой неделе после задержания в Керченском проливе. Об этом заявил украинский президент Владимир Зеленский. Трансляцию вел телеканал «Громадске».'
// console.log(normalization('heloooo      my  name is'));
// console.log('|'+normalization(s)+'|');

// var s = 'bbbb   аббб  пбпбпбп аа cccc';

// console.log(s.replace(new RegExp("[ ][а-яё]{1,4}[ ]"), '_'));