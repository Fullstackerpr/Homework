import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// MongoDB ulanishi
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB ulanishi muvaffaqiyatli'))
  .catch((err) => console.log('MongoDB ulanishida xato: ', err));

// Ma'lumotlar modeli
const UserSchema = new mongoose.Schema({
  phone_number: String,
});

const User = mongoose.model('User', UserSchema);

// Botni ishga tushirish
function startBot() {
  console.log('Bot is running...');
  bot.launch();
}

// /start komandasi
bot.start((ctx) => {
  ctx.reply(
    'Iltimos, telefon raqamingizni ulashing:',
    Markup.keyboard([
      Markup.button.contactRequest('📱 Raqamni ulashish')
    ])
    .oneTime()
    .resize()
  );
});

// Kontaktni qabul qilish va ma'lumotlar bazasiga saqlash
bot.on('contact', async (ctx) => {
  const contact = ctx.message.contact;
  const phone_number = contact.phone_number;

  // Yangi foydalanuvchini ma'lumotlar bazasiga qo'shish
  const newUser = new User({ phone_number });
  await newUser.save();

  ctx.reply(`Rahmat! Sizning raqamingiz: ${phone_number} saqlandi.`);
});

// /create komandasini yaratish
bot.command('create', async (ctx) => {
  const contact = ctx.message.contact;
  const phone_number = contact.phone_number;

  const newUser = new User({ phone_number });
  await newUser.save();

  ctx.reply(`Foydalanuvchi ${phone_number} yaratildi!`);
});

// /findall komandasini yaratish
bot.command('findall', async (ctx) => {
  const users = await User.find();
  
  if (users.length === 0) {
    return ctx.reply('Hech qanday foydalanuvchi topilmadi.');
  }

  let response = 'Barcha foydalanuvchilar:\n';
  users.forEach(user => {
    response += `Telefon raqam: ${user.phone_number}\n`;
  });

  ctx.reply(response);
});

startBot();
