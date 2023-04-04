// DOM Elements
let userinput = document.getElementById("user-input");
let output = document.getElementById("output");
// Variables
let cont = 0;


// Event Listeners
userinput.addEventListener("keydown", function (e) {
    let div = document.createElement("div");
    div.classList.add("flex");
    if (e.key === "Enter") {
        cont++;
        div.innerHTML = `<span class="text-green-400">indexer:~$</span><input id=${cont} type="text" class="pl-2 text-gray-100 bg-gray-800 w-full outline-0" >`;
        output.appendChild(div);
        document.getElementById(cont).focus();
        userinput.disabled = true;

        let inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    let div = document.createElement("div");
                    div.classList.add("flex");
                    if (e.key === "Enter") {
                        cont++;
                        div.innerHTML = `<span class="text-green-400">indexer:~$</span><input id=${cont} type="text" class="pl-2 text-gray-100 bg-gray-800 w-full outline-0" >`;
                        output.appendChild(div);
                        document.getElementById(cont).focus();
                        userinput.disabled = true;
                    }
                }
            });
        });
    }
});