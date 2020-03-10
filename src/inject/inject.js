let fetched_posts = {};
let hidden_posts = {};

chrome.extension.sendMessage({}, function(response) {

	// ToDo use event or listener
	let readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			console.log("Расчехляю свой полифон...");

			hidden_posts = JSON.parse(localStorage.getItem('hidden'));

			if (hidden_posts == null){
				hidden_posts = {};
			}

			console.log('hidden_posts');
			console.log(hidden_posts);

			if (window.location.href.indexOf('vk.com') !== -1){
				console.log('its VK');
				setInterval(hide_similar_posts, 1000);
			} else {
				console.log('its not VK');
			}
		}
	}, 10);

});

function get_and_fetch_page_posts(post_elements){
	let posts = [];

	for (let i = 0; i < post_elements.length; i++){
		let post = post_elements[i].children[0];

		let post_id = post.getAttribute('id');

		if (post_id !== null && post_id.includes('ads') !== true){
			let post_text = post.getElementsByClassName('wall_post_text')[0];

			// ToDo remove spaces
			if (post_text !== undefined)
				post_text = post_text.innerText.trim();

			if (fetched_posts[post_id] === undefined && post_text !== undefined && post_text !== ''){

				fetched_posts[post_id] = {
					text: post_text
				};

				// posts.push(post_text);
				posts.push(post);
			}
		}
	}

	return posts;
}

function hide_posts(response, post_elements){
	for (let i = 0; i < response.length; i++){

		if (response[i].success !== true)
			continue;

		let post_id = response[i].msg;

		if (post_id > 0){
			if (hidden_posts[post_id]){

				let el = post_elements[i];
				console.log('Новость скрыта. ' + post_id);
				console.log(el);

				create_hide_post_button(el);
			} else {
				hidden_posts[post_id] = true;
			}
		}
	}

	localStorage.setItem('hidden', JSON.stringify(hidden_posts));
}

function create_hide_post_button(el){
	// create hidden button
	let post_author = el.getElementsByClassName('author')[0].innerText;
	let id = el.getAttribute('id');

	let command = "document.getElementById('" + id + "').getElementsByClassName('post_content')[0].style.display = 'block';";
	command += "document.getElementById('" + id + "').getElementsByClassName('author')[0].innerText = '" + post_author + "';";

	el.getElementsByClassName('_post_content')[0].setAttribute('onclick', command);
	el.getElementsByClassName('post_header')[0].style.padding = '15px 20px 15px';
	el.getElementsByClassName('author')[0].innerText = 'Show similar news';
	el.getElementsByClassName('post_content')[0].style.display = 'none';
}

async function hide_similar_posts(){
	let post_elements = document.getElementsByClassName('feed_row');
	let posts = get_and_fetch_page_posts(post_elements);

	let post_texts = [];

	for (let i = 0; i < posts.length; i++){
		let post = posts[i];
		let post_id = post.getAttribute('id');

		if (post_id !== null && post_id.includes('ads') !== true){
			let post_text = post.getElementsByClassName('wall_post_text')[0];

			// ToDo remove spaces
			if (post_text !== undefined)
				post_text = post_text.innerText.trim();

			post_texts.push(post_text);
		}
	}

	if (post_texts.length === 0)
		return false;

	let response = await checkPosts(post_texts);
	hide_posts(response, posts);
}


async function checkPosts(posts) {

	let link = 'https://gtusur.pythonanywhere.com/api/articles/';

	try {
		let texts = [];

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
