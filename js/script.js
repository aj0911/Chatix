const message = document.querySelector('#message')
const send = document.querySelector('#send');
const chats = document.querySelector('.chats'); 
const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';

send.addEventListener('click',()=>{
    prompt = message.value;
    message.value = '';
    if(prompt!==''){
        send.style.display ='none';
        placeholder = message.placeholder;
        message.placeholder = 'Generating Text';
        sendHTML = `<div class="chat send">
                            <span>${prompt}</span>
                        </div>`;
        chats.insertAdjacentHTML("beforeend",sendHTML);
        chats.scrollTop = chats.scrollHeight;
        loadHTML = `<div class="chat response">
                            <div class="loader"></div>
                        </div>`;
        chats.insertAdjacentHTML("beforeend",loadHTML);
        chats.scrollTop = chats.scrollHeight;

        fetch(API_URL,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body:JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            })
        }).then(res=>res.json()).then(data=>{
            res = data.choices[0].message.content;
            resHTML = `<div class="chat response">
                        <span>${String(res)}</span>
                    </div>`;
            chats.removeChild(chats.lastChild);
            chats.scrollTop = chats.scrollHeight;
            chats.insertAdjacentHTML("beforeend",resHTML)
            chats.scrollTop = chats.scrollHeight;
            send.style.display ='flex';
            message.placeholder = placeholder;
        }).catch(err=>console.log(err.message))
    }
})