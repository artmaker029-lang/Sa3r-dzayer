-- جدول الولايات (Wilayas)
CREATE TABLE wilayas (
  id BIGINT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  code INTEGER NOT NULL UNIQUE
);

-- جدول التصنيفات (Categories)
CREATE TABLE categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  icon TEXT
);

-- جدول المنتجات (Products)
CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_fr TEXT,
  description_ar TEXT,
  description_fr TEXT,
  category_id BIGINT REFERENCES categories(id),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول الأسعار (Prices)
CREATE TABLE prices (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  wilaya_id BIGINT NOT NULL REFERENCES wilayas(id) ON DELETE CASCADE,
  price DECIMAL(12, 2) NOT NULL,
  store_name TEXT,
  date TIMESTAMPTZ DEFAULT NOW(),
  submitted_by TEXT DEFAULT 'مجهول',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_products_name_ar ON products(name_ar);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_prices_product ON prices(product_id);
CREATE INDEX idx_prices_wilaya ON prices(wilaya_id);
CREATE INDEX idx_prices_date ON prices(date DESC);

-- تفعيل Row Level Security
ALTER TABLE wilayas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة للجميع
CREATE POLICY "الكل يمكنه قراءة الولايات" ON wilayas FOR SELECT USING (true);
CREATE POLICY "الكل يمكنه قراءة التصنيفات" ON categories FOR SELECT USING (true);
CREATE POLICY "الكل يمكنه قراءة المنتجات" ON products FOR SELECT USING (true);
CREATE POLICY "الكل يمكنه قراءة الأسعار" ON prices FOR SELECT USING (true);

-- سياسات الإدراج للجميع (للسماح بإضافة أسعار)
CREATE POLICY "الكل يمكنه إضافة أسعار" ON prices FOR INSERT WITH CHECK (true);

-- إدراج الولايات
INSERT INTO wilayas (id, code, name_ar, name_fr) VALUES
(1, 1, 'أدرار', 'Adrar'),
(2, 2, 'الشلف', 'Chlef'),
(3, 3, 'الأغواط', 'Laghouat'),
(4, 4, 'أم البواقي', 'Oum El Bouaghi'),
(5, 5, 'باتنة', 'Batna'),
(6, 6, 'بجاية', 'Béjaïa'),
(7, 7, 'بسكرة', 'Biskra'),
(8, 8, 'بشار', 'Béchar'),
(9, 9, 'البليدة', 'Blida'),
(10, 10, 'البويرة', 'Bouira'),
(11, 11, 'تمنراست', 'Tamanrasset'),
(12, 12, 'تبسة', 'Tébessa'),
(13, 13, 'تلمسان', 'Tlemcen'),
(14, 14, 'تيارت', 'Tiaret'),
(15, 15, 'تيزي وزو', 'Tizi Ouzou'),
(16, 16, 'الجزائر العاصمة', 'Alger'),
(17, 17, 'الجلفة', 'Djelfa'),
(18, 18, 'جيجل', 'Jijel'),
(19, 19, 'سطيف', 'Sétif'),
(20, 20, 'سعيدة', 'Saïda'),
(21, 21, 'سكيكدة', 'Skikda'),
(22, 22, 'سيدي بلعباس', 'Sidi Bel Abbès'),
(23, 23, 'عنابة', 'Annaba'),
(24, 24, 'قالمة', 'Guelma'),
(25, 25, 'قسنطينة', 'Constantine'),
(26, 26, 'المدية', 'Médéa'),
(27, 27, 'مستغانم', 'Mostaganem'),
(28, 28, 'المسيلة', 'M''Sila'),
(29, 29, 'معسكر', 'Mascara'),
(30, 30, 'ورقلة', 'Ouargla'),
(31, 31, 'وهران', 'Oran'),
(32, 32, 'البيض', 'El Bayadh'),
(33, 33, 'إليزي', 'Illizi'),
(34, 34, 'برج بوعريريج', 'Bordj Bou Arréridj'),
(35, 35, 'بومرداس', 'Boumerdès'),
(36, 36, 'الطارف', 'El Tarf'),
(37, 37, 'تندوف', 'Tindouf'),
(38, 38, 'تيسمسيلت', 'Tissemsilt'),
(39, 39, 'الوادي', 'El Oued'),
(40, 40, 'خنشلة', 'Khenchela'),
(41, 41, 'سوق أهراس', 'Souk Ahras'),
(42, 42, 'تيبازة', 'Tipaza'),
(43, 43, 'ميلة', 'Mila'),
(44, 44, 'عين الدفلى', 'Aïn Defla'),
(45, 45, 'النعامة', 'Naâma'),
(46, 46, 'عين تموشنت', 'Aïn Témouchent'),
(47, 47, 'غرداية', 'Ghardaïa'),
(48, 48, 'غليزان', 'Relizane'),
(49, 49, 'تميمون', 'Timimoun'),
(50, 50, 'برج باجي مختار', 'Bordj Badji Mokhtar'),
(51, 51, 'أولاد جلال', 'Ouled Djellal'),
(52, 52, 'بني عباس', 'Béni Abbès'),
(53, 53, 'عين صالح', 'In Salah'),
(54, 54, 'عين قزام', 'In Guezzam'),
(55, 55, 'تقرت', 'Touggourt'),
(56, 56, 'جانت', 'Djanet'),
(57, 57, 'المغير', 'El M''Ghair'),
(58, 58, 'المنيعة', 'El Meniaa');

-- إدراج تصنيفات
INSERT INTO categories (name_ar, name_fr, icon) VALUES
('مواد غذائية', 'Alimentation', '🥖'),
('مشروبات', 'Boissons', '🥤'),
('منتجات تنظيف', 'Nettoyage', '🧹'),
('منتجات ألبان', 'Produits laitiers', '🥛'),
('لحوم ودواجن', 'Viandes et volailles', '🥩'),
('خضروات وفواكه', 'Légumes et fruits', '🥬'),
('مواد أساسية', 'Produits de base', '📦');

-- إدراج منتجات نموذجية
INSERT INTO products (name_ar, name_fr, category_id, description_ar) VALUES
('خبز', 'Pain', 1, 'خبز تقليدي جزائري'),
('حليب', 'Lait', 4, 'حليب طازج كامل الدسم'),
('زيت المائدة', 'Huile de table', 1, 'زيت نباتي للطبخ'),
('سكر', 'Sucre', 1, 'سكر أبيض حبيبات'),
('قهوة', 'Café', 2, 'قهوة محمصة مطحونة'),
('دقيق', 'Farine', 1, 'دقيق القمح الأبيض'),
('أرز', 'Riz', 1, 'أرز أبيض طويل الحبة'),
('عدس', 'Lentilles', 1, 'عدس أحمر مجفف'),
('حمص', 'Pois chiches', 1, 'حمص جاف'),
('طماطم', 'Tomates', 6, 'طماطم طازجة'),
('بصل', 'Oignons', 6, 'بصل أبيض'),
('بطاطا', 'Pommes de terre', 6, 'بطاطا طازجة'),
('بيض', 'Œufs', 4, 'بيض المائدة'),
('زبدة', 'Beurre', 4, 'زبدة طبيعية غير مملحة'),
('جبن', 'Fromage', 4, 'جبن أبيض'),
('دجاج', 'Poulet', 5, 'دجاج طازج كامل'),
('لحم البقر', 'Bœuf', 5, 'لحم بقر طازج'),
('سمك', 'Poisson', 5, 'سمك طازج'),
('ماء معدني', 'Eau minérale', 2, 'ماء معدني طبيعي'),
('عصير', 'Jus', 2, 'عصير فواكه طبيعي'),
('صابون', 'Savon', 3, 'صابون غسيل'),
('شامبو', 'Shampoing', 3, 'شامبو للشعر'),
('مناديل', 'Mouchoirs', 3, 'مناديل ورقية'),
('سواكن', 'Coussous', 1, 'سميد مطحون للكسكس'),
('شاي', 'Thé', 2, 'شاي أخضر');
