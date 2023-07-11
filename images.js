const axios = require('axios');
const { getCanvasImage, registerFont, UltimateTextToImage } = require("ultimate-text-to-image");
registerFont("./assets/impact.ttf", { family: "Impact", weight: 100 });


module.exports.getUrl = async () => {
    const res = await axios.get('https://inspirobot.me/api?generate=true');
    return await res.data;
}

module.exports.getUninspiringUrl = async () => {
    const res = await axios.get('https://source.unsplash.com/random/600x600');
    return res.request.res.responseUrl
}


module.exports.getQuoteURI = async (quote) => {
    const url = await module.exports.getUninspiringUrl();
    const canvas = await getCanvasImage({ url })

    const img = new UltimateTextToImage(quote,
        {
            width: 600,
            height: 600,
            valign: "middle",
            align: "center",
            bold: "bold",
            fontFamily: "Impact",
            fontSize: 72,
            fontColor: "#FFFFFF",
            strokeSize: 2,
            strokeColor: "#000000",
            backgroundColor: "#FFFFFF00",
            images: [
                {
                    canvasImage: canvas,
                    layer: -1, repeat: "fit"
                },
            ]
        }
    );
    rendered = img.render().toBuffer();
    return rendered
}