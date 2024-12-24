$(document).ready(function () {
    const chatIcon = $("#chat-icon");
    const chatBox = $("#chat-box");
    const closeChat = $("#close-chat");
    const sendChat = $("#send-chat");
    const chatInput = $("#chat-input");
    const chatBody = $(".chat-body");

    // Hiển thị hộp chat khi bấm vào biểu tượng chat
    chatIcon.on("click", function () {
        chatBox.show();
        chatIcon.hide();
    });

    // Đóng hộp chat khi bấm vào nút đóng
    closeChat.on("click", function () {
        chatBox.hide();
        chatIcon.show();
    });

    // Gửi tin nhắn khi nhấn nút Gửi
    sendChat.on("click", sendMessage);

    // Gửi tin nhắn khi nhấn phím Enter
    chatInput.on("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.val().trim();
        if (message) {
            const messageElement = $("<div>").addClass("message user").text(message);
            chatBody.append(messageElement);

            // Hiển thị hiệu ứng "đang nhập"
            const typingElement = $("<div>").addClass("message reply typing").html('<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>');
            chatBody.append(typingElement);

            chatInput.val(""); 
            chatBody.scrollTop(chatBody.prop("scrollHeight"));

            // Sau 2 giây, thay thế hiệu ứng "đang nhập" bằng tin nhắn phản hồi
            setTimeout(function () {
                typingElement.remove();

                const replyElement = $("<div>").addClass("message reply").html('<img src="assets/img/logo/logo.svg" alt="" style="width: 100px" /> Xin vui lòng chờ trong giây lát sẽ có người hỗ trợ vấn đề của bạn. Cảm ơn bạn đã luôn tin tưởng Điện máy Đăng Nho 2 ạ. Chúc bạn một ngày tốt lành!');
                chatBody.append(replyElement);

                chatBody.scrollTop(chatBody.prop("scrollHeight"));
            }, 2000); 
        }
    }
});
