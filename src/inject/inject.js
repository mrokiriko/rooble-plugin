let fetched_posts = {};
let hidden_posts = {};
let hide_ad_parameter = true;

const main = async () => {


    // if (typeof jQuery != 'undefined') {
    //     // jQuery is loaded => print the version
    //     alert(jQuery.fn.jquery);
    // } else {
    // 	alert('u have got no jquery!');
    // }

    if (window.location.href.indexOf('vk.com') === -1) {
        return null;
    }

    hidden_posts = JSON.parse(localStorage.getItem('hidden'));

    if (hidden_posts == null) {
        hidden_posts = {};
    }

    let post_elements = document.getElementsByClassName('feed_row');
    await hide_similar_posts(post_elements);

    let observer = new MutationObserver(async el => {

        if (el[0].target.className === '_feed_rows') {

            let post_elements = [];

            for (let i = 0; i < el.length; i++) {
                let post = el[i].addedNodes[0];
                post_elements.push(post);
            }

            await hide_similar_posts(post_elements);
        }
    });


    const post_selector = document.querySelector("._feed_rows");
    observer.observe(post_selector, {
        childList: true,
        subtree: true,
        characterDataOldValue: true
    });
};

main().then(r => {
});

function get_and_fetch_page_posts(post_elements) {
    let posts = [];

    for (let i = 0; i < post_elements.length; i++) {
        if (post_elements[i] === undefined) {
            continue;
        }

        let post = post_elements[i].children[0];

        if (post === undefined) {
            continue;
        }

        let post_id = post.getAttribute('id');

        if (post_id !== null && post_id.includes('ads') !== true) {
            let post_text = post.getElementsByClassName('wall_post_text')[0];

            // ToDo remove spaces
            if (post_text !== undefined)
                post_text = post_text.innerText.trim();

            if (fetched_posts[post_id] === undefined && post_text !== undefined && post_text !== '') {

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

function hide_posts(response, post_elements) {

    console.log('response');
    console.log(response);

    for (let i = 0; i < response.length; i++) {
        if (response[i].success !== true)
            continue;

        let post_id = response[i].msg;

        if (post_id > 0) {
            if (hidden_posts[post_id]) {

                let el = post_elements[i];

                create_hide_post_button(el);
            } else {
                hidden_posts[post_id] = true;
            }
        }
    }

    localStorage.setItem('hidden', JSON.stringify(hidden_posts));
}

function create_hide_post_button(el) {
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

async function hide_similar_posts(post_elements) {

    let posts = get_and_fetch_page_posts(post_elements);
    let post_els = [];
    let post_blocks = [];

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let post_id = post.getAttribute('id');
        let post_class = post.getAttribute('class');
        let image_url = '';
        let tags = post.getElementsByTagName('a');
        for (let j = 0; j < tags.length; j++) {
            tag = tags[j]
            if (tag.hasAttribute('style')) {

                let url = tag.getAttribute('style')

                let from = url.indexOf('url(');

                if (from > 0) {
                    from += 4;
                    url = url.substring(from, url.length - 2);

                    // console.log(url);
                    image_url = url;

                    break; // get only first picture
                }

            }
        }


        if (post_id !== null && post_id.includes('ads') !== true && post_class !== null && post_class.includes('ads') !== true) {
            let post_text = post.getElementsByClassName('wall_post_text')[0];

            // ToDo remove spaces
            if (post_text !== undefined)
                post_text = post_text.innerText.trim();

            post_els.push(post);

            let block = {
                text: post_text,
                image: image_url
            }

            post_blocks.push(block);
        }
    }

    if (hide_ad_parameter) {
        hide_ad_posts(posts)
    }

    if (post_blocks.length === 0)
        return false;

    let response = await checkPosts(post_blocks);

    hide_posts(response, post_els);
}

function hide_ad_posts(posts) {
    // ToDo plugin settings
    for (let i = 0; i < posts.length; i++) {
        let el = posts[i];
        let el_class = el.getAttribute('class');
        if (el_class.includes('ads')) {
            create_hide_post_button(el);
        }
    }
}

async function checkPosts(posts) {

    let link = 'https://kachalov.xyz/api/articles/';

    try {
        let texts = [];

        for (let i = 0; i < posts.length; i++) {
            texts.push({
                text: posts[i].text,
                // image: posts[i].image
            })
        }

        let data = {
            articles: texts
        };

        return $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: link,
            type: "POST",
            data: JSON.stringify(data),
            success: function (response) {
                return response;
            },
            error: function (request, status, error) {
                if (request.status == 429) {
                    console.log('its you again');
                } else {
                    console.log('other stupid error');
                }
                return [];
            }
        });

    } catch (error) {
        console.log('ERROR');
        console.log(error);
        return -1;
    }
}
