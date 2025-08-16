
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";


// --- Icons ---
const SteamIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 18H.5c.6-1.5 1-3.2 1-5C1.5 7.8 6 4 11.5 4c4.1 0 7.6 2.5 9 6"/><path d="M4 22h14c.6-1.5 1-3.2 1-5 0-5.2-4.5-9.5-10-9.5C4.9 7.5 1 11.1 1 15.5c0 .3 0 .6.1.9"/><path d="M7 18h11c.6-1.5 1-3.2 1-5 0-5.2-4.5-9.5-10-9.5C4.4 3.5.5 7.1.5 11.5c0 .4.1.8.1 1.2"/></svg>);
const IceCubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 10.5h18"/><path d="M10.5 3v18"/></svg>);
const TimeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
const DifficultyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4"/><path d="M6 14l6 6 6-6"/></svg>);
const TypeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4"/><path d="M16 17H8"/><path d="M12 13H8"/><path d="M12 9H8"/></svg>);

// --- Data ---
const drinksData = [
    // --- نوشیدنی‌های گرم ---
    { id: 1, name: 'اسپرسو', category: 'hot', subcategory: 'coffee', illustration: '☕️', description: 'پایه و اساس بسیاری از نوشیدنی‌های قهوه، غلیظ، قوی و سرشار از طعم.', prepTime: '۲ دقیقه', difficulty: 'متوسط', ingredients: ['۱۸-۲۰ گرم قهوه با درجه آسیاب بسیار نرم (Fine)', 'آب تصفیه شده با دمای ۹۰-۹۴ درجه سانتی‌گراد'], instructions: ['ابتدا ۱۸ تا ۲۰ گرم دانه قهوه با درجه آسیاب مناسب اسپرسو را اندازه‌گیری کنید. قهوه آسیاب شده را در سبد پرتافیلتر خود بریزید و با استفاده از ابزار مناسب (Leveler) یا ضربات آرام، سطح آن را کاملاً صاف و یکدست کنید.', 'با استفاده از تمپر، فشار مستقیم و یکنواختی (حدود ۱۵ کیلوگرم) بر روی سطح قهوه وارد کنید تا یک قرص قهوه (Puck) کاملاً فشرده و هموار ایجاد شود. سطح تمپر باید کاملاً افقی باشد.', 'قبل از اتصال، هدگروپ دستگاه را برای چند ثانیه فعال کنید تا آب اضافی خارج شود (Purge). سپس پرتافیلتر را در جای خود قفل کرده، فنجان و ترازو را زیر آن قرار دهید و بلافاصله دکمه عصاره‌گیری را بزنید.', 'فرآیند عصاره‌گیری ایده‌آل باید بین ۲۵ تا ۳۰ ثانیه زمان ببرد. جریان قهوه باید شبیه به «دم موش» و به رنگ عسلی تیره باشد. خروجی نهایی برای یک شات دابل اسپرسو باید حدود ۳۶ تا ۴۰ گرم نوشیدنی با یک کرمای غلیظ و پایدار باشد.'], englishName: 'Espresso', englishVisualName: 'a small porcelain espresso cup with a rich, thick crema on top', englishVisualSteps: ['dosing finely ground coffee into a portafilter', 'tamping the coffee grounds evenly and firmly', 'locking the portafilter into the espresso machine\'s group head', 'extracting a rich, dark shot of espresso with a stable crema'], englishKeywords: ['portafilter', 'espresso machine', 'coffee grounds', 'rich crema'], englishVesselType: 'a small, white espresso cup', englishPrimaryAction: 'extracting a rich, dark shot of espresso with a stable crema from a machine into a cup' },
    { id: 2, name: 'آمریکانو', category: 'hot', subcategory: 'coffee', illustration: '☕️', description: 'اسپرسوی داغ که با افزودن آب داغ، طعمی ملایم‌تر و حجمی بیشتر پیدا می‌کند.', prepTime: '۳ دقیقه', difficulty: 'آسان', ingredients: ['۱ شات اسپرسو (دبل، حدود ۴۰ گرم)', '۱۲۰-۱۸۰ میلی‌لیتر آب داغ (با دمای ۸۵ تا ۹۰ درجه سانتی‌گراد)'], instructions: ['فنجان سرو خود را با ریختن آب داغ در آن پیش‌گرم کنید. این کار به حفظ دمای نوشیدنی کمک می‌کند. پس از ۳۰ ثانیه، آب را خالی کنید.', 'یک شات دابل اسپرسو (حدود ۳۶-۴۰ گرم) را مستقیماً در فنجان پیش‌گرم شده عصاره‌گیری کنید.', 'آب داغ (با دمای حدود ۸۵ تا ۹۰ درجه سانتی‌گراد، نه در حال جوش) را به آرامی و با احتیاط به اسپرسو اضافه کنید. برای حفظ کرما، آب را به دیواره فنجان نزدیک کنید.'], englishName: 'Americano', englishVisualName: 'a steaming black coffee in a large ceramic mug', englishVisualSteps: ['extracting a double shot of espresso into a preheated mug', 'gently pouring hot water from a gooseneck kettle over the espresso'], englishKeywords: ['espresso shot', 'gooseneck kettle', 'hot water', 'ceramic mug'], englishVesselType: 'a large ceramic mug', englishPrimaryAction: 'gently pouring hot water from a gooseneck kettle into a mug containing a fresh shot of espresso' },
    { id: 3, name: 'ماکیاتو', category: 'hot', subcategory: 'coffee', illustration: '☕️', description: 'یک شات اسپرسو که با مقدار کمی فوم شیر "لکه‌دار" شده است.', prepTime: '۳ دقیقه', difficulty: 'متوسط', ingredients: ['۱ شات اسپرسو', '۱-۲ قاشق چای‌خوری فوم شیر گرم'], instructions: ['یک شات اسپرسوی سینگل یا دابل را در یک فنجان کوچک (demitasse) عصاره‌گیری کنید.', 'حدود ۳۰ تا ۶۰ میلی‌لیتر شیر سرد را در پیچر بریزید. نازل بخار را درست زیر سطح شیر قرار داده و آن را فعال کنید تا فوم غلیظ و خشکی (Dry Foam) ایجاد شود.', 'با استفاده از یک قاشق، فقط ۱ تا ۲ قاشق چای‌خوری از فوم شیر را برداشته و به آرامی در مرکز سطح اسپرسو قرار دهید تا یک "لکه" سفید ایجاد شود.'], englishName: 'Macchiato', englishVisualName: 'a shot of espresso in a small glass "stained" with a dollop of milk foam', englishVisualSteps: ['extracting a perfect shot of espresso into a demitasse glass', 'steaming a small amount of milk to create a dense microfoam', 'spooning a small dollop of the milk foam onto the center of the espresso'], englishKeywords: ['espresso shot', 'milk foam', 'spoon', 'demitasse glass'], englishVesselType: 'a small demitasse glass', englishPrimaryAction: 'spooning a small dollop of dense milk foam onto the center of a freshly extracted espresso shot' },
    { id: 4, name: 'لاته', category: 'hot', subcategory: 'coffee', illustration: '🥛', description: 'ترکیبی مخملی و محبوب از اسپرسوی غنی و شیر بخارداده شده با بافتی نرم.', prepTime: '۵ دقیقه', difficulty: 'متوسط', ingredients: ['۱ شات اسپرسو (۱۸-۲۰ گرم قهوه آسیاب شده)', '۱۸۰-۲۲۰ میلی‌لیتر شیر پرچرب', 'شکر یا سیروپ طعم‌دهنده (اختیاری)'], instructions: ['یک شات دابل اسپرسو را مستقیماً در لیوان یا فنجان لاته (حدود ۲۵۰-۳۰۰ میلی‌لیتر) خود عصاره‌گیری کنید.', 'شیر سرد را در پیچر بریزید. نازل بخار را کمی زیر سطح شیر قرار دهید تا هوا وارد شده و حجم شیر کمی افزایش یابد (مرحله کشش). سپس نازل را عمیق‌تر کرده و گردابی ایجاد کنید تا شیر به بافتی یکدست و مخملی (میکروفوم) و دمای ۶۰-۶۵ درجه سانتی‌گراد برسد.', 'پیچر را به آرامی روی سطح کار بکوبید تا حباب‌های بزرگ از بین بروند. شیر را با حرکتی کنترل‌شده و یکنواخت به مرکز اسپرسو اضافه کنید. با نزدیک کردن نوک پیچر به سطح نوشیدنی، می‌توانید لاته آرت ایجاد کنید.'], englishName: 'Caffè Latte', englishVisualName: 'a latte in a ceramic cup with simple heart latte art', englishVisualSteps: ['extracting a perfect shot of espresso into a cup', 'steaming milk in a pitcher until it has a silky microfoam', 'pouring the steamed milk into the espresso to create latte art'], englishKeywords: ['espresso shot', 'milk pitcher', 'steamed milk', 'ceramic mug'], englishVesselType: 'a tall ceramic latte mug', englishPrimaryAction: 'pouring silky steamed milk into an espresso shot to create simple latte art' },
    { id: 5, name: 'کاپوچینو', category: 'hot', subcategory: 'coffee', illustration: '🥛', description: 'تعادلی عالی بین اسپرسو، شیر گرم و لایه‌ای ضخیم از فوم شیر.', prepTime: '۵ دقیقه', difficulty: 'متوسط', ingredients: ['۱ شات اسپرسو', '۱۲۰-۱۵۰ میلی‌لیتر شیر سرد'], instructions: ['یک شات اسپرسوی دابل را در فنجان کاپوچینوی استاندارد (۱۵۰-۱۸۰ میلی‌لیتر) عصاره‌گیری کنید.', 'شیر سرد را در پیچر بریزید و نازل بخار را فعال کنید. در ابتدا با قرار دادن نوک نازل در سطح شیر، هوادهی بیشتری انجام دهید تا یک فوم غلیظ و حجیم ایجاد شود. سپس نازل را کمی عمیق‌تر ببرید تا شیر به دمای ۶۰-۶۵ درجه برسد.', 'پس از بخاردهی، شیر را به آرامی به مرکز اسپرسو اضافه کنید. به دلیل حجم بالای فوم، یک لایه ضخیم و گنبدی شکل از فوم روی نوشیدنی تشکیل خواهد شد که مشخصه کاپوچینوی کلاسیک است.'], englishName: 'Cappuccino', englishVisualName: 'a cup of coffee with a thick, luxurious layer of milk foam, dusted with cocoa', englishVisualSteps: ['extracting a shot of espresso into a classic cappuccino cup', 'steaming milk to create a large volume of airy foam', 'pouring a small amount of steamed milk and then spooning a thick cap of foam on top'], englishKeywords: ['espresso shot', 'airy milk foam', 'cappuccino cup', 'cocoa powder'], englishVesselType: 'a classic round cappuccino cup', englishPrimaryAction: 'pouring steamed milk and spooning a thick cap of airy foam on top of a shot of espresso' },
    { id: 6, name: 'موکا', category: 'hot', subcategory: 'coffee', illustration: '🍫', description: 'ترکیبی دلپذیر از اسپرسو، شیر بخارداده و سس شکلات، اغلب با خامه زده شده.', prepTime: '۶ دقیقه', difficulty: 'متوسط', ingredients: ['۱ شات اسپرسو', '۱۵۰ میلی‌لیتر شیر', '۳۰ میلی‌لیتر سس شکلات غلیظ', 'خامه زده شده برای تزئین (اختیاری)'], instructions: ['سس شکلات را در کف لیوان یا ماگ سرو خود بریزید.', 'یک شات دابل اسپرسوی داغ را مستقیماً روی سس عصاره‌گیری کرده و به خوبی هم بزنید تا کاملاً مخلوط شوند.', 'شیر را مانند لاته بخار دهید تا به بافتی نرم و مخملی (میکروفوم) برسد.', 'شیر بخارداده شده را به آرامی به مخلوط اسپرسو و شکلات اضافه کنید. در صورت تمایل، روی آن را با خامه زده شده و پودر کاکائو یا سس شکلات تزئین کنید.'], englishName: 'Mocha', englishVisualName: 'a tall glass of coffee with chocolate sauce, steamed milk, and topped with whipped cream', englishVisualSteps: ['pumping rich chocolate sauce into the bottom of a cup', 'extracting a shot of espresso directly over the sauce and stirring', 'pouring in silky steamed milk', 'topping the drink with a swirl of whipped cream and chocolate drizzle'], englishKeywords: ['espresso', 'chocolate sauce', 'steamed milk', 'whipped cream'], englishVesselType: 'a tall glass mug', englishPrimaryAction: 'pouring silky steamed milk into a glass with espresso and chocolate, topped with whipped cream' },
    { id: 7, name: 'موکاپاچینو', category: 'hot', subcategory: 'coffee', illustration: '🍫', description: 'یک کاپوچینوی کلاسیک با افزودن طعم شکلات برای تجربه‌ای متفاوت.', prepTime: '۶ دقیقه', difficulty: 'متوسط', ingredients: ['۱ شات اسپرسو', '۱۲۰ میلی‌لیتر شیر', '۱ قاشق غذاخوری پودر کاکائو یا سس شکلات'], instructions: ['پودر کاکائو یا سس شکلات را با یک شات اسپرسوی داغ در فنجان خود به خوبی مخلوط کنید تا کاملاً حل شود.', 'شیر را دقیقاً مانند کاپوچینو بخار دهید تا فوم حجیم و غلیظی ایجاد شود.', 'شیر بخار داده شده را به مخلوط شکلاتی اضافه کنید تا یک لایه فوم ضخیم روی آن تشکیل شود.'], englishName: 'Mochaccino', englishVisualName: 'a cappuccino with a distinct chocolate flavor, dusted with cocoa powder', englishVisualSteps: ['brewing a shot of espresso and mixing it with chocolate powder in a cup', 'steaming milk to create the thick foam of a cappuccino', 'pouring the milk and foam over the chocolate-espresso mixture'], englishKeywords: ['espresso', 'chocolate powder', 'milk foam', 'cappuccino cup'], englishVesselType: 'a cappuccino cup', englishPrimaryAction: 'pouring cappuccino-style frothed milk over a chocolate-espresso mixture' },
    { id: 8, name: 'قهوه ترک', category: 'hot', subcategory: 'coffee', illustration: '☕️', description: 'روشی سنتی برای دم‌آوری قهوه بسیار ریز آسیاب شده، با کفی غلیظ.', prepTime: '۸ دقیقه', difficulty: 'متوسط', ingredients: ['۱ قاشق چای‌خوری سرپر (حدود ۷ گرم) قهوه ترک', '۱ فنجان آب سرد', 'شکر به میزان دلخواه'], instructions: ['قهوه، شکر (در صورت استفاده) و آب سرد تصفیه شده را در جذوه (قهوه‌جوش ترک) بریزید و با قاشق فقط یک بار به آرامی هم بزنید تا مخلوط شوند.', 'جذوه را روی حرارت بسیار ملایم قرار دهید. از این مرحله به بعد به هیچ وجه قهوه را هم نزنید.', 'قهوه به آرامی شروع به بالا آمدن کرده و کفی غلیظ روی سطح آن تشکیل می‌شود. درست قبل از اینکه به نقطه جوش برسد و کف از بین برود، آن را از روی حرارت بردارید.', 'ابتدا کف تشکیل شده را با قاشق در فنجان‌ها تقسیم کنید. سپس جذوه را دوباره برای چند ثانیه روی حرارت قرار داده و قبل از جوش آمدن، قهوه را به آرامی در فنجان‌ها بریزید.'], englishName: 'Turkish Coffee', englishVisualName: 'a traditional ornate Turkish coffee pot (cezve) next to a small, intricate cup', englishVisualSteps: ['adding ultra-fine coffee grounds, water, and sugar to a cezve', 'heating the mixture slowly on a flame until a thick foam forms at the top', 'carefully pouring the foam, then the coffee, into a small demitasse cup'], englishKeywords: ['cezve', 'coffee grounds', 'thick foam', 'ornate cup'], englishVesselType: 'a small, ornate demitasse cup', englishPrimaryAction: 'carefully pouring thick, foamy coffee from a traditional cezve into a small ornate cup' },
    { id: 9, name: 'فرنچ پرس', category: 'hot', subcategory: 'coffee', illustration: '☕️', description: 'روشی محبوب برای دم‌آوری قهوه با غوطه‌وری کامل، که طعم کامل قهوه را استخراج می‌کند.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۳۰ گرم قهوه با درجه آسیاب درشت (Coarse)', '۵۰۰ میلی‌لیتر آب داغ (حدود ۹۲ درجه سانتی‌گراد)'], instructions: ['فرنچ پرس را با آب داغ پیش‌گرم کرده و سپس خالی کنید. قهوه آسیاب شده را در آن بریزید.', 'تایمر را روی ۴ دقیقه تنظیم کنید و آب داغ را به صورت دورانی روی قهوه بریزید تا تمام آن به طور یکنواخت خیس شود. با قاشق به آرامی یک هم کوچک بزنید تا از شناور ماندن قهوه جلوگیری شود.', 'پس از گذشت ۴ دقیقه، اهرم فیلتر (پلانجر) را به آرامی و با فشاری یکنواخت و مستقیم به سمت پایین فشار دهید تا تفاله قهوه از نوشیدنی جدا شود.', 'قهوه را بلافاصله در فنجان خود سرو کنید. باقی ماندن قهوه در فرنچ پرس باعث عصاره‌گیری بیش از حد و تلخ شدن آن می‌شود.'], englishName: 'French Press', englishVisualName: 'a glass French press coffee maker filled with brewed coffee', englishVisualSteps: ['adding coarse coffee grounds into the glass carafe', 'pouring hot water over the grounds and stirring gently', 'waiting for 4 minutes with the lid on', 'slowly and steadily plunging the filter down to separate the grounds'], englishKeywords: ['glass French press', 'coarse coffee grounds', 'hot water', 'plunger'], englishVesselType: 'a standard glass French press carafe', englishPrimaryAction: 'slowly and steadily plunging the filter down a glass carafe to separate the coffee grounds' },
    { id: 10, name: 'قهوه سفید (Flat White)', category: 'hot', subcategory: 'coffee', illustration: '🥛', description: 'نوشیدنی بر پایه اسپرسو با شیر بخارداده شده و لایه‌ای بسیار نازک و مخملی از میکروفوم.', prepTime: '۵ دقیقه', difficulty: 'دشوار', ingredients: ['۱ شات اسپرسو (یا ریسرتو)', '۱۵۰ میلی‌لیتر شیر'], instructions: ['یک شات اسپرسوی دابل را در یک فنجان سرامیکی (حدود ۱۵۰-۱۸۰ میلی‌لیتر) عصاره‌گیری کنید.', 'شیر سرد را در پیچر بخار دهید. در این روش، هوادهی باید بسیار کم و کنترل‌شده باشد تا فقط یک میکروفوم بسیار ریز، براق و مخملی (شبیه به رنگ خیس) ایجاد شود و حجم شیر افزایش چندانی نداشته باشد.', 'شیر بخارداده شده را با حرکتی کنترل‌شده و یکنواخت در اسپرسو بریزید تا یک لایه بسیار نازک و یکدست از فوم روی نوشیدنی را بپوشاند و طعم قهوه غالب بماند.'], englishName: 'Flat White', englishVisualName: 'a ceramic cup of coffee with a thin, velvety layer of glossy microfoam', englishVisualSteps: ['extracting a shot of espresso into a cup', 'steaming milk to create a very fine, silky microfoam with no large bubbles', 'pouring the steamed milk smoothly into the espresso from a low height to create a homogenous mix'], englishKeywords: ['espresso shot', 'silky microfoam', 'milk pitcher', 'ceramic cup'], englishVesselType: 'a ceramic tulip cup', englishPrimaryAction: 'pouring a thin, velvety layer of glossy microfoam over a shot of espresso in a ceramic cup' },
    { id: 11, name: 'نسکافه', category: 'hot', subcategory: 'coffee', illustration: '☕️', description: 'ساده‌ترین و سریع‌ترین راه برای تهیه یک فنجان قهوه داغ.', prepTime: '۱ دقیقه', difficulty: 'آسان', ingredients: ['۱-۲ قاشق چای‌خوری پودر قهوه فوری', '۱ فنجان آب داغ', 'شیر یا شکر (اختیاری)'], instructions: ['پودر قهوه فوری را در فنجان مورد نظر خود بریزید.', 'آب را تا نزدیک نقطه جوش گرم کنید (حدود ۹۰ درجه سانتی‌گراد) و به آرامی روی پودر قهوه بریزید.', 'با قاشق به خوبی هم بزنید تا تمام گرانول‌های قهوه کاملاً حل شوند. در صورت تمایل، شیر گرم یا شکر اضافه کرده و دوباره هم بزنید.'], englishName: 'Instant Coffee', englishVisualName: 'a simple, steaming mug of coffee being stirred with a spoon', englishVisualSteps: ['spooning instant coffee granules into a mug', 'pouring hot water from a kettle over the granules', 'stirring with a spoon until completely dissolved'], englishKeywords: ['instant coffee granules', 'hot water', 'kettle', 'mug', 'spoon'], englishVesselType: 'a standard coffee mug', englishPrimaryAction: 'pouring hot water from a kettle over coffee granules in a mug and stirring' },
    { id: 12, name: 'هات چاکلت (شکلات داغ)', category: 'hot', subcategory: 'chocolate', illustration: '🍫', description: 'نوشیدنی شکلاتی غلیظ، خامه‌ای و دلچسب، ایده‌آل برای روزهای سرد.', prepTime: '۷ دقیقه', difficulty: 'آسان', ingredients: ['۲ قاشق غذاخوری پودر کاکائو خالص', '۲ قاشق غذاخوری شکر', '۲۵۰ میلی‌لیتر شیر پرچرب', 'نوک قاشق چای‌خوری وانیل'], instructions: ['در یک شیرجوش کوچک، پودر کاکائو و شکر را با هم مخلوط کنید تا کاملاً یکدست شوند.', 'مقدار بسیار کمی از شیر (حدود دو قاشق) را اضافه کرده و با همزن دستی بزنید تا یک خمیر شکلاتی غلیظ و بدون گلوله ایجاد شود. این کار از گلوله شدن کاکائو جلوگیری می‌کند.', 'بقیه شیر را به تدریج اضافه کرده و روی حرارت ملایم قرار دهید. به طور مداوم هم بزنید تا شیر داغ شده و بخار از آن بلند شود، اما مراقب باشید که نجوشد.', 'شیرجوش را از روی حرارت برداشته، عصاره وانیل را اضافه کنید و در ماگ مورد علاقه خود سرو کنید. برای طعم بهتر می‌توانید روی آن را با مارشمالو یا خامه زده شده تزئین کنید.'], englishName: 'Hot Chocolate', englishVisualName: 'a cozy mug of rich hot chocolate topped with marshmallows and a sprinkle of cocoa', englishVisualSteps: ['whisking cocoa powder and sugar with a splash of milk in a saucepan to form a paste', 'gradually adding the rest of the milk while whisking', 'heating the mixture gently while stirring until hot and smooth', 'pouring into a mug and topping with marshmallows'], englishKeywords: ['saucepan', 'cocoa powder', 'milk', 'whisk', 'marshmallows'], englishVesselType: 'a large, cozy mug', englishPrimaryAction: 'pouring rich, smooth hot chocolate from a saucepan into a mug topped with marshmallows' },
    { id: 13, name: 'شیر کاکائو داغ', category: 'hot', subcategory: 'chocolate', illustration: '🍫', description: 'نسخه‌ای ساده‌تر و سبک‌تر از هات چاکلت، یادآور دوران کودکی.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۱.۵ قاشق غذاخوری پودر کاکائو', '۱ قاشق غذاخوری شکر', '۱ لیوان شیر'], instructions: ['پودر کاکائو و شکر را در ماگ سرو خود کاملاً مخلوط کنید.', 'مقدار کمی شیر (گرم یا سرد) اضافه کرده و با قاشق به خوبی هم بزنید تا یک سس شکلاتی یکدست به دست آید.', 'بقیه شیر را گرم کرده و به ماگ اضافه کنید، سپس به خوبی هم بزنید تا کاملاً مخلوط شود.'], englishName: 'Hot Cocoa Milk', englishVisualName: 'a tall glass of warm, light-brown chocolate milk', englishVisualSteps: ['mixing cocoa powder and sugar directly in a mug', 'pouring in a small amount of warm milk and stirring to create a syrup', 'topping up with the rest of the warm milk and stirring well'], englishKeywords: ['cocoa powder', 'sugar', 'warm milk', 'mug'], englishVesselType: 'a tall glass or mug', englishPrimaryAction: 'pouring warm milk into a mug containing a chocolate syrup mixture and stirring' },
    { id: 14, name: 'شیر ثعلب', category: 'hot', subcategory: 'chocolate', illustration: '🥛', description: 'نوشیدنی سنتی، گرم و غلیظ با بافتی منحصر به فرد و عطری دلنشین.', prepTime: '۱۰ دقیقه', difficulty: 'متوسط', ingredients: ['۱ قاشق چای‌خوری پودر ثعلب', '۱ لیوان شیر سرد', '۲ قاشق غذاخوری شکر', 'گلاب و دارچین برای تزئین'], instructions: ['در یک شیرجوش خشک (قبل از روشن کردن حرارت)، پودر ثعلب و شکر را کاملاً با هم مخلوط کنید. این مرحله برای جلوگیری از گلوله شدن ثعلب حیاتی است.', 'شیر سرد را به تدریج به مخلوط خشک اضافه کرده و با همزن دستی (ویسک) به طور مداوم هم بزنید تا تمام پودر در شیر حل شود.', 'مخلوط را روی حرارت ملایم قرار داده و به هم زدن ادامه دهید. نوشیدنی به تدریج غلیظ خواهد شد. این فرآیند حدود ۵ تا ۸ دقیقه طول می‌کشد.', 'زمانی که نوشیدنی به غلظتی شبیه فرنی رقیق رسید، آن را در فنجان ریخته و با کمی پودر دارچین، پسته یا گلاب سرو کنید.'], englishName: 'Sahlab', englishVisualName: 'a warm, thick, and creamy milky drink in a mug, sprinkled with cinnamon and pistachios', englishVisualSteps: ['mixing sahlab powder and sugar in a dry saucepan', 'slowly whisking in cold milk until smooth', 'heating the mixture over medium heat, stirring constantly until it thickens like a custard', 'pouring into a cup and garnishing with ground cinnamon'], englishKeywords: ['saucepan', 'whisk', 'sahlab powder', 'milk', 'cinnamon garnish'], englishVesselType: 'a ceramic mug or cup', englishPrimaryAction: 'pouring a thick, creamy sahlab from a saucepan into a cup, garnished with cinnamon' },
    { id: 15, name: 'چای ماسالا', category: 'hot', subcategory: 'tea', illustration: '🍵', description: 'چای سیاه دم‌شده با شیر و ترکیبی از ادویه‌های گرم و معطر هندی.', prepTime: '۱۰ دقیقه', difficulty: 'متوسط', ingredients: ['۱ لیوان آب', '۱ تکه زنجبیل تازه', '۲ عدد هل', '۱ چوب دارچین کوچک', '۲ عدد میخک', '۲ قاشق چای‌خوری چای سیاه', '۱ لیوان شیر', 'شکر یا عسل به میزان لازم'], instructions: ['آب، زنجبیل تازه (کمی له شده)، هل (کمی شکسته)، چوب دارچین و میخک را در یک شیرجوش کوچک بریزید. اجازه دهید روی حرارت متوسط ۵ دقیقه بجوشد تا عطر و طعم ادویه‌ها کاملاً در آب آزاد شود.', 'چای سیاه خشک را به آب در حال جوش اضافه کرده و حرارت را کم کنید. اجازه دهید ۲ دقیقه دیگر دم بکشد تا چای رنگ دهد.', 'شیر و شیرین‌کننده (شکر یا عسل) را اضافه کنید. حرارت را کمی زیاد کنید تا نوشیدنی دوباره داغ شود، اما مراقب باشید که سر نرود و نجوشد.', 'چای را از یک صافی ریز رد کرده و در فنجان یا لیوان مورد نظر خود سرو کنید.'], englishName: 'Masala Chai', englishVisualName: 'a steaming, aromatic cup of spiced milky tea being poured from a saucepan', englishVisualSteps: ['simmering water with whole spices like ginger, cardamom pods, and cinnamon sticks', 'adding black tea leaves and allowing them to brew and release their color', 'adding milk and sugar, then bringing the mixture back to a simmer', 'straining the finished chai into a cup'], englishKeywords: ['saucepan', 'whole spices', 'black tea leaves', 'milk', 'strainer'], englishVesselType: 'a traditional clay cup or a ceramic mug', englishPrimaryAction: 'straining aromatic, spiced milky tea from a saucepan into a traditional cup' },
    { id: 16, name: 'چای سبز با لیمو', category: 'hot', subcategory: 'tea', illustration: '🍵', description: 'ترکیبی سالم و باطراوت که طعم گیاهی چای سبز را با تندی لیمو متعادل می‌کند.', prepTime: '۴ دقیقه', difficulty: 'آسان', ingredients: ['۱ عدد چای سبز کیسه‌ای یا ۱ قاشق چای‌خوری برگ چای سبز', '۱ فنجان آب داغ (حدود ۸۰ درجه سانتی‌گراد)', '۱-۲ برش لیموی تازه'], instructions: ['آب را بجوشانید و سپس اجازه دهید ۱ تا ۲ دقیقه خنک شود. دمای ایده‌آل برای چای سبز حدود ۸۰ درجه سانتی‌گراد است تا از تلخ شدن آن جلوگیری شود.', 'آب داغ را روی چای سبز در فنجان بریزید و اجازه دهید حداکثر برای ۲ تا ۳ دقیقه دم بکشد. دم کشیدن بیش از حد باعث تلخی می‌شود.', 'کیسه چای یا تفاله را از فنجان خارج کرده و سپس برش‌های لیموی تازه را اضافه کنید. اضافه کردن لیمو حین دم کشیدن می‌تواند طعم را تغییر دهد.'], englishName: 'Green Tea with Lemon', englishVisualName: 'a delicate, light-colored teacup of green tea with a fresh slice of lemon resting on the saucer', englishVisualSteps: ['placing a green tea bag or loose leaves into a cup', 'pouring hot (not boiling) water over the tea', 'letting it steep for 2-3 minutes before removing the tea', 'adding a fresh lemon slice just before serving'], englishKeywords: ['green tea leaves', 'hot water', 'teacup', 'lemon slice'], englishVesselType: 'a delicate ceramic teacup', englishPrimaryAction: 'pouring hot water over green tea leaves in a delicate cup, with a fresh lemon slice nearby' },
    { id: 17, name: 'چای زنجبیل و دارچین', category: 'hot', subcategory: 'tea', illustration: '🍵', description: 'دمنوشی گرم، تند و آرامش‌بخش، عالی برای فصول سرد و تقویت سیستم ایمنی.', prepTime: '۸ دقیقه', difficulty: 'آسان', ingredients: ['۳-۴ برش زنجبیل تازه', '۱ چوب دارچین', '۱.۵ فنجان آب', 'عسل و برش لیمو (اختیاری)'], instructions: ['آب، برش‌های زنجبیل تازه و چوب دارچین را در یک شیرجوش کوچک یا قوری بریزید.', 'مخلوط را روی حرارت متوسط قرار دهید تا به جوش آید. سپس حرارت را کم کرده و اجازه دهید به مدت ۵ تا ۷ دقیقه به آرامی بجوشد تا طعم‌ها کاملاً آزاد شوند.', 'دمنوش را از صافی رد کرده و در فنجان بریزید.', 'قبل از نوشیدن، اجازه دهید کمی خنک شود و سپس در صورت تمایل با عسل و چند قطره آب لیموی تازه سرو کنید.'], englishName: 'Ginger and Cinnamon Tea', englishVisualName: 'a clear glass mug showing slices of fresh ginger and a cinnamon stick steeping in hot water', englishVisualSteps: ['slicing a piece of fresh ginger root', 'placing the ginger slices and a cinnamon stick into a small pot with water', 'bringing the water to a boil and then simmering for 5-7 minutes', 'straining the infused tea into a mug'], englishKeywords: ['ginger slices', 'cinnamon stick', 'saucepan', 'hot water'], englishVesselType: 'a clear glass mug', englishPrimaryAction: 'straining a steaming herbal infusion of ginger and cinnamon into a clear glass mug' },
    { id: 18, name: 'چای نعنا', category: 'hot', subcategory: 'tea', illustration: '🍵', description: 'دمنوشی باطراوت و آرام‌بخش، شناخته شده برای کمک به هضم غذا.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['یک مشت کوچک برگ نعنای تازه', '۱.۵ فنجان آب جوش'], instructions: ['برگ‌های نعنای تازه را به خوبی بشویید. برای آزاد شدن بیشتر عطر، برگ‌ها را بین دستان خود به آرامی فشار دهید یا به اصطلاح "کف بزنید".', 'نعنای آماده شده را در قوری یا یک لیوان دمنوش بزرگ قرار دهید.', 'آب جوش را روی برگ‌های نعنا بریزید، درب آن را بگذارید و اجازه دهید به مدت ۵ تا ۷ دقیقه دم بکشد.', 'دمنوش را در فنجان ریخته و از طعم باطراوت آن لذت ببرید. می‌توانید آن را با عسل نیز شیرین کنید.'], englishName: 'Mint Tea', englishVisualName: 'a clear glass cup filled with hot water and a large sprig of fresh mint leaves', englishVisualSteps: ['placing a handful of fresh, clean mint leaves into a cup or pot', 'gently muddling or bruising the leaves to release their oils', 'pouring boiling water over the leaves', 'letting it steep for 5 minutes before drinking'], englishKeywords: ['fresh mint leaves', 'hot water', 'glass cup'], englishVesselType: 'a clear glass tea cup', englishPrimaryAction: 'pouring boiling water over a large sprig of fresh mint leaves in a clear glass cup' },
    { id: 19, name: 'دمنوش بابونه', category: 'hot', subcategory: 'tea', illustration: '🌼', description: 'دمنوشی کلاسیک با طعم ملایم و گلی، معروف به خواص آرام‌بخش و کمک به خواب.', prepTime: '۶ دقیقه', difficulty: 'آسان', ingredients: ['۱ قاشق غذاخوری گل بابونه خشک', '۱.۵ فنجان آب جوش', 'عسل (اختیاری)'], instructions: ['گل‌های بابونه خشک را در یک قوری، دمنوش‌ساز یا فرنچ پرس بریزید.', 'آب جوش را روی بابونه ریخته و درب آن را بگذارید تا از خروج بخار و ترکیبات معطر جلوگیری شود.', 'اجازه دهید به مدت ۵ تا ۸ دقیقه دم بکشد. هرچه بیشتر دم بکشد، طعم آن قوی‌تر و خواص آن بیشتر آزاد می‌شود.', 'دمنوش را از یک صافی ریز رد کرده و در فنجان بریزید. در صورت تمایل با کمی عسل شیرین کرده و قبل از خواب میل کنید.'], englishName: 'Chamomile Tea', englishVisualName: 'a calming teacup with golden-hued tea and small, delicate chamomile flowers floating inside', englishVisualSteps: ['placing dried chamomile flowers into a tea infuser or directly into a teapot', 'pouring hot water over the flowers', 'covering and letting it steep for at least 5 minutes to extract the flavor', 'straining the tea into a cup'], englishKeywords: ['dried chamomile flowers', 'hot water', 'tea infuser', 'teacup'], englishVesselType: 'a ceramic teacup', englishPrimaryAction: 'pouring hot water over delicate chamomile flowers in a calming teacup' },
    { id: 20, name: 'دمنوش به‌لیمو', category: 'hot', subcategory: 'tea', illustration: '🍋', description: 'دمنوشی با عطر و طعم قوی لیمو، بدون کافئین و بسیار آرامش‌بخش.', prepTime: '۶ دقیقه', difficulty: 'آسان', ingredients: ['۱ قاشق غذاخوری برگ به‌لیموی خشک', '۱.۵ فنجان آب جوش'], instructions: ['برگ‌های خشک به‌لیمو را در قوری یا دمنوش‌ساز قرار دهید.', 'آب جوش را به آن اضافه کرده و درب آن را بگذارید. این کار به حفظ روغن‌های معطر گیاه کمک می‌کند.', 'اجازه دهید به مدت ۵ تا ۸ دقیقه دم بکشد تا آب به رنگ زرد کم‌رنگ درآید و عطر لیمویی قوی آن آزاد شود.', 'دمنوش را در فنجان ریخته و از طعم آرامش‌بخش آن لذت ببرید.'], englishName: 'Lemon Verbena Tea', englishVisualName: 'a cup of pale green herbal tea with whole lemon verbena leaves visible', englishVisualSteps: ['placing long, dried lemon verbena leaves into a teapot', 'pouring hot water over the leaves', 'steeping for 5-8 minutes until the water is fragrant and lightly colored', 'pouring the infused tea into a cup'], englishKeywords: ['dried lemon verbena leaves', 'hot water', 'teapot', 'teacup'], englishVesselType: 'a ceramic teacup', englishPrimaryAction: 'pouring hot water over long, dried lemon verbena leaves in a ceramic teacup' },
    { id: 21, name: 'آیس کافی (Iced Coffee)', category: 'cold', subcategory: 'coffee', illustration: '🧊', description: 'قهوه دم‌شده که به سرعت خنک شده و با یخ سرو می‌شود، ساده و باطراوت.', prepTime: '۳ دقیقه', difficulty: 'آسان', ingredients: ['۱ فنجان قهوه دم‌شده قوی (مانند فرنچ پرس یا دمی)، خنک شده', '۱ لیوان پر از یخ', 'شیر و شکر یا سیروپ (اختیاری)'], instructions: ['یک لیوان بلند را تا لبه از تکه‌های یخ پر کنید. هرچه یخ بیشتر باشد، قهوه کمتر رقیق می‌شود.', 'قهوه دم‌شده که از قبل آماده و کاملاً در یخچال خنک شده است را به آرامی روی یخ بریزید.', 'در صورت تمایل، شیر سرد و شیرین‌کننده دلخواه (مانند سیروپ ساده) را اضافه کرده و با قاشق بلند به خوبی هم بزنید تا یکدست شود.'], englishName: 'Iced Coffee', englishVisualName: 'a tall glass filled to the brim with ice cubes and dark coffee', englishVisualSteps: ['filling a tall glass completely with ice cubes', 'pouring strongly brewed and chilled coffee over the ice', 'adding a splash of milk or cream and stirring'], englishKeywords: ['chilled coffee', 'ice cubes', 'milk splash', 'tall glass'], englishVesselType: 'a tall drinking glass', englishPrimaryAction: 'pouring strongly brewed and chilled coffee over a tall glass filled to the brim with ice cubes' },
    { id: 22, name: 'آیس لاته', category: 'cold', subcategory: 'coffee', illustration: '🧊', description: 'ترکیبی زیبا و خوشمزه از اسپرسوی غلیظ و شیر سرد که روی یخ سرو می‌شود.', prepTime: '۴ دقیقه', difficulty: 'آسان', ingredients: ['۱ شات اسپرسو (دبل)', '۱۸۰ میلی‌لیتر شیر سرد', '۱ لیوان پر از یخ'], instructions: ['یک لیوان بلند و شفاف را پر از یخ کنید.', 'شیر سرد را روی یخ بریزید تا حدود سه‌چهارم لیوان پر شود.', 'یک شات دابل اسپرسوی داغ را به آرامی و با احتیاط مستقیماً روی شیر و یخ بریزید. این کار باعث ایجاد یک لایه زیبا و جذاب از قهوه روی شیر می‌شود.', 'قبل از نوشیدن، با نی هم بزنید تا لایه‌ها مخلوط شوند.'], englishName: 'Iced Latte', englishVisualName: 'a clear glass showing distinct layers of milk at the bottom, ice, and dark espresso on top', englishVisualSteps: ['filling a glass with ice cubes', 'pouring cold milk over the ice, leaving some space at the top', 'slowly pouring a freshly extracted shot of hot espresso over the milk to create a layered effect'], englishKeywords: ['espresso shot', 'cold milk', 'ice cubes', 'clear glass'], englishVesselType: 'a tall, clear glass', englishPrimaryAction: 'slowly pouring a shot of hot espresso over cold milk in an ice-filled glass to create a layered effect' },
    { id: 23, name: 'آیس موکا', category: 'cold', subcategory: 'coffee', illustration: '🧊', description: 'یک دسر قهوه سرد و شکلاتی، ترکیبی عالی از آیس لاته و سس شکلات.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۱ شات اسپرسو (دبل)', '۱۵۰ میلی‌لیتر شیر سرد', '۳۰ میلی‌لیتر سس شکلات', '۱ لیوان پر از یخ', 'خامه زده شده (اختیاری)'], instructions: ['سس شکلات را در کف و دیواره‌های داخلی یک لیوان بلند بریزید تا حالت تزئینی پیدا کند.', 'یک شات دابل اسپرسوی داغ را در لیوان ریخته و با سس شکلات به خوبی مخلوط کنید.', 'لیوان را با یخ پر کرده و سپس شیر سرد را به آن اضافه کنید.', 'نوشیدنی را هم بزنید و در صورت تمایل روی آن را با خامه زده شده و کمی سس شکلات بیشتر تزئین کنید.'], englishName: 'Iced Mocha', englishVisualName: 'a delicious iced coffee with chocolate syrup drizzled inside the glass, topped with whipped cream', englishVisualSteps: ['drizzling chocolate sauce around the inside walls of a tall glass', 'mixing a shot of espresso with more chocolate sauce at the bottom', 'filling the glass with ice and cold milk', 'topping with a swirl of whipped cream'], englishKeywords: ['chocolate syrup', 'espresso', 'ice cubes', 'whipped cream'], englishVesselType: 'a tall, decorative glass', englishPrimaryAction: 'pouring cold milk into an ice-filled glass decorated with chocolate syrup and an espresso shot' },
    { id: 24, name: 'آیس کاپوچینو', category: 'cold', subcategory: 'coffee', illustration: '🧊', description: 'نسخه سرد کاپوچینو با لایه‌ای از فوم شیر سرد و غلیظ روی اسپرسو.', prepTime: '۶ دقیقه', difficulty: 'متوسط', ingredients: ['۱ شات اسپرسو (دبل)', '۱۲۰ میلی‌لیتر شیر سرد', 'یخ'], instructions: ['یک شات دابل اسپرسو را عصاره‌گیری کرده و اجازه دهید کمی خنک شود، یا آن را مستقیماً روی چند تکه یخ در لیوان سرو بریزید.', 'شیر بسیار سرد را در یک فرنچ پرس، شیکر یا با استفاده از کف‌ساز سرد، به شدت هم بزنید تا یک فوم سرد، غلیظ و پایدار ایجاد شود.', 'فوم شیر سرد را با استفاده از یک قاشق به آرامی روی اسپرسوی سرد قرار دهید تا یک لایه ضخیم و مجزا تشکیل دهد.'], englishName: 'Iced Cappuccino', englishVisualName: 'an iced espresso in a glass, topped with a very thick and airy layer of cold milk foam', englishVisualSteps: ['extracting a shot of espresso over ice in a glass', 'using a frother to whip cold milk into a thick, stiff foam', 'spooning the dense cold foam generously over the top of the iced espresso'], englishKeywords: ['espresso', 'ice', 'cold milk foam', 'frother'], englishVesselType: 'a drinking glass', englishPrimaryAction: 'spooning a thick, airy layer of cold milk foam over an iced espresso in a glass' },
    { id: 25, name: 'شیک موز و شکلات', category: 'cold', subcategory: 'shake', illustration: '🍌', description: 'ترکیب کلاسیک و همیشه محبوبی از موز شیرین و شکلات غنی.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۱ عدد موز رسیده و یخ‌زده', '۲ اسکوپ بستنی وانیلی یا شکلاتی', 'نصف فنجان شیر', '۱ قاشق غذاخوری سس شکلات'], instructions: ['برای بهترین نتیجه، از یک موز کاملاً رسیده که از قبل پوست کنده، خرد و منجمد شده استفاده کنید. این کار به غلظت شیک کمک می‌کند.', 'موز یخ‌زده، بستنی، شیر و سس شکلات را در دستگاه مخلوط‌کن (بلندر) بریزید.', 'دستگاه را با سرعت بالا روشن کنید و مخلوط کنید تا کاملاً یکدست، غلیظ و خامه‌ای شود.', 'می‌توانید داخل لیوان سرو را با کمی سس شکلات تزئین کرده و سپس شیک را در آن بریزید.'], englishName: 'Banana Chocolate Shake', englishVisualName: 'a thick, creamy milkshake in a classic glass, with banana and chocolate flavors', englishVisualSteps: ['adding a frozen banana, scoops of vanilla ice cream, milk, and chocolate sauce to a blender', 'blending on high speed until completely smooth and creamy', 'drizzling chocolate sauce inside the serving glass before pouring the shake'], englishKeywords: ['frozen banana', 'ice cream', 'milk', 'blender', 'chocolate sauce'], englishVesselType: 'a classic milkshake glass', englishPrimaryAction: 'pouring a thick, creamy banana-chocolate milkshake from a blender into a classic glass' },
    { id: 26, name: 'شیک قهوه یا نسکافه', category: 'cold', subcategory: 'shake', illustration: '🥤', description: 'یک نوشیدنی خنک و انرژی‌زا که طعم بستنی را با تلخی قهوه ترکیب می‌کند.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۲ اسکوپ بستنی وانیلی', '۱ شات اسپرسوی سرد شده یا ۱ قاشق غذاخوری پودر قهوه فوری', 'نصف فنجان شیر سرد'], instructions: ['اگر از قهوه فوری استفاده می‌کنید، ابتدا آن را با یک یا دو قاشق آب داغ حل کرده و اجازه دهید کاملاً خنک شود. اگر از اسپرسو استفاده می‌کنید، آن را نیز از قبل آماده و خنک کنید.', 'بستنی وانیلی، قهوه سرد شده و شیر سرد را در مخلوط‌کن بریزید.', 'با سرعت بالا مخلوط کنید تا زمانی که یکدست و کرمی شود. غلظت آن را با کم و زیاد کردن شیر تنظیم کنید و بلافاصله سرو نمایید.'], englishName: 'Coffee Shake', englishVisualName: 'a coffee-flavored milkshake in a tall glass, topped with whipped cream and a coffee bean', englishVisualSteps: ['combining scoops of vanilla ice cream, a chilled shot of espresso, and cold milk in a blender carafe', 'blending until the mixture is thick, creamy, and uniform in color', 'pouring into a tall glass and serving immediately'], englishKeywords: ['vanilla ice cream', 'chilled espresso', 'milk', 'blender'], englishVesselType: 'a tall milkshake glass', englishPrimaryAction: 'pouring a coffee-flavored milkshake from a blender into a tall glass' },
    { id: 27, name: 'شیک بادام‌زمینی', category: 'cold', subcategory: 'shake', illustration: '🥜', description: 'شیکی بسیار مقوی و خوشمزه با طعم غالب کره بادام‌زمینی.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۲ اسکوپ بستنی وانیلی', '۲ قاشق غذاخوری کره بادام‌زمینی', 'سه‌چهارم فنجان شیر'], instructions: ['بستنی، کره بادام‌زمینی (ترجیحاً نوع نرم و کرمی) و شیر را در مخلوط‌کن بریزید.', 'با سرعت بالا مخلوط کنید تا زمانی که کاملاً نرم و یکدست شود و هیچ تکه‌ای از کره بادام‌زمینی باقی نماند.', 'برای طعم بیشتر و ظاهری جذاب‌تر، می‌توانید با کمی سس شکلات یا کارامل سرو کنید.'], englishName: 'Peanut Butter Shake', englishVisualName: 'a thick, indulgent milkshake with a distinct peanut butter swirl visible', englishVisualSteps: ['adding large scoops of vanilla ice cream, a generous spoonful of peanut butter, and milk to a blender', 'blending until thick and perfectly smooth', 'serving in a glass, perhaps with crushed peanuts on top'], englishKeywords: ['vanilla ice cream', 'peanut butter', 'milk', 'blender'], englishVesselType: 'a tall milkshake glass', englishPrimaryAction: 'pouring a thick, indulgent peanut butter milkshake from a blender into a tall glass' },
    { id: 28, name: 'شیک نارگیل', category: 'cold', subcategory: 'shake', illustration: '🥥', description: 'یک شیک خنک و استوایی با طعم و عطر بی‌نظیر نارگیل.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۲ اسکوپ بستنی وانیلی یا نارگیلی', 'نصف فنجان شیر نارگیل', '۱ قاشق غذاخوری پودر نارگیل'], instructions: ['بستنی، شیر نارگیل (برای طعم قوی‌تر) و پودر نارگیل را در مخلوط‌کن قرار دهید.', 'با سرعت بالا مخلوط کنید تا یکدست و غلیظ شود.', 'برای تزئین و بافت بیشتر، می‌توانید لبه لیوان را مرطوب کرده و در پودر نارگیل تست شده بغلتانید و سپس شیک را سرو کنید.'], englishName: 'Coconut Shake', englishVisualName: 'a bright white, creamy milkshake in a glass, garnished with toasted coconut flakes', englishVisualSteps: ['blending scoops of vanilla ice cream with rich coconut milk and shredded coconut', 'mixing until smooth and frothy', 'pouring into a glass and garnishing the top with toasted coconut flakes for texture'], englishKeywords: ['coconut ice cream', 'coconut milk', 'shredded coconut', 'blender'], englishVesselType: 'a tall milkshake glass', englishPrimaryAction: 'pouring a bright white, creamy coconut milkshake into a glass garnished with toasted coconut' },
    { id: 29, name: 'شیک چیزکیک توت‌فرنگی', category: 'cold', subcategory: 'shake', illustration: '🍰', description: 'طعم یک دسر کامل در قالب یک نوشیدنی خنک و هیجان‌انگیز.', prepTime: '۶ دقیقه', difficulty: 'متوسط', ingredients: ['۲ اسکوپ بستنی وانیلی', 'نصف فنجان توت‌فرنگی یخ‌زده', '۱ قاشق غذاخوری پنیر خامه‌ای', '۱-۲ عدد بیسکویت دایجستیو خرد شده'], instructions: ['بستنی، توت‌فرنگی‌های یخ‌زده و پنیر خامه‌ای (که به دمای محیط رسیده) را در مخلوط‌کن ریخته و تا یکدست شدن کامل مخلوط کنید.', 'بیسکویت خرد شده را اضافه کرده و فقط برای یک یا دو ثانیه (حالت پالس) مخلوط کنید تا تکه‌های کوچک بیسکویت در شیک باقی بماند و حس چیزکیک را تداعی کند.', 'در لیوان ریخته و با خامه زده شده و یک توت‌فرنگی تازه تزئین کنید.'], englishName: 'Strawberry Cheesecake Shake', englishVisualName: 'a thick pink milkshake in a glass with a rim of crushed graham crackers', englishVisualSteps: ['blending vanilla ice cream, frozen strawberries, and a small amount of cream cheese until smooth', 'rimming the edge of a serving glass with crushed graham crackers', 'pouring the shake and topping with whipped cream and a fresh strawberry'], englishKeywords: ['frozen strawberries', 'ice cream', 'cream cheese', 'biscuit crumbs'], englishVesselType: 'a decorative milkshake glass', englishPrimaryAction: 'pouring a thick pink milkshake with biscuit chunks into a decorative glass' },
    { id: 30, name: 'شیر موز', category: 'cold', subcategory: 'shake', illustration: '🍌', description: 'نوشیدنی ساده، مقوی و کلاسیک، مناسب برای هر زمان.', prepTime: '۴ دقیقه', difficulty: 'آسان', ingredients: ['۱ عدد موز بزرگ و رسیده', '۱ لیوان شیر سرد', 'عسل یا شکر (اختیاری)'], instructions: ['یک موز کاملاً رسیده (با لکه‌های قهوه‌ای روی پوست) را به همراه شیر سرد در مخلوط‌کن بریزید.', 'در صورت تمایل، شیرین‌کننده دلخواه مانند عسل، خرما یا شکر را اضافه کنید.', 'با سرعت بالا مخلوط کنید تا کاملاً یکدست و روان شود و بلافاصله سرو نمایید تا رنگ آن تیره نشود.'], englishName: 'Banana Milk', englishVisualName: 'a simple, wholesome glass of pale yellow banana milk', englishVisualSteps: ['combining a ripe banana with cold milk in a blender', 'adding a touch of honey or sugar for sweetness if desired', 'blending until completely smooth and pouring into a glass'], englishKeywords: ['ripe banana', 'cold milk', 'blender'], englishVesselType: 'a simple tall glass', englishPrimaryAction: 'pouring a simple, smooth banana and milk blend from a blender into a tall glass' },
    { id: 31, name: 'شیر پسته', category: 'cold', subcategory: 'shake', illustration: '💚', description: 'نوشیدنی سنتی و بسیار مقوی ایرانی با طعم و رنگ بی‌نظیر پسته.', prepTime: '۶ دقیقه', difficulty: 'آسان', ingredients: ['۳ قاشق غذاخوری مغز پسته خام', '۱ لیوان شیر سرد', '۱ اسکوپ بستنی سنتی یا وانیلی', '۱ قاشق غذاخوری عسل'], instructions: ['برای رنگ بهتر و مخلوط شدن راحت‌تر، مغز پسته خام را برای چند ساعت در آب یا گلاب خیس کنید (اختیاری).', 'تمام مواد شامل پسته، شیر سرد، بستنی و عسل را در یک مخلوط‌کن قوی بریزید.', 'با سرعت بسیار بالا مخلوط کنید تا پسته‌ها کاملاً ریز شده و نوشیدنی یکدست و به رنگ سبز کم‌رنگ درآید.', 'با پودر پسته یا خلال پسته تزئین و به صورت سرد سرو کنید.'], englishName: 'Pistachio Milk', englishVisualName: 'a beautiful light green milkshake topped with finely crushed pistachios', englishVisualSteps: ['blending raw pistachios, cold milk, a scoop of traditional saffron ice cream, and honey in a high-speed blender', 'mixing until the pistachios are finely ground and the drink is smooth', 'serving in a tall glass garnished with more crushed pistachios'], englishKeywords: ['pistachios', 'milk', 'ice cream', 'blender'], englishVesselType: 'a tall traditional glass', englishPrimaryAction: 'pouring a beautiful light green pistachio milk from a blender into a traditional glass' },
    { id: 32, name: 'شیر توت‌فرنگی', category: 'cold', subcategory: 'shake', illustration: '🍓', description: 'یک نوشیدنی شاد و خوش‌رنگ که از ترکیب توت‌فرنگی تازه با شیر تهیه می‌شود.', prepTime: '۴ دقیقه', difficulty: 'آسان', ingredients: ['نصف فنجان توت‌فرنگی تازه یا یخ‌زده', '۱ لیوان شیر سرد', 'شکر یا عسل به میزان لازم'], instructions: ['توت‌فرنگی‌های تمیز شده، شیر سرد و شیرین‌کننده دلخواه را در مخلوط‌کن بریزید.', 'با سرعت بالا مخلوط کنید تا کاملاً یکدست و به رنگ صورتی ملایم درآید.', 'برای بافتی کاملاً نرم و بدون دانه، می‌توانید نوشیدنی را از یک صافی ریز رد کنید و سپس سرو نمایید.'], englishName: 'Strawberry Milk', englishVisualName: 'a lovely glass of pastel pink strawberry milk with a fresh strawberry on the rim', englishVisualSteps: ['blending fresh or frozen strawberries with cold milk and a bit of sugar until smooth', 'straining the mixture through a fine-mesh sieve if a smoother texture is desired', 'serving the chilled pink milk in a glass'], englishKeywords: ['strawberries', 'milk', 'blender', 'strainer'], englishVesselType: 'a tall glass', englishPrimaryAction: 'pouring a lovely pastel pink strawberry milk into a tall glass' },
    { id: 33, name: 'اسموتی هندوانه', category: 'cold', subcategory: 'smoothie', illustration: '🍉', description: 'نوشیدنی عالی برای رفع تشنگی و خنک شدن در روزهای گرم تابستان.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۲ فنجان هندوانه بدون هسته و یخ‌زده', 'چند برگ نعنای تازه (اختیاری)', '۱ قاشق غذاخوری آب لیموی تازه'], instructions: ['هندوانه بدون هسته را به قطعات کوچک خرد کرده و برای حداقل ۴ ساعت در فریزر قرار دهید تا منجمد شود.', 'هندوانه یخ‌زده، برگ‌های نعنا و آب لیموی تازه را در مخلوط‌کن بریزید.', 'مخلوط کنید تا بافتی یکدست و شبیه به یخ‌در‌بهشت پیدا کند. اگر دستگاه در مخلوط کردن مشکل داشت، فقط یک یا دو قاشق آب سرد اضافه کنید.', 'بلافاصله در لیوان سرد سرو کنید.'], englishName: 'Watermelon Smoothie', englishVisualName: 'a vibrant red, slushy-like smoothie in a glass, garnished with a mint sprig', englishVisualSteps: ['blending chunks of frozen, seedless watermelon in a blender', 'adding a few fresh mint leaves and a squeeze of lime juice', 'blending until it reaches a smooth, icy consistency'], englishKeywords: ['frozen watermelon', 'mint leaves', 'lime juice', 'blender'], englishVesselType: 'a simple glass tumbler', englishPrimaryAction: 'pouring a vibrant red, slushy watermelon smoothie from a blender into a glass' },
    { id: 34, name: 'اسموتی طالبی', category: 'cold', subcategory: 'smoothie', illustration: '🍈', description: 'اسموتی شیرین و خنک با طعم و عطر دل‌انگیز طالبی.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۲ فنجان طالبی خرد شده و یخ‌زده', 'نصف فنجان ماست ساده یا یونانی', '۱ قاشق غذاخوری عسل (اختیاری)'], instructions: ['قطعات طالبی را از قبل منجمد کنید.', 'طالبی یخ‌زده، ماست (برای بافت خامه‌ای) و عسل (در صورت نیاز به شیرینی بیشتر) را در مخلوط‌کن بریزید.', 'مخلوط کنید تا کاملاً یکدست و غلیظ شود و به صورت سرد سرو نمایید.'], englishName: 'Cantaloupe Smoothie', englishVisualName: 'a pale orange, creamy smoothie in a glass', englishVisualSteps: ['adding frozen cantaloupe chunks and greek yogurt to a blender', 'drizzling in some honey for extra sweetness', 'blending until thick, creamy, and smooth'], englishKeywords: ['frozen cantaloupe', 'yogurt', 'honey', 'blender'], englishVesselType: 'a simple glass tumbler', englishPrimaryAction: 'pouring a pale orange, creamy cantaloupe smoothie from a blender into a glass' },
    { id: 35, name: 'اسموتی شاتوت', category: 'cold', subcategory: 'smoothie', illustration: '🍇', description: 'اسموتی خوش‌رنگ و سرشار از آنتی‌اکسیدان با طعم ترش و شیرین شاتوت.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۱.۵ فنجان شاتوت یخ‌زده', 'نصف یک موز یخ‌زده', 'نصف فنجان شیر یا ماست'], instructions: ['شاتوت‌های یخ‌زده (که رنگ تیره‌تر و طعم بهتری دارند)، موز یخ‌زده (برای شیرینی و غلظت) و شیر یا ماست را در مخلوط‌کن بریزید.', 'با سرعت بالا مخلوط کنید تا یک اسموتی غلیظ و به رنگ بنفش تیره به دست آید.', 'به دلیل وجود دانه‌های ریز در شاتوت، در صورت تمایل می‌توانید اسموتی را از صافی رد کنید.'], englishName: 'Blackberry Smoothie', englishVisualName: 'a deep purple, thick smoothie in a glass, topped with fresh blackberries', englishVisualSteps: ['combining frozen blackberries, a frozen banana for creaminess, and milk in a blender', 'blending on high until the mixture is completely smooth and has a vibrant dark color', 'pouring into a glass and serving immediately'], englishKeywords: ['frozen blackberries', 'frozen banana', 'yogurt', 'blender'], englishVesselType: 'a simple glass tumbler', englishPrimaryAction: 'pouring a deep purple, thick blackberry smoothie from a blender into a glass' },
    { id: 36, name: 'اسموتی انبه و آناناس', category: 'cold', subcategory: 'smoothie', illustration: '🥭', description: 'یک اسموتی کاملاً استوایی و باطراوت، پر از ویتامین C.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۱ فنجان انبه خرد شده و یخ‌زده', '۱ فنجان آناناس خرد شده و یخ‌زده', 'نصف فنجان شیر نارگیل'], instructions: ['انبه، آناناس و شیر نارگیل (برای تقویت طعم استوایی) را در مخلوط‌کن بریزید.', 'با سرعت بالا مخلوط کنید تا یکدست و غلیظ شود.', 'در صورت تمایل می‌توانید با تکه‌های آناناس تازه تزئین کنید.'], englishName: 'Mango Pineapple Smoothie', englishVisualName: 'a vibrant yellow-orange smoothie in a glass, garnished with a pineapple wedge', englishVisualSteps: ['adding frozen mango chunks, frozen pineapple chunks, and coconut milk to a blender', 'blending until thick, smooth, and creamy', 'pouring into a glass and serving with a fresh fruit garnish'], englishKeywords: ['frozen mango', 'frozen pineapple', 'coconut milk', 'blender'], englishVesselType: 'a simple glass tumbler', englishPrimaryAction: 'pouring a vibrant yellow-orange tropical smoothie from a blender into a glass' },
    { id: 37, name: 'کوکتل استوایی', category: 'cold', subcategory: 'shake', illustration: '🍹', description: 'ترکیبی از بستنی انبه و نارگیل برای تجربه‌ای خنک و استوایی.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['۲ اسکوپ بستنی انبه', 'نصف فنجان شیر نارگیل', 'تکه‌های نارگیل تازه برای تزئین'], instructions: ['بستنی انبه و شیر نارگیل سرد را در مخلوط‌کن بریزید.', 'با سرعت بالا مخلوط کنید تا یکدست و غلیظ شود، اما نه بیش از حد که آبکی شود.', 'در یک لیوان سرد ریخته و با تکه‌های نارگیل تازه یا تست شده تزئین کنید.'], englishName: 'Tropical Cocktail', englishVisualName: 'an orange-colored shake in a cocktail glass, garnished with coconut shavings', englishVisualSteps: ['blending scoops of mango ice cream with cold coconut milk', 'mixing until just combined and thick', 'serving in a chilled glass with coconut flakes on top'], englishKeywords: ['mango ice cream', 'coconut milk', 'blender'], englishVesselType: 'a hurricane or cocktail glass', englishPrimaryAction: 'pouring a mango and coconut shake from a blender into a cocktail glass' },
    { id: 38, name: 'آیس تی (Iced Tea)', category: 'cold', subcategory: 'other', illustration: '🍹', description: 'چای دم‌کرده سرد شده، یک نوشیدنی کلاسیک و باطراوت برای هر زمان.', prepTime: '۳ دقیقه', difficulty: 'آسان', ingredients: ['۱ فنجان چای سیاه دم‌کرده و خنک شده', '۱ لیوان پر از یخ', 'برش لیمو و برگ نعنا برای تزئین'], instructions: ['یک لیوان بلند را با یخ پر کنید.', 'چای سیاه که از قبل دم کرده و در یخچال کاملاً خنک شده است را روی یخ بریزید.', 'با یک برش لیمو و چند برگ نعنای تازه تزئین و سرو کنید. در صورت تمایل می‌توانید با سیروپ ساده آن را شیرین کنید.'], englishName: 'Iced Tea', englishVisualName: 'a tall glass of amber-colored iced tea filled with ice, a lemon wedge, and a mint sprig', englishVisualSteps: ['filling a tall glass with plenty of ice cubes', 'pouring chilled, strongly brewed black tea over the ice', 'garnishing with a fresh slice of lemon and a sprig of mint'], englishKeywords: ['chilled black tea', 'ice cubes', 'lemon wedge', 'mint sprig'], englishVesselType: 'a tall Collins or highball glass', englishPrimaryAction: 'pouring chilled black tea over a tall glass filled with ice, lemon, and mint' },
    { id: 39, name: 'لیموناد', category: 'cold', subcategory: 'other', illustration: '🍋', description: 'نوشیدنی ترش و شیرین و بسیار خنک‌کننده، ساخته شده از لیموی تازه.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['نصف فنجان آب لیموی تازه', 'نصف فنجان سیروپ ساده (آب و شکر ۱:۱)', '۱.۵ فنجان آب سرد', 'یخ و برش لیمو'], instructions: ['در یک پارچ بزرگ، آب لیموی تازه فشرده شده، سیروپ ساده و آب سرد را با هم مخلوط کنید.', 'مخلوط را به خوبی هم بزنید و بچشید. در صورت نیاز شیرینی یا ترشی آن را با افزودن سیروپ یا آب لیموی بیشتر تنظیم کنید.', 'در لیوان‌های پر از یخ ریخته و با یک برش لیموی تازه تزئین کنید.'], englishName: 'Lemonade', englishVisualName: 'a classic pitcher of cloudy lemonade with floating lemon slices', englishVisualSteps: ['squeezing fresh lemons to get juice', 'mixing the fresh lemon juice with simple syrup and cold water in a large pitcher', 'stirring well and pouring into an ice-filled glass'], englishKeywords: ['lemons', 'pitcher', 'ice cubes', 'lemon slices'], englishVesselType: 'a classic pitcher and tall glasses', englishPrimaryAction: 'pouring cloudy lemonade from a classic pitcher into an ice-filled glass' },
    { id: 40, name: 'موهیتو', category: 'cold', subcategory: 'other', illustration: '🌿', description: 'کوکتل کوبایی باطراوت و محبوب با ترکیبی از نعنا، لیمو و سودا.', prepTime: '۵ دقیقه', difficulty: 'متوسط', ingredients: ['۱۰-۱۲ برگ نعنای تازه', 'نصف یک لیمو (برش خورده)', '۲ قاشق چای‌خوری شکر', 'یخ خرد شده', 'آب گازدار (سودا)'], instructions: ['برگ‌های نعنا، برش‌های لیمو و شکر را در یک لیوان بلند و محکم بریزید.', 'با استفاده از یک مادلر (گوشت‌کوب بار)، به آرامی مواد را فشار داده و له کنید تا عصاره لیمو و عطر نعنا آزاد شود، اما برگ‌ها پاره نشوند.', 'لیوان را تا بالا با یخ خرد شده پر کنید.', 'روی آن را با آب گازدار (سودا) پر کرده و با یک قاشق بلند به آرامی از پایین به بالا هم بزنید تا مخلوط شود. با یک شاخه نعنا تزئین کنید.'], englishName: 'Mojito', englishVisualName: 'a refreshing highball glass filled with muddled mint, lime wedges, crushed ice, and sparkling soda', englishVisualSteps: ['gently muddling fresh mint leaves with lime wedges and sugar in the bottom of a glass', 'filling the glass to the top with crushed ice', 'pouring sparkling soda water over the ice', 'stirring gently and garnishing with a mint sprig'], englishKeywords: ['fresh mint', 'lime wedges', 'crushed ice', 'soda water'], englishVesselType: 'a classic highball glass', englishPrimaryAction: 'pouring sparkling soda water over muddled mint, lime, and crushed ice in a highball glass' },
    { id: 41, name: 'آبمیوه طبیعی', category: 'cold', subcategory: 'other', illustration: '🍊', description: 'آبمیوه تازه فصل، سرشار از ویتامین و طعم طبیعی.', prepTime: '۵ دقیقه', difficulty: 'آسان', ingredients: ['میوه تازه فصل (پرتقال، انار، هویج، سیب و ...)', 'یخ (اختیاری)'], instructions: ['میوه‌های تازه و شسته شده را آماده کنید (پوست کندن، خرد کردن و ...).', 'میوه‌ها را در دستگاه آبمیوه‌گیری بریزید و آب آن‌ها را بگیرید.', 'آبمیوه را بلافاصله در لیوان ریخته و در صورت تمایل با چند تکه یخ سرو کنید تا خنک بماند.'], englishName: 'Fresh Juice', englishVisualName: 'a vibrant glass of freshly squeezed orange juice with an orange slice on the rim', englishVisualSteps: ['cutting fresh oranges in half', 'using a juicer to extract the juice from the oranges', 'pouring the fresh, pulp-filled juice directly into a serving glass'], englishKeywords: ['fresh oranges', 'juicer', 'orange juice', 'glass'], englishVesselType: 'a simple juice glass', englishPrimaryAction: 'pouring fresh, pulp-filled orange juice from a juicer directly into a serving glass' },
    { id: 42, name: 'آب طعم‌دار', category: 'cold', subcategory: 'other', illustration: '💧', description: 'آب خنک و سالم که با طعم و عطر میوه‌ها و سبزیجات تازه، جذاب‌تر شده است.', prepTime: '۲ دقیقه (+زمان استراحت)', difficulty: 'آسان', ingredients: ['۱ لیتر آب سرد', 'چند برش خیار', 'چند برش لیمو', 'چند برگ نعنای تازه'], instructions: ['برش‌های خیار، لیمو و برگ‌های نعنای تازه را در یک پارچ بزرگ بریزید.', 'آب سرد را به آن اضافه کنید.', 'پارچ را برای حداقل ۱ تا ۲ ساعت در یخچال قرار دهید تا طعم‌ها به خوبی در آب نفوذ کنند.', 'به صورت خنک و در طول روز بنوشید.'], englishName: 'Infused Water', englishVisualName: 'a clear glass pitcher of water filled with slices of cucumber, lemon, and fresh mint leaves', englishVisualSteps: ['slicing a fresh cucumber and a lemon', 'placing the slices and fresh mint sprigs into a large glass pitcher', 'filling the pitcher with cold, filtered water', 'chilling in the refrigerator to allow the flavors to infuse'], englishKeywords: ['glass pitcher', 'cucumber slices', 'lemon slices', 'mint leaves', 'cold water'], englishVesselType: 'a large glass pitcher', englishPrimaryAction: 'filling a large glass pitcher containing cucumber, lemon and mint with cold water' }
];

const subcategoriesData = {
    hot: [
        { id: 'coffee', name: 'بر پایه قهوه و اسپرسو' },
        { id: 'chocolate', name: 'بر پایه شکلات و شیر' },
        { id: 'tea', name: 'بر پایه چای و دمنوش' }
    ],
    cold: [
        { id: 'coffee', name: 'بر پایه قهوه' },
        { id: 'shake', name: 'بر پایه بستنی (شیک و اسموتی)' },
        { id: 'smoothie', name: 'اسموتی' },
        { id: 'other', name: 'سایر نوشیدنی‌های سرد' }
    ]
};

const categoryData = [
    { id: 'hot', name: 'نوشیدنی‌های گرم', icon: <SteamIcon /> },
    { id: 'cold', name: 'نوشیدنی‌های سرد', icon: <IceCubeIcon /> }
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
    const aiSettingsRef = useRef<HTMLDivElement>(null);

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
        const layeredKeywords = ['latte', 'cappuccino', 'mocha', 'macchiato'];
        if (recipe.subcategory === 'shake' || recipe.subcategory === 'smoothie') {
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
            prompt = `A clean, minimal, café-style infographic for a "${recipe.englishName}". Show a transparent glass with clean, distinct horizontal layers representing the main ingredients like espresso, steamed milk, milk foam, and chocolate sauce. Each layer should be clearly visible and labeled with its name. Use minimal icons and arrows to point to the layers. The background must be a solid warm cream color. The overall style should be professional, simple, and elegant. --style raw`;
        } else if (drinkType === 'blended') {
            prompt = `A clean, minimal, café-style infographic for a "${recipe.englishName}". Show a tall glass filled with a smooth, creamy textured drink. Around the glass, place small, simple icons of the main ingredients (e.g., banana, strawberry, ice cream scoop, chocolate chunks). Use neat arrows pointing from the ingredients to the glass. The background must be a solid warm cream color. The overall style should be professional, fresh, and appealing. --style raw`;
        } else { // Default for 'other' types
            prompt = `A clean, minimal, café-style infographic for a "${recipe.englishName}". Show the final drink in its typical vessel (e.g., mug, glass). Around the vessel, place small, simple icons of the main ingredients with neat labels. Use arrows to subtly indicate the ingredients. The background must be a solid warm cream color. The overall style should be professional, clear, and inviting. --style raw`;
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
                model: 'imagen-3.0-generate-002',
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
                return <RecipeDetail recipe={selectedRecipe} onBack={handleBack} infographicUrl={infographicUrl[selectedRecipe.id]} isLoading={isLoadingInfographic} apiKey={apiKey} />;
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

const AiSettingsView = React.forwardRef<HTMLDivElement, AiSettingsViewProps>(({ currentKey, onSave }, ref) => {
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
            <p>برای استفاده از ویژگی‌های هوشمند (مانند پیشنهاد دستور، اسکن و ساخت تصویر) کلید Gemini API خود را وارد کنید.</p>
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
    const instructionsArray = Array.isArray(recipe.instructions) 
        ? recipe.instructions 
        : recipe.instructions.split('\n').filter(line => line.trim() !== '');

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
                                <p>برای ساخت راهنمای تصویری، لطفاً کلید API خود را در صفحه اصلی وارد کنید.</p>
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
                                    <span className="info-icon"><TypeIcon /> {recipe.subcategory}</span>
                                </div>
                            </div>
                            <div className="recipe-section">
                                <h3>مواد لازم</h3>
                                <ul>
                                    {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            <div className="recipe-section">
                                <h3>طرز تهیه قدم به قدم</h3>
                                <div className="instructions-list">
                                    {instructionsArray.map((step, index) => (
                                        <div key={index} className="recipe-step">
                                            <div className="step-number">{index + 1}</div>
                                            <p className="step-instruction">{step.replace(/^\d+\.\s*/, '')}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
