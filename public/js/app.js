console.log("The javascript file uploaded to client server.")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messsageOne = document.querySelector("#message-1")
const messsageTwo = document.querySelector("#message-2")

messsageOne.textContent = "Loading..."
messsageTwo.textContent = ""

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messsageOne.textContent = data.error
                messsageTwo.textContent = ""
            } else {
                messsageOne.textContent = data.location
                messsageTwo.textContent = data.summary
            }
        })
    })


    console.log(location)
})
