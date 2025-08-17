
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";


// --- Icons ---
const SteamIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 18H.5c.6-1.5 1-3.2 1-5C1.5 7.8 6 4 11.5 4c4.1 0 7.6 2.5 9 6"/><path d="M4 22h14c.6-1.5 1-3.2 1-5 0-5.2-4.5-9.5-10-9.5C4.9 7.5 1 11.1 1 15.5c0 .3 0 .6.1.9"/><path d="M7 18h11c.6-1.5 1-3.2 1-5 0-5.2-4.5-9.5-10-9.5C4.4 3.5.5 7.1.5 11.5c0 .4.1.8.1 1.2"/></svg>);
const IceCubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 10.5h18"/><path d="M10.5 3v18"/></svg>);
const DessertIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2h-1"/><path d="M12 11v-1"/><path d="M12 7V6"/></svg>);
const TimeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
const DifficultyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4"/><path d="M6 14l6 6 6-6"/></svg>);
const TypeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4"/><path d="M16 17H8"/><path d="M12 13H8"/><path d="M12 9H8"/></svg>);

// --- Data ---
const drinksData = [
    // --- نوشیدنی‌های گرم ---
    // 1-1. بر پایه قهوه و اسپرسو
    { id: 1, name: 'اسپرسو', category: 'hot', subcategory: 'hot-coffee', illustration: '☕️', description: 'اسپرسو یک نوشیدنی قهوه غلیظ و متمرکز است که با عبور آب نزدیک به نقطه جوش تحت فشار از میان دانه‌های قهوه آسیاب شده تهیه می‌شود. این نوشیدنی پایه‌ی بسیاری از نوشیدنی‌های محبوب کافه‌ای است.', prepTime: '۱ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱۸ تا ۲۰ گرم دانه قهوه با آسیاب مناسب اسپرسو'], instructions: ['دستگاه اسپرسوساز خود را روشن کرده و اجازه دهید کاملاً گرم شود. پرتافیلتر را نیز در هدگروپ قرار دهید تا گرم شود.', 'قهوه را به دقت وزن کرده و در پرتافیلتر بریزید. سطح قهوه را با ابزار مخصوص صاف کنید.', 'با استفاده از تمپر، قهوه را با فشاری یکنواخت فشرده کنید تا سطحی کاملاً صاف ایجاد شود.', 'لبه‌های پرتافیلتر را پاک کرده و آن را در هدگروپ دستگاه محکم کنید.', 'یک فنجان اسپرسوی گرم شده را زیر پرتافیلتر قرار داده و دکمه عصاره‌گیری را فشار دهید.', 'عصاره‌گیری باید بین ۲۵ تا ۳۰ ثانیه طول بکشد و یک شات اسپرسوی ۳۰ تا ۴۰ میلی‌لیتری با کرمای طلایی و غلیظ حاصل شود.'], tips: ['برای بهترین طعم، همیشه از دانه‌های قهوه تازه رست شده و تازه آسیاب شده استفاده کنید.', 'یکنواختی آسیاب و تمپ کردن صحیح، کلید یک عصاره‌گیری عالی است.'], englishName: 'Espresso', englishVisualName: 'a small porcelain espresso cup with a rich, thick crema on top', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a small, white espresso cup', englishPrimaryAction: 'extracting a rich, dark shot of espresso' },
    { id: 2, name: 'دوپیو', category: 'hot', subcategory: 'hot-coffee', illustration: '☕️', description: 'دوپیو یا اسپرسو دابل، یک شات اسپرسوی دو برابر (۶۰ میلی‌لیتر) است که انرژی و طعم قوی‌تری را برای دوست‌داران قهوه فراهم می‌کند.', prepTime: '۱ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱۸ تا ۲۰ گرم دانه قهوه با آسیاب مناسب اسپرسو'], instructions: ['مانند اسپرسوی سینگل، تمام مراحل آماده‌سازی پرتافیلتر را انجام دهید.', 'یک فنجان بزرگ‌تر را زیر پرتافیلتر قرار دهید.', 'عصاره‌گیری را برای مدت ۲۵ تا ۳۰ ثانیه انجام دهید تا حدود ۶۰ میلی‌لیتر اسپرسو به دست آید.'], tips: ['برای حفظ تعادل طعم، ممکن است نیاز به آسیاب کمی درشت‌تر نسبت به اسپرسوی سینگل داشته باشید.'], englishName: 'Doppio', englishVisualName: 'a slightly larger espresso cup containing a double shot of espresso', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a demitasse cup', englishPrimaryAction: 'extracting a double shot of espresso' },
    { id: 3, name: 'ریسترتو', category: 'hot', subcategory: 'hot-coffee', illustration: '☕️', description: 'ریسترتو یک شات اسپرسوی کوتاه‌تر و غلیظ‌تر است که با آب کمتری عصاره‌گیری می‌شود. نتیجه، نوشیدنی‌ای شیرین‌تر با اسیدیته کمتر و طعمی قوی‌تر است.', prepTime: '۱ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱۸ تا ۲۰ گرم دانه قهوه با آسیاب مناسب اسپرسو'], instructions: ['مراحل آماده‌سازی پرتافیلتر مشابه اسپرسو است.', 'عصاره‌گیری را کوتاه‌تر کنید، معمولاً بین ۱۵ تا ۲۰ ثانیه.', 'حجم نهایی ریسترتو حدود ۱۵ تا ۲۰ میلی‌لیتر خواهد بود.'], tips: ['ریسترتو به دلیل زمان کوتاه عصاره‌گیری، نت‌های شیرین و شکلاتی قهوه را بیشتر نمایان می‌کند.'], englishName: 'Ristretto', englishVisualName: 'a very short, concentrated shot of espresso in a small cup', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a small espresso cup', englishPrimaryAction: 'extracting a very short shot of espresso' },
    { id: 4, name: 'لاته', category: 'hot', subcategory: 'hot-coffee', illustration: '🥛', description: 'کافه لاته ترکیبی نرم و مخملی از یک شات اسپرسو و شیر بخارداده شده است که با لایه نازکی از فوم شیر پوشانده می‌شود. این نوشیدنی به خاطر طعم ملایم و بافت کرمی‌اش محبوب است.', prepTime: '۵ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱ شات اسپرسو (۳۰ میلی‌لیتر)', '۱۸۰ تا ۲۴۰ میلی‌لیتر شیر'], instructions: ['یک شات اسپرسو را مستقیماً در فنجان لاته خود عصاره‌گیری کنید.', 'شیر را در پیچر ریخته و با نازل بخار دستگاه، آن را بخار دهید تا به دمای ۶۵-۷۰ درجه سانتی‌گراد برسد و یک میکروفوم مخملی ایجاد شود.', 'شیر بخارداده شده را به آرامی به مرکز فنجان اسپرسو اضافه کنید. با کنترل جریان شیر می‌توانید لاته آرت ایجاد کنید.'], tips: ['حرکت دورانی پیچر هنگام بخار دادن شیر به ایجاد میکروفوم یکنواخت کمک می‌کند.', 'برای طعم بهتر، از شیر پرچرب استفاده کنید.'], englishName: 'Caffe Latte', englishVisualName: 'a latte in a ceramic cup with simple heart latte art', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall ceramic latte mug', englishPrimaryAction: 'pouring silky steamed milk into an espresso shot' },
    { id: 5, name: 'کاپوچینو', category: 'hot', subcategory: 'hot-coffee', illustration: '🥛', description: 'کاپوچینو یک نوشیدنی کلاسیک ایتالیایی با تعادل کامل بین اسپرسو، شیر بخارداده شده و لایه‌ای ضخیم و دلچسب از فوم شیر است. به طور سنتی، حجم هر سه بخش برابر است.', prepTime: '۵ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱ شات اسپرسو (۳۰ میلی‌لیتر)', '۱۵۰ میلی‌لیتر شیر'], instructions: ['یک شات اسپرسو را در فنجان کاپوچینو عصاره‌گیری کنید.', 'شیر را طوری بخار دهید که حجم بیشتری فوم نسبت به لاته ایجاد شود (حدود یک سوم حجم نهایی).', 'ابتدا شیر بخارداده شده و سپس لایه ضخیم فوم را با قاشق روی آن بریزید.'], tips: ['برای فوم بهتر، نوک نازل بخار را نزدیک به سطح شیر نگه دارید تا هوا وارد آن شود.', 'می‌توانید روی فوم را با کمی پودر کاکائو یا دارچین تزئین کنید.'], englishName: 'Cappuccino', englishVisualName: 'a cup of coffee with a thick layer of milk foam, dusted with cocoa', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a classic round cappuccino cup', englishPrimaryAction: 'spooning a thick cap of foam on top of espresso' },
    { id: 6, name: 'آمریکانو', category: 'hot', subcategory: 'hot-coffee', illustration: '☕️', description: 'آمریکانو با افزودن آب داغ به یک شات اسپرسو تهیه می‌شود و طعمی شبیه به قهوه دمی اما با ویژگی‌های اسپرسو دارد. این نوشیدنی برای کسانی که طعم ملایم‌تری از اسپرسو را ترجیح می‌دهند، ایده‌آل است.', prepTime: '۲ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۱ شات اسپرسو (۳۰ میلی‌لیتر)', '۱۲۰ تا ۱۸۰ میلی‌لیتر آب داغ'], instructions: ['ابتدا آب داغ را در فنجان بریزید.', 'سپس شات اسپرسو را به آرامی به آب داغ اضافه کنید. این کار به حفظ کرمای اسپرسو کمک می‌کند.'], tips: ['دمای آب داغ باید حدود ۸۵ تا ۹۰ درجه سانتی‌گراد باشد تا طعم قهوه نسوزد.', 'نسبت آب به اسپرسو را می‌توانید بر اساس سلیقه خود تغییر دهید.'], englishName: 'Americano', englishVisualName: 'a steaming black coffee in a large ceramic mug', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a large ceramic mug', englishPrimaryAction: 'pouring hot water into a mug with an espresso shot' },
    { id: 7, name: 'موکا', category: 'hot', subcategory: 'hot-coffee', illustration: '🍫', description: 'کافه موکا ترکیبی لذت‌بخش از اسپرسو، شیر بخارداده شده و شکلات است. این نوشیدنی یک دسر قهوه‌ای دلچسب است که معمولاً با خامه زده شده تزئین می‌شود.', prepTime: '۶ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱ شات اسپرسو', '۱۵۰ میلی‌لیتر شیر', '۳۰ میلی‌لیتر سس شکلات یا ۲ قاشق چای‌خوری پودر کاکائو', 'خامه زده شده برای تزئین (اختیاری)'], instructions: ['سس شکلات یا پودر کاکائو را در فنجان بریزید.', 'شات اسپرسو را روی آن عصاره‌گیری کرده و خوب هم بزنید تا کاملاً حل شود.', 'شیر را مانند لاته بخار داده و به مخلوط اسپرسو و شکلات اضافه کنید.', 'در صورت تمایل با خامه زده شده و پودر کاکائو تزئین و سرو کنید.'], tips: ['می‌توانید از شکلات تلخ، شیری یا حتی سفید برای تهیه موکا استفاده کنید.', 'برای طعم بیشتر، کمی وانیل به شیر اضافه کنید.'], englishName: 'Caffe Mocha', englishVisualName: 'a tall glass of coffee with chocolate sauce, steamed milk, and whipped cream', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall glass mug', englishPrimaryAction: 'pouring steamed milk into a glass with espresso and chocolate' },
    { id: 8, name: 'ماکیاتو', category: 'hot', subcategory: 'hot-coffee', illustration: '☕️', description: 'ماکیاتو در زبان ایتالیایی به معنای "لکه‌دار" است. این نوشیدنی یک شات اسپرسو است که با مقدار کمی فوم شیر "لکه" شده است تا طعم تند اسپرسو کمی ملایم‌تر شود.', prepTime: '۳ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱ شات اسپرسو', '۱ تا ۲ قاشق چای‌خوری فوم شیر'], instructions: ['یک شات اسپرسو را در فنجان اسپرسو عصاره‌گیری کنید.', 'مقدار کمی شیر را بخار داده تا فوم ایجاد شود.', 'یک یا دو قاشق از فوم شیر را با دقت در مرکز اسپرسو قرار دهید.'], tips: ['ماکیاتو برای کسانی مناسب است که طعم قوی اسپرسو را دوست دارند اما با کمی پیچیدگی و نرمی بیشتر.'], englishName: 'Macchiato', englishVisualName: 'a shot of espresso in a small glass "stained" with a dollop of milk foam', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a small demitasse glass', englishPrimaryAction: 'spooning a dollop of milk foam onto espresso' },
    { id: 9, name: 'فرانچ کافی', category: 'hot', subcategory: 'hot-coffee', illustration: '☕️', description: 'قهوه فرنچ پرس یک روش دم‌آوری غوطه‌وری است که به دلیل استخراج کامل روغن‌ها و طعم‌های قهوه، نوشیدنی‌ای با بدنه کامل و طعم غنی تولید می‌کند.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['۳۰ گرم قهوه با آسیاب درشت', '۵۰۰ میلی‌لیتر آب داغ (حدود ۹۳ درجه سانتی‌گراد)'], instructions: ['فرنچ پرس را با آب داغ پیش‌گرم کرده و خالی کنید.', 'پودر قهوه را در فرنچ پرس بریزید.', 'آب داغ را به آرامی اضافه کنید تا تمام قهوه خیس شود و ۴ دقیقه صبر کنید.', 'پس از ۴ دقیقه، اهرم فیلتر را به آرامی و به طور یکنواخت به سمت پایین فشار دهید.', 'بلافاصله قهوه را سرو کنید تا از عصاره‌گیری بیش از حد جلوگیری شود.'], tips: ['آسیاب درشت برای جلوگیری از ورود ذرات ریز قهوه به فنجان ضروری است.', 'پس از دم‌آوری، تمام قهوه را از فرنچ پرس خارج کنید.'], englishName: 'French Press Coffee', englishVisualName: 'a glass French press coffee maker filled with brewed coffee', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a glass French press carafe', englishPrimaryAction: 'plunging the filter down a glass carafe' },
    { id: 10, name: 'قهوه ترک', category: 'hot', subcategory: 'hot-coffee', illustration: '☕️', description: 'قهوه ترک یک روش سنتی و ثبت شده در یونسکو برای تهیه قهوه است که با استفاده از قهوه بسیار ریز آسیاب شده (مانند آرد) در جذوه (ایبریک) تهیه می‌شود. این قهوه غلیظ، کف‌آلود و بسیار معطر است.', prepTime: '۸ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱ قاشق چای‌خوری سرپر (حدود ۷ گرم) قهوه ترک', '۱ فنجان قهوه‌خوری آب سرد', 'شکر (به میزان دلخواه)'], instructions: ['آب سرد، قهوه و شکر را در جذوه بریزید و خوب مخلوط کنید.', 'جذوه را روی حرارت ملایم قرار دهید. از هم زدن بیشتر خودداری کنید.', 'وقتی قهوه شروع به بالا آمدن و ایجاد کف کرد، آن را از روی حرارت بردارید.', 'کف ایجاد شده را در فنجان بریزید و دوباره جذوه را روی حرارت قرار دهید.', 'این کار را یک یا دو بار دیگر تکرار کنید و سپس قهوه را به آرامی در فنجان بریزید.'], tips: ['حرارت ملایم کلید ایجاد کف غلیظ و جلوگیری از جوشیدن قهوه است.', 'قهوه ترک را پس از سرو، چند دقیقه بگذارید تا لرد آن ته‌نشین شود.'], englishName: 'Turkish Coffee', englishVisualName: 'a traditional ornate Turkish coffee pot (cezve) next to a small cup', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a small, ornate demitasse cup', englishPrimaryAction: 'pouring thick, foamy coffee from a cezve' },
    { id: 11, name: 'قهوه سفید', category: 'hot', subcategory: 'hot-coffee', illustration: '🥛', description: 'فلت وایت (قهوه سفید) نوشیدنی‌ای استرالیایی/نیوزلندی است که شبیه لاته است اما با نسبت قهوه به شیر بیشتر و لایه بسیار نازکی از میکروفوم مخملی. طعم قهوه در آن قوی‌تر و برجسته‌تر است.', prepTime: '۵ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱ شات دابل ریسترتو یا اسپرسو', '۱۵۰ میلی‌لیتر شیر'], instructions: ['شات اسپرسو (معمولاً دابل ریسترتو) را در فنجان خود عصاره‌گیری کنید.', 'شیر را با دقت بخار دهید تا یک میکروفوم بسیار نازک، براق و مخملی ایجاد شود، بدون کف زیاد.', 'شیر بخار داده شده را به آرامی روی اسپرسو بریزید تا با آن ترکیب شود.'], tips: ['کلید یک فلت وایت عالی، بافت ابریشمی و یکپارچه شیر است، نه لایه‌های جدا از هم.', 'معمولاً در فنجان سرامیکی کوچک‌تر از لاته سرو می‌شود.'], englishName: 'Flat White', englishVisualName: 'a ceramic cup of coffee with a thin, velvety layer of glossy microfoam', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a ceramic tulip cup', englishPrimaryAction: 'pouring a thin, velvety layer of microfoam over espresso' },
    // 1-2. بر پایه شکلات و شیر
    { id: 12, name: 'هات چاکلت', category: 'hot', subcategory: 'hot-chocolate', illustration: '🍫', description: 'شکلات داغ یک نوشیدنی کلاسیک و آرامش‌بخش است که با شیر گرم و شکلات تهیه می‌شود. این نوشیدنی غلیظ، خامه‌ای و دلچسب، انتخابی عالی برای روزهای سرد است.', prepTime: '۷ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۲ قاشق غذاخوری پودر کاکائو با کیفیت', '۱ تا ۲ قاشق غذاخوری شکر', '۲۵۰ میلی‌لیتر شیر', 'کمی نمک و عصاره وانیل (اختیاری)'], instructions: ['پودر کاکائو، شکر و نمک را در یک شیرجوش کوچک مخلوط کنید.', 'مقدار کمی از شیر را اضافه کرده و هم بزنید تا یک خمیر یکدست ایجاد شود. این کار از گلوله شدن کاکائو جلوگیری می‌کند.', 'بقیه شیر را اضافه کرده و روی حرارت متوسط قرار دهید.', 'به طور مداوم هم بزنید تا شیر گرم شود و شکلات کاملاً حل شود. اجازه ندهید بجوشد.', 'از روی حرارت برداشته، وانیل را اضافه کرده و در ماگ مورد علاقه خود سرو کنید.'], tips: ['برای طعم غنی‌تر، می‌توانید از شکلات تخته‌ای خرد شده به جای پودر کاکائو استفاده کنید.', 'روی آن را با مارشمالو یا خامه زده شده تزئین کنید.'], englishName: 'Hot Chocolate', englishVisualName: 'a cozy mug of rich hot chocolate topped with marshmallows', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a large, cozy mug', englishPrimaryAction: 'pouring rich hot chocolate into a mug' },
    { id: 13, name: 'موکاپاچینو', category: 'hot', subcategory: 'hot-chocolate', illustration: '🍫', description: 'موکاچینو ترکیبی از کاپوچینو و موکا است؛ یک کاپوچینوی کلاسیک با طعم دلپذیر شکلات. این نوشیدنی تعادل خوبی بین طعم قهوه، شیر و شکلات برقرار می‌کند.', prepTime: '۶ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱ شات اسپرسو', '۱۲۰ میلی‌لیتر شیر', '۱ قاشق غذاخوری پودر کاکائو یا سس شکلات'], instructions: ['پودر کاکائو یا سس شکلات را با شات اسپرسو در فنجان مخلوط کنید.', 'شیر را به سبک کاپوچینو بخار دهید تا فوم غلیظی ایجاد شود.', 'شیر بخارداده شده را به فنجان اضافه کرده و لایه فوم را روی آن قرار دهید.'], tips: ['می‌توانید روی فوم را با پودر کاکائو یا شکلات رنده شده تزئین کنید.'], englishName: 'Mochaccino', englishVisualName: 'a cappuccino with a distinct chocolate flavor, dusted with cocoa powder', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a cappuccino cup', englishPrimaryAction: 'pouring frothed milk over a chocolate-espresso mixture' },
    { id: 14, name: 'شیر دارچینی', category: 'hot', subcategory: 'hot-chocolate', illustration: '🥛', description: 'شیر دارچینی یک نوشیدنی گرم، معطر و آرامش‌بخش است که برای شب‌های آرام یا یک عصر دل‌انگیز عالی است. طعم شیرین و تند دارچین، حس گرما و راحتی را به ارمغان می‌آورد.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۱ لیوان (۲۵۰ میلی‌لیتر) شیر', '۱ چوب دارچین', '۱ قاشق چای‌خوری عسل یا شکر (اختیاری)'], instructions: ['شیر و چوب دارچین را در یک شیرجوش کوچک بریزید.', 'روی حرارت ملایم قرار دهید تا شیر به آرامی گرم شود. اجازه ندهید بجوشد.', 'قبل از رسیدن به نقطه جوش، از روی حرارت بردارید.', 'چوب دارچین را خارج کرده و در صورت تمایل با عسل شیرین کنید.'], tips: ['برای عطر بیشتر، می‌توانید کمی پودر جوز هندی یا زنجبیل به آن اضافه کنید.'], englishName: 'Cinnamon Milk', englishVisualName: 'a steaming mug of warm milk with a cinnamon stick inside', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a glass mug', englishPrimaryAction: 'a cinnamon stick steeping in a mug of warm milk' },
    { id: 15, name: 'شکلات داغ با نعناع', category: 'hot', subcategory: 'hot-chocolate', illustration: '🍫', description: 'ترکیب کلاسیک و جشن‌گونه‌ی شکلات غنی و طعم خنک و باطراوت نعناع. این نوشیدنی به خصوص در فصل زمستان بسیار محبوب است.', prepTime: '۸ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['مواد لازم برای شکلات داغ', '۱/۴ قاشق چای‌خوری عصاره نعناع یا چند برگ نعناع تازه'], instructions: ['شکلات داغ را طبق دستور معمول آماده کنید.', 'اگر از عصاره نعناع استفاده می‌کنید، آن را در انتها اضافه کرده و هم بزنید.', 'اگر از برگ نعناع تازه استفاده می‌کنید، آن را همراه با شیر گرم کرده و قبل از سرو خارج کنید.'], tips: ['برای تزئین می‌توانید از یک آب‌نبات عصایی (Candy Cane) به عنوان همزن استفاده کنید.'], englishName: 'Mint Hot Chocolate', englishVisualName: 'a mug of hot chocolate garnished with a candy cane and fresh mint', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a festive mug', englishPrimaryAction: 'stirring hot chocolate with a candy cane' },
    // 1-3. بر پایه چای
    { id: 16, name: 'چای سیاه ساده', category: 'hot', subcategory: 'hot-tea', illustration: '🍵', description: 'چای سیاه، یکی از محبوب‌ترین نوشیدنی‌ها در سراسر جهان، با طعم قوی و رنگ کهربایی‌اش شناخته می‌شود. این چای یک نوشیدنی کلاسیک و همیشگی برای شروع روز یا یک عصرانه دلچسب است.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق چای‌خوری چای سیاه خشک', '۵۰۰ میلی‌لیتر آب جوش'], instructions: ['قوری را با ریختن کمی آب جوش در آن و خالی کردنش، پیش‌گرم کنید.', 'چای خشک را در قوری بریزید.', 'آب جوش را به آن اضافه کنید.', 'درب قوری را گذاشته و اجازه دهید به مدت ۳ تا ۵ دقیقه دم بکشد.', 'چای را در فنجان صاف کرده و سرو کنید.'], tips: ['مدت زمان دم کشیدن بر طعم چای تأثیر می‌گذارد؛ زمان کوتاه‌تر طعم ملایم‌تر و زمان طولانی‌تر طعم گس‌تری ایجاد می‌کند.'], englishName: 'Black Tea', englishVisualName: 'a clear glass teacup of steaming, amber-colored black tea', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a traditional glass teacup', englishPrimaryAction: 'pouring black tea from a teapot into a cup' },
    { id: 17, name: 'چای سبز', category: 'hot', subcategory: 'hot-tea', illustration: '🍵', description: 'چای سبز به دلیل فرآوری حداقلی، سرشار از آنتی‌اکسیدان‌ها است و طعمی گیاهی، ملایم و کمی شیرین دارد. این چای به خاطر خواص سلامتی‌بخش خود بسیار محبوب است.', prepTime: '۴ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق چای‌خوری چای سبز', '۵۰۰ میلی‌لیتر آب با دمای ۸۰-۸۵ درجه سانتی‌گراد'], instructions: ['قوری را پیش‌گرم کنید.', 'چای سبز را در قوری بریزید.', 'آب داغ (که به نقطه جوش نرسیده) را روی برگ‌های چای بریزید.', 'اجازه دهید ۲ تا ۳ دقیقه دم بکشد. دم کردن بیش از حد باعث تلخ شدن چای سبز می‌شود.'], tips: ['هرگز از آب جوش برای دم کردن چای سبز استفاده نکنید، زیرا برگ‌های لطیف آن را می‌سوزاند و طعمش را تلخ می‌کند.'], englishName: 'Green Tea', englishVisualName: 'a delicate, light-colored teacup of green tea with tea leaves visible', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a delicate ceramic teacup', englishPrimaryAction: 'pouring hot water over green tea leaves' },
    { id: 18, name: 'چای ماسالا هندی', category: 'hot', subcategory: 'hot-tea', illustration: '🍵', description: 'چای ماسالا یک نوشیدنی چای معطر و پرادویه هندی است که از ترکیب چای سیاه، شیر و مجموعه‌ای از ادویه‌های گرم مانند هل، دارچین، زنجبیل و میخک تهیه می‌شود.', prepTime: '۱۰ دقیقه', difficulty: 'متوسط', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق چای‌خوری چای سیاه کله مورچه‌ای', '۱ لیوان آب', '۱ لیوان شیر', '۲ غلاف هل سبز', '۱ چوب دارچین کوچک', '۲ عدد میخک', 'چند برش نازک زنجبیل تازه', 'شکر یا عسل به میزان لازم'], instructions: ['آب، زنجبیل و ادویه‌ها را در یک شیرجوش روی حرارت قرار دهید تا به جوش آید.', 'چای سیاه را اضافه کرده و حرارت را کم کنید. اجازه دهید ۲ دقیقه دم بکشد.', 'شیر و شکر را اضافه کرده و دوباره گرم کنید تا به آستانه جوش برسد.', 'چای را از روی حرارت برداشته و از صافی رد کرده و در فنجان بریزید.'], tips: ['می‌توانید ترکیب ادویه‌ها را بر اساس سلیقه خود تغییر دهید و از جوز هندی یا فلفل سیاه نیز استفاده کنید.'], englishName: 'Masala Chai', englishVisualName: 'a steaming, aromatic cup of spiced milky tea', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a traditional clay cup', englishPrimaryAction: 'straining aromatic, spiced milky tea into a cup' },
    { id: 19, name: 'چای ایرانی', category: 'hot', subcategory: 'hot-tea', illustration: '🍵', description: 'چای ایرانی، با رنگ زلال و عطر خاص خود، بخش جدایی‌ناپذیر فرهنگ ایرانی است. این چای به آرامی روی بخار سماور یا کتری دم می‌کشد و معمولاً با نبات، هل یا دارچین سرو می‌شود.', prepTime: '۱۰ دقیقه', difficulty: 'آسان', servings: 'برای ۴ نفر', ingredients: ['۲ قاشق غذاخوری چای سیاه ایرانی', 'آب جوش', 'نبات، هل یا گل محمدی (برای سرو)'], instructions: ['قوری را با آب جوش گرم کرده و خالی کنید.', 'چای خشک را در قوری بریزید.', 'قوری را با آب جوش پر کرده و روی کتری یا سماور در حال جوش قرار دهید.', 'اجازه دهید چای به مدت ۱۰ تا ۱۵ دقیقه به آرامی دم بکشد.', 'چای را در استکان‌های کمر باریک سرو کنید.'], tips: ['برای رنگ بهتر، یک پارچه کوچک روی درب قوری قرار دهید.', 'چای ایرانی را می‌توان بسته به غلظت دلخواه، کم‌رنگ یا پررنگ سرو کرد.'], englishName: 'Persian Tea', englishVisualName: 'a traditional Persian tea setup with a samovar, a small teapot, and glass cups (estekan) on saucers', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a small glass tea cup (estekan)', englishPrimaryAction: 'pouring tea from a small teapot into a glass cup' },
    { id: 20, name: 'چای اولانگ', category: 'hot', subcategory: 'hot-tea', illustration: '🍵', description: 'چای اولانگ (Oolong) از نظر میزان اکسیداسیون، جایی بین چای سبز و سیاه قرار می‌گیرد. این چای دارای طیف وسیعی از طعم‌ها، از گلی و میوه‌ای تا دودی و چوبی است.', prepTime: '۵ دقیقه', difficulty: 'متوسط', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق چای‌خوری برگ چای اولانگ', '۵۰۰ میلی‌لیتر آب با دمای ۹۰-۹۵ درجه سانتی‌گراد'], instructions: ['قوری و فنجان‌ها را پیش‌گرم کنید.', 'برگ‌های چای را در قوری قرار دهید.', 'مقدار کمی آب داغ روی برگ‌ها بریزید و بلافاصله خالی کنید (این کار به "بیدار شدن" برگ‌ها کمک می‌کند).', 'دوباره آب داغ را اضافه کرده و بسته به نوع اولانگ، ۳ تا ۵ دقیقه دم کنید.'], tips: ['برگ‌های چای اولانگ باکیفیت را می‌توان چندین بار دم کرد و در هر بار طعم‌های جدیدی را کشف نمود.'], englishName: 'Oolong Tea', englishVisualName: 'a traditional small clay teapot and matching cups with rolled oolong tea leaves nearby', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a small clay teacup', englishPrimaryAction: 'pouring light amber oolong tea' },
    { id: 21, name: 'چای سفید', category: 'hot', subcategory: 'hot-tea', illustration: '🍵', description: 'چای سفید، لطیف‌ترین و کم‌فرآوری‌شده‌ترین نوع چای است که از جوانه‌ها و برگ‌های نورس گیاه چای تهیه می‌شود. طعمی بسیار ظریف، شیرین و گلی دارد و کافئین آن کمتر از انواع دیگر چای است.', prepTime: '۶ دقیقه', difficulty: 'متوسط', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق چای‌خوری سرپر چای سفید', '۵۰۰ میلی‌لیتر آب با دمای ۷۵-۸۰ درجه سانتی‌گراد'], instructions: ['چای سفید بسیار حساس است، بنابراین از آب با دمای پایین‌تر استفاده کنید.', 'آب داغ را روی برگ‌های چای در قوری بریزید.', 'اجازه دهید ۵ تا ۷ دقیقه دم بکشد تا طعم‌های لطیف آن آزاد شود.'], tips: ['به دلیل ظرافت طعم، بهتر است چای سفید را بدون هیچ افزودنی‌ای نوش جان کنید.'], englishName: 'White Tea', englishVisualName: 'a delicate glass cup showing pale, golden white tea with fine tea leaves', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a glass teacup', englishPrimaryAction: 'pouring pale golden tea into a glass cup' },
    // 1-4. نوشیدنی‌های گیاهی و دمنوش
    { id: 22, name: 'دمنوش به لیمو', category: 'hot', subcategory: 'hot-herbal', illustration: '🍋', description: 'دمنوش به‌لیمو با عطر و طعم قوی و دلنشین لیمو، یک نوشیدنی بدون کافئین و فوق‌العاده آرامش‌بخش است که به کاهش استرس و بهبود خواب کمک می‌کند.', prepTime: '۶ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق غذاخوری برگ خشک به‌لیمو', '۵۰۰ میلی‌لیتر آب جوش'], instructions: ['قوری را پیش‌گرم کنید.', 'برگ‌های به‌لیمو را در قوری بریزید.', 'آب جوش را اضافه کرده و درب قوری را بگذارید.', 'اجازه دهید ۵ تا ۸ دقیقه دم بکشد.'], tips: ['می‌توانید این دمنوش را با یک قاشق عسل و چند قطره آب لیموی تازه سرو کنید.'], englishName: 'Lemon Verbena Tea', englishVisualName: 'a cup of pale green herbal tea with whole lemon verbena leaves visible', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a ceramic teacup', englishPrimaryAction: 'pouring hot water over lemon verbena leaves' },
    { id: 23, name: 'دمنوش گل گاوزبان', category: 'hot', subcategory: 'hot-herbal', illustration: '🌿', description: 'دمنوش گل گاوزبان یکی از معروف‌ترین دمنوش‌های سنتی ایرانی است که به رنگ بنفش زیبا و خواص آرام‌بخش و نشاط‌آور خود شهرت دارد.', prepTime: '۱۰ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق غذاخوری گل گاوزبان خشک', '۱ عدد لیمو عمانی', 'چند پر سنبل‌الطیب (اختیاری)', 'نبات برای شیرین کردن'], instructions: ['گل گاوزبان، لیمو عمانی (با ایجاد چند سوراخ) و سنبل‌الطیب را در قوری بریزید.', 'آب جوش را اضافه کرده و قوری را روی حرارت غیرمستقیم (مانند روی کتری) قرار دهید.', 'اجازه دهید ۱۰ تا ۱۵ دقیقه دم بکشد تا رنگ بنفش تیره به خود بگیرد.', 'با نبات در فنجان سرو کنید.'], tips: ['اضافه کردن لیمو عمانی رنگ دمنوش را از آبی به بنفش تغییر می‌دهد و طعم آن را متعادل می‌کند.'], englishName: 'Borage Tea', englishVisualName: 'a vibrant purple herbal tea in a glass cup, garnished with a dried lime', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a glass teacup', englishPrimaryAction: 'pouring vibrant purple borage tea' },
    { id: 24, name: 'دمنوش چای ترش', category: 'hot', subcategory: 'hot-herbal', illustration: '🌺', description: 'چای ترش یا چای هیبیسکوس، دمنوشی با رنگ قرمز یاقوتی و طعم ترش و میوه‌ای است. این نوشیدنی باطراوت، سرشار از ویتامین C بوده و به کنترل فشار خون کمک می‌کند.', prepTime: '۶ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق غذاخوری گل هیبیسکوس خشک', '۵۰۰ میلی‌لیتر آب جوش', 'عسل یا شکر برای شیرین کردن (اختیاری)'], instructions: ['گل‌های هیبیسکوس را در قوری بریزید.', 'آب جوش را اضافه کنید.', 'اجازه دهید ۵ تا ۷ دقیقه دم بکشد تا رنگ قرمز و طعم خود را آزاد کند.', 'در صورت تمایل می‌توانید آن را به صورت سرد نیز سرو کنید.'], tips: ['به دلیل طعم ترش طبیعی، ممکن است نیاز به شیرین کردن داشته باشد.'], englishName: 'Hibiscus Tea', englishVisualName: 'a ruby-red herbal tea in a clear glass mug', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a clear glass mug', englishPrimaryAction: 'pouring ruby-red hibiscus tea' },
    { id: 25, name: 'دمنوش بابونه', category: 'hot', subcategory: 'hot-herbal', illustration: '🌼', description: 'دمنوش بابونه یک نوشیدنی کلاسیک و محبوب جهانی است که به خاطر طعم ملایم، سیب‌مانند و خواص آرام‌بخش و ضدالتهابی‌اش شناخته می‌شود. این دمنوش برای آرامش قبل از خواب ایده‌آل است.', prepTime: '۶ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['۲ قاشق غذاخوری گل بابونه خشک', '۵۰۰ میلی‌لیتر آب جوش'], instructions: ['بابونه را در قوری یا صافی چای قرار دهید.', 'آب جوش را روی آن بریزید.', 'درب آن را گذاشته و اجازه دهید ۵ تا ۸ دقیقه دم بکشد.', 'با کمی عسل طعم آن را دلپذیرتر کنید.'], tips: ['دم کردن طولانی‌مدت بابونه ممکن است طعم آن را کمی تلخ کند.'], englishName: 'Chamomile Tea', englishVisualName: 'a calming teacup with golden-hued tea and small chamomile flowers', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a ceramic teacup', englishPrimaryAction: 'pouring hot water over chamomile flowers' },
    { id: 26, name: 'دمنوش نعناع', category: 'hot', subcategory: 'hot-herbal', illustration: '🌿', description: 'دمنوش نعناع، با عطر تند و طعم خنک و باطراوت خود، یک نوشیدنی فوق‌العاده برای سرحال شدن و کمک به هضم غذا است. این دمنوش بدون کافئین، هم به صورت گرم و هم سرد لذت‌بخش است.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['یک مشت برگ نعناع تازه یا ۲ قاشق چای‌خوری نعناع خشک', '۵۰۰ میلی‌لیتر آب جوش'], instructions: ['برگ‌های نعناع تازه را کمی در دست فشار دهید تا عطر آن آزاد شود و در قوری بریزید.', 'آب جوش را اضافه کنید.', 'اجازه دهید ۵ تا ۷ دقیقه دم بکشد.'], tips: ['برای طعم قوی‌تر، از نعناع فلفلی (Peppermint) استفاده کنید.'], englishName: 'Peppermint Tea', englishVisualName: 'a clear glass cup filled with hot water and a large sprig of fresh mint leaves', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a clear glass tea cup', englishPrimaryAction: 'pouring boiling water over fresh mint leaves' },
    // --- نوشیدنی‌های سرد ---
    // 2-1. بر پایه قهوه و اسپرسو
    { id: 27, name: 'آیس لاته', category: 'cold', subcategory: 'cold-coffee', illustration: '🧊', description: 'آیس لاته نسخه سرد و باطراوت کافه لاته است. ترکیبی ساده از اسپرسو، شیر سرد و یخ که برای روزهای گرم تابستان عالی است.', prepTime: '۴ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۱ شات دابل اسپرسو (۶۰ میلی‌لیتر)', '۱۸۰ میلی‌لیتر شیر سرد', 'یخ به مقدار کافی'], instructions: ['یک لیوان بلند را پر از یخ کنید.', 'شیر سرد را روی یخ بریزید.', 'اسپرسوی تازه دم‌شده (و کمی خنک شده) را به آرامی روی شیر اضافه کنید تا لایه زیبایی ایجاد شود.', 'قبل از نوشیدن هم بزنید.'], tips: ['برای شیرینی بیشتر می‌توانید از سیروپ وانیل یا کارامل استفاده کنید.'], englishName: 'Iced Latte', englishVisualName: 'a clear glass showing layers of milk, ice, and dark espresso on top', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall, clear glass', englishPrimaryAction: 'pouring hot espresso over cold milk in an ice-filled glass' },
    { id: 28, name: 'آیس کاپوچینو', category: 'cold', subcategory: 'cold-coffee', illustration: '🧊', description: 'آیس کاپوچینو نسخه سرد کاپوچینو است که با لایه‌ای از فوم شیر سرد (Cold Foam) تهیه می‌شود. این نوشیدنی بافت جالب و متفاوتی نسبت به آیس لاته دارد.', prepTime: '۶ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱ شات دابل اسپرسو', '۱۲۰ میلی‌لیتر شیر سرد', 'یخ به مقدار کافی'], instructions: ['لیوان را پر از یخ کرده و اسپرسو را روی آن بریزید.', 'شیر سرد را با استفاده از کف‌ساز دستی یا فرنچ پرس بزنید تا یک فوم سرد و غلیظ ایجاد شود.', 'فوم شیر سرد را با قاشق روی اسپرسوی یخی قرار دهید.'], tips: ['برای فوم بهتر، از شیر کم‌چرب استفاده کنید.'], englishName: 'Iced Cappuccino', englishVisualName: 'an iced espresso in a glass, topped with a thick layer of cold milk foam', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a drinking glass', englishPrimaryAction: 'spooning cold milk foam over an iced espresso' },
    { id: 29, name: 'آیس آمریکانو', category: 'cold', subcategory: 'cold-coffee', illustration: '🧊', description: 'آیس آمریکانو یک نوشیدنی قهوه سرد، ساده و خنک‌کننده است که از ترکیب اسپرسو، آب سرد و یخ تهیه می‌شود. طعمی قوی و تلخ دارد و بدون شیر سرو می‌شود.', prepTime: '۲ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۱ شات دابل اسپرسو', '۱۲۰ میلی‌لیتر آب سرد', 'یخ به مقدار کافی'], instructions: ['لیوان را پر از یخ کنید.', 'آب سرد را اضافه کنید.', 'اسپرسو را روی آب و یخ بریزید.'], tips: ['می‌توانید با اضافه کردن یک برش لیمو یا پرتقال، طعم آن را جذاب‌تر کنید.'], englishName: 'Iced Americano', englishVisualName: 'a tall glass filled with ice, water, and a shot of espresso', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall drinking glass', englishPrimaryAction: 'pouring a shot of espresso into an ice-filled glass of water' },
    { id: 30, name: 'فرپه', category: 'cold', subcategory: 'cold-coffee', illustration: '🥤', description: 'فرپه یک نوشیدنی قهوه کف‌آلود و یخی است که ریشه در یونان دارد و معمولاً با قهوه فوری تهیه می‌شود. این نوشیدنی بسیار محبوب و تهیه آن آسان است.', prepTime: '۵ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۲ قاشق چای‌خوری قهوه فوری', '۲ قاشق چای‌خوری شکر (یا به میزان دلخواه)', '۲ قاشق غذاخوری آب سرد', 'یخ و آب سرد برای پر کردن لیوان', 'شیر (اختیاری)'], instructions: ['قهوه فوری، شکر و ۲ قاشق آب را در یک شیکر یا شیشه دردار بریزید.', 'به شدت تکان دهید تا یک کف غلیظ و کرمی ایجاد شود.', 'کف را در لیوان پر از یخ ریخته و بقیه لیوان را با آب سرد یا شیر پر کنید.'], tips: ['استفاده از شیکر بهترین نتیجه را برای ایجاد کف می‌دهد.'], englishName: 'Frappe', englishVisualName: 'a tall glass with a thick, frothy layer of whipped coffee on top of iced water or milk', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall glass', englishPrimaryAction: 'whipping instant coffee into a froth' },
    { id: 31, name: 'آیس موکا', category: 'cold', subcategory: 'cold-coffee', illustration: '🧊', description: 'آیس موکا یک دسر قهوه سرد و شکلاتی است. ترکیب اسپرسو، شیر، سس شکلات و یخ، یک نوشیدنی بی‌نظیر برای عاشقان شکلات و قهوه می‌سازد.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۱ شات دابل اسپرسو', '۱۵۰ میلی‌لیتر شیر سرد', '۳۰ میلی‌لیتر سس شکلات', 'یخ', 'خامه زده شده (اختیاری)'], instructions: ['دیواره‌های داخلی لیوان را با سس شکلات تزئین کنید.', 'بقیه سس شکلات را ته لیوان بریزید.', 'لیوان را پر از یخ کنید و شیر را اضافه کنید.', 'اسپرسو را به آرامی روی آن بریزید.', 'در صورت تمایل با خامه زده شده تزئین کنید.'], tips: ['می‌توانید اسپرسو و سس شکلات را ابتدا با هم مخلوط کرده و سپس به لیوان اضافه کنید.'], englishName: 'Iced Mocha', englishVisualName: 'an iced coffee with chocolate syrup, topped with whipped cream', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall, decorative glass', englishPrimaryAction: 'drizzling chocolate syrup into an iced coffee' },
    { id: 32, name: 'قهوه سرد دم‌آوری', category: 'cold', subcategory: 'cold-coffee', illustration: '🧊', description: 'کلد برو یا قهوه سرد دم، با خیساندن قهوه آسیاب شده در آب سرد برای مدت طولانی (۱۲ تا ۲۴ ساعت) تهیه می‌شود. نتیجه آن یک کنسانتره قهوه نرم، با اسیدیته پایین و شیرینی طبیعی است.', prepTime: '۱۲ ساعت', difficulty: 'آسان', servings: 'برای ۴ نفر', ingredients: ['۱۰۰ گرم قهوه با آسیاب درشت', '۱ لیتر آب سرد'], instructions: ['قهوه و آب سرد را در یک شیشه بزرگ یا ظرف مخصوص کلد برو مخلوط کنید.', 'درب آن را بسته و به مدت ۱۲ تا ۲۴ ساعت در دمای اتاق یا یخچال قرار دهید.', 'پس از اتمام زمان، مخلوط را با استفاده از فیلتر کاغذی یا پارچه‌ای به آرامی صاف کنید.', 'کنسانتره به دست آمده را با آب یا شیر و یخ به نسبت دلخواه رقیق کرده و سرو کنید.'], tips: ['کنسانتره کلد برو را می‌توان تا دو هفته در یخچال نگهداری کرد.', 'به دلیل کافئین بالا، در مصرف آن احتیاط کنید.'], englishName: 'Cold Brew Coffee', englishVisualName: 'a glass of dark cold brew coffee over a large ice sphere', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a whiskey glass', englishPrimaryAction: 'pouring dark cold brew coffee over ice' },
    // 2-2. بر پایه شیر و شکلات
    { id: 33, name: 'میلک‌شیک', category: 'cold', subcategory: 'cold-milk', illustration: '🥤', description: 'میلک‌شیک یک نوشیدنی خنک، غلیظ و خامه‌ای است که از مخلوط کردن بستنی، شیر و طعم‌دهنده‌های مختلف تهیه می‌شود. یک دسر کلاسیک و محبوب برای تمام سنین.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۲ اسکوپ بزرگ بستنی (وانیلی، شکلاتی یا توت‌فرنگی)', '۱/۲ فنجان (۱۲۰ میلی‌لیتر) شیر', '۱/۲ قاشق چای‌خوری عصاره وانیل (اختیاری)'], instructions: ['تمام مواد را در مخلوط‌کن بریزید.', 'با سرعت بالا مخلوط کنید تا کاملاً یکدست و نرم شود.', 'بلافاصله در لیوان بلند سرو کرده و در صورت تمایل با خامه زده شده و یک گیلاس تزئین کنید.'], tips: ['برای میلک‌شیک غلیظ‌تر، از شیر کمتر استفاده کنید.', 'می‌توانید میوه‌های یخ‌زده، سس شکلات یا کره بادام‌زمینی نیز به آن اضافه کنید.'], englishName: 'Milkshake', englishVisualName: 'a classic vanilla milkshake in a tall glass, topped with whipped cream and a cherry', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a classic milkshake glass', englishPrimaryAction: 'blending ice cream and milk' },
    { id: 34, name: 'هات چاکلت سرد', category: 'cold', subcategory: 'cold-milk', illustration: '🍫', description: 'شکلات سرد یا آیس چاکلت، نسخه خنک و یخی هات چاکلت است. این نوشیدنی شکلاتی و باطراوت، جایگزین عالی قهوه برای یک بعد از ظهر گرم است.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۲ قاشق غذاخوری پودر کاکائو', '۲ قاشق غذاخوری شکر', '۲ قاشق غذاخوری آب داغ', '۲۵۰ میلی‌لیتر شیر سرد', 'یخ'], instructions: ['پودر کاکائو و شکر را در یک لیوان با آب داغ مخلوط کنید تا یک سس شکلاتی یکدست ایجاد شود.', 'لیوان را پر از یخ کنید.', 'شیر سرد را اضافه کرده و خوب هم بزنید.'], tips: ['می‌توانید تمام مواد را در مخلوط‌کن بریزید تا یک نوشیدنی یکدست‌تر (شبیه فراپه) داشته باشید.'], englishName: 'Iced Chocolate', englishVisualName: 'a tall glass of cold chocolate milk, with chocolate syrup drizzled inside', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall glass', englishPrimaryAction: 'blending cold chocolate milk with ice' },
    { id: 35, name: 'شیر طعم‌دار', category: 'cold', subcategory: 'cold-milk', illustration: '🍌', description: 'شیر طعم‌دار (مانند شیر موز یا شیر توت‌فرنگی) یک نوشیدنی ساده، مقوی و خوشمزه است که با مخلوط کردن شیر با میوه تازه یا سیروپ تهیه می‌شود.', prepTime: '۴ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۱ لیوان شیر سرد', '۱ عدد موز رسیده یا نصف فنجان توت‌فرنگی', 'عسل یا شکر (اختیاری)'], instructions: ['شیر و میوه (و شیرین‌کننده در صورت استفاده) را در مخلوط‌کن بریزید.', 'تا زمانی که کاملاً یکدست شود، مخلوط کنید.', 'بلافاصله سرو کنید.'], tips: ['استفاده از میوه یخ‌زده نوشیدنی شما را غلیظ‌تر و خنک‌تر می‌کند.'], englishName: 'Flavored Milk', englishVisualName: 'a glass of pastel pink strawberry milk with a fresh strawberry on the rim', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall glass', englishPrimaryAction: 'blending milk with fresh strawberries' },
    // 2-3. اسموتی‌ها و شیک‌های میوه‌ای
    { id: 36, name: 'اسموتی موز و توت فرنگی', category: 'cold', subcategory: 'cold-smoothie', illustration: '🍓', description: 'ترکیب کلاسیک و محبوب موز و توت‌فرنگی یک اسموتی شیرین، خامه‌ای و سرشار از ویتامین‌ها را ایجاد می‌کند. این اسموتی برای یک صبحانه سریع یا میان‌وعده عالی است.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱-۲ نفر', ingredients: ['۱ عدد موز یخ‌زده', '۱ فنجان توت‌فرنگی یخ‌زده', 'نصف فنجان ماست یونانی یا شیر', '۱ قاشق غذاخوری عسل (اختیاری)'], instructions: ['تمام مواد را در مخلوط‌کن بریزید.', 'با سرعت بالا مخلوط کنید تا کاملاً نرم و یکدست شود.', 'اگر اسموتی خیلی غلیظ بود، کمی شیر یا آب اضافه کنید.'], tips: ['استفاده از میوه یخ‌زده نیاز به اضافه کردن یخ را از بین می‌برد و بافت خامه‌ای‌تری ایجاد می‌کند.'], englishName: 'Strawberry Banana Smoothie', englishVisualName: 'a thick pink smoothie in a glass, garnished with a strawberry and banana slice', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a simple glass tumbler', englishPrimaryAction: 'blending frozen strawberries and bananas' },
    { id: 37, name: 'اسموتی انبه و آناناس', category: 'cold', subcategory: 'cold-smoothie', illustration: '🥭', description: 'یک اسموتی کاملاً استوایی و باطراوت که شما را به یاد سواحل گرمسیری می‌اندازد. طعم شیرین انبه و طعم ترش و شیرین آناناس ترکیبی بی‌نظیر می‌سازد.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱-۲ نفر', ingredients: ['۱ فنجان انبه یخ‌زده', '۱ فنجان آناناس یخ‌زده', 'نصف فنجان شیر نارگیل یا آب پرتقال'], instructions: ['تمام مواد را در مخلوط‌کن قرار دهید.', 'مخلوط کنید تا یکدست شود.', 'بلافاصله سرو کنید.'], tips: ['برای طعم بیشتر، کمی آب لیموترش تازه به آن اضافه کنید.'], englishName: 'Mango Pineapple Smoothie', englishVisualName: 'a vibrant yellow-orange smoothie in a glass, garnished with a pineapple wedge', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a simple glass tumbler', englishPrimaryAction: 'blending frozen mango and pineapple' },
    { id: 38, name: 'اسموتی سبز', category: 'cold', subcategory: 'cold-smoothie', illustration: '🥝', description: 'اسموتی سبز یک راه عالی برای دریافت سبزیجات روزانه شماست. این اسموتی مقوی و سالم با ترکیب اسفناج، میوه و مایعات تهیه می‌شود و طعم شیرین میوه‌ها، طعم اسفناج را می‌پوشاند.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱-۲ نفر', ingredients: ['۱ مشت بزرگ اسفناج تازه', '۱ عدد موز یخ‌زده', 'نصف فنجان انبه یا آناناس یخ‌زده', '۱ فنجان شیر بادام یا آب'], instructions: ['ابتدا اسفناج و شیر بادام را در مخلوط‌کن بریزید و مخلوط کنید تا کاملاً یکدست شود.', 'سپس بقیه میوه‌ها را اضافه کرده و دوباره مخلوط کنید.', 'این کار باعث می‌شود اسموتی بافت نرم‌تری داشته باشد.'], tips: ['برای پروتئین بیشتر، یک قاشق پودر پروتئین یا دانه چیا اضافه کنید.'], englishName: 'Green Smoothie', englishVisualName: 'a vibrant green smoothie in a mason jar with a straw', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a mason jar', englishPrimaryAction: 'blending spinach, banana, and other greens' },
    { id: 39, name: 'اسموتی توت‌ها', category: 'cold', subcategory: 'cold-smoothie', illustration: '🍇', description: 'اسموتی توت‌های مخلوط (Mixed Berry) با رنگ زیبا و طعم فوق‌العاده، سرشار از آنتی‌اکسیدان است. ترکیبی از توت‌فرنگی، بلوبری، تمشک و شاه‌توت یک نوشیدنی خوشمزه و سالم می‌سازد.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱-۲ نفر', ingredients: ['۱.۵ فنجان مخلوط توت‌های یخ‌زده', 'نصف فنجان ماست', 'نصف فنجان شیر یا آبمیوه', 'عسل برای شیرینی (اختیاری)'], instructions: ['تمام مواد را در مخلوط‌کن بریزید.', 'تا زمانی که نرم و یکدست شود، مخلوط کنید.'], tips: ['کمی جو دوسر پرک برای فیبر و غلظت بیشتر به آن اضافه کنید.'], englishName: 'Mixed Berry Smoothie', englishVisualName: 'a deep purple, thick smoothie in a glass, topped with fresh berries', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a simple glass tumbler', englishPrimaryAction: 'blending a mix of frozen berries' },
    { id: 40, name: 'اسموتی پروتئینی', category: 'cold', subcategory: 'cold-smoothie', illustration: '💪', description: 'اسموتی پروتئینی یک میان‌وعده یا وعده غذایی عالی برای بعد از ورزش یا شروع یک روز پرانرژی است. این اسموتی به بازسازی عضلات و احساس سیری طولانی‌مدت کمک می‌کند.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۱ اسکوپ پودر پروتئین (وانیلی یا شکلاتی)', '۱ عدد موز یخ‌زده', '۱ قاشق غذاخوری کره بادام زمینی', '۱ فنجان شیر (لبنی یا گیاهی)'], instructions: ['تمام مواد را در مخلوط‌کن قرار دهید.', 'مخلوط کنید تا کاملاً یکدست شود.'], tips: ['می‌توانید از پودر کاکائو، دانه چیا یا پودر اسپیرولینا برای ارزش غذایی بیشتر استفاده کنید.'], englishName: 'Protein Smoothie', englishVisualName: 'a thick, creamy smoothie in a shaker bottle', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a shaker bottle', englishPrimaryAction: 'blending protein powder with fruit and milk' },
    // 2-4. نوشیدنی‌های گازدار و موکتل‌ها
    { id: 41, name: 'موکتل میوه‌ای', category: 'cold', subcategory: 'cold-mocktail', illustration: '🍹', description: 'موکتل میوه‌ای یک نوشیدنی غیرالکلی، رنگارنگ و باطراوت است که از ترکیب آبمیوه‌ها، سیروپ‌ها، میوه تازه و سودا تهیه می‌شود. یک انتخاب عالی برای مهمانی‌ها.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۶۰ میلی‌لیتر آب پرتقال', '۶۰ میلی‌لیتر آب آناناس', '۱۵ میلی‌لیتر سیروپ گرانادین (انار)', 'سودا یا آب گازدار', 'برش پرتقال و گیلاس برای تزئین', 'یخ'], instructions: ['یک لیوان بلند را پر از یخ کنید.', 'آب پرتقال و آب آناناس را اضافه کنید.', 'سیروپ گرانادین را به آرامی در لیوان بریزید تا در ته آن ته‌نشین شود و حالت لایه‌ای ایجاد کند.', 'بقیه لیوان را با سودا پر کنید.', 'با برش پرتقال و گیلاس تزئین کرده و سرو کنید.'], tips: ['برای طعم‌های مختلف، از آبمیوه‌ها و سیروپ‌های دیگر استفاده کنید.'], englishName: 'Fruit Mocktail', englishVisualName: 'a colorful layered fruit mocktail in a hurricane glass, garnished with fruit slices', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a hurricane glass', englishPrimaryAction: 'pouring different fruit juices to create layers' },
    { id: 42, name: 'لیموناد کلاسیک', category: 'cold', subcategory: 'cold-mocktail', illustration: '🍋', description: 'لیموناد کلاسیک یک نوشیدنی ترش و شیرین و فوق‌العاده خنک‌کننده است که در روزهای گرم تابستان هیچ چیز جای آن را نمی‌گیرد. تهیه آن بسیار ساده است.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۴ نفر', ingredients: ['۱ فنجان آب لیموترش تازه', '۱ فنجان شکر', '۴ فنجان آب سرد', 'یخ و برش‌های لیمو برای سرو'], instructions: ['ابتدا شربت ساده را تهیه کنید: شکر و یک فنجان از آب را در یک شیرجوش روی حرارت قرار دهید و هم بزنید تا شکر کاملاً حل شود. سپس بگذارید خنک شود.', 'در یک پارچ بزرگ، شربت ساده خنک شده، آب لیموترش و بقیه آب سرد را مخلوط کنید.', 'با یخ و برش‌های لیمو سرو کنید.'], tips: ['برای طعم بهتر، حتماً از آب لیموترش تازه استفاده کنید، نه آبلیموی آماده.'], englishName: 'Classic Lemonade', englishVisualName: 'a classic pitcher of cloudy lemonade with floating lemon slices', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a classic pitcher', englishPrimaryAction: 'stirring a pitcher of lemonade' },
    { id: 43, name: 'لیموناد نعنا', category: 'cold', subcategory: 'cold-mocktail', illustration: '🌿', description: 'لیموناد نعنا با افزودن عطر و طعم خنک نعناع تازه به لیموناد کلاسیک، آن را به یک نوشیدنی باطراوت‌تر و جذاب‌تر تبدیل می‌کند. این نوشیدنی به خصوص در خاورمیانه محبوب است.', prepTime: '۶ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۱ لیوان لیموناد آماده', 'یک مشت کوچک برگ نعناع تازه', 'یخ'], instructions: ['برگ‌های نعناع را در ته یک لیوان محکم قرار دهید.', 'با استفاده از یک گوشت‌کوب کوچک (muddler)، به آرامی نعناع را فشار دهید تا عطر آن آزاد شود، اما له نشود.', 'لیوان را پر از یخ کرده و لیموناد را روی آن بریزید.', 'به آرامی هم زده و با یک شاخه نعناع تزئین کنید.'], tips: ['برای یک موهیتوی بدون الکل، می‌توانید کمی آب گازدار نیز به آن اضافه کنید.'], englishName: 'Mint Lemonade', englishVisualName: 'a glass of lemonade filled with fresh mint leaves and lemon slices', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a highball glass', englishPrimaryAction: 'muddling mint leaves for lemonade' },
    { id: 44, name: 'نوشیدنی گازدار با شربت', category: 'cold', subcategory: 'cold-mocktail', illustration: '🥤', description: 'یک نوشیدنی ساده و قابل تنظیم که با ترکیب آب گازدار (سودا) و شربت‌های میوه‌ای دلخواه تهیه می‌شود. در ایران، این نوشیدنی با شربت‌های سنتی مانند آلبالو، سکنجبین یا بهارنارنج بسیار محبوب است.', prepTime: '۲ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۳۰ تا ۴۵ میلی‌لیتر شربت میوه‌ای غلیظ (مانند شربت آلبالو)', 'آب گازدار سرد', 'یخ', 'کمی آبلیمو (اختیاری)'], instructions: ['یک لیوان را پر از یخ کنید.', 'شربت را روی یخ بریزید.', 'در صورت تمایل، چند قطره آبلیمو اضافه کنید.', 'لیوان را به آرامی با آب گازدار پر کنید و کمی هم بزنید.'], tips: ['می‌توانید با ترکیب شربت‌های مختلف، طعم‌های جدیدی خلق کنید.'], englishName: 'Soda with Fruit Syrup', englishVisualName: 'a glass of sparkling soda with a vibrant red fruit syrup at the bottom', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall glass', englishPrimaryAction: 'pouring soda over a fruit syrup' },
    // 2-5. چای و دمنوش سرد
    { id: 45, name: 'آیس تی', category: 'cold', subcategory: 'cold-tea', illustration: '🍹', description: 'آیس تی یا چای سرد، یک نوشیدنی کلاسیک و باطراوت است که با دم کردن چای و سپس خنک کردن آن تهیه می‌شود. این نوشیدنی را می‌توان شیرین یا تلخ و با طعم‌های مختلف سرو کرد.', prepTime: '۳ دقیقه', difficulty: 'آسان', servings: 'برای ۴ نفر', ingredients: ['۴ عدد چای کیسه‌ای سیاه یا ۲ قاشق چای خشک', '۴ فنجان آب جوش', 'شکر یا عسل (اختیاری)', 'یخ، برش لیمو و برگ نعناع برای سرو'], instructions: ['چای را در آب جوش به مدت ۵ دقیقه دم کنید.', 'چای کیسه‌ای یا برگ چای را خارج کرده و در صورت تمایل، چای را شیرین کنید و بگذارید به دمای اتاق برسد.', 'برای سرو، لیوان‌ها را پر از یخ کرده و چای خنک شده را روی آن بریزید.', 'با لیمو و نعناع تزئین کنید.'], tips: ['برای جلوگیری از کدر شدن چای، اجازه دهید به طور طبیعی در دمای اتاق خنک شود، نه در یخچال.'], englishName: 'Iced Tea', englishVisualName: 'a tall glass of amber-colored iced tea with ice, a lemon wedge, and a mint sprig', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall Collins glass', englishPrimaryAction: 'pouring chilled black tea over ice' },
    { id: 46, name: 'آیس چای ماسالا', category: 'cold', subcategory: 'cold-tea', illustration: '🍹', description: 'نسخه سرد و خنک چای ماسالای پرادویه که طعم‌های گرم و تند آن را با خنکی شیر و یخ متعادل می‌کند. یک نوشیدنی تابستانی عالی و پرانرژی.', prepTime: '۵ دقیقه', difficulty: 'متوسط', servings: 'برای ۱ نفر', ingredients: ['۱۲۰ میلی‌لیتر چای ماسالای دم‌کرده و غلیظ (خنک شده)', '۱۲۰ میلی‌لیتر شیر سرد', 'یخ'], instructions: ['چای ماسالا را طبق دستور معمول اما با نصف مقدار آب دم کنید تا غلیظ‌تر شود و بگذارید کاملاً خنک شود.', 'یک لیوان را پر از یخ کنید.', 'شیر سرد و سپس چای ماسالای خنک شده را اضافه کنید.', 'هم زده و سرو کنید.'], tips: ['می‌توانید کنسانتره چای ماسالا را از قبل آماده کرده و در یخچال نگهداری کنید.'], englishName: 'Iced Masala Chai', englishVisualName: 'a tall glass of iced masala chai latte with a cinnamon stick', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a tall glass', englishPrimaryAction: 'pouring spiced tea into a glass of iced milk' },
    { id: 47, name: 'آیس چای ایرانی', category: 'cold', subcategory: 'cold-tea', illustration: '🍹', description: 'چای ایرانی دم‌کرده که به صورت سرد و معمولاً شیرین سرو می‌شود. یک نوشیدنی ساده و نوستالژیک برای رفع عطش در روزهای گرم.', prepTime: '۳ دقیقه', difficulty: 'آسان', servings: 'برای ۴ نفر', ingredients: ['چای ایرانی دم‌کرده و قوی', 'شکر یا نبات حل شده به میزان لازم', 'یخ', 'کمی گلاب یا بهارنارنج (اختیاری)'], instructions: ['چای داغ را با شکر یا نبات شیرین کنید تا کاملاً حل شود.', 'اجازه دهید چای به دمای اتاق برسد و سپس در یخچال خنک شود.', 'در صورت تمایل کمی گلاب یا بهارنارنج اضافه کنید.', 'با مقدار زیادی یخ سرو کنید.'], tips: ['این نوشیدنی پایه خوبی برای شربت‌های مختلف است.'], englishName: 'Iced Persian Tea', englishVisualName: 'a glass of iced black tea, sweetened and served with ice', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a simple glass tumbler', englishPrimaryAction: 'pouring chilled sweet tea over ice' },
    // --- دسرها ---
    // 3-1. کیک و شیرینی
    { id: 48, name: 'کیک شکلاتی', category: 'dessert', subcategory: 'dessert-cake', illustration: '🍰', description: 'یک کیک شکلاتی کلاسیک، غنی، مرطوب و پر از طعم شکلات که هر کسی را راضی می‌کند. این دسر برای جشن‌ها، تولدها یا یک عصرانه ساده عالی است.', prepTime: '۴۵ دقیقه', difficulty: 'متوسط', servings: 'برای ۸ نفر', ingredients: ['۲ فنجان آرد', '۲ فنجان شکر', '۳/۴ فنجان پودر کاکائو', '۲ ق چ جوش شیرین', '۱ ق چ بیکینگ پودر', '۱ ق چ نمک', '۱ فنجان شیر', '۱/۲ فنجان روغن مایع', '۲ عدد تخم مرغ', '۱ ق چ عصاره وانیل', '۱ فنجان آب جوش'], instructions: ['فر را با دمای ۱۷۵ درجه سانتی‌گراد گرم کنید.', 'مواد خشک (آرد، شکر، کاکائو، جوش شیرین، بیکینگ پودر و نمک) را در یک کاسه بزرگ مخلوط کنید.', 'در یک کاسه دیگر، مواد تر (شیر، روغن، تخم مرغ و وانیل) را با هم بزنید.', 'مخلوط تر را به مخلوط خشک اضافه کرده و هم بزنید تا یکدست شود.', 'آب جوش را به آرامی اضافه کرده و مخلوط کنید (مایه کیک شل خواهد بود).', 'مایه را در قالب چرب شده ریخته و به مدت ۳۰-۳۵ دقیقه بپزید.'], tips: ['اضافه کردن آب جوش در انتها باعث می‌شود کیک بسیار مرطوب و نرم شود.', 'برای طعم قوی‌تر شکلات، از پودر کاکائوی باکیفیت استفاده کنید.'], englishName: 'Chocolate Cake', englishVisualName: 'a rich slice of chocolate layer cake with glossy fudge frosting', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a white ceramic plate', englishPrimaryAction: 'serving a slice of chocolate cake' },
    { id: 49, name: 'کیک وانیلی', category: 'dessert', subcategory: 'dessert-cake', illustration: '🍰', description: 'کیک وانیلی ساده و کلاسیک با بافتی نرم، لطیف و اسفنجی و عطر دل‌انگیز وانیل. این کیک پایه مناسبی برای انواع تزئینات و فراستینگ‌ها است.', prepTime: '۴۰ دقیقه', difficulty: 'متوسط', servings: 'برای ۸ نفر', ingredients: ['۲.۵ فنجان آرد', '۱.۵ فنجان شکر', '۳ ق چ بیکینگ پودر', '۱/۲ ق چ نمک', '۱/۲ فنجان کره نرم', '۱ فنجان شیر', '۲ عدد تخم مرغ', '۲ ق چ عصاره وانیل'], instructions: ['فر را با دمای ۱۷۵ درجه سانتی‌گراد گرم کنید.', 'آرد، شکر، بیکینگ پودر و نمک را مخلوط کنید.', 'کره نرم را اضافه کرده و با همزن بزنید تا مخلوط شبیه خرده نان شود.', 'در ظرفی دیگر شیر، تخم مرغ و وانیل را مخلوط کرده و به تدریج به مواد خشک اضافه کنید.', 'هم بزنید تا مایه یکدست شود.', 'در قالب چرب شده ریخته و به مدت ۳۰-۳۵ دقیقه بپزید.'], tips: ['تمام مواد، به خصوص کره، تخم مرغ و شیر باید به دمای اتاق رسیده باشند.', 'بیش از حد هم زدن مایه کیک باعث سفت شدن آن می‌شود.'], englishName: 'Vanilla Cake', englishVisualName: 'a slice of fluffy vanilla cake with white buttercream frosting and sprinkles', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a dessert plate', englishPrimaryAction: 'decorating a vanilla cake with sprinkles' },
    { id: 50, name: 'کیک کارامل', category: 'dessert', subcategory: 'dessert-cake', illustration: '🍰', description: 'کیکی خوشمزه و لطیف با طعم غنی و شیرین کارامل. این کیک معمولاً با سس کارامل پوشانده می‌شود که طعم آن را دوچندان می‌کند.', prepTime: '۵۰ دقیقه', difficulty: 'متوسط', servings: 'برای ۸ نفر', ingredients: ['مواد لازم برای کیک وانیلی ساده', '۱ فنجان سس کارامل آماده یا خانگی'], instructions: ['یک کیک وانیلی ساده را طبق دستور بپزید و اجازه دهید کمی خنک شود.', 'با یک سیخ چوبی، سوراخ‌های متعددی روی سطح کیک ایجاد کنید.', 'نصف سس کارامل را روی کیک گرم بریزید تا به داخل آن نفوذ کند.', 'بگذارید کیک کاملاً خنک شود و قبل از سرو، بقیه سس کارامل را روی آن بریزید.'], tips: ['می‌توانید روی کیک را با کمی نمک دریایی درشت بپاشید تا طعم کارامل نمکی ایجاد شود.'], englishName: 'Caramel Cake', englishVisualName: 'a slice of cake drizzled generously with golden caramel sauce', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a dessert plate', englishPrimaryAction: 'drizzling caramel sauce over a cake slice' },
    { id: 51, name: 'براونی', category: 'dessert', subcategory: 'dessert-cake', illustration: '🍫', description: 'براونی یک دسر شکلاتی فشرده، غنی و مرطوب است که چیزی بین کیک و کوکی قرار می‌گیرد. بافت آن از داخل نرم و از بیرون کمی ترد است.', prepTime: '۳۵ دقیقه', difficulty: 'آسان', servings: 'برای ۹ تکه', ingredients: ['۱/۲ فنجان کره', '۱ فنجان شکر', '۲ عدد تخم مرغ', '۱ ق چ وانیل', '۱/۳ فنجان پودر کاکائو', '۱/۲ فنجان آرد', '۱/۴ ق چ نمک', '۱/۴ ق چ بیکینگ پودر'], instructions: ['فر را با دمای ۱۷۵ درجه سانتی‌گراد گرم کنید. کره را ذوب کنید.', 'در یک کاسه، کره ذوب شده، شکر، تخم مرغ و وانیل را مخلوط کنید.', 'در کاسه‌ای دیگر، مواد خشک (کاکائو، آرد، نمک، بیکینگ پودر) را با هم الک کنید.', 'مواد خشک را به مواد تر اضافه کرده و فقط در حدی که مخلوط شوند هم بزنید.', 'مایه را در یک قالب مربع شکل چرب شده ریخته و به مدت ۲۰-۲۵ دقیقه بپزید.'], tips: ['برای یک براونی مرطوب‌تر (Fudgy)، کمتر آن را بپزید. یک خلال دندان که در مرکز آن فرو می‌کنید باید با کمی خرده‌های مرطوب بیرون بیاید.', 'می‌توانید گردو یا چیپس شکلات نیز به مایه اضافه کنید.'], englishName: 'Brownie', englishVisualName: 'a fudgy chocolate brownie with a cracked top, served with a scoop of ice cream', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a square plate', englishPrimaryAction: 'scooping a brownie from a baking pan' },
    { id: 52, name: 'چیزکیک', category: 'dessert', subcategory: 'dessert-cake', illustration: '🍰', description: 'چیزکیک یک دسر خامه‌ای و غنی است که از یک لایه اصلی پنیری و یک پایه بیسکویتی تشکیل شده است. این دسر را می‌توان به صورت پخته یا یخچالی تهیه کرد.', prepTime: '۳ ساعت', difficulty: 'دشوار', servings: 'برای ۸-۱۰ نفر', ingredients: ['برای پایه: ۲۰۰ گرم بیسکویت دایجستیو، ۱۰۰ گرم کره ذوب شده', 'برای مایه پنیری: ۹۰۰ گرم پنیر خامه‌ای، ۱ فنجان شکر، ۴ عدد تخم مرغ، ۱ فنجان خامه ترش، ۱ ق چ وانیل'], instructions: ['پودر بیسکویت و کره را مخلوط کرده و کف قالب کمربندی فشار دهید. به مدت ۱۰ دقیقه در فر ۱۷۵ درجه بپزید.', 'پنیر خامه‌ای و شکر را با همزن بزنید تا نرم شود.', 'تخم مرغ‌ها را یکی یکی اضافه کرده و بعد از هر کدام خوب هم بزنید.', 'خامه ترش و وانیل را اضافه کنید.', 'مایه را روی پایه بیسکویتی ریخته و به مدت ۱ ساعت در فر ۱۶۰ درجه بپزید.', 'فر را خاموش کرده و اجازه دهید چیزکیک به مدت ۱ ساعت دیگر در فر خاموش بماند.', 'پس از خنک شدن، حداقل ۴ ساعت در یخچال قرار دهید.'], tips: ['برای جلوگیری از ترک خوردن چیزکیک، مواد را بیش از حد هم نزنید و از حمام آب (قرار دادن قالب در ظرف بزرگتر حاوی آب) در فر استفاده کنید.'], englishName: 'Cheesecake', englishVisualName: 'a slice of classic New York cheesecake topped with fresh strawberries', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a dessert plate', englishPrimaryAction: 'placing a fresh strawberry on a cheesecake slice' },
    { id: 53, name: 'کیک یزدی', category: 'dessert', subcategory: 'dessert-cake', illustration: '🧁', description: 'کیک یزدی یک نوع کاپ‌کیک سنتی ایرانی با بافتی نرم و عطری بی‌نظیر از هل و گلاب است. این کیک کوچک و خوشمزه، یک شیرینی محبوب برای همراهی با چای است.', prepTime: '۳۰ دقیقه', difficulty: 'متوسط', servings: 'برای ۱۲ عدد', ingredients: ['۳ عدد تخم مرغ', '۱ فنجان شکر', '۱ فنجان ماست', '۱/۲ فنجان روغن مایع', '۲ فنجان آرد', '۱ ق چ بیکینگ پودر', '۱ ق چ پودر هل', '۲ ق غ گلاب', 'کنجد و پودر پسته برای تزئین'], instructions: ['فر را با دمای ۱۸۰ درجه سانتی‌گراد گرم کنید.', 'تخم مرغ و شکر را با همزن بزنید تا کرم رنگ و کشدار شود.', 'ماست و روغن را اضافه کرده و مخلوط کنید.', 'گلاب و هل را اضافه کنید.', 'آرد و بیکینگ پودر را الک کرده و به تدریج به مایه اضافه کنید و با لیسک به آرامی مخلوط کنید.', 'مایه را در قالب‌های کاپ‌کیک (کپسول‌های کاغذی) ریخته (تا دو سوم پر شود)، روی آن کنجد پاشیده و به مدت ۲۰-۲۵ دقیقه بپزید.'], tips: ['برای گنبدی شدن کیک، می‌توانید از حرارت بالای فر برای چند دقیقه اول استفاده کنید.'], englishName: 'Yazdi Cake', englishVisualName: 'traditional Persian cupcakes (Kek-e Yazdi) with a domed top and sesame seeds', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a paper cupcake liner', englishPrimaryAction: 'baking small traditional cupcakes' },
    // 3-2. دسرهای سرد
    { id: 54, name: 'موس شکلات', category: 'dessert', subcategory: 'dessert-cold', illustration: '🍨', description: 'موس شکلات یک دسر کلاسیک فرانسوی با بافتی سبک، پفکی و ابریشمی است. این دسر غنی و در عین حال لطیف، از شکلات، تخم مرغ و شکر تهیه می‌شود.', prepTime: '۲۰ دقیقه', difficulty: 'متوسط', servings: 'برای ۴ نفر', ingredients: ['۲۰۰ گرم شکلات تلخ (۷۰٪)', '۴ عدد تخم مرغ بزرگ (زرده و سفیده جدا شده)', '۱/۴ فنجان شکر', 'کمی نمک'], instructions: ['شکلات را به روش بن‌ماری یا در مایکروویو ذوب کرده و کنار بگذارید تا کمی خنک شود.', 'زرده‌های تخم مرغ را با نیمی از شکر بزنید تا کرم رنگ و غلیظ شود. سپس شکلات خنک شده را اضافه کنید.', 'در یک کاسه تمیز، سفیده‌های تخم مرغ را با کمی نمک بزنید تا پف کند. بقیه شکر را اضافه کرده و به زدن ادامه دهید تا قله‌های سفت تشکیل شود.', 'یک سوم از سفیده را به مخلوط شکلات اضافه کرده و سریع هم بزنید تا سبک شود.', 'بقیه سفیده را به آرامی و به صورت دورانی (فولد) به مخلوط اضافه کنید تا پف آن نخوابد.', 'موس را در ظرف‌های سرو تقسیم کرده و حداقل ۴ ساعت در یخچال قرار دهید.'], tips: ['استفاده از شکلات با کیفیت بالا، کلید یک موس خوشمزه است.'], englishName: 'Chocolate Mousse', englishVisualName: 'a rich, airy chocolate mousse in a glass dessert cup, garnished with chocolate shavings', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a glass dessert cup', englishPrimaryAction: 'spooning airy chocolate mousse' },
    { id: 55, name: 'موس میوه‌ای', category: 'dessert', subcategory: 'dessert-cold', illustration: '🍨', description: 'موس میوه‌ای، دسری سبک، خنک و باطراوت است که با پوره میوه‌های فصل، خامه و ژلاتین تهیه می‌شود. این دسر انتخابی عالی برای پایان یک وعده غذایی سنگین است.', prepTime: '۲۰ دقیقه', difficulty: 'متوسط', servings: 'برای ۴ نفر', ingredients: ['۱ فنجان پوره میوه (توت‌فرنگی، انبه، تمشک)', '۱ فنجان خامه پرچرب', '۱/۴ فنجان شکر', '۱ قاشق غذاخوری پودر ژلاتین', '۲ قاشق غذاخوری آب سرد'], instructions: ['پودر ژلاتین را روی آب سرد پاشیده و ۵ دقیقه صبر کنید تا اسفنجی شود، سپس روی حرارت غیرمستقیم قرار دهید تا حل شود.', 'پوره میوه و شکر را مخلوط کنید. ژلاتین حل شده را اضافه کنید.', 'خامه را با همزن بزنید تا فرم بگیرد.', 'مخلوط میوه را به آرامی به خامه فرم گرفته اضافه کرده و به صورت دورانی مخلوط کنید.', 'در ظرف‌های سرو ریخته و حداقل ۳ ساعت در یخچال قرار دهید.'], tips: ['می‌توانید از میوه‌های تازه یا یخ‌زده برای تهیه پوره استفاده کنید.'], englishName: 'Fruit Mousse', englishVisualName: 'a light pink strawberry mousse in a dessert glass, topped with a fresh strawberry', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a dessert glass', englishPrimaryAction: 'folding fruit puree into whipped cream' },
    { id: 56, name: 'تیرامیسو', category: 'dessert', subcategory: 'dessert-cold', illustration: '🍮', description: 'تیرامیسو یک دسر محبوب ایتالیایی به معنای "مرا بالا بکش" است. این دسر بدون پخت از لایه‌های بیسکویت لیدی فینگر آغشته به قهوه و کرم غنی ماسکارپونه تهیه می‌شود.', prepTime: '۳۰ دقیقه', difficulty: 'متوسط', servings: 'برای ۶ نفر', ingredients: ['۵۰۰ گرم پنیر ماسکارپونه', '۴ عدد زرده تخم مرغ', '۱/۲ فنجان شکر', '۱.۵ فنجان قهوه اسپرسو قوی (خنک شده)', '۱ بسته بیسکویت لیدی فینگر', 'پودر کاکائو برای تزئین'], instructions: ['زرده‌های تخم مرغ و شکر را روی حرارت غیرمستقیم (بن‌ماری) قرار داده و مرتب هم بزنید تا غلیظ و روشن شود. سپس کنار بگذارید تا خنک شود.', 'پنیر ماسکارپونه را با همزن بزنید تا نرم شود. مخلوط زرده خنک شده را به آن اضافه کنید.', 'بیسکویت‌های لیدی فینگر را به سرعت در قهوه فرو برده و یک لایه کف ظرف بچینید.', 'نیمی از کرم ماسکارپونه را روی بیسکویت‌ها پخش کنید.', 'این لایه‌ها را یک بار دیگر تکرار کنید.', 'روی دسر را پوشانده و حداقل ۶ ساعت (و ترجیحاً یک شب) در یخچال قرار دهید.', 'قبل از سرو، روی آن پودر کاکائو الک کنید.'], tips: ['استفاده از تخم مرغ خام در این دسر رایج است، اما روش بن‌ماری آن را پاستوریزه و ایمن می‌کند.'], englishName: 'Tiramisu', englishVisualName: 'a slice of tiramisu on a plate, showing layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a square plate', englishPrimaryAction: 'dusting cocoa powder over tiramisu' },
    { id: 57, name: 'پاناکوتا', category: 'dessert', subcategory: 'dessert-cold', illustration: '🍮', description: 'پاناکوتا یک دسر ایتالیایی به معنای "خامه پخته شده" است. این دسر بسیار ساده، لطیف و خامه‌ای است که با ژلاتین می‌بندد و معمولاً با سس میوه یا کارامل سرو می‌شود.', prepTime: '۱۵ دقیقه', difficulty: 'آسان', servings: 'برای ۴ نفر', ingredients: ['۲ فنجان خامه پرچرب', '۱/۲ فنجان شکر', '۱.۵ قاشق چای‌خوری پودر ژلاتین', '۳ قاشق غذاخوری آب سرد', '۱ قاشق چای‌خوری عصاره وانیل'], instructions: ['پودر ژلاتین را روی آب سرد بپاشید و بگذارید ۵ دقیقه بماند.', 'خامه و شکر را در یک شیرجوش روی حرارت متوسط گرم کنید تا شکر حل شود. اجازه ندهید بجوشد.', 'از روی حرارت برداشته و مخلوط ژلاتین را اضافه کنید و هم بزنید تا کاملاً حل شود. وانیل را اضافه کنید.', 'مخلوط را در قالب‌های کوچک (رامکین) ریخته و حداقل ۴ ساعت در یخچال قرار دهید تا ببندد.', 'برای سرو، قالب را چند ثانیه در آب گرم قرار داده و در بشقاب برگردانید.'], tips: ['می‌توانید بخشی از خامه را با شیر جایگزین کنید تا دسری سبک‌تر داشته باشید.'], englishName: 'Panna Cotta', englishVisualName: 'a silky smooth panna cotta unmolded onto a plate, with a vibrant berry sauce', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a dessert plate', englishPrimaryAction: 'pouring berry sauce over a panna cotta' },
    { id: 58, name: 'فالوده', category: 'dessert', subcategory: 'dessert-cold', illustration: '🍧', description: 'فالوده یک دسر یخی سنتی و محبوب ایرانی است که از رشته‌های نازک نشاسته‌ای در یک شربت نیمه منجمد تشکیل شده است. این دسر معمولاً با آبلیمو، شربت آلبالو یا گلاب سرو می‌شود.', prepTime: '۱۰ دقیقه', difficulty: 'آسان', servings: 'برای ۲ نفر', ingredients: ['۱۰۰ گرم رشته فالوده آماده', '۱ لیوان شربت آب و شکر یا پالوده آماده', 'آبلیمو تازه یا شربت آلبالو به میزان دلخواه'], instructions: ['اگر از رشته خشک استفاده می‌کنید، آن را طبق دستور بسته بپزید و آبکش کنید.', 'رشته‌ها را با یخ خرد شده یا پالوده نیمه منجمد مخلوط کنید.', 'در کاسه ریخته و با آبلیمو یا شربت آلبالو سرو کنید.'], tips: ['فالوده شیرازی اصیل معمولاً ترش و با آبلیمو سرو می‌شود.'], englishName: 'Faloodeh', englishVisualName: 'a bowl of Persian sorbet (Faloodeh) with thin noodles, rose water syrup, and a squeeze of lime', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a traditional bowl', englishPrimaryAction: 'serving noodle sorbet with lime and syrup' },
    { id: 59, name: 'بستنی سنتی', category: 'dessert', subcategory: 'dessert-cold', illustration: '🍦', description: 'بستنی سنتی ایرانی، دسری بی‌نظیر با طعم غنی زعفران و عطر دل‌انگیز گلاب است که با تکه‌های بزرگ خامه یخ‌زده و خلال پسته تزئین می‌شود.', prepTime: '۵ دقیقه', difficulty: 'آسان', servings: 'برای ۱ نفر', ingredients: ['۲ تا ۳ اسکوپ بستنی سنتی زعفرانی', 'خلال پسته برای تزئین'], instructions: ['بستنی را در یک کاسه یا جام بریزید.', 'روی آن را با خلال پسته تزئین کنید.', 'این بستنی را می‌توان به صورت "بستنی نانی" بین دو لایه ویفر نیز سرو کرد.'], tips: ['برای تجربه کامل، آن را با مقداری فالوده مخلوط کرده و "مخلوط" میل کنید.'], englishName: 'Persian Ice Cream', englishVisualName: 'a scoop of yellow saffron ice cream (Bastani Sonnati) with pistachios and frozen cream chunks', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a metal dessert bowl', englishPrimaryAction: 'serving saffron ice cream between two wafers' },
    // 3-3. دسرهای گرم
    { id: 60, name: 'کرم بروله', category: 'dessert', subcategory: 'dessert-hot', illustration: '🍮', description: 'کرم بروله یک دسر کلاسیک فرانسوی است که از یک کاستارد غنی و وانیلی تشکیل شده و روی آن با لایه‌ای نازک از شکر کاراملی شده و شکننده پوشانده می‌شود. تضاد بین کاستارد سرد و خنک و کارامل گرم و ترد، تجربه بی‌نظیری است.', prepTime: '۱ ساعت', difficulty: 'دشوار', servings: 'برای ۴ نفر', ingredients: ['۲ فنجان خامه پرچرب', '۶ عدد زرده تخم مرغ', '۱/۲ فنجان شکر', '۱ ق چ عصاره وانیل', 'شکر اضافی برای رویه'], instructions: ['فر را با دمای ۱۶۰ درجه سانتی‌گراد گرم کنید.', 'خامه را روی حرارت گرم کنید تا نزدیک به جوش برسد.', 'زرده و شکر را با هم بزنید تا کمرنگ و غلیظ شود. خامه گرم را به تدریج اضافه کرده و هم بزنید. وانیل را اضافه کنید.', 'مخلوط را از صافی رد کرده و در قالب‌های رامکین بریزید.', 'رامکین‌ها را در یک سینی عمیق قرار داده و تا نیمه ارتفاع آن‌ها در سینی آب جوش بریزید (حمام آب).', 'به مدت ۴۰-۵۰ دقیقه بپزید تا لبه‌ها بسته و مرکز آن کمی بلرزد.', 'پس از خنک شدن کامل (حداقل ۴ ساعت در یخچال)، روی هر کدام یک لایه نازک شکر بپاشید و با تورچ آشپزخانه کاراملی کنید.'], tips: ['مرحله حمام آب برای پخت یکنواخت و جلوگیری از دلمه شدن کاستارد ضروری است.'], englishName: 'Crème Brûlée', englishVisualName: 'a crème brûlée in a ramekin with a caramelized sugar crust being cracked with a spoon', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a white ceramic ramekin', englishPrimaryAction: 'caramelizing the sugar top with a kitchen torch' },
    { id: 61, name: 'کیک شکلاتی داغ', category: 'dessert', subcategory: 'dessert-hot', illustration: '🌋', description: 'کیک شکلاتی مذاب یا لاوا کیک، یک کیک شکلاتی کوچک و غنی است که دور آن پخته و مرکز آن مایع و روان باقی می‌ماند. این دسر گرم و دلچسب معمولاً با بستنی وانیلی سرو می‌شود.', prepTime: '۲۵ دقیقه', difficulty: 'متوسط', servings: 'برای ۴ نفر', ingredients: ['۱۲۰ گرم شکلات تلخ', '۱۲۰ گرم کره', '۲ عدد تخم مرغ کامل', '۲ عدد زرده تخم مرغ', '۱/۴ فنجان شکر', '۲ قاشق غذاخوری آرد'], instructions: ['فر را با دمای ۲۰۰ درجه سانتی‌گراد گرم کنید. قالب‌های رامکین را چرب کرده و پودر کاکائو بپاشید.', 'شکلات و کره را با هم به روش بن‌ماری ذوب کنید.', 'در یک کاسه، تخم مرغ‌ها، زرده‌ها و شکر را با همزن بزنید تا کمرنگ و غلیظ شود.', 'مخلوط شکلات را به مخلوط تخم مرغ اضافه کنید.', 'آرد را روی مایه الک کرده و به آرامی مخلوط کنید.', 'مایه را در قالب‌ها ریخته و به مدت ۱۲-۱۴ دقیقه بپزید.', 'بلافاصله پس از خروج از فر، در بشقاب برگردانده و سرو کنید.'], tips: ['زمان پخت بسیار حیاتی است؛ پخت بیش از حد باعث می‌شود مرکز کیک نیز سفت شود.'], englishName: 'Chocolate Lava Cake', englishVisualName: 'a chocolate lava cake on a plate with molten chocolate flowing from its center', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a dessert plate', englishPrimaryAction: 'cutting into a lava cake to reveal the molten center' },
    { id: 62, name: 'پودینگ وانیلی', category: 'dessert', subcategory: 'dessert-hot', illustration: '🍮', description: 'پودینگ وانیلی یک دسر گرم، نرم و آرامش‌بخش است که بافتی شبیه فرنی دارد. این دسر ساده و کلاسیک را می‌توان به تنهایی یا با سس میوه و کارامل سرو کرد.', prepTime: '۲۰ دقیقه', difficulty: 'آسان', servings: 'برای ۴ نفر', ingredients: ['۲ فنجان شیر', '۱/۲ فنجان شکر', '۳ قاشق غذاخوری نشاسته ذرت', '۱/۴ قاشق چای‌خوری نمک', '۲ عدد زرده تخم مرغ', '۲ قاشق غذاخوری کره', '۱ ق چ عصاره وانیل'], instructions: ['در یک شیرجوش، شکر، نشاسته ذرت و نمک را مخلوط کنید. شیر را به تدریج اضافه کرده و هم بزنید تا یکدست شود.', 'روی حرارت متوسط قرار داده و مدام هم بزنید تا غلیظ شود و به جوش آید. ۱ دقیقه بجوشانید.', 'مقدار کمی از مخلوط داغ را به زرده‌های تخم مرغ زده شده اضافه کنید (برای هم‌دما کردن) و سپس مخلوط زرده را به شیرجوش برگردانید.', '۱ دقیقه دیگر بپزید.', 'از روی حرارت برداشته، کره و وانیل را اضافه کنید.', 'به صورت گرم سرو کنید.'], tips: ['هم زدن مداوم برای جلوگیری از گلوله شدن و ته‌گرفتن ضروری است.'], englishName: 'Vanilla Pudding', englishVisualName: 'a bowl of warm vanilla pudding with a fruit sauce on top', englishVisualSteps: [], englishKeywords: [], englishVesselType: 'a small bowl', englishPrimaryAction: 'serving warm vanilla pudding with fruit sauce' }
];

const subcategoriesData = {
    hot: [
        { id: 'hot-coffee', name: 'بر پایه قهوه و اسپرسو' },
        { id: 'hot-chocolate', name: 'بر پایه شکلات و شیر' },
        { id: 'hot-tea', name: 'بر پایه چای' },
        { id: 'hot-herbal', name: 'نوشیدنی‌های گیاهی و دمنوش' }
    ],
    cold: [
        { id: 'cold-coffee', name: 'بر پایه قهوه و اسپرسو' },
        { id: 'cold-milk', name: 'بر پایه شیر و شکلات' },
        { id: 'cold-smoothie', name: 'اسموتی‌ها و شیک‌های میوه‌ای' },
        { id: 'cold-mocktail', name: 'نوشیدنی‌های گازدار و موکتل‌ها' },
        { id: 'cold-tea', name: 'چای و دمنوش سرد' }
    ],
    dessert: [
        { id: 'dessert-cake', name: 'کیک و شیرینی' },
        { id: 'dessert-cold', name: 'دسرهای سرد' },
        { id: 'dessert-hot', name: 'دسرهای گرم' }
    ]
};

const categoryData = [
    { id: 'hot', name: 'نوشیدنی‌های گرم', icon: <SteamIcon /> },
    { id: 'cold', name: 'نوشیدنی‌های سرد', icon: <IceCubeIcon /> },
    { id: 'dessert', name: 'دسرها و خوراکی‌ها', icon: <DessertIcon /> }
];

// --- Main App Component ---
const App = () => {
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini-api-key') || '');
    const [ai, setAi] = useState(null);
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [infographicUrl, setInfographicUrl] = useState({});
    const [isLoadingInfographic, setIsLoadingInfographic] = useState(false);
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
    const [suggestionResult, setSuggestionResult] = useState('');
    const [isLoadingScan, setIsLoadingScan] = useState(false);
    const [initialIngredients, setInitialIngredients] = useState('');
    const aiSettingsRef = useRef < HTMLDivElement > (null);

    useEffect(() => {
        if (apiKey) {
            try {
                const genAI = new GoogleGenAI({ apiKey });
                setAi(genAI);
            } catch (error) {
                console.error("Failed to initialize GoogleGenAI:", error);
                alert("کلید API نامعتبر است. لطفاً آن را بررسی کنید.");
                localStorage.removeItem('gemini-api-key');
                setApiKey('');
                setAi(null);
            }
        }
    }, [apiKey]);

    const handleSaveApiKey = (key) => {
        localStorage.setItem('gemini-api-key', key);
        setApiKey(key);
    };
    
    const promptForApiKey = () => {
        alert('برای استفاده از این ویژگی هوشمند، لطفاً کلید API خود را در پایین صفحه وارد کنید.');
        if (aiSettingsRef.current) {
            aiSettingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            aiSettingsRef.current.classList.add('highlight');
            setTimeout(() => {
              aiSettingsRef.current?.classList.remove('highlight');
            }, 2500);
        }
    };

    // --- Navigation Handlers ---
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentView('category');
    };

    const handleSubcategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setCurrentView('product-grid');
    };

    const handleRecipeSelect = (recipe) => {
        setSelectedRecipe(recipe);
        setCurrentView('recipe-detail');
    };
    
    const handleNavigateToSuggest = (ingredients = '') => {
        if (!apiKey) {
            promptForApiKey();
            return;
        }
        setInitialIngredients(ingredients);
        setSuggestionResult('');
        setCurrentView('suggest');
    };

    const handleNavigateToScan = () => {
        if (!apiKey) {
            promptForApiKey();
            return;
        }
        setCurrentView('scan');
    };

    const handleBack = () => {
        if (currentView === 'recipe-detail') {
            setSelectedRecipe(null);
            setCurrentView('product-grid');
        } else if (currentView === 'product-grid') {
            setSelectedSubcategory(null);
            setCurrentView('category');
        } else if (currentView === 'category') {
            setSelectedCategory(null);
            setCurrentView('dashboard');
        } else if (currentView === 'suggest' || currentView === 'scan') {
             setCurrentView('dashboard');
        }
    };
    
    // --- Prompt Generator Functions ---
    const getDrinkType = (recipe) => {
        const layeredKeywords = ['latte', 'cappuccino', 'mocha', 'macchiato', 'tiramisu'];
        if (recipe.category === 'dessert') return 'dessert';
        if (recipe.subcategory === 'cold-smoothie' || recipe.name.includes('شیک') || recipe.name.includes('فراپه')) {
            return 'blended';
        }
        const englishNameLower = recipe.englishName.toLowerCase();
        if (layeredKeywords.some(keyword => englishNameLower.includes(keyword))) {
            return 'layered';
        }
        return 'other'; // Default for things like Americano, Tea, etc.
    };
    
    const generateInfographicPrompt = (recipe) => {
        if (!recipe) return '';
        const drinkType = getDrinkType(recipe);
        let prompt;

        if (drinkType === 'layered') {
            prompt = `A clean, minimal, café-style infographic for a "${recipe.englishName}". Show a transparent glass with clean, distinct horizontal layers representing the main ingredients. Each layer should be clearly visible and labeled with its name. Use minimal icons and arrows to point to the layers. The background must be a solid warm cream color. The overall style should be professional, simple, and elegant. --style raw`;
        } else if (drinkType === 'blended') {
            prompt = `A clean, minimal, café-style infographic for a "${recipe.englishName}". Show a tall glass filled with a smooth, creamy textured drink. Around the glass, place small, simple icons of the main ingredients. Use neat arrows pointing from the ingredients to the glass. The background must be a solid warm cream color. The overall style should be professional, fresh, and appealing. --style raw`;
        } else if (drinkType === 'dessert') {
            prompt = `A clean, minimal, café-style infographic for "${recipe.englishName}". Show a beautifully plated serving of the dessert. Around the plate, place small, simple icons of the main ingredients with neat labels. The background must be a solid warm cream color. The overall style should be professional, delicious, and inviting. --style raw`;
        } else { // Default for 'other' types
            prompt = `A clean, minimal, café-style infographic for a "${recipe.englishName}". Show the final drink in its typical vessel. Around the vessel, place small, simple icons of the main ingredients with neat labels. Use arrows to subtly indicate the ingredients. The background must be a solid warm cream color. The overall style should be professional, clear, and inviting. --style raw`;
        }

        return prompt.replace(/\s+/g, ' ').trim();
    };
    
    // --- AI Handlers ---
    const handleGenerateVisualization = async (recipe) => {
        if (!ai || !recipe) return;
        setIsLoadingInfographic(true);
        const prompt = generateInfographicPrompt(recipe);
        try {
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/png',
                  aspectRatio: '3:4'
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image) {
                const base64ImageBytes = response.generatedImages[0].image.imageBytes;
                const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                setInfographicUrl(prev => ({ ...prev, [recipe.id]: imageUrl }));
            } else {
                 throw new Error("No image generated or image data is missing.");
            }
        } catch (error) {
            console.error("Error generating visualization:", error);
            const generatedImageUrl = `https://via.placeholder.com/400x533.png/FBF9F6/4E443C?text=Error+Generating+Image`;
            setInfographicUrl(prev => ({...prev, [recipe.id]: generatedImageUrl }));
        } finally {
            setIsLoadingInfographic(false);
        }
    };
    

    const handleGetSuggestion = async (ingredients) => {
        if (!ai || !ingredients) return;
        setIsLoadingSuggestion(true);
        setSuggestionResult('');
        try {
            const systemInstruction = "You are a creative and friendly barista. The user will give you a list of ingredients they already have at home. Your task is to suggest 2 to 3 drink recipes (hot or cold) that can be prepared using those ingredients. At least one recipe must be creative, fun, and a bit unexpected to pleasantly surprise the user. Output Rules: - Always respond in Persian language. - Use a warm, encouraging, and friendly tone, like a barista talking to a customer. - Present recipes in a clear, readable Markdown format: * Use headings (##) for each recipe name. * Use bullet points for ingredients and steps. * End with a short motivational or cheerful closing sentence.";
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: ingredients,
                config: { systemInstruction }
            });
            setSuggestionResult(response.text);
        } catch (error) {
            console.error("Error getting suggestion:", error);
            setSuggestionResult('متاسفانه مشکلی پیش آمد. لطفاً دوباره امتحان کنید.');
        } finally {
            setIsLoadingSuggestion(false);
        }
    };

    const handleScanComplete = async (base64Image) => {
        if (!ai) return;
        setIsLoadingScan(true);
        try {
            const imagePart = { inlineData: { mimeType: 'image/jpeg', data: base64Image } };
            const systemInstruction = "You are an assistant that identifies ingredients from an image. The user will take a picture of some food items or drink ingredients. Your task is to analyze the picture and return the list of identified ingredients. Output Rules: - Output must be a simple comma-separated text list, with no extra explanation. - Only return ingredient names (e.g., \"milk, instant coffee, orange\"). - Do not include brand names, labels, or unrelated objects.";
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart] },
                config: { systemInstruction }
            });
            handleNavigateToSuggest(response.text);
        } catch (error) {
            console.error("Error scanning ingredients:", error);
            alert('اسکن مواد اولیه با مشکل مواجه شد. لطفاً دوباره تلاش کنید.');
        } finally {
            setIsLoadingScan(false);
        }
    };


    useEffect(() => {
        if (apiKey && selectedRecipe && !infographicUrl[selectedRecipe.id] && !isLoadingInfographic) {
            handleGenerateVisualization(selectedRecipe);
        }
    }, [selectedRecipe, ai, apiKey]);

    // --- View Rendering ---
    const renderView = () => {
        switch (currentView) {
            case 'suggest':
                return <SuggestView onBack={handleBack} onSuggest={handleGetSuggestion} isLoading={isLoadingSuggestion} result={suggestionResult} initialText={initialIngredients} />;
            case 'scan':
                return <ScanView onBack={handleBack} onScanComplete={handleScanComplete} isLoading={isLoadingScan} />;
            case 'category':
                return <CategoryView category={selectedCategory} onSubcategorySelect={handleSubcategorySelect} onBack={handleBack} />;
            case 'product-grid':
                return <ProductGridView category={selectedCategory} subcategory={selectedSubcategory} onRecipeSelect={handleRecipeSelect} onBack={handleBack} />;
            case 'recipe-detail':
                return <RecipeDetail 
                            recipe={selectedRecipe} 
                            onBack={handleBack} 
                            infographicUrl={infographicUrl[selectedRecipe.id]} 
                            isLoading={isLoadingInfographic} 
                            apiKey={apiKey} 
                        />;
            case 'dashboard':
            default:
                return <DashboardView 
                    onCategorySelect={handleCategorySelect} 
                    onNavigateToSuggest={handleNavigateToSuggest} 
                    onNavigateToScan={handleNavigateToScan}
                    onSaveApiKey={handleSaveApiKey}
                    currentKey={apiKey}
                    aiSettingsRef={aiSettingsRef}
                 />;
        }
    };

    return <div className="app-container">{renderView()}</div>;
};

// --- Sub-Components ---

interface AiSettingsViewProps {
    currentKey: string;
    onSave: (key: string) => void;
}

const AiSettingsView = React.forwardRef < HTMLDivElement, AiSettingsViewProps > (({ currentKey, onSave }, ref) => {
    const [inputKey, setInputKey] = useState('');

    useEffect(() => {
        setInputKey(currentKey);
    }, [currentKey]);

    const handleSave = () => {
        if (inputKey.trim()) {
            onSave(inputKey.trim());
        }
    };
    
    return (
        <div className="ai-settings-card" ref={ref}>
            <h3>تنظیمات هوش مصنوعی</h3>
            <p>
                برای استفاده از ویژگی‌های هوشمند، کلید Gemini API خود را وارد کنید. برای دریافت کلید رایگان، به <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">Google AI Studio</a> مراجعه کرده، وارد شوید و روی "Get API key" کلیک کنید.
            </p>
            <div className="ai-settings-form">
                <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="کلید API خود را اینجا وارد کنید"
                    className="api-key-input"
                    aria-label="API Key Input"
                />
                <button onClick={handleSave} className="primary-button" disabled={!inputKey.trim()}>
                    ذخیره
                </button>
            </div>
        </div>
    );
});

interface DashboardViewProps {
    onCategorySelect: (category: typeof categoryData[0]) => void;
    onNavigateToSuggest: (ingredients?: string) => void;
    onNavigateToScan: () => void;
    onSaveApiKey: (key: string) => void;
    currentKey: string;
    aiSettingsRef: React.RefObject<HTMLDivElement>;
}

const DashboardView = ({ onCategorySelect, onNavigateToSuggest, onNavigateToScan, onSaveApiKey, currentKey, aiSettingsRef }: DashboardViewProps) => {
    return (
        <div className="dashboard-view">
            <div>
                <div className="dashboard-header">
                    <h1>کافه چی هوشمند</h1>
                    <p>چه نوشیدنی‌ای میل دارید؟</p>
                </div>
                <div className="primary-actions">
                    {categoryData.map(cat => (
                        <div key={cat.id} className={`category-action-card ${cat.id}-card`} onClick={() => onCategorySelect(cat)}>
                            <div className="icon">{cat.icon}</div>
                            <span>{cat.name}</span>
                        </div>
                    ))}
                </div>
                <div className="secondary-actions">
                    <button className="primary-button" onClick={() => onNavigateToSuggest()}>
                        پیشنهاد با مواد اولیه
                    </button>
                    <button className="secondary-button" onClick={() => onNavigateToScan()}>
                        اسکن مواد اولیه
                    </button>
                </div>
            </div>
            <AiSettingsView
                ref={aiSettingsRef}
                currentKey={currentKey}
                onSave={onSaveApiKey}
            />
        </div>
    );
};

const CategoryView = ({ category, onSubcategorySelect, onBack }) => {
    const subcategories = subcategoriesData[category.id] || [];
    return (
        <div className="category-view">
            <ViewHeader title={category.name} onBack={onBack} />
            <div className="grid-container">
                <div className="category-grid">
                    {subcategories.map(sub => (
                        <div key={sub.id} className="subcategory-card" onClick={() => onSubcategorySelect(sub)}>
                            {sub.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProductGridView = ({ category, subcategory, onRecipeSelect, onBack }) => {
    const drinks = drinksData.filter(d => d.category === category.id && d.subcategory === subcategory.id);
    return (
        <div className="product-grid-view">
            <ViewHeader title={subcategory.name} onBack={onBack} />
            <div className="grid-container">
                <div className="drink-grid">
                    {drinks.map(drink => (
                        <div key={drink.id} className="drink-card" onClick={() => onRecipeSelect(drink)}>
                            <div className="illustration">{drink.illustration}</div>
                            <div className="name">{drink.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RecipeDetail = ({ recipe, onBack, infographicUrl, isLoading, apiKey }) => {
    if (!recipe) return null;

    return (
        <div className="recipe-detail">
            <ViewHeader title="" onBack={onBack} />
            <div className="recipe-detail-content">
                <div className="recipe-layout">
                    <div className="recipe-visual-column">
                        <div className="infographic-placeholder">
                            {isLoading ? (
                                <div className="loader"></div>
                            ) : infographicUrl ? (
                                <img src={infographicUrl} alt={`راهنمای تصویری برای ${recipe.name}`} />
                            ) : !apiKey ? (
                                <p>برای ساخت راهنمay تصویری، لطفاً کلید API خود را در صفحه اصلی وارد کنید.</p>
                            ) : (
                                <p>در حال تولید راهنمای تصویری...</p>
                            )}
                        </div>
                    </div>
                    <div className="recipe-text-column">
                        <div className="recipe-text-content">
                            <div className="recipe-header">
                                <h1 className="recipe-title">{recipe.name}</h1>
                                <p className="recipe-description">{recipe.description}</p>
                                <div className="info-icons">
                                    <span className="info-icon"><TimeIcon /> {recipe.prepTime}</span>
                                    <span className="info-icon"><DifficultyIcon /> {recipe.difficulty}</span>
                                </div>
                            </div>

                            <div className="recipe-section">
                                <h3>مواد لازم</h3>
                                {recipe.servings && <p className="servings-info">{recipe.servings}</p>}
                                <ul className="ingredients-list">
                                    {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>

                            <div className="recipe-section">
                                <h3>طرز تهیه</h3>
                                <ol className="instructions-list">
                                    {recipe.instructions.map((step, index) => (
                                        <li key={index} className="recipe-step">
                                            <div className="step-number">{index + 1}</div>
                                            <p className="step-instruction">{step}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            
                            {recipe.tips && recipe.tips.length > 0 && (
                                <div className="recipe-section tips-section">
                                    <h3>نکات حرفه‌ای</h3>
                                    <ul className="tips-list">
                                        {recipe.tips.map((tip, index) => <li key={index}>{tip}</li>)}
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SuggestView = ({ onBack, onSuggest, isLoading, result, initialText }) => {
    const [ingredients, setIngredients] = useState(initialText);

    useEffect(() => {
        setIngredients(initialText);
    }, [initialText]);

    const handleSubmit = () => {
        onSuggest(ingredients);
    };

    const renderResult = () => {
        if (!result) return null;
        const sections = result.split(/(?=##\s)/g);
        return sections.map((section, index) => {
            const lines = section.split('\n').filter(line => line.trim() !== '');
            if (lines.length === 0) return null;
            
            const heading = lines[0].startsWith('## ') ? <h2 key={`h-${index}`}>{lines[0].substring(3)}</h2> : null;
            const listItems = lines.slice(heading ? 1 : 0).map((line, lineIndex) => {
                 if (line.startsWith('* ')) return <li key={`li-${index}-${lineIndex}`}>{line.substring(2)}</li>;
                 return <p key={`p-${index}-${lineIndex}`}>{line}</p>;
            });

            return <div key={`sec-${index}`}>{heading}{listItems}</div>;
        });
    };

    return (
        <div className="suggest-view">
            <ViewHeader title="پیشنهاد با مواد اولیه" onBack={onBack} />
            <div className="suggest-content">
                <p className="suggest-instruction">موادی که در خانه دارید را وارد کنید (مثلاً: شیر، پودر کاکائو، دارچین)</p>
                <textarea 
                    className="ingredient-input"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="اینجا بنویسید..."
                    aria-label="Ingredients Input"
                />
                <button className="primary-button" onClick={handleSubmit} disabled={isLoading || !ingredients.trim()}>
                    {isLoading ? 'در حال بررسی...' : 'پیشنهاد بگیر'}
                </button>
                <div className="suggestion-results-container">
                    {isLoading ? <div className="loader"></div> : (result && <div className="suggestion-results">{renderResult()}</div>)}
                </div>
            </div>
        </div>
    );
};

const ScanView = ({ onBack, onScanComplete, isLoading }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    
    useEffect(() => {
        let stream;
        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert('دسترسی به دوربین ممکن نیست. لطفاً مجوزهای لازم را بررسی کنید.');
                onBack();
            }
        };
        startCamera();
        return () => {
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, [onBack]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            const base64Image = dataUrl.split(',')[1];
            onScanComplete(base64Image);
        }
    };
    
    return (
        <div className="scan-view">
            {isLoading && (
                <div className="scan-loading-overlay">
                    <div className="loader"></div>
                    <p>در حال شناسایی مواد اولیه...</p>
                </div>
            )}
            <ViewHeader title="اسکن مواد اولیه" onBack={onBack} />
            <div className="camera-container">
                <video ref={videoRef} autoPlay playsInline muted className="camera-feed"></video>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <button className="capture-button" onClick={handleCapture} aria-label="گرفتن عکس">
                <div className="capture-icon"></div>
            </button>
        </div>
    );
};


const ViewHeader = ({ title, onBack }) => (
    <div className="view-header">
        {onBack && <button onClick={onBack} className="back-button" aria-label="بازگشت">‹</button>}
        <h2 className="view-title">{title}</h2>
    </div>
);


// --- Render App ---
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
