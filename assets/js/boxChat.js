$(document).ready(function () {
    const chatIcon = $("#chat-icon");
    const chatBox = $("#chat-box");
    const closeChat = $("#close-chat");
    const resetChat = $("#reset-chat"); // Nút Reset
    const sendChat = $("#send-chat");
    const chatInput = $("#chat-input");
    const chatBody = $(".chat-body");

    // Hiển thị hộp chat khi bấm vào biểu tượng chat
    chatIcon.on("click", function () {
        chatBox.stop().slideToggle(300, "swing");
        chatIcon.hide();
    });

    // Đóng hộp chat khi bấm vào nút đóng
    closeChat.on("click", function (event) {
        chatBox.stop().slideToggle(300, "swing");
        chatIcon.show();
    });

    // Đóng hộp chat khi nhấn bên ngoài
    $(document).on("click", function (e) {
        if (!$(e.target).closest(chatIcon).length && !$(e.target).closest(chatBox).length) {
            chatBox.slideUp(300, "swing");
            chatIcon.show();
        }
    });

    // Gửi tin nhắn khi nhấn nút Gửi
    sendChat.on("click", sendMessage);

    // Gửi tin nhắn khi nhấn phím Enter
    chatInput.on("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Xử lý sự kiện khi bấm vào các nút câu hỏi mẫu
    $(".question-button").on("click", function () {
        const question = $(this).text();
        const answer = $(this).data("answer");

        addMessage("user", question);
        showTypingEffect(() => {
            addMessage("reply", `<img src="assets/img/logo/logo.svg" alt="" style="width: 100px" /> ${answer}`);
        });

        // Ẩn nút câu hỏi mẫu đã được bấm vào
        $(".chat-questions").hide();
    });

    // Xử lý sự kiện khi nhấn nút Reset
    resetChat.on("click", function () {
        chatBody.find(".message").remove(); 
        $(".chat-questions").show();
    });

    function sendMessage() {
        const message = chatInput.val().trim();
        if (message) {
            addMessage("user", message);
            chatInput.val("");
            showTypingEffect(() => {
                addMessage("reply", '<img src="assets/img/logo/logo.svg" alt="" style="width: 100px" /> Xin vui lòng chờ trong giây lát sẽ có người hỗ trợ vấn đề của bạn. Cảm ơn bạn đã luôn tin tưởng Điện máy Đăng Nho 2 ạ. Chúc bạn một ngày tốt lành!');
            });
        }
    }

    function addMessage(type, content) {
        const messageElement = $("<div>").addClass(`message ${type}`).html(content);
        chatBody.append(messageElement);
        chatBody.scrollTop(chatBody.prop("scrollHeight"));
    }

    function showTypingEffect(callback) {
        const typingElement = $("<div>")
            .addClass("message reply typing")
            .html('<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>');
        chatBody.append(typingElement);
        chatBody.scrollTop(chatBody.prop("scrollHeight"));

        setTimeout(function () {
            typingElement.remove();
            callback();
            chatBody.scrollTop(chatBody.prop("scrollHeight"));
        }, 2000);
    }
});
