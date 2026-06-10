export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">عن سعر دزاير</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          <strong>سعر دزاير</strong> هي منصة مجانية تهدف إلى مساعدة المستهلك الجزائري
          في تتبع ومقارنة أسعار المنتجات عبر جميع ولايات الجزائر الـ 58.
        </p>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">الهدف من المنصة</h2>
          <p>
            نسعى إلى خلق قاعدة بيانات مواطنة للأسعار تمكن المستهلكين من:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 pr-4">
            <li>معرفة متوسط أسعار المنتجات في ولايتهم</li>
            <li>مقارنة الأسعار بين الولايات المختلفة</li>
            <li>اتخاذ قرارات شرائية أفضل</li>
            <li>المساهمة في الشفافية الاقتصادية</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">كيف تعمل؟</h2>
          <ol className="list-decimal list-inside space-y-3 pr-4">
            <li>ابحث عن المنتج الذي تريد معرفة سعره</li>
            <li>اطلع على الأسعار المسجلة في مختلف الولايات</li>
            <li>قارن بين الأسعار واختر الأنسب لك</li>
            <li>ساهم بإضافة أسعار جديدة لتحديث قاعدة البيانات</li>
          </ol>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">ملاحظة</h2>
          <p>
            جميع الأسعار المعروضة في المنصة مقدمة من المستخدمين وقد لا تعكس
            الأسعار الفعلية في السوق. ننصح دائماً بالتأكد من الأسعار لدى البائعين المحليين.
          </p>
        </div>
      </div>
    </div>
  )
}
