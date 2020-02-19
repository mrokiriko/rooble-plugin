// const axios = require('axios');

chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			console.log("Расчехляю свой полифон...");

			if (window.location.href.indexOf('vk') != -1){
				console.log('its VK');
				setInterval(fetch_posts, 1000);
			} else {
				console.log('its FB');

				setInterval(fetch_posts_fb, 1000);

			}

			// setInterval(fetch_post_ids, 1000);

			// fetch_posts();


		}
	}, 10);
});

var fetched_posts = {};

var hidden_posts = {};

function hide_news(post_id){
	console.log(post_id);
	alert(post_id);
}

async function fetch_posts_fb(){

	var els = document.getElementById('u_fetchstream_1_0').firstChild.childNodes;
	
	// console.log(document.getElementById('u_fetchstream_1_0').firstChild.childNodes);

	for (var i = 0; i < els.length; i++){

		var el = els[i];
		var el_id = el.querySelector('[data-testid="post_message"]').getAttribute('id');


		// console.log(els[i]);
		// console.log(el.querySelector('[data-testid="post_message"]'));
		// console.log(el.querySelector('[data-testid="post_message"]').innerText);
		
		// var el = els[i].children[0];

		if (el_id.includes('ads') != true){
			// console.log(el);
			var post_text = el.querySelector('[data-testid="post_message"]').innerText;

			// var post_text = el_id.getElementsByClassName('wall_post_text')[0].innerText; 
			if (fetched_posts[el_id] == undefined && post_text != ''){

				fetched_posts[el_id] = {
					text: post_text
				};

				var post_parent_id = await checkPost(post_text);

				if (post_parent_id > 0){
					if (hidden_posts[post_parent_id]){

						console.log('Новость скрыта. ' + el_id);
						console.log(post_text);

						// var btn = '<button onclick="document.getElementById(\'' + el_id + '\').style.display = \'block\'; this.style.display = \'none\'; ">SHOW HIDDEN</button>';
						// els[i].insertAdjacentHTML("beforeEnd", btn);
						// els[i].children[0].style.display = "none";


					} else {
						hidden_posts[post_parent_id] = true;
					}					
				}

				// console.log(fetched_posts);
				// console.log(hidden_posts);
			}
		}
	}	
}

async function fetch_posts(){
	var els = document.getElementsByClassName('feed_row');
	
	for (var i = 0; i < els.length; i++){
		var el = els[i].children[0];
		var el_id = el.getAttribute('id');

		if (el_id.includes('ads') != true){
			// console.log(el);
			var post_text_block = el.getElementsByClassName('wall_post_text')[0];

			if (post_text_block != undefined){
				var post_text = post_text_block.innerText.trim();
			}

			// var post_text = el_id.getElementsByClassName('wall_post_text')[0].innerText; 
			if (fetched_posts[el_id] == undefined && post_text_block != undefined && post_text != ''){

				fetched_posts[el_id] = {
					text: post_text
				};

				var post_parent_id = await checkPost(post_text);

				if (post_parent_id > 0){
					if (hidden_posts[post_parent_id]){


						console.log('Новость скрыта. ' + el_id);
						console.log(post_text);


						// var node = document.createElement("button");
						// var textnode = document.createTextNode("SHOW HIDDEN NEWS");
						// node.appendChild(textnode);
						// node.onclick = function() {document.getElementById(el_id).style.display = 'block';};
						// node.onclick = function() {alert('clicked');};

						// var btn = '<button onclick="document.getElementById('+el_id+').style.display = \'block\';">SHOW HIDDEN</button>';
						// var btn = '<button onclick="hide_news(\''+el_id+'\');">SHOW HIDDEN</button>';
						// var btn = '<button onclick="alert(document.getElementById(\'' + el_id + '\').innerHTML);">SHOW HIDDEN</button>';
						var btn = '<button onclick="document.getElementById(\'' + el_id + '\').style.display = \'block\'; this.style.display = \'none\'; ">SHOW HIDDEN</button>';


						// console.log(document.getElementById(el_id).innerHTML);


						// els[i].children[0].appendChild(node);
						// els[i].appendChild(node);
						els[i].insertAdjacentHTML("beforeEnd", btn);


						els[i].children[0].style.display = "none";


					} else {
						hidden_posts[post_parent_id] = true;
					}					
				}
				// console.log(fetched_posts);
				// console.log(hidden_posts);
			}
		}
	}	
}

async function checkPost(text) {
	// var link = 'https://gtusur.pythonanywhere.com/api/articles';
	var link = 'https://gtusur.pythonanywhere.com/api/articles/';
	try {
		// const response = await axios.post(link, {
		// const response = await axios.get(link,{
		// 	headers: {

		// 	}
		// });
		const response = await axios({
			method: 'post',
			url: link,
			data: {
				article: {
					text: text
				}
			},
			auth: {
			    username: 'lazy',
			    password: 'hong-kong'
			}
		});

		// const response = await axios.post(link, {
		// 	params: {
				// article: {
				// 	title: '',
				// 	text: text
				// }
		// 	},
			// auth: {
			//     username: 'lazy_ass',
			//     password: 'hong-kong'
			// }
		// });


		// console.log('response.data');
		// console.log(response.data);

		return response.data.data;
	} catch (error) {
		console.log(error);
		return -1;
	}
}

// async function fetch_post_ids(){

// 	var els = document.getElementsByClassName('feed_row');

// 	for (var i = 0; i < els.length; i++){
// 		// var el = els[i];
// 		// var el = els[i].[0];
// 		var el = els[i].children[0];
// 		var el_id = el.getAttribute('id');

// 		if (el_id.includes('ads') != true){
// 			// console.log(el);
// 			var post_text_block = el.getElementsByClassName('wall_post_text')[0];

// 			// var post_text = el_id.getElementsByClassName('wall_post_text')[0].innerText; 
// 			if (fetched_posts[el_id] == undefined && post_text_block != undefined){
// 				var post_text = post_text_block.innerText;
				
// 				var post_parent_id = await checkPost(post_text);

// 				if (typeof fetched_posts[post_parent_id] === 'undefined'){
					
// 					console.log('News was added');
// 					console.log(el_id);
// 					console.log(post_text);

// 					fetched_posts[post_parent_id] = {
// 						text: post_text
// 					};

// 					console.log('fetched_posts');
// 					console.log(fetched_posts);
// 				} else {
// 					console.log('СКРОЙСЯ НАХУЙ');
// 				}

// 			}
// 		}

// 	    // if (!fetched_posts.includes(el)){
//     	// 	fetched_posts.push(el);
// 		   //  console.log(el);
// 	    // }
// 	}	
// }

// window.onload = function()
// {
// 	 $('div.wall_post_text').load(function() {
// 	   alert('This element loaded.');
// 	});
// }