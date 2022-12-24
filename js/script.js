const boxTitle = document.querySelector("#box-title");
const inputNameBox = document.querySelector(".input-name-box");
const inputName = document.querySelector("#input-name");
const continueBtn = document.querySelector(".green");
const errorMsg = document.querySelector(".error-msg");
const spanUserName = document.querySelector("#username");
const choiceDiv = document.querySelector(".choiceDiv");
const box = document.querySelector(".box");
const drawBtn = document.querySelector(".draw");
var userName = "";

const changeStatus = (elm, newStatus) => {
	elm.style.borderColor = newStatus;
};

const showError = (data) => {
	const args = data.args;
	const msg = data.msg;
	args.forEach((elm) => {
		changeStatus(elm, "red");
	});
	errorMsg.style.display = "flex";
	errorMsg.innerText = msg;
};

const randomNumber = (max) => Math.floor(Math.random() * max) + 1;

const hideError = (...args) => {
	args.forEach((elm) => {
		changeStatus(elm, "black");
	});
	errorMsg.style.display = "none";
	errorMsg.innerText = "";
};

const fetchApi = async (endPoint) => {
	const randId = randomNumber(6);
	try {
		const res = await fetch(
			`https://63a730a27989ad3286ebc873.mockapi.io/api/${endPoint}/${randId}`
		);
		const data = res.json();
		return data;
	} catch (e) {
		console.log(e);
	}
};

continueBtn.addEventListener("click", () => {
	if (!inputName.value) {
		const data = {
			args: [inputName],
			msg: "Nhập tên của cậu vào đi :<",
		};
		showError(data);
		return;
	}
	userName = inputName.value;
	boxTitle.innerText = `Xin chào ${userName}, trả lời 1 vài câu hỏi đơn giản này nhé!`;
	inputName.style.display = "none";
	spanUserName.innerText = userName;
	choiceDiv.style.display = "flex";
	continueBtn.style.display = "none";
	drawBtn.style.display = "block";
});

inputName.addEventListener("keyup", () => {
	hideError(inputName);
});
