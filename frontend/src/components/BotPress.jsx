import { useEffect } from "react";

const BotpressChat = () => {
    useEffect(() => {
        // Thêm script Botpress vào DOM
        const script1 = document.createElement("script");
        script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        script1.async = true;


        const script2 = document.createElement("script");
        script2.src = "https://files.bpcontent.cloud/2024/11/20/03/20241120030155-YVB2QQCT.js";
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);

        // Cleanup script khi component unmount
        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);

            // Ẩn hoặc xoá webchat khỏi trang
            const webchatContainer = document.querySelector("iframe#bp-widget");
            if (webchatContainer) {
                webchatContainer.remove();
            }
        };
    }, []);

    return null; // Không cần render bất cứ nội dung nào
};

export default BotpressChat;
