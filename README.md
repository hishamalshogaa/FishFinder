# RedSea Fish Finder (Expo)

تطبيق مبدئي لعرض خريطة بحرية مع طبقة أعماق (Bathymetry) اختيارية،
وتحزين نقاط الصيد محليًا. يدعم GPS وإضافة نقاط بالضغط المطوّل على الخريطة.

## الميزات
- خريطة تفاعلية (react-native-maps).
- طبقة علامات بحرية OpenSeaMap.
- إمكانية إضافة رابط طبقة أعماق (Tile URL) من الإعدادات.
- حفظ نقاط الصيد على الجهاز.
- انتقال تلقائي إلى موقعك عند تشغيل التطبيق.

## التشغيل محليًا (Android/Termux)
```bash
# 1) تثبيت المتطلبات
pkg update && pkg upgrade -y
pkg install -y git nodejs
npm i -g expo @expo/ngrok@^4
# (اختياري) لو ظهر نقص في الحزم: pkg install -y openjdk-17

# 2) تنزيل المشروع
git clone https://example.com/your/repo.git redseafishfinder   # أو انسخ المجلد مباشرة
cd redseafishfinder

# 3) تثبيت الحزم
npm install

# 4) تثبيت تبعيات الملاحة (لو طُلبت):
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# 5) تشغيل
npm run android   # أو npm start ثم امسح QR بكاميرا Expo Go

# ملاحظة: Expo Go يدعم react-native-maps مباشرة.
```

## بناء APK
لإخراج APK موقّع:
- استخدم EAS Build من Expo:
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview   # يُخرج ملف APK أو AAB
```
> تحتاج اتصال بالإنترنت وحساب Expo. يمكن تنزيل ملف APK بعد انتهاء البناء.

## تغيير رابط طبقة الأعماق
اذهب إلى "الإعدادات" والصق رابط مزود البلاطات (Tiles) مثل:
- OpenSeaMap seamarks (مفعّل افتراضيًا): `https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png`
- لأي مزود Bathymetry يدعم WMTS/XYZ tiles بصيغة PNG.

## الربط مع سونار خارجي (مستقبلاً)
- أضف خدمة Bluetooth/WiFi لاستقبال NMEA أو بث بيانات عمق من أجهزة مثل Deeper أو Lowrance.
- أنشئ Overlay جديد يرسم مقطع السونار في الوقت الحقيقي.
```

## ملاحظات
- هذا المشروع تعليمي/عملي كبداية حقيقية ويمكن تطويره لإضافة خرائط دون إنترنت (بلاطات محلية) وخوارزميات توقع أماكن السمك.
```