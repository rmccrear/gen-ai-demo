async function query(data) {
    const response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

var botReply;
onEvent("myButton", "click", function () {
    query({
        messages: [
            {
                role: "user",
                content: "What is a good French pastry?",
            },
        ],
        model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
    }).then((response) => {
        console.log(JSON.stringify(response));
        botReply = response.choices[0].message.content;
        console.log(botReply);
    });
});