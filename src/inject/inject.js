chrome.extension.sendMessage({}, function(response) {

	// ToDo use event or listener
	let readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			console.log("Расчехляю свой полифон...");

			if (window.location.href.indexOf('vk.com') !== -1){
				console.log('its VK');
				setInterval(hide_similar_posts, 1000);
			} else {
				console.log('its not VK');
			}
		}
	}, 10);

});

let fetched_posts = {};
let hidden_posts = {};

function hide_news(post_id){
	console.log(post_id);
	alert(post_id);
}

async function hide_similar_posts(){
	let post_elements = document.getElementsByClassName('feed_row');
	
	let posts = [];

	for (let i = 0; i < post_elements.length; i++){
		let post = post_elements[i].children[0];

		let post_id = post.getAttribute('id');

		if (post_id !== null && post_id.includes('ads') !== true){
			let post_text = post.getElementsByClassName('wall_post_text')[0];

			// ToDo remove spaces
			if (post_text !== undefined){
				post_text = post_text.innerText.trim();
			}

			if (fetched_posts[post_id] === undefined && post_text !== undefined && post_text !== ''){

				fetched_posts[post_id] = {
					text: post_text
				};

				posts.push(post_text);
			}
		}
	}

	if (posts.length === 0){
		return false;
	}

	let response = await checkPosts(posts);

	for (let i = 0; i < response.length; i++){

		if (response[i].success !== 'True'){
			continue;
		}

		let post_id = response[i].msg;

		if (post_id > 0){

			if (hidden_posts[post_id]){

				let el = post_elements[i];

				console.log('Новость скрыта. ' + post_id);
				console.log(el);

				// create hidden button 
				let post_author = el.children[0].getElementsByClassName('author')[0].innerText;
				let command = "document.getElementById('" + post_id + "').getElementsByClassName('post_content')[0].style.display = 'block';";
				command += "document.getElementById('" + post_id + "').getElementsByClassName('author')[0].innerText = '" + post_author + "';";

				el.children[0].getElementsByClassName('_post_content')[0].setAttribute('onclick', command);
				el.children[0].getElementsByClassName('post_header')[0].style.padding = '15px 20px 15px';
				el.children[0].getElementsByClassName('author')[0].innerText = 'Show similar news';
				el.children[0].getElementsByClassName('post_content')[0].style.display = 'none';

			} else {
				hidden_posts[post_id] = true;
			}
		}
		
	}
}


async function checkPosts(posts) {

	let link = 'https://gtusur.pythonanywhere.com/api/articles/';

	try {
		texts = [];

		for (let i = 0; i < posts.length; i++){
			texts.push({
				text: posts[i]
			})
		}

		const response = await axios({
			method: 'post',
			url: link,
			data: {
				articles: texts
			},
			auth: {
			    username: 'lazy',
			    password: 'hong-kong'
			}
		});

		return response.data;
	} catch (error) {
		console.log('ERROR');
		console.log(error);
		return -1;
	}
}

async function checkPost(text) {
	let link = 'https://gtusur.pythonanywhere.com/api/articles/';
	try {
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
		return response.data.data;
	} catch (error) {
		console.log(error);
		return -1;
	}
}