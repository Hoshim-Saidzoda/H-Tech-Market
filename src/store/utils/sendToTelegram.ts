import { CartItem } from "../../types/product";

const BOT_TOKEN = "8554026981:AAEDycNH1YmDxsEp-z6ixmVJ6Hh4l1dhfkE";
const CHAT_ID = "5938949115";

export async function sendOrderToTelegram(
  name: string,
  phone: string,
  items: CartItem[],
  total: number
) {
  const productsText = items
    .map(
      (i, idx) =>
        `${idx + 1}. ${i.productName} x${i.quantity} — ${
          i.hasDiscount ? i.discountPrice : i.price
        } ₽`
    )
    .join("\n");

  const text = `
🛒 *Новый заказ*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}

📦 *Товары:*
${productsText}

💰 *Итого:* ${total} ₽
`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "Markdown",
    }),
  });
}
