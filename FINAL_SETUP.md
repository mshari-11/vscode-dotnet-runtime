# Location Link Tracker — Final Setup Guide

تطبيق تتبع الموقع جاهز للاستخدام الفوري. اتبع الخطوات البسيطة أدناه.

---

## المشروع جاهز (ملخص سريع)

✅ **الخادم محلي يعمل** — يمكنك اختباره على http://localhost:3000  
✅ **المستودع مدفوع إلى GitHub** — https://github.com/mshari-11/vscode-dotnet-runtime  
✅ **GitHub Actions مجهز** — الإجراء التلقائي لنشر إلى Render عند كل دفع  
✅ **ZIP جاهز** — location-link-tracker.zip للرفع اليدوي إن أردت

---

## الخطوة 1: نشر على Render (أسهل وأسرع)

### أ. أنشئ خدمة Render Web Service
1. سجّل دخولك إلى https://dashboard.render.com
2. اضغط **New** → **Web Service**
3. اختر **GitHub** وأمنح Render صلاحية الوصول لحسابك
4. حدّد المستودع: `mshari-11/vscode-dotnet-runtime`
5. اضغط **Connect**

### ب. إعدادات الخدمة
- **Name:** أي اسم (مثلاً: location-tracker)
- **Branch:** main
- **Build Command:** (اتركه فارغ)
- **Start Command:** (اتركه فارغ — لدينا Procfile)
- **Plan:** Free (اختياري)

اضغط **Create Web Service** والانتظر (النشر يستغرق 3-5 دقائق).

بعد النشر ستحصل على رابط HTTPS مثل: `https://your-app.onrender.com`

### ج. ضبط متغيرات البيئة (اختياري لكن مهم للأمان)
في صفحة الخدمة على Render:
1. اذهب إلى **Environment**
2. أضف متغيرات جديدة:
   - **ADMIN_USER** = admin
   - **ADMIN_PASS** = (كلمة مرور قوية)
3. اضغط **Save** وسيتم إعادة نشر الخدمة تلقائياً

### د. اختبر التطبيق
- **رابط المستخدم (للحصول على الموقع):**
  ```
  https://your-app.onrender.com/?id=alice123
  ```
  عند الفتح سيطلب المتصفح إذن مشاركة الموقع.

- **صفحة المالك (عرض الموقع على خريطة):**
  ```
  https://your-app.onrender.com/owner.html?id=alice123
  ```
  ستُطالب بكلمة المرور (استخدم ADMIN_USER و ADMIN_PASS من أعلاه).

---

## الخطوة 2: تفعيل النشر التلقائي من GitHub (اختياري)

إذا أردت أن كل دفع (push) إلى GitHub ينشّط نشر تلقائي على Render:

1. احصل على **Render API Key**:
   - في Render dashboard → Account → API Keys
   - Copy الـ key

2. احصل على **Service ID**:
   - في صفحة الخدمة الذي أنشأته → Settings
   - ابحث عن "Service ID" (يبدو مثل: srv-xxxxx)

3. أضف الأسرار إلى GitHub:
   - اذهب إلى https://github.com/mshari-11/vscode-dotnet-runtime/settings/secrets/actions
   - اضغط **New repository secret**
   - أضف:
     - Name: `RENDER_API_KEY` Value: <paste-your-api-key>
     - Name: `RENDER_SERVICE_ID` Value: <paste-your-service-id>

بعد إضافة الأسرار، كل دفع إلى main سيشغّل النشر التلقائي.

---

## الخطوة 3: كيفية الاستخدام (طريقة عملية)

### أرسل هذا الرابط للشخص الذي تريد الحصول على موقعه:
```
https://your-app.onrender.com/?id=UNIQUE_ID
```
استبدل `UNIQUE_ID` بأي معرف فريد (مثل: alice, user123, أو أي نص).

### عند فتح الرابط:
1. المتصفح سيطلب إذن مشاركة الموقع.
2. إذا وافق الشخص، الإحداثيات ترسل للخادم.
3. يمكنك الاطلاع عليها من صفحة المالك:
   ```
   https://your-app.onrender.com/owner.html?id=UNIQUE_ID
   ```
   (ستطلب المصادقة)

---

## ملاحظات مهمة (اقرأها جيداً)

### قانونية وأمان
- **لا تستخدم هذا التطبيق لتتبع أشخاص بدون موافقتهم الصريحة.** هذا قد يكون غير قانوني وغير أخلاقي.
- الموقع يطلب موافقة صريحة عبر نافذة المتصفح — لا يمكن الحصول على الموقع سراً.
- استخدمه فقط للأغراض الشرعية (تتبع أفراد العائلة برضاهم، تسجيل الحضور، اختبارات تقنية، إلخ).

### التخزين
- البيانات تُحفظ في ملف `reports.json` على الخادم.
- على Render، قد تُفقد البيانات عند إعادة تشغيل الخدمة (Render Free tier).
- للتخزين الدائم استخدم قاعدة بيانات (يمكن إضافتها لاحقاً).

### HTTPS
- Render يوفر HTTPS تلقائياً.
- المتصفحات تطلب HTTPS للوصول إلى geolocation — HTTP غير كافٍ.

---

## الملفات الجاهزة

| الملف | الوصف |
|------|-------|
| `server.js` | خادم Node.js الرئيسي |
| `public/index.html` | صفحة طلب إذن الموقع |
| `public/owner.html` | صفحة عرض الموقع (محمية) |
| `public/thanks.html` | صفحة الشكر |
| `reports.json` | قاعدة البيانات البسيطة |
| `location-link-tracker.zip` | حزمة جاهزة للرفع يدوياً |
| `.github/workflows/deploy-to-render.yml` | GitHub Actions للنشر الآلي |

---

## مساعدة إضافية

إذا واجهت مشاكل:
- تحقق من سجلات Render: انظر إلى **Logs** في صفحة الخدمة.
- تأكد من متغيرات البيئة مطبوعة بشكل صحيح.
- جرب الرابط من جهاز/متصفح آخر.
- تأكد من أن geolocation مفعل في إعدادات المتصفح.

---

**تم! التطبيق جاهز للاستخدام الآن. ابدأ من الخطوة 1 أعلاه.**
