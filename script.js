var question = "";
var botReply = "";

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
// var q1 = "Is continental breakfast real breakfast?";
// var q2 = "What is the perfect place to plant a raspberry bush?";
// var q3 = "Is pistachio ice cream good?";
// var q4 = "People who hate pistachio are weird?";
// question = q4;


onEvent("myButton", "click", function () {
    question = getValue("user-question");
    query({
        messages: [
            {
                role: "user",
                content: question + " Give a twenty word rant.",
            },
        ],
        model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
    }).then((response) => {
        console.log(JSON.stringify(response));
        // here!
        botReply = response.choices[0].message.content;
        console.log(botReply);
        setText("output-display", botReply);
    });
    // not here.
    console.log(botReply);
});